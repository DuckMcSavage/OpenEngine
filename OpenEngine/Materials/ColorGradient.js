import Color3 from '../Materials/Color3.js';
import Color4 from '../Materials/Color4.js';

/* Class ColorGradient */
const ColorGradient = function() {
	this.colors = [
		new Color3.Black(),
		new Color3.Black(),
		new Color3.White(),
		new Color3.White()
	];

	this._isColorGradient = true;

	return this;
};

/* ColorGradient Set Function */
ColorGradient.prototype.setGradients = function(grads) {
	this.colors = grads;
	
	return this.colors;
};

/* ColorGradient Clone Function */
ColorGradient.prototype.clone = function() {
	let CG = new ColorGradient();
	CG.colors = this.colors.slice();
	return CG;
};

/* ColorGradient Compare Function */
ColorGradient.prototype.compare = function(c1) {
	let same = true;
	
	if(c1._isColorGradient && this.colors.length == c1.colors.length) {
		for(let i = 0; i < this.colors.length; i++) {
			if(!c1.colors[i].compare(this.colors[i])) {
				same = false;
				break;
			}
		}
	} else {
		same = false;
	}
	
	return same;
};

/* Return ColorGradient */
export default ColorGradient;