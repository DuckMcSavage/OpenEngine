import Maths from '../Maths/Math.js';

/* Class Texture */
const Texture = function(url, engine) {
	/* Engine The Texture Belongs To */
	this._engine = engine;
	this._isTexture = true;
	
	this.url = url;
	this.texture = this.LoadTexture();

	return this;
};

/* Texture Clone Function */
Texture.prototype.clone = function() {
	return new Texture(this.url);
};

/* Texture Load Function */
Texture.prototype.LoadTexture = function() {
	let gl = this._engine.GetActiveGLContext();
	this.texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	
	let pixel = new Uint8Array([0, 0, 0, 255]);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel);

	let texture = new Image();
	let tex = this.texture;
	texture.onload = function() {
		gl.bindTexture(gl.TEXTURE_2D, tex);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture);

		if (Maths.IsPowerOf2(texture.width) && Maths.IsPowerOf2(texture.height)) {
			gl.generateMipmap(gl.TEXTURE_2D);
		} else {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		}
	};
	
	texture.src = this.url;
	return this.texture;
};

/* Return Texture */
export default Texture;