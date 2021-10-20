import Light from './Light.js';
import Color3 from '../Materials/Color3.js';
import Color4 from '../Materials/Color3.js';
import Vector3 from '../Maths/Vector3.js';

/* Class Directional */
const Directional = function(engine) {
	let Directional = new Light(engine);
	
	Directional._isDirectionalLight = true;
	
	Directional.direction = new Vector3.One();

	return Directional;
};

/* Return Directional */
export default Directional;