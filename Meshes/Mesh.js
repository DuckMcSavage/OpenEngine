import Geometry from './Geometry.js';
import Material from '../Materials/Material.js';
import Vector3 from '../Maths/Vector3.js';
import Vector4 from '../Maths/Vector4.js';
import Matrix4 from '../Maths/Matrix4.js';

import Plane from './PlaneMesh.js';
import Cube from './CubeMesh.js';
import Sphere from './SphereMesh.js';

/* Class Mesh */
const Mesh = function(engine) {
	/* Engine Mesh Belongs To */
	this._engine = engine;
	this._isMesh = true;
	
	this.geometry = new Geometry(this, engine);
	this.material = new Material(this);
	
	this.position = new Vector3.Zero();
	this.scale = new Vector3.One();
	this.rotation = new Vector3.Zero();
	
	this._position = this.position.clone();
	this._scale = this.scale.clone();
	this._rotation = this.rotation.clone();
	
	this.Matrix4 = new Matrix4();
	
	return this;
};

/* Check If Mesh Needs Matrix Update */
Mesh.prototype.CheckNeedsMatrixUpdate = function() {
	return(!this.position.compare(this._position) || !this.scale.compare(this._scale) || !this.rotation.compare(this._rotation));
};

/* Set MeshType Classes */
Mesh.Plane = Plane;
Mesh.Cube = Cube;
Mesh.Sphere = Sphere;

/* Return Mesh */
export default Mesh;