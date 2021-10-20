import Vector3 from './Vector3.js';

/* Class Matrix4 */
const Matrix4 = function() {
	this.matrix = mat4.create();
	this.needsUpdated = true;
	
	this.matPos = new Vector3.Zero();
	this.matScale = new Vector3.One();
	this.matRot = new Vector3.Zero();
	
	return this;
};

/* Clear Matrix4 */
Matrix4.prototype.ClearMatrix = function(matrix) {
	this.matrix = mat4.create();
	this.matPos.set(0,0,0);
	this.matScale.set(1,1,1);
	this.matRot.set(0,0,0);
	this.needsUpdated = true;
	return this.matrix;
};

/* Set Matrix4 */
Matrix4.prototype.SetMatrix = function(matrix) {
	this.matrix = matrix;
	this.needsUpdated = true;
	return this.matrix;
};

/* Set Matrix4 Perspective */
Matrix4.prototype.SetMatrixPerspective = function(fov, aspect, zNear, zFar) {
	mat4.perspective(this.matrix, fov, aspect, zNear, zFar);
	this.needsUpdated = true;
	return this.matrix;
};

/* Set Matrix4 Position */
Matrix4.prototype.SetMatrixPosition = function(v1) {
	mat4.translate(this.matrix, this.matrix, [-this.matPos.x, -this.matPos.y, -this.matPos.z]);
	mat4.translate(this.matrix, this.matrix, [v1.x, v1.y, v1.z]);
	
	this.matPos.set(v1.x, v1.y, v1.z);
	this.needsUpdated = true;
	
	return this.matrix;
};

/* Set Matrix Scale */
Matrix4.prototype.SetMatrixScale = function(v1) {
	mat4.scale(this.matrix, this.matrix, [1/this.matScale.x, 1/this.matScale.y, 1/this.matScale.z]);
	mat4.scale(this.matrix, this.matrix, [v1.x, v1.y, v1.z]);
	
	this.matScale.set(v1.x, v1.y, v1.z);
	this.needsUpdated = true;
	
	return this.matrix;
};

/* Set Matrix4 Rotation */
Matrix4.prototype.SetMatrixRotation = function(v1) {
	mat4.rotateZ(this.matrix, this.matrix, -this.matRot.z);
	mat4.rotateY(this.matrix, this.matrix, -this.matRot.y);
	mat4.rotateX(this.matrix, this.matrix, -this.matRot.x);
	
	mat4.rotateX(this.matrix, this.matrix, v1.x);
	mat4.rotateY(this.matrix, this.matrix, v1.y);
	mat4.rotateZ(this.matrix, this.matrix, v1.z);
	
	this.matRot.set(v1.x, v1.y, v1.z);
	this.needsUpdated = true;
	
	return this.matrix;
};

/* Function Add Matrix4 */
Matrix4.prototype.addPosition = function(v1) {
	let addedMatrix = mat4.clone(this.matrix);
	mat4.translate(addedMatrix, addedMatrix, [v1.x, v1.y, v1.z]);
	return addedMatrix;
};

/* Get Matrix4 */
Matrix4.prototype.GetMatrix = function() {
	return this.matrix;
};

/* Create From Position, Rotation, and Perspective(optional) */
Matrix4.CreateFromData = function(v1, v2, fov, aspect, zNear, zFar) {
	let Matrix = new Matrix4();
	
	Matrix.SetMatrixPosition(v1);
	Matrix.SetMatrixRotation(v2);
	
	if(fov && aspect && zNear && zFar) {
		Matrix.SetMatrixPerspective(fov, aspect, zNear, zFar);
	}
	
	return Matrix;
};

/* Return Matrix4 */
export default Matrix4;