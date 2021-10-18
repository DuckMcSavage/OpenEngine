/* Class Vector3 */
	const Vector3 = function(x, y, z) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;

		this._isVector3 = true;
		
		return this;
	};
	
	/* Vector3 Set Function */
	Vector3.prototype.set = function(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
		
		return this;
	};
	
	/* Vector3 Clone Function */
	Vector3.prototype.clone = function() {
		return new Vector3(this.x, this.y, this.z);
	};
	
	/* Vector3 Compare Function */
	Vector3.prototype.compare = function(v1) {
		if(this.x == v1.x && this.y == v1.y && this.z == v1.z) {return true;}
		return false;
	};
	
	/* Vector3 Add Functions */
	Vector3.prototype.add = function(v1) {
		return new Vector3( (this.x + v1.x), (this.y + v1.y), (this.z + v1.z) );
	};
	Vector3.prototype.addInPlace = function(v1) {
		this.x += v1.x;
		this.y += v1.y;
		this.z += v1.z;
		
		return this;
	};
	
	/* Vector3 Subtract Functions */
	Vector3.prototype.subtract = function(v1) {
		return new Vector3( (this.x - v1.x), (this.y - v1.y), (this.z - v1.z) );
	};
	Vector3.prototype.subtractInPlace = function(v1) {
		this.x -= v1.x;
		this.y -= v1.y;
		this.z -= v1.z;
		
		return this;
	};
	
	/* Vector3 Multiply Functions */
	Vector3.prototype.multiply = function(v1) {
		return new Vector3( (this.x * v1.x), (this.y * v1.y), (this.z * v1.z) );
};
Vector3.prototype.multiplyInPlace = function(v1) {
	this.x *= v1.x;
	this.y *= v1.y;
	this.z *= v1.z;
	
	return this;
};
Vector3.prototype.scale = function(a) {
	return new Vector3( (this.x * a), (this.y * a), (this.z * a) );
};
Vector3.prototype.scaleInPlace = function(a) {
	this.x *= a;
	this.y *= a;
	this.z *= a;
	
	return this;
};

/* Vector3 Divide Functions */
Vector3.prototype.divide = function(v1) {
	return new Vector3( (this.x / v1.x), (this.y / v1.y), (this.z / v1.z) );
};
Vector3.prototype.divideInPlace = function(v1) {
	this.x /= v1.x;
	this.y /= v1.y;
	this.z /= v1.z;
	
	return this;
};
Vector3.prototype.slice = function(a) {
	return new Vector2( (this.x / a), (this.y / a), (this.z / a) );
};
Vector3.prototype.sliceInPlace = function(a) {
	this.x /= a;
	this.y /= a;
	this.z /= a;
	
	return this;
};

/* Vector3 To Array */
Vector3.prototype.toArray = function() {
	return [this.x, this.y, this.z];
};

/* Vector3 Length Of Vector */
Vector3.prototype.length = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

/* Vector3 Normalize Function */
Vector3.prototype.normalize = function() {
	if (this.length() === 0 || this.length() === 1) {
		return this.clone();
	}

	return this.scale(1 / this.length());
};

/* Constructor Functions */
Vector3.Random = function() {
	return new Vector3(Math.random(), Math.random(), Math.random());
};
Vector3.Zero = function() {
	return new Vector3(0, 0, 0);
};
Vector3.One = function() {
	return new Vector3(1, 1, 1);
};
Vector3.Left = function() {
	return new Vector3(-1, 0, 0);
};
Vector3.Right = function() {
	return new Vector3(1, 0, 0);
};
Vector3.Up = function() {
	return new Vector3(0, 1, 0);
};
Vector3.Down = function() {
	return new Vector3(0, -1, 0);
};
Vector3.Forward = function() {
	return new Vector3(0, 0, 1);
};
Vector3.Back = function() {
	return new Vector3(0, 0, -1);
};

/* Return Vector3 */
export default Vector3;