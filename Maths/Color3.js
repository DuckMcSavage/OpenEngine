/* Color3 Class (r, g, b) */

{
	
	/* Color3 Class */
	const Color3 = function(r, g, b) {
		this.r = r || 0;
		this.g = g || 0;
		this.b = b || 0;

		this._isColor3 = true;
		
		return this;
	};
	
	/* Color3 Set Function */
	Color3.prototype.set = function(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
		
		return;
	};
	
	/* Color3 Clone Function */
	Color3.prototype.clone = function() {
		return new Color3(this.r, this.g, this.b);
	};
	
	/* Color3 Add Functions */
	Color3.prototype.add = function(c1) {
		return new Color3( (this.r + c1.r), (this.g + c1.g), (this.b + c1.b) );
	};
	Color3.prototype.addInPlace = function(c1) {
		this.r += c1.r;
		this.g += c1.g;
		this.b += c1.b;
		
		return this;
	};
	
	/* Color3 Subtract Functions */
	Color3.prototype.subtract = function(c1) {
		return new Color3( (this.r - c1.r), (this.g - c1.g), (this.b - c1.b) );
	};
	Color3.prototype.subtractInPlace = function(c1) {
		this.r -= c1.r;
		this.g -= c1.g;
		this.b -= c1.b;
		
		return this;
	};
	
	/* Color3 Multiply Functions */
	Color3.prototype.multiply = function(c1) {
		return new Color3( (this.r * c1.r), (this.g * c1.g), (this.b * c1.b) );
	};
	Color3.prototype.multiplyInPlace = function(c1) {
		this.r *= c1.r;
		this.g *= c1.g;
		this.b *= c1.b;
		
		return this;
	};
	Color3.prototype.scale = function(a) {
		return new Color3( (this.r * a), (this.g * a), (this.b * a) );
	};
	Color3.prototype.scaleInPlace = function(a) {
		this.r *= a;
		this.g *= a;
		this.b *= a;
		
		return this;
	};
	
	/* Color3 Divide Functions */
	Color3.prototype.divide = function(c1) {
		return new Color3( (this.r / c1.r), (this.g / c1.g), (this.b / c1.b) );
	};
	Color3.prototype.divideInPlace = function(c1) {
		this.r /= c1.r;
		this.g /= c1.g;
		this.b /= c1.b;
		
		return this;
	};
	Color3.prototype.slice = function(a) {
		return new Color3( (this.r / a), (this.g / a), (this.b / a) );
	};
	Color3.prototype.sliceInPlace = function(a) {
		this.r /= a;
		this.g /= a;
		this.b /= a;
		
		return this;
	};
	
	/* Color3 To Ints Function */
	Color3.prototype.ToInts = function() {
		this.r *= 255;
		this.g *= 255;
		this.b *= 255;
		
		return;
	};
	
	/* Color3 From Ints by (255, 255, 255) */
	Color3.FromInts = function(r, g, b) {
		return new Color3(r/255, g/255, b/255);
	};
	
	/* Color3 White */
	Color3.White = function() {
		return new Color3(1, 1, 1);
	};
	
	/* Color3 Black */
	Color3.Black = function() {
		return new Color3(0, 0, 0);
	};
	
	/* Color3 Gray */
	Color3.Gray = function() {
		return new Color3(0.5, 0.5, 0.5);
	};
	
	/* Color3 Red */
	Color3.Red = function() {
		return new Color3(1, 0, 0);
	};
	
	/* Color3 Green */
	Color3.Green = function() {
		return new Color3(0, 1, 0);
	};
	
	/* Color3 Blue */
	Color3.Blue = function() {
		return new Color3(0, 0, 1);
	};
	
	/* Color3 Purple */
	Color3.Purple = function() {
		return new Color3(1, 0, 1);
	};
	
	/* Return Color3 */
	OpenEngine.Color3 = Color3;
	
}