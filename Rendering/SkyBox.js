/* Class SkyBox */
const SkyBox = function(engine) {
	this._engine = engine;
	this._isSkyBox = true;
	
	this.enabled = true;
	this.size = 100;
	
	this.px = new OpenEngine.Mesh.PlaneMesh();
	this.px.scale = new OpenEngine.Vector3(this.size, this.size, this.size);
	this.px.rotation.y = Math.PI/2;
	
	this.nx = new OpenEngine.Mesh.PlaneMesh();
	this.nx.scale = new OpenEngine.Vector3(this.size, this.size, this.size);
	this.nx.rotation.y = -Math.PI/2;
	
	this.py = new OpenEngine.Mesh.PlaneMesh();
	this.py.scale = new OpenEngine.Vector3(this.size, this.size, this.size);
	this.py.rotation.x = Math.PI/2;
	
	this.ny = new OpenEngine.Mesh.PlaneMesh();
	this.ny.scale = new OpenEngine.Vector3(this.size, this.size, this.size);
	this.ny.rotation.x = -Math.PI/2;

	this.pz = new OpenEngine.Mesh.PlaneMesh();
	this.pz.scale = new OpenEngine.Vector3(this.size, this.size, this.size);
	
	this.nz = new OpenEngine.Mesh.PlaneMesh();
	this.nz.scale = new OpenEngine.Vector3(this.size, this.size, this.size);
	this.nz.rotation.y = Math.PI;

	return this;
};

/* Update SkyBox Positions */
SkyBox.prototype.UpdatePositions = function(Origin) {
	this.px.position.set((Origin.position.x + (this.size/2)), Origin.position.y, Origin.position.z);
	this.nx.position.set((Origin.position.x - (this.size/2)), Origin.position.y, Origin.position.z);
	this.py.position.set(Origin.position.x, (Origin.position.y + (this.size/2)), Origin.position.z);
	this.ny.position.set(Origin.position.x, (Origin.position.y - (this.size/2)), Origin.position.z);
	this.pz.position.set(Origin.position.x, Origin.position.y, (Origin.position.z - (this.size/2)));
	this.nz.position.set(Origin.position.x, Origin.position.y, (Origin.position.z + (this.size/2)));
};

/* Render SkyBox */
SkyBox.prototype.RenderSkyBox = function() {
	this.UpdatePositions(this._engine.GetActiveCamera());
		
	this._engine.RenderMesh(this.px);
	this._engine.RenderMesh(this.nx);
	this._engine.RenderMesh(this.py);
	this._engine.RenderMesh(this.ny);
	this._engine.RenderMesh(this.pz);
	this._engine.RenderMesh(this.nz);
};

/* Get SkyBox Enabled */
SkyBox.prototype.IsEnabled = function() {
	return this.enabled;
};

/* Return SkyBox */
export default SkyBox;