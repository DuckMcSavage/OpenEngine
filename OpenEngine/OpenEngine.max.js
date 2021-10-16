/* OPEN ENGINE 3D */
const OpenEngine = {};

/* OPEN ENGINE VERSION */
OpenEngine.version = 0.0;

/* ACTIVE ENGINE */
OpenEngine._activeEngine = null;

/* Setters */
OpenEngine.SetActiveEngine = function(engine) {
	OpenEngine._activeEngine = engine;
	return OpenEngine._activeEngine;
};

/* Getters */
OpenEngine.GetActiveEngine = function() {
	return OpenEngine._activeEngine;
};