import OpenEngine from '../OpenEngine.max.js';

/* Class Camera */
const Camera = function(engine) {
	/* Engine Camera Belongs To */
	this._engine = engine;
	this._isCamera = true;
	
	this.position = new OpenEngine.Vector3.Zero();
	this.rotation = new OpenEngine.Vector3.Zero();
	
	this._position = this.position.clone();
	this._rotation = this.rotation.clone();
	
	this.fov = OpenEngine.Maths.ToRadians(45);
	this.aspect = 0;
	this.near = 0.1;
	this.far = 1000;
	
	this.Matrix4 = new OpenEngine.Matrix4();
	
	return this;
};

/* Check If Camera Needs Matrix Update */
Camera.prototype.CheckNeedsMatrixUpdate = function() {
	return(!this.position.compare(this._position) || !this.rotation.compare(this._rotation));
};

/* Render Camera (set world position,rotation,and set perspective) */
Camera.prototype.RenderCamera = function(WorldMatrix) {
	this.Matrix4.ClearMatrix();
	this.Matrix4.SetMatrixPerspective(this.fov, this.aspect, this.near, this.far);
	WorldMatrix.SetMatrixPosition(this.position);
	this.Matrix4.SetMatrixRotation(this.rotation);
	
	this.Matrix4.needsUpdated = false;
};

/* Set Camera Fov */
Camera.prototype.setFov = function(a) {
	this.fov = a;
	return this.fov;
};

/* Set Camera Fov From Degrees */
Camera.prototype.setFovFromDegrees = function(a) {
	this.fov = OpenEngine.Maths.ToRadians(a);
	return this.fov;
};

/* Set Camera Aspect Ratio */
Camera.prototype.setAspectRatio = function(a) {
	this.aspect = a;
	return this.aspect;
};

/* Set Camera Near */
Camera.prototype.setNear = function(a) {
	this.near = a;
	return this.near;
};

/* Set Camera Far */
Camera.prototype.setFar = function(a) {
	this.far = a;
	return this.far;
};

/* Get Active Engine */
Camera.prototype.getEngine = function() {
	return this._engine;
};

/* Return Camera */
export default Camera;