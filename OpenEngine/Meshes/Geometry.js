/* Geometry Class */

{
	
	/* Class Geometry */
	const Geometry = function() {
		/* Geometry Data */
		this.positions = [];
		this.indices = [];
		this.color = [];
		
		/* Buffer Data */
		this.buffers = {};
		this.buffers.positions = [];
		this.buffers.indices = [];
		this.buffers.colors = [];
		
		return this;
	};

	/* Update All Geometry */
	Geometry.prototype.UpdateGeometry = function(color) {
	    this.SetBufferPositions();
		this.SetBufferIndex();

		if(color) {
		    this.SetBufferColors(color);
		}
	};
	
	/* Set Buffer Vertex Positions */
	Geometry.prototype.SetBufferPositions = function() {
		this.buffers.positions = OpenEngine.GetActiveEngine().GetActiveGLContext().createBuffer();
		OpenEngine.GetActiveEngine().GetActiveGLContext().bindBuffer(OpenEngine.GetActiveEngine().GetActiveGLContext().ARRAY_BUFFER, this.buffers.positions);
		OpenEngine.GetActiveEngine().GetActiveGLContext().bufferData(OpenEngine.GetActiveEngine().GetActiveGLContext().ARRAY_BUFFER, new Float32Array(this.positions), OpenEngine.GetActiveEngine().GetActiveGLContext().STATIC_DRAW);
		
		return this.buffers.positions;
	};
	
	/* Set Buffer Color */
	Geometry.prototype.SetBufferColors = function(c1) {
		if(c1._isColor3 || c1._isColor4) {
		    for (var j = 0; j < this.indices.length; ++j) {
                this.color = this.color.concat(c1.r, c1.g, c1.b, 1);
            }
		} else if(c1._isColorGradient) {
		    for (var j = 0; j < this.indices.length; ++j) {
                let color = c1.colors[j % c1.colors.length] || c1.colors[0];
                this.color = this.color.concat(color.r, color.g, color.b, 1);
            }
		} else {
		    console.log("[OpenEngine]: Error, color type not recognized for Mesh!")
		}
		
		this.buffers.colors = OpenEngine.GetActiveEngine().GetActiveGLContext().createBuffer();
		OpenEngine.GetActiveEngine().GetActiveGLContext().bindBuffer(OpenEngine.GetActiveEngine().GetActiveGLContext().ARRAY_BUFFER, this.buffers.colors);
		OpenEngine.GetActiveEngine().GetActiveGLContext().bufferData(OpenEngine.GetActiveEngine().GetActiveGLContext().ARRAY_BUFFER, new Float32Array(this.color), OpenEngine.GetActiveEngine().GetActiveGLContext().STATIC_DRAW);
		
		return this.buffers.colors;
	};
	
	/* Set Buffer Index */
	Geometry.prototype.SetBufferIndex = function() {
		this.buffers.indices = OpenEngine.GetActiveEngine().GetActiveGLContext().createBuffer();
		OpenEngine.GetActiveEngine().GetActiveGLContext().bindBuffer(OpenEngine.GetActiveEngine().GetActiveGLContext().ELEMENT_ARRAY_BUFFER, this.buffers.indices);
		OpenEngine.GetActiveEngine().GetActiveGLContext().bufferData(OpenEngine.GetActiveEngine().GetActiveGLContext().ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), OpenEngine.GetActiveEngine().GetActiveGLContext().STATIC_DRAW);
		
		return this.buffers.indices;
	};
	
	/* Get Buffer Positions */
	Geometry.prototype.GetBufferPositions = function() {
		return this.buffers.positions;
	};
	
	/* Get Buffer Colors */
	Geometry.prototype.GetBufferColors = function() {
		return this.buffers.colors;
	};
	
	/* Get Buffer Index */
	Geometry.prototype.GetBufferIndex = function() {
		return this.buffers.indices;
	};
	
	/* Return Geometry */
	OpenEngine.Geometry = Geometry;
	
}