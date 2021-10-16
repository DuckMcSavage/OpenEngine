/* Mesh Class > extends Geometry, Vector */

{
	
	/* Class Mesh */
	const Mesh = function() {
		this.geometry = new OpenEngine.Geometry();
		this.color = new OpenEngine.Color4.White();
		
		this.position = new OpenEngine.Vector3.Zero();
		this.scale = new OpenEngine.Vector3.One();
		this.rotation = new OpenEngine.Vector3.Zero();
		
		this._position = this.position.clone();
		this._scale = this.scale.clone();
		this._rotation = this.rotation.clone();
		
		this.Matrix4 = new OpenEngine.Matrix4();

		this.geometry.UpdateGeometry(this.color);

		return this;
	};
	
	/* Check If Mesh Needs Matrix Update */
	Mesh.prototype.CheckNeedsMatrixUpdate = function() {
		return(!this.position.compare(this._position) || !this.scale.compare(this._scale) || !this.rotation.compare(this._rotation));
	};
	
	/* Return Mesh */
	OpenEngine.Mesh = Mesh;
	
}