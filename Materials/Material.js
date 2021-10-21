import Color3 from '../Materials/Color3.js';
import Color4 from '../Materials/Color4.js';

/* Class Material */
const Material = function(mesh) {
	/* Mesh The Material Belongs To */
	this._mesh = mesh;
	this._isMaterial = true;

	this.lightsEnabled = true;
	
	this.color = new Color3.White();
	this._color = this.color.clone();
	
	this.cullFrontFace = false;
	this.cullBackFace = true;
	
	this.texture = null;
	
	this._colorCoords = [];
	this._bufferColor = [];
	
	this.SetBufferColors();
	return this;
};

/* Check Needs Update */
Material.prototype.CheckNeedsUpdate = function() {
	return(!this.color.compare(this._color));
};

/* Set Buffer Color */
Material.prototype.SetBufferColors = function() {
	if(!this._mesh) {
		return false;
	}
	
	this._colorCoords = [];
	if(this.color._isColorGradient) {
		for (let i = 0; i < this._mesh.geometry.indices.length; i++) {
			let _colorCoords = this.color.colors[Math.floor(i % this.color.colors.length)];
			this._colorCoords = this._colorCoords.concat(_colorCoords.r, _colorCoords.g, _colorCoords.b, 1);
		}
	} else {
		for (var i = 0; i < this._mesh.geometry.positions.length/3; i++) {
			this._colorCoords = this._colorCoords.concat(this.color.r, this.color.g, this.color.b, 1);
		}
	}
	
	this._bufferColor = this._mesh._engine.getActiveGLContext().createBuffer();
	this._mesh._engine.getActiveGLContext().bindBuffer(this._mesh._engine.getActiveGLContext().ARRAY_BUFFER, this._bufferColor);
	this._mesh._engine.getActiveGLContext().bufferData(this._mesh._engine.getActiveGLContext().ARRAY_BUFFER, new Float32Array(this._colorCoords), this._mesh._engine.getActiveGLContext().STATIC_DRAW);
	
	return this._bufferColor;
};

/* Get Buffer Color */
Material.prototype.GetBufferColor = function() {
	return this._bufferColor;
};

/* Return Material */
export default Material;