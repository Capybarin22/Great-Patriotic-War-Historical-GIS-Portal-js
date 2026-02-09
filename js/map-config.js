class MapConfig {
	static MAP = { center: [37.6173, 55.7558], zoom: 5, minZoom: 3, maxZoom: 18, projection: "EPSG:3857" };
	static YEARS = { min: 1941, max: 1945, default: 1941 };
	static BASE_LAYERS = [
		{ id: "osm", title: "OpenStreetMap", type: "tile", source: new ol.source.OSM(), visible: true, zIndex: 0 }, 
		{ id: "topo", title: "OpenTopoMap", type: "tile", source: new ol.source.XYZ(
		{ url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png", attributions: "©OpenTopoMap" }), visible: false, zIndex: 0 }
	];
	static HISTORICAL_LAYERS = [
		{ id: "barbarossa-1941", title: "Операция Барбаросса", year: 1941, url: "./JPG/General1941.png", extent: [1295918.2277, 5044262.2792, 6750094.4135, 9310675.4064], visible: true }, 
		{ id: "moscow-1941", title: "Битва за Москву", year: 1941, url: "./JPG/Particular1941.png", extent: [3487564.7262, 6447879.0706, 4599899.7825, 8193572.166], visible: true }, 
		{ id: "blau-1942", title: "План Блау", year: 1942, url: "./JPG/General1942.png", extent: [2012253.7604, 4322856.738, 6202079.6948, 9461834.1786], visible: false }, 
		{ id: "stalingrad-1942", title: "Битва за Сталинград", year: 1942, url: "./JPG/Particular1942.png", extent: [4502914.1516, 5972287.2103, 5028445.1065, 6463647.8397], visible: false }, 
		{ id: "offensive-1943", title: "Наступление РККА 1943", year: 1943, url: "./JPG/General1943.png", extent: [2794170.172, 4873041.1149, 5699780.6089, 8763913.4895], visible: false }, 
		{ id: "kursk-1943", title: "Курская Дуга", year: 1943, url: "./JPG/Particular1943.png", extent: [3944696.1708, 6484490.1407, 4138775.8342, 6996443.9471], visible: false }, 
		{ id: "baltic-1944", title: "Прибалтийская Операция", year: 1944, url: "./JPG/Particular1944.png", extent: [2150697.7586, 7022218.8624, 3247272.1111, 8650315.0981], visible: false }, 
		{ id: "bagration-1944", title: "Операция Багратион", year: 1944, url: "./JPG/General1944.png", extent: [2131289.0147, 6604589.8022, 3905394.8873, 7741874.3518], visible: false }, 
		{ id: "offensive-1945", title: "Берлинская Операция", year: 1945, url: "./JPG/General1945.png", extent: [-473898.7101, 5058877.5957, 3563973.326, 8029138.9235], visible: false }, 
		{ id: "berlin-1945", title: "Битва за Берлин", year: 1945, url: "./JPG/Particular1945.png", extent: [1166089.2771, 6570899.9775, 1835197.5445, 7436775.6391], visible: false }
	];
	static BATTLES = {
		1941: [
			
			{ id: 1, layerId: "barbarossa-1941", campaign: "Операция Барбаросса", name: "Брестская крепость", date: "1941-06-22", significance: 3, forces: { soviet: { personnel: 9000, artillery: 200, tanks: 0, aircraft: 0 }, german: { personnel: 17000, artillery: 500, tanks: 100, aircraft: 150 } }, coordinates: [23.658, 52.084] },
			{ id: 2, layerId: "barbarossa-1941", campaign: "Операция Барбаросса", name: "Смоленское сражение", date: "1941-07-10", significance: 7, forces: { soviet: { personnel: 581600, artillery: 5400, tanks: 1073, aircraft: 0 }, german: { personnel: 430000, artillery: 3000, tanks: 1000, aircraft: 1200 } }, coordinates: [32.045, 54.782] },
			{ id: 3, layerId: "barbarossa-1941", campaign: "Операция Барбаросса", name: "Киевская операция", date: "1941-08-07", significance: 8, forces: { soviet: { personnel: 627000, artillery: 4000, tanks: 84, aircraft: 0 }, german: { personnel: 500000, artillery: 3400, tanks: 700, aircraft: 700 } }, coordinates: [30.523, 50.450] },
			{ id: 4, layerId: "barbarossa-1941", campaign: "Операция Барбаросса", name: "Ленинградская битва", date: "1941-09-08", significance: 9, forces: { soviet: { personnel: 930000, artillery: 15000, tanks: 1500, aircraft: 900 }, german: { personnel: 725000, artillery: 15000, tanks: 1200, aircraft: 1000 } }, coordinates: [30.314, 59.938] },
			
			
			{ id: 5, layerId: "moscow-1941", campaign: "Московская битва", name: "Битва за Москву", date: "1941-10-02", significance: 10, forces: { soviet: { personnel: 1250000, artillery: 7600, tanks: 990, aircraft: 1000 }, german: { personnel: 1000000, artillery: 19500, tanks: 1700, aircraft: 950 } }, coordinates: [37.6173, 55.7558] },
			{ id: 6, layerId: "moscow-1941", campaign: "Московская битва", name: "Вяземская операция", date: "1941-10-02", significance: 6, forces: { soviet: { personnel: 500000, artillery: 4000, tanks: 800, aircraft: 500 }, german: { personnel: 600000, artillery: 13000, tanks: 1000, aircraft: 800 } }, coordinates: [34.295, 55.211] },
			{ id: 7, layerId: "moscow-1941", campaign: "Московская битва", name: "Тульская операция", date: "1941-10-24", significance: 4, forces: { soviet: { personnel: 240000, artillery: 2000, tanks: 50, aircraft: 0 }, german: { personnel: 150000, artillery: 1200, tanks: 400, aircraft: 300 } }, coordinates: [37.617, 54.193] },
			{ id: 8, layerId: "moscow-1941", campaign: "Московская битва", name: "Клинско-Солнечногорская операция", date: "1941-11-15", significance: 5, forces: { soviet: { personnel: 150000, artillery: 1500, tanks: 200, aircraft: 200 }, german: { personnel: 120000, artillery: 1800, tanks: 300, aircraft: 250 } }, coordinates: [36.731, 56.333] }
		],
		
		1942: [
			
			{ id: 9, layerId: "blau-1942", campaign: "План Блау", name: "Харьковская операция", date: "1942-05-12", significance: 7, forces: { soviet: { personnel: 765300, artillery: 1300, tanks: 1200, aircraft: 900 }, german: { personnel: 350000, artillery: 3000, tanks: 1000, aircraft: 700 } }, coordinates: [36.230, 49.993] },
			{ id: 10, layerId: "blau-1942", campaign: "План Блау", name: "Воронежско-Ворошиловградская операция", date: "1942-06-28", significance: 8, forces: { soviet: { personnel: 1200000, artillery: 16000, tanks: 1800, aircraft: 758 }, german: { personnel: 900000, artillery: 17000, tanks: 1200, aircraft: 1640 } }, coordinates: [39.184, 51.672] },
			{ id: 11, layerId: "blau-1942", campaign: "План Блау", name: "Кавказская битва", date: "1942-07-25", significance: 8, forces: { soviet: { personnel: 1129000, artillery: 13000, tanks: 1300, aircraft: 900 }, german: { personnel: 764000, artillery: 5290, tanks: 700, aircraft: 1000 } }, coordinates: [44.617, 41.694] },
			{ id: 12, layerId: "blau-1942", campaign: "План Блау", name: "Ржевская битва", date: "1942-07-30", significance: 9, forces: { soviet: { personnel: 3451000, artillery: 54000, tanks: 4900, aircraft: 2900 }, german: { personnel: 1450000, artillery: 24000, tanks: 1100, aircraft: 1000 } }, coordinates: [34.328, 56.262] },
			
			
			{ id: 13, layerId: "stalingrad-1942", campaign: "Сталинградская битва", name: "Сталинградская битва", date: "1942-08-23", significance: 10, forces: { soviet: { personnel: 1875000, artillery: 22000, tanks: 2900, aircraft: 2700 }, german: { personnel: 1000000, artillery: 10250, tanks: 675, aircraft: 1216 } }, coordinates: [44.516, 48.708] },
			{ id: 14, layerId: "stalingrad-1942", campaign: "Сталинградская битва", name: "Уличные бои в Сталинграде", date: "1942-09-13", significance: 6, forces: { soviet: { personnel: 50000, artillery: 200, tanks: 80, aircraft: 0 }, german: { personnel: 100000, artillery: 500, tanks: 200, aircraft: 300 } }, coordinates: [44.525, 48.715] },
			{ id: 15, layerId: "stalingrad-1942", campaign: "Сталинградская битва", name: "Операция \"Уран\"", date: "1942-11-19", significance: 9, forces: { soviet: { personnel: 1103000, artillery: 15000, tanks: 1463, aircraft: 1350 }, german: { personnel: 1011500, artillery: 10250, tanks: 675, aircraft: 1216 } }, coordinates: [44.200, 48.600] },
			{ id: 16, layerId: "stalingrad-1942", campaign: "Сталинградская битва", name: "Ликвидация окруженной группировки", date: "1943-01-10", significance: 7, forces: { soviet: { personnel: 212000, artillery: 6860, tanks: 257, aircraft: 300 }, german: { personnel: 250000, artillery: 4130, tanks: 300, aircraft: 100 } }, coordinates: [44.550, 48.700] }
		],
		
		1943: [
			
			{ id: 17, layerId: "offensive-1943", campaign: "Наступление РККА 1943", name: "Операция \"Искра\" (Прорыв блокады)", date: "1943-01-12", significance: 8, forces: { soviet: { personnel: 302800, artillery: 4800, tanks: 500, aircraft: 900 }, german: { personnel: 70000, artillery: 700, tanks: 50, aircraft: 200 } }, coordinates: [31.050, 59.950] },
			{ id: 18, layerId: "offensive-1943", campaign: "Наступление РККА 1943", name: "Воронежско-Харьковская операция", date: "1943-02-02", significance: 7, forces: { soviet: { personnel: 500000, artillery: 3200, tanks: 650, aircraft: 530 }, german: { personnel: 300000, artillery: 2000, tanks: 600, aircraft: 500 } }, coordinates: [36.230, 49.993] },
			{ id: 19, layerId: "offensive-1943", campaign: "Наступление РККА 1943", name: "Донбасская операция", date: "1943-02-18", significance: 8, forces: { soviet: { personnel: 830000, artillery: 8300, tanks: 1100, aircraft: 750 }, german: { personnel: 700000, artillery: 2600, tanks: 370, aircraft: 400 } }, coordinates: [37.805, 48.015] },
			
			
			{ id: 20, layerId: "kursk-1943", campaign: "Курская битва", name: "Курская битва (оборонительная фаза)", date: "1943-07-05", significance: 10, forces: { soviet: { personnel: 1910000, artillery: 31000, tanks: 5128, aircraft: 3549 }, german: { personnel: 900000, artillery: 10000, tanks: 2700, aircraft: 2050 } }, coordinates: [36.187, 51.730] },
			{ id: 21, layerId: "kursk-1943", campaign: "Курская битва", name: "Сражение под Прохоровкой", date: "1943-07-12", significance: 9, forces: { soviet: { personnel: 100000, artillery: 2000, tanks: 850, aircraft: 500 }, german: { personnel: 70000, artillery: 1000, tanks: 500, aircraft: 300 } }, coordinates: [36.767, 51.033] },
			{ id: 22, layerId: "kursk-1943", campaign: "Курская битва", name: "Орловская операция", date: "1943-07-12", significance: 8, forces: { soviet: { personnel: 1288000, artillery: 21000, tanks: 2400, aircraft: 3000 }, german: { personnel: 600000, artillery: 7000, tanks: 1200, aircraft: 1100 } }, coordinates: [36.083, 52.967] },
			{ id: 23, layerId: "kursk-1943", campaign: "Курская битва", name: "Белгородско-Харьковская операция", date: "1943-08-03", significance: 7, forces: { soviet: { personnel: 1144000, artillery: 12000, tanks: 2400, aircraft: 1300 }, german: { personnel: 300000, artillery: 3000, tanks: 600, aircraft: 1000 } }, coordinates: [36.230, 50.000] }
		],
		
		1944: [
			
			{ id: 24, layerId: "baltic-1944", campaign: "Прибалтийская операция", name: "Таллинская операция", date: "1944-09-17", significance: 5, forces: { soviet: { personnel: 195000, artillery: 2500, tanks: 520, aircraft: 800 }, german: { personnel: 50000, artillery: 100, tanks: 50, aircraft: 100 } }, coordinates: [24.745, 59.437] },
			{ id: 25, layerId: "baltic-1944", campaign: "Прибалтийская операция", name: "Рижская операция", date: "1944-09-14", significance: 8, forces: { soviet: { personnel: 1355000, artillery: 17500, tanks: 3080, aircraft: 2640 }, german: { personnel: 730000, artillery: 7000, tanks: 1200, aircraft: 400 } }, coordinates: [24.105, 56.946] },
			{ id: 26, layerId: "baltic-1944", campaign: "Прибалтийская операция", name: "Мемельская операция", date: "1944-10-05", significance: 6, forces: { soviet: { personnel: 600000, artillery: 7000, tanks: 700, aircraft: 700 }, german: { personnel: 500000, artillery: 6000, tanks: 600, aircraft: 600 } }, coordinates: [21.100, 55.717] },
			
			
			{ id: 27, layerId: "bagration-1944", campaign: "Операция Багратион", name: "Витебско-Оршанская операция", date: "1944-06-23", significance: 7, forces: { soviet: { personnel: 400000, artillery: 5600, tanks: 800, aircraft: 1000 }, german: { personnel: 150000, artillery: 2000, tanks: 200, aircraft: 300 } }, coordinates: [30.205, 55.183] },
			{ id: 28, layerId: "bagration-1944", campaign: "Операция Багратион", name: "Бобруйская операция", date: "1944-06-24", significance: 6, forces: { soviet: { personnel: 232000, artillery: 2000, tanks: 300, aircraft: 600 }, german: { personnel: 70000, artillery: 300, tanks: 50, aircraft: 100 } }, coordinates: [29.233, 53.150] },
			{ id: 29, layerId: "bagration-1944", campaign: "Операция Багратион", name: "Минская операция", date: "1944-06-29", significance: 8, forces: { soviet: { personnel: 500000, artillery: 4500, tanks: 900, aircraft: 1500 }, german: { personnel: 100000, artillery: 950, tanks: 200, aircraft: 200 } }, coordinates: [27.567, 53.900] },
			{ id: 30, layerId: "bagration-1944", campaign: "Операция Багратион", name: "Люблин-Брестская операция", date: "1944-07-18", significance: 9, forces: { soviet: { personnel: 800000, artillery: 12000, tanks: 1600, aircraft: 3000 }, german: { personnel: 400000, artillery: 6000, tanks: 800, aircraft: 600 } }, coordinates: [23.658, 52.084] }
		],
		
		1945: [
			
			{ id: 31, layerId: "offensive-1945", campaign: "Берлинская операция", name: "Висло-Одерская операция", date: "1945-01-12", significance: 9, forces: { soviet: { personnel: 2200000, artillery: 37000, tanks: 7000, aircraft: 5000 }, german: { personnel: 400000, artillery: 4100, tanks: 1150, aircraft: 600 } }, coordinates: [19.450, 51.670] },
			{ id: 32, layerId: "offensive-1945", campaign: "Берлинская операция", name: "Восточно-Прусская операция", date: "1945-01-13", significance: 8, forces: { soviet: { personnel: 1669000, artillery: 25000, tanks: 3800, aircraft: 3097 }, german: { personnel: 580000, artillery: 8200, tanks: 700, aircraft: 775 } }, coordinates: [20.483, 54.717] },
			{ id: 33, layerId: "offensive-1945", campaign: "Берлинская операция", name: "Нижне-Силезская операция", date: "1945-02-08", significance: 7, forces: { soviet: { personnel: 1000000, artillery: 17000, tanks: 3200, aircraft: 2500 }, german: { personnel: 400000, artillery: 4000, tanks: 800, aircraft: 600 } }, coordinates: [16.367, 51.100] },
			
			
			{ id: 34, layerId: "berlin-1945", campaign: "Берлинская операция", name: "Штурм Берлина", date: "1945-04-16", significance: 10, forces: { soviet: { personnel: 1960000, artillery: 42000, tanks: 6300, aircraft: 7500 }, german: { personnel: 766000, artillery: 9303, tanks: 1519, aircraft: 2200 } }, coordinates: [13.405, 52.520] },
			{ id: 35, layerId: "berlin-1945", campaign: "Берлинская операция", name: "Сражение за Зееловские высоты", date: "1945-04-16", significance: 8, forces: { soviet: { personnel: 1000000, artillery: 20000, tanks: 3000, aircraft: 3000 }, german: { personnel: 100000, artillery: 600, tanks: 500, aircraft: 300 } }, coordinates: [14.100, 52.533] },
			{ id: 36, layerId: "berlin-1945", campaign: "Берлинская операция", name: "Бои в центре Берлина", date: "1945-04-26", significance: 5, forces: { soviet: { personnel: 50000, artillery: 500, tanks: 200, aircraft: 0 }, german: { personnel: 45000, artillery: 400, tanks: 60, aircraft: 0 } }, coordinates: [13.382, 52.507] },
			{ id: 37, layerId: "berlin-1945", campaign: "Берлинская операция", name: "Штурм Рейхстага", date: "1945-04-30", significance: 6, forces: { soviet: { personnel: 10000, artillery: 89, tanks: 40, aircraft: 0 }, german: { personnel: 5000, artillery: 30, tanks: 15, aircraft: 0 } }, coordinates: [13.376, 52.518] }
		]
	};
	static ICONS = { battle: './Data/Icons/battle.png', soldier: './Data/Icons/soldier.png', tank: './Data/Icons/tank.png', artillery: './Data/Icons/artillery.png', aircraft: './Data/Icons/aircraft.png' };
}