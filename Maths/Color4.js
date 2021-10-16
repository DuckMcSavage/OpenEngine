/* Color4 Class (r, g, b, a) > with alpha */

{
	
	/* Color4 Class */
	const Color4 = function(r, g, b, a) {
		this.r = r || 0;
		this.g = g || 0;
		this.b = b || 0;
		this.a = a || 0;

		this._isColor4 = true;
		
		return this;
	};
	
	/* Color4 Set Function */
	Color4.prototype.set = function(r, g, b, a) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
		
		return;
	};
	
	/* Color4 Clone Function */
	Color4.prototype.clone = function() {
		return new Color4(this.r, this.g, this.b, this.a);
	};
	
	/* Color4 Add Functions */
	Color4.prototype.add = function(c1) {
		return new Color4( (this.r + c1.r), (this.g + c1.g), (this.b + c1.b), (this.a + c1.a) );
	};
	Color4.prototype.addInPlace = function(c1) {
		this.r += c1.r;
		this.g += c1.g;
		this.b += c1.b;
		this.a += c1.a;
		
		return this;
	};
	
	/* Color4 Subtract Functions */
	Color4.prototype.subtract = function(c1) {
		return new Color4( (this.r - c1.r), (this.g - c1.g), (this.b - c1.b), (this.a - c1.a) );
	};
	Color4.prototype.subtractInPlace = function(c1) {
		this.r -= c1.r;
		this.g -= c1.g;
		this.b -= c1.b;
		this.a -= c1.a;
		
		return this;
	};
	
	/* Color4 Multiply Functions */
	Color4.prototype.multiply = function(c1) {
		return new Color4( (this.r * c1.r), (this.g * c1.g), (this.b * c1.b), (this.a * c1.a) );
	};
	Color4.prototype.multiplyInPlace = function(c1) {
		this.r *= c1.r;
		this.g *= c1.g;
		this.b *= c1.b;
		this.a *= c1.a;
		
		return this;
	};
	Color4.prototype.scale = function(a) {
		return new Color4( (this.r * a), (this.g * a), (this.b * a), (this.a * a) );
	};
	Color4.prototype.scaleInPlace = function(a) {
		this.r *= a;
		this.g *= a;
		this.b *= a;
		this.a *= a;
		
		return this;
	};
	
	/* Color4 Divide Functions */
	Color4.prototype.divide = function(c1) {
		return new Color4( (this.r / c1.r), (this.g / c1.g), (this.b / c1.b), (this.a / c1.a) );
	};
	Color4.prototype.divideInPlace = function(c1) {
		this.r /= c1.r;
		this.g /= c1.g;
		this.b /= c1.b;
		this.a /= c1.a;
		
		return this;
	};
	Color4.prototype.slice = function(a) {
		return new Color4( (this.r / a), (this.g / a), (this.b / a), (this.a / a) );
	};
	Color4.prototype.sliceInPlace = function(a) {
		this.r /= a;
		this.g /= a;
		this.b /= a;
		this.a /= a;
		
		return this;
	};
	
	/* Color4 To Ints Function */
	Color4.prototype.ToInts = function() {
		this.r *= 255;
		this.g *= 255;
		this.b *= 255;
		
		return;
	};
	
	/* Color4 From Ints by (255, 255, 255) */
	Color4.FromInts = function(r, g, b, a) {
		return new Color4(r/255, g/255, b/255, a);
	};
	
	/* Color4 White */
	Color4.White = function() {
		return new Color4(1, 1, 1, 1);
	};
	
	/* Color4 Black */
	Color4.Black = function() {
		return new Color4(0, 0, 0, 1);
	};
	
	/* Color4 Gray */
	Color4.Gray = function() {
		return new Color4(0.5, 0.5, 0.5, 1);
	};
	
	/* Color4 Red */
	Color4.Red = function() {
		return new Color4(1, 0, 0, 1);
	};
	
	/* Color4 Green */
	Color4.Green = function() {
		return new Color4(0, 1, 0, 1);
	};
	
	/* Color4 Blue */
	Color4.Blue = function() {
		return new Color4(0, 0, 1, 1);
	};
	
	/* Color4 Purple */
	Color4.Purple = function() {
		return new Color4(1, 0, 1, 1);
	};
	
	/* Return Color4 */
	OpenEngine.Color4 = Color4;
	
}