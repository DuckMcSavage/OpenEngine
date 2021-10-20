import Matrix4 from '../Maths/Matrix4.js';

/* Class Geometry */
const Geometry = function(mesh, engine) {
	/* Mesh/Engine Geometry Belongs To */
	this._mesh = mesh;
	this._engine = engine;
	this._isGeometry = true;
	
	/* Geometry Data */
	this.positions = [];
	this.normals = [];
	this.indices = [];
	this.texCoords = [];
	
	this.normalsMatrix = new Matrix4();
	
	/* Buffer Data */
	this.buffers = {};
	this.buffers.positions = [];
	this.buffers.normals = [];
	this.buffers.indices = [];
	this.buffers.texCoords = [];
	
	return this;
};

/* Update All Geometry */
Geometry.prototype.UpdateGeometry = function(init) {
	if(init) {
		// Apply Correct Scale To Positions ON INIT
		for(let i = 0; i < this.positions.length; i+=3) {
			this.positions[i] *= this._mesh._scale.x/2;
			this.positions[i+1] *= this._mesh._scale.y/2;
			this.positions[i+2] *= this._mesh._scale.z/2;
		}
	}
	this.SetBufferPositions();
	this.SetBufferNormals();
	this.SetBufferIndex();
	this.SetBufferTextureCoords();
};

/* Set Buffer Vertex Positions */
Geometry.prototype.SetBufferPositions = function() {
	// Apply Correct Scale To Positions
	for(let i = 0; i < this.positions.length; i+=3) {
		this.positions[i] /= this._mesh._scale.x/2;
		this.positions[i+1] /= this._mesh._scale.y/2;
		this.positions[i+2] /= this._mesh._scale.z/2;
		
		this.positions[i] *= this._mesh.scale.x/2;
		this.positions[i+1] *= this._mesh.scale.y/2;
		this.positions[i+2] *= this._mesh.scale.z/2;
	}
	
	this.buffers.positions = this._engine.GetActiveGLContext().createBuffer();
	this._engine.GetActiveGLContext().bindBuffer(this._engine.GetActiveGLContext().ARRAY_BUFFER, this.buffers.positions);
	this._engine.GetActiveGLContext().bufferData(this._engine.GetActiveGLContext().ARRAY_BUFFER, new Float32Array(this.positions), this._engine.GetActiveGLContext().STATIC_DRAW);
	
	/* If Positions Update, Update Color Positions Aswell */
	this._mesh.material.SetBufferColors();
	
	return this.buffers.positions;
};

/* Set Buffer Normals */
Geometry.prototype.SetBufferNormals = function() {
	this.buffers.normals = this._engine.GetActiveGLContext().createBuffer();
	this._engine.GetActiveGLContext().bindBuffer(this._engine.GetActiveGLContext().ARRAY_BUFFER, this.buffers.normals);
	this._engine.GetActiveGLContext().bufferData(this._engine.GetActiveGLContext().ARRAY_BUFFER, new Float32Array(this.normals), this._engine.GetActiveGLContext().STATIC_DRAW);
	
	this.SetNormalsMatrix();
	
	return this.buffers.normals;
};

/* Set Normals Matrix */
Geometry.prototype.SetNormalsMatrix = function() {
	mat4.invert(this.normalsMatrix.matrix, this._mesh.Matrix4.matrix);
	mat4.transpose(this.normalsMatrix.matrix, this.normalsMatrix.matrix);
	
	return this.normalsMatrix.matrix;
};

/* Set Buffer Index */
Geometry.prototype.SetBufferIndex = function() {
	this.buffers.indices = this._engine.GetActiveGLContext().createBuffer();
	this._engine.GetActiveGLContext().bindBuffer(this._engine.GetActiveGLContext().ELEMENT_ARRAY_BUFFER, this.buffers.indices);
	this._engine.GetActiveGLContext().bufferData(this._engine.GetActiveGLContext().ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this._engine.GetActiveGLContext().STATIC_DRAW);
	
	return this.buffers.indices;
};

/* Set Buffer Texture */
Geometry.prototype.SetBufferTextureCoords = function() {
	this.buffers.texCoords = this._engine.GetActiveGLContext().createBuffer();
	this._engine.GetActiveGLContext().bindBuffer(this._engine.GetActiveGLContext().ARRAY_BUFFER, this.buffers.texCoords);
	this._engine.GetActiveGLContext().bufferData(this._engine.GetActiveGLContext().ARRAY_BUFFER, new Float32Array(this.texCoords), this._engine.GetActiveGLContext().STATIC_DRAW);

	return this.buffers.texCoords;
};

/* Get Buffer Positions */
Geometry.prototype.GetBufferPositions = function() {
	return this.buffers.positions;
};

/* Get Buffer Normals */
Geometry.prototype.GetBufferNormals = function() {
	return this.buffers.normals;
};

/* Get Normals Matrix */
Geometry.prototype.GetNormalsMatrix = function() {
	return this.normalsMatrix.matrix;
};

/* Get Buffer Index */
Geometry.prototype.GetBufferIndex = function() {
	return this.buffers.indices;
};

/* Get Buffer Texture */
Geometry.prototype.GetBufferTextureCoords = function() {
	return this.buffers.texCoords;
};

/* Return Geometry */
export default Geometry;