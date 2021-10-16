/* Vector4 Class (x, y, z, w) */

{
	
	/* Class Vector4 */
	const Vector4 = function(x, y, z, w) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		this.w = w || 0;

		this._isVector4 = true;
		
		return this;
	};
	
	/* Vector4 Set Function */
	Vector4.prototype.set = function(x, y, z, w) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
		
		return this;
	};
	
	/* Vector4 Clone Function */
	Vector4.prototype.clone = function() {
		return new Vector4(this.x, this.y, this.z, this.w);
	};
	
	/* Vector4 Compare Function */
	Vector4.prototype.compare = function(v1) {
		if(this.x == v1.x && this.y == v1.y && this.z == v1.z && this.w == v1.w) {return true;}
		return false;
	};
	
	/* Vector4 Add Functions */
	Vector4.prototype.add = function(v1) {
		return new Vector4( (this.x + v1.x), (this.y + v1.y), (this.z + v1.z), (this.w + v1.w) );
	};
	Vector4.prototype.addInPlace = function(v1) {
		this.x += v1.x;
		this.y += v1.y;
		this.z += v1.z;
		this.w += v1.w;
		
		return this;
	};
	
	/* Vector4 Subtract Functions */
	Vector4.prototype.subtract = function(v1) {
		return new Vector4( (this.x - v1.x), (this.y - v1.y), (this.z - v1.z), (this.w - v1.w) );
	};
	Vector4.prototype.subtractInPlace = function(v1) {
		this.x -= v1.x;
		this.y -= v1.y;
		this.z -= v1.z;
		this.w -= v1.w;
		
		return this;
	};
	
	/* Vector4 Multiply Functions */
	Vector4.prototype.multiply = function(v1) {
		return new Vector4( (this.x * v1.x), (this.y * v1.y), (this.z * v1.z), (this.w * v1.w) );
	};
	Vector4.prototype.multiplyInPlace = function(v1) {
		this.x *= v1.x;
		this.y *= v1.y;
		this.z *= v1.z;
		this.w *= v1.w;
		
		return this;
	};
	Vector4.prototype.scale = function(a) {
		return new Vector4( (this.x * a), (this.y * a), (this.z * a), (this.w * a) );
	};
	Vector4.prototype.scaleInPlace = function(a) {
		this.x *= a;
		this.y *= a;
		this.z *= a;
		this.w *= w;
		
		return this;
	};
	
	/* Vector4 Divide Functions */
	Vector4.prototype.divide = function(v1) {
		return new Vector4( (this.x / v1.x), (this.y / v1.y), (this.z / v1.z), (this.w / v1.w) );
	};
	Vector4.prototype.divideInPlace = function(v1) {
		this.x /= v1.x;
		this.y /= v1.y;
		this.z /= v1.z;
		this.w /= v1.w;
		
		return this;
	};
	Vector4.prototype.slice = function(a) {
		return new Vector4( (this.x / a), (this.y / a), (this.z / a), (this.w / a) );
	};
	Vector4.prototype.sliceInPlace = function(a) {
		this.x /= a;
		this.y /= a;
		this.z /= a;
		this.w /= w;
		
		return this;
	};
	
	OpenEngine.Vector4 = Vector4;
	
}