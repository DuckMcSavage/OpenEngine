import Mesh from './Mesh.js';

import Vector2 from '../Maths/Vector2.js';
import Vector3 from '../Maths/Vector3.js';

/* Class Sphere */
const Sphere = function() {
	let Sphere = new Mesh();
	
	// Generate Sphere Geometry

	Sphere.geometry.UpdateGeometry();
	
	return Sphere;
};

/* Return Sphere */
export default Sphere;