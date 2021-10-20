import Color3 from '../Materials/Color3.js';
import Color4 from '../Materials/Color4.js';

import Directional from './DirectionalLight.js';
import Point from './PointLight.js';

/* Class Light */
const Light = function(engine) {
	/* Engine The Light Belongs To */
	this._engine = engine;
	this._isLight = true;
	
	this.color = new Color3.White();

	return this;
};

Light.Directional = Directional;
Light.Point = Point;

/* Return Light */
export default Light;