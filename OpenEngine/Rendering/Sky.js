import Color3 from '../Materials/Color3.js';
import Color4 from '../Materials/Color4.js';

/* Class Sky */
const Sky = function() {
	this._isSky = true;
	
	this.skyColor = new Color4.Black();

	this.SkyBox = null;

	return this;
};

/* Return Sky */
export default Sky;