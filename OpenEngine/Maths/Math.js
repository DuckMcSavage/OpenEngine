/* Maths Class */

{
	
	/* Class Maths */
	const Maths = {};
	
	Maths.PI = Math.PI;
	
	Maths.ToRadians = function(a) {
		return a * Maths.PI / 180;
	};
	Maths.ToDegrees = function(a) {
		return a / 180 * Maths.PI;
	};
	
	/* Return Math */
	OpenEngine.Maths = Maths;
	
}