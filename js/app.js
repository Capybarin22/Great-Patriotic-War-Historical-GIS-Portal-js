document.addEventListener("DOMContentLoaded", () => {
	const mapApp = new HistoricalMapApp();
	mapApp.init().then(() => {
		const uiManager = new UIManager(mapApp);
		window.historicalMapApp = mapApp;
		window.uiManager = uiManager;
	});
});