/* Maths Class */
const Maths = {};

Maths.PI = Math.PI;

/* Turn Degrees Into Radians */
Maths.ToRadians = function(a) {
	return a * Maths.PI / 180;
};

/* Turn Radians Into Degrees */
Maths.ToDegrees = function(a) {
	return a / 180 * Maths.PI;
};

/* Check If Int Is Of A Power Of 2 ex (2,4,6)..etc */
Maths.IsPowerOf2 = function(a) {
	return (a & (a - 1)) == 0;
};

/* Return Math */
export default Maths;