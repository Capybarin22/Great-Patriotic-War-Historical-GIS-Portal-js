class UIManager {
	constructor(mapApp) {
		this.mapApp = mapApp;
		this.init();
	}
	init() {
		this.initLayerSwitcher();
		this.initYearSlider();
		this.initPopupEvents();
		this.initMapEvents();
		this.bindYearChangeEvents();
	}
	initLayerSwitcher() {
		const container = document.getElementById("layer-switcher");
		const historicalGroup = container.querySelector(".layer-group:last-child");
		historicalGroup.querySelectorAll('.layer-item').forEach(item => item.remove());
		MapConfig.HISTORICAL_LAYERS.forEach(layer => {
			const item = this.createLayerSwitcherItem(layer);
			historicalGroup.appendChild(item);
		});
		this.bindLayerSwitcherEvents();
		document.getElementById("toggle-layers").addEventListener("click", () => {
			const switcher = document.getElementById("layer-switcher");
			const isActive = switcher.classList.toggle("active");
			document.getElementById("toggle-layers").setAttribute("aria-expanded", isActive);
		});
	}
	createLayerSwitcherItem(layer) {
		const div = document.createElement("div");
		div.className = "layer-item";
		div.innerHTML = `
<input type="checkbox" id="${layer.id}" data-year="${layer.year}" ${layer.visible ? "checked" : ""}>
<label for="${layer.id}">${layer.title}</label>
<input type="range" class="opacity-slider" min="0" max="100" value="100"
data-layer="${layer.id}">
`;
		return div;
	}
	bindLayerSwitcherEvents() {
		document.querySelectorAll('input[name="baseLayer"]').forEach(input => {
			input.addEventListener("change", (e) => this.setBaseLayer(e.target.id));
		});
		document.querySelectorAll('input[type="checkbox"][data-year]').forEach(checkbox => {
			checkbox.addEventListener("change", (e) => this.onHistoricalLayerToggle(e));
		});
		document.querySelectorAll(".opacity-slider").forEach(slider => {
			slider.addEventListener("input", (e) => this.onOpacityChange(e));
		});
	}
	initYearSlider() {
		const slider = document.getElementById("year-slider");
		slider.min = MapConfig.YEARS.min;
		slider.max = MapConfig.YEARS.max;
		slider.value = this.mapApp.currentYear;
		slider.addEventListener("input", (e) => {
			const year = parseInt(e.target.value);
			this.mapApp.updateYear(year, false);
			this.updateCheckboxesForYear(year);
		});
	}
	updateCheckboxesForYear(year) {
		const checkboxes = document.querySelectorAll('input[type="checkbox"][data-year]');
		checkboxes.forEach(checkbox => {
			const layerYear = parseInt(checkbox.dataset.year);
			const layerId = checkbox.id;
			const shouldBeVisible = this.shouldLayerBeVisible(layerId, layerYear, year);
			checkbox.checked = shouldBeVisible;
			const layer = this.mapApp.historicalLayers.get(layerId);
			if (layer) {
				layer.setVisible(shouldBeVisible);
			}
		});
	}
	shouldLayerBeVisible(layerId, layerYear, currentYear) {
		return layerYear === currentYear;
	}
	isLayerActiveForYear(layerId, currentYear) {
		const layerConfig = MapConfig.HISTORICAL_LAYERS.find(l => l.id === layerId);
		if (layerConfig) {
			if (layerConfig.years) {
				return currentYear >= layerConfig.years.start &&
					currentYear <= layerConfig.years.end;
			}
			return layerConfig.year === currentYear;
		}
		return false;
	}
	initPopupEvents() {
		const closer = document.getElementById("popup-closer");
		closer.addEventListener("click", (e) => {
			e.preventDefault();
			this.mapApp.closePopup();
		});
	}
	initMapEvents() {
		this.mapApp.map.on("pointermove", (evt) => {
			const pixel = this.mapApp.map.getEventPixel(evt.originalEvent);
			const hasFeature = this.mapApp.map.hasFeatureAtPixel(pixel);
			this.mapApp.map.getTargetElement().style.cursor = hasFeature ? "pointer" : "";
		});
	}
	bindYearChangeEvents() {
		this.mapApp.onYearChange = (year) => {
			this.updateCheckboxesForYear(year);
		};
	}
	onHistoricalLayerToggle(event) {
		const layerId = event.target.id;
		const layer = this.mapApp.historicalLayers.get(layerId);
		if (layer) {
			layer.setVisible(event.target.checked);
			const layerYear = parseInt(event.target.dataset.year);
			if (event.target.checked) {
				document.getElementById("year-slider").value = layerYear;
				this.mapApp.currentYear = layerYear;
			}
		}
	}
	onOpacityChange(event) {
		const layerId = event.target.dataset.layer;
		const layer = this.mapApp.historicalLayers.get(layerId);
		if (layer) {
			layer.setOpacity(parseInt(event.target.value) / 100);
		}
	}
	setBaseLayer(layerId) {
		MapConfig.BASE_LAYERS.forEach(config => {
			const layer = this.mapApp.map.getLayers().getArray()
				.find(l => l.get("type") === "base" && l.get("id") === config.id);
			if (layer) {
				layer.setVisible(layer.get("id") === layerId);
			}
		});
	}
	updateCheckboxForLayer(layerId, isVisible) {
		const checkbox = document.getElementById(layerId);
		if (checkbox) {
			checkbox.checked = isVisible;
		}
	}
}