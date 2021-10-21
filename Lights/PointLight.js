import Light from './Light.js';
import Color3 from '../Materials/Color3.js';
import Color4 from '../Materials/Color3.js';
import Vector3 from '../Maths/Vector3.js';

/* Class Point */
const Point = function(engine) {
	let Point = new Light(engine);
	
	Point._isPointLight = true;
	
	Point.position = new Vector3.Zero();
	Point.range = 500;

	return Point;
};

/* Return Point */
export default Point;