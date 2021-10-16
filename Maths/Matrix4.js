/* Matrix4 Class */

{
	
	/* Class Matrix4 */
	const Matrix4 = function() {
		this.matrix = mat4.create();
		this.needsUpdated = true;
		
		return this;
	};
	
	/* Clear Matrix4 */
	Matrix4.prototype.ClearMatrix = function(matrix) {
		this.matrix = mat4.create();
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
		mat4.translate(this.matrix, this.matrix, [v1.x, v1.y, v1.z]);
		this.needsUpdated = true;
		return this.matrix;
	};
	
	/* Set Matrix Scale */
	Matrix4.prototype.SetMatrixScale = function(v1) {
		mat4.scale(this.matrix, this.matrix, [v1.x, v1.y, v1.z]);
		this.needsUpdated = true;
		return this.matrix;
	};
	
	/* Set Matrix4 Rotation */
	Matrix4.prototype.SetMatrixRotation = function(v1) {
		mat4.rotate(this.matrix, this.matrix, v1.x, [1, 0, 0] );
		mat4.rotate(this.matrix, this.matrix, v1.y, [0, 1, 0] );
		mat4.rotate(this.matrix, this.matrix, v1.z, [0, 0, 1] );
		this.needsUpdated = true;
		return this.matrix;
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
	OpenEngine.Matrix4 = Matrix4;
	
}