/* Vector2 Class (x, y) */

{
	
	/* Class Vector2 */
	const Vector2 = function(x, y) {
		this.x = x || 0;
		this.y = y || 0;

		this._isVector2 = true;
		
		return this;
	};
	
	/* Vector2 Set Function */
	Vector2.prototype.set = function(x, y) {
		this.x = x;
		this.y = y;
		
		return this;
	};
	
	/* Vector2 Clone Function */
	Vector2.prototype.clone = function() {
		return new Vector2(this.x, this.y);
	};
	
	/* Vector2 Compare Function */
	Vector2.prototype.compare = function(v1) {
		if(this.x == v1.x && this.y == v1.y) {return true;}
		return false;
	};
	
	/* Vector2 Add Functions */
	Vector2.prototype.add = function(v1) {
		return new Vector2( (this.x + v1.x), (this.y + v1.y) );
	};
	Vector2.prototype.addInPlace = function(v1) {
		this.x += v1.x;
		this.y += v1.y;
		
		return this;
	};
	
	/* Vector2 Subtract Functions */
	Vector2.prototype.subtract = function(v1) {
		return new Vector2( (this.x - v1.x), (this.y - v1.y) );
	};
	Vector2.prototype.subtractInPlace = function(v1) {
		this.x -= v1.x;
		this.y -= v1.y;
		
		return this;
	};
	
	/* Vector2 Multiply Functions */
	Vector2.prototype.multiply = function(v1) {
		return new Vector2( (this.x * v1.x), (this.y * v1.y) );
	};
	Vector2.prototype.multiplyInPlace = function(v1) {
		this.x *= v1.x;
		this.y *= v1.y;
		
		return this;
	};
	Vector2.prototype.scale = function(a) {
		return new Vector2( (this.x * a), (this.y * a) );
	};
	Vector2.prototype.scaleInPlace = function(a) {
		this.x *= a;
		this.y *= a;
		
		return this;
	};
	
	/* Vector2 Divide Functions */
	Vector2.prototype.divide = function(v1) {
		return new Vector2( (this.x / v1.x), (this.y / v1.y) );
	};
	Vector2.prototype.divideInPlace = function(v1) {
		this.x /= v1.x;
		this.y /= v1.y;
		
		return this;
	};
	Vector2.prototype.slice = function(a) {
		return new Vector2( (this.x / a), (this.y / a) );
	};
	Vector2.prototype.sliceInPlace = function(a) {
		this.x /= a;
		this.y /= a;
		
		return this;
	};
	
	/* Constructor Functions */
	Vector2.Random = function() {
		return new Vector2(Math.random(), Math.random());
	};
	Vector2.Zero = function() {
		return new Vector2(0, 0);
	};
	Vector2.One = function() {
		return new Vector2(1, 1);
	};
	Vector2.Left = function() {
		return new Vector2(-1, 0);
	};
	Vector2.Right = function() {
		return new Vector2(1, 0);
	};
	Vector2.Up = function() {
		return new Vector2(0, 1);
	};
	Vector2.Down = function() {
		return new Vector2(0, -1);
	};
	
	/* Return Vector2 */
	OpenEngine.Vector2 = Vector2;
	
}