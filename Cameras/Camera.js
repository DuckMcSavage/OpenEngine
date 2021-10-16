/* Camera Class */

{
	
	/* Class Camera */
	const Camera = function(engine) {
		this.position = new OpenEngine.Vector3.Zero();
		this.rotation = new OpenEngine.Vector3.Zero();
		
		this._position = this.position.clone();
		this._rotation = this.rotation.clone();
		
		this.fov = OpenEngine.Maths.ToRadians(45);
		this.aspect = 0;
		this.near = 0.1;
		this.far = 100;
		
		this.Matrix4 = new OpenEngine.Matrix4();
		this._engine = engine;
		
		return this;
	};
	
	/* Check If Camera Needs Matrix Update */
	Camera.prototype.CheckNeedsMatrixUpdate = function() {
		return(!this.position.compare(this._position) || !this.rotation.compare(this._rotation));
	};
	
	/* Set Active Engine */
	Camera.prototype.setEngine = function(engine) {
		this._engine = engine;
		return this._engine;
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
	Camera.prototype.setFov = function(a) {
		this.near = a;
		return this.near;
	};
	
	/* Set Camera Far */
	Camera.prototype.setFov = function(a) {
		this.far = a;
		return this.far;
	};
	
	/* Get Active Engine */
	Camera.prototype.getEngine = function() {
		return this._engine;
	};
	
	/* Return Camera */
	OpenEngine.Camera = Camera;
	
}