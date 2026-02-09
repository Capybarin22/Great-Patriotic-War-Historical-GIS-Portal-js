class HistoricalMapApp {
	constructor() {
		this.map = null;
		this.battlesLayer = null;
		this.unitsLayer = null;
		this.historicalLayers = new Map();
		this.popupOverlay = null;
		this.currentYear = MapConfig.YEARS.default;
	}
	async init() {
		this.initMap();
		await this.initLayers();
		this.initPopup();
		this.updateYear(this.currentYear, true);
	}
	initMap() {
		this.map = new ol.Map({
			target: "map",
			layers: [],
			view: new ol.View({
				center: ol.proj.fromLonLat(MapConfig.MAP.center),
				zoom: MapConfig.MAP.zoom,
				minZoom: MapConfig.MAP.minZoom,
				maxZoom: MapConfig.MAP.maxZoom,
				projection: MapConfig.MAP.projection
			}),
			controls: ol.control.defaults({
				attributionOptions: { collapsible: true }
			}).extend([
				new ol.control.Zoom(),
				new ol.control.Rotate(),
				new ol.control.ScaleLine()
			])
		});
	}
	async initLayers() {
		MapConfig.BASE_LAYERS.forEach(config => {
			const layer = new ol.layer.Tile({
				source: config.source,
				visible: config.visible,
				zIndex: config.zIndex
			});
			this.setLayerProperties(layer, config, 'base');
			this.map.addLayer(layer);
		});
		for (const config of MapConfig.HISTORICAL_LAYERS) {
			await this.createHistoricalLayer(config);
		}
		this.battlesLayer = new ol.layer.Vector({
			source: new ol.source.Vector(),
			style: this.createBattleStyle(),
			zIndex: 20,
			visible: true
		});
		this.map.addLayer(this.battlesLayer);
		this.unitsLayer = new ol.layer.Vector({
			source: new ol.source.Vector(),
			style: (feature) => this.createUnitStyle(feature),
			zIndex: 19,
			visible: true
		});
		this.map.addLayer(this.unitsLayer);
	}
	createHistoricalLayer(config) {
		const source = new ol.source.ImageStatic({
			url: config.url,
			imageExtent: config.extent,
			projection: "EPSG:3857"
		});
		const layer = new ol.layer.Image({
			source: source,
			opacity: 1,
			visible: config.visible,
			zIndex: 10
		});
		this.setLayerProperties(layer, config, 'historical');
		this.historicalLayers.set(config.id, layer);
		this.map.addLayer(layer);
		return layer;
	}
	setLayerProperties(layer, config, type) {
		layer.set("type", type);
		layer.set("id", config.id);
		layer.set("title", config.title);
		if (config.year) layer.set("year", config.year);
	}
	createBattleStyle() {
		return (feature) => {
			const significance = feature.get('significance') || 1;
			const zoom = this.map.getView().getZoom();
			let baseScale;
			if (zoom > 10) {
				baseScale = 0.3 + (significance / 15) * 0.5;
			} else {
				baseScale = 0.1 + (significance / 15) * 0.2;
			}
			const totalForces = this.calculateTotalForces(feature.get('forces'));
			const forceMultiplier = Math.min(1 + (totalForces / 2000000), 0.35);
			return new ol.style.Style({
				image: new ol.style.Icon({
					src: MapConfig.ICONS.battle,
					scale: baseScale * forceMultiplier,
					anchor: [0.5, 0],
					anchorXUnits: 'fraction',
					anchorYUnits: 'fraction'
				})
			});
		};
	}
	calculateTotalForces(forces) {
		if (!forces) return 0;
		let total = 0;
		if (forces.soviet) {
			total += forces.soviet.personnel || 0;
		}
		if (forces.german) {
			total += forces.german.personnel || 0;
		}
		return total;
	}
	createUnitStyle(feature) {
		const unitType = feature.get('unitType');
		let iconSrc;
		switch (unitType) {
			case 'soldier':
				iconSrc = MapConfig.ICONS.soldier;
				break;
			case 'tank':
				iconSrc = MapConfig.ICONS.tank;
				break;
			case 'artillery':
				iconSrc = MapConfig.ICONS.artillery;
				break;
			case 'aircraft':
				iconSrc = MapConfig.ICONS.aircraft;
				break;
			default:
				iconSrc = MapConfig.ICONS.soldier;
		}
		return new ol.style.Style({
			image: new ol.style.Icon({
				src: iconSrc,
				scale: 0.6,
				anchor: [0.5, 0.5],
				anchorXUnits: 'fraction',
				anchorYUnits: 'fraction'
			})
		});
	}
	initPopup() {
		const popup = document.getElementById("popup");
		this.popupOverlay = new ol.Overlay({
			element: popup,
			autoPan: true,
			autoPanAnimation: { duration: 250 }
		});
		this.map.addOverlay(this.popupOverlay);
		this.map.on("click", (evt) => this.onMapClick(evt));
	}
	onMapClick(evt) {
		const feature = this.map.forEachFeatureAtPixel(evt.pixel, (f) => f);
		if (feature) {
			const coords = feature.getGeometry().getCoordinates();
			this.popupOverlay.setPosition(coords);
			this.showBattleInfo(feature.getProperties());
			document.getElementById("popup").classList.remove("hidden");
		} else {
			this.closePopup();
		}
	}
	updateYear(year, initial = false) {
		this.currentYear = year;
		if (!initial) {
			this.closePopup();
		}
		this.historicalLayers.forEach(layer => {
			const layerYear = layer.get("year");
			const isVisible = layerYear === year;
			layer.setVisible(isVisible);
		});
		this.updateBattleMarkers(year);
	}
	updateBattleMarkers(year) {
		const battlesSource = this.battlesLayer.getSource();
		const unitsSource = this.unitsLayer.getSource();
		battlesSource.clear();
		unitsSource.clear();
		const battles = MapConfig.BATTLES[year] || [];
		battles.forEach(battle => {
			const battleFeature = new ol.Feature({
				geometry: new ol.geom.Point(ol.proj.fromLonLat(battle.coordinates)),
				name: battle.name,
				campaign: battle.campaign,
				date: battle.date,
				forces: battle.forces,
				significance: battle.significance || 1,
				isMain: true
			});
			battlesSource.addFeature(battleFeature);
		});
		this.battlesLayer.setStyle(this.createBattleStyle());
	}
	closePopup() {
		this.popupOverlay.setPosition(undefined);
		document.getElementById("popup").classList.add("hidden");
	}
	showBattleInfo(properties) {
		const content = document.getElementById("popup-content");
		const template = this.createBattlePopupTemplate(properties);
		content.innerHTML = template;
	}
	createBattlePopupTemplate(properties) {
		return `
<div class="battle-popup">
<h3>${properties.name}</h3>
<div class="battle-info">
<p><strong>Кампания:</strong> ${properties.campaign}</p>
<p><strong>Дата:</strong> ${properties.date}</p>
</div>
${this.createForcesTemplate(properties.forces)}
</div>
`;
	}
	createForcesTemplate(forces) {
		if (!forces) return '';
		let html = '<div class="battle-forces">';
		if (forces.soviet) {
			html += `
<div class="force-column soviet-forces">
<h4>Советские войска</h4>
<div class="force-stats">
${this.formatForces(forces.soviet)}
</div>
</div>
`;
		}
		if (forces.german) {
			html += `
<div class="force-column german-forces">
<h4>Немецкие войска</h4>
<div class="force-stats">
${this.formatForces(forces.german)}
</div>
</div>
`;
		}
		html += '</div>';
		return html;
	}
	formatForces(forces) {
		return `
${forces.personnel ? `<p><img src="${MapConfig.ICONS.soldier}" class="force-icon"> <strong>Личный состав:</strong> ${forces.personnel.toLocaleString()}</p>` : ''}
${forces.tanks ? `<p><img src="${MapConfig.ICONS.tank}" class="force-icon"> <strong>Танки:</strong> ${forces.tanks.toLocaleString()}</p>` : ''}
${forces.artillery ? `<p><img src="${MapConfig.ICONS.artillery}" class="force-icon"> <strong>Артиллерия:</strong> ${forces.artillery.toLocaleString()}</p>` : ''}
${forces.aircraft ? `<p><img src="${MapConfig.ICONS.aircraft}" class="force-icon"> <strong>Самолеты:</strong> ${forces.aircraft.toLocaleString()}</p>` : ''}
`;
	}
}