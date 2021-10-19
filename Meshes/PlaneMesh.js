import Mesh from './Mesh.js';

/* Class PlaneMesh */
const Plane = function(engine) {
	let Plane = new Mesh(engine);

	// Setup Cube Geometry
	Plane.geometry.positions = [
		-1.0, -1.0,  0.0,
		 1.0, -1.0,  0.0,
		 1.0,  1.0,  0.0,
		-1.0,  1.0,  0.0
	];
	
	Plane.geometry.normals = [
		0.0,  0.0,  1.0,
		0.0,  0.0,  1.0,
		0.0,  0.0,  1.0,
		0.0,  0.0,  1.0
	];
	
	Plane.geometry.indices = [
		0, 1, 2, 0, 2, 3
	];
	
	Plane.geometry.texCoords = [
		0.0,  0.0,
		1.0,  0.0,
		1.0,  1.0,
		0.0,  1.0
	];

	Plane.geometry.UpdateGeometry();

	return Plane;
};

/* Return PlaneMesh */
export default Plane;