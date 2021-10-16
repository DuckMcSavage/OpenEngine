/* Engine Class */

{
	
	/* Class Engine */
	const Engine = function(canvas) {
		/* Check if canvas exists */
		if(!canvas) {
			console.error("A canvas element is required for setting up an engine!");
			return;
		};

		/* Set Active Engine */
		OpenEngine.SetActiveEngine(this);
		
		/* Canvas, and GL context */
		this.canvas = canvas;
		this.gl = canvas.getContext("webgl");
		
		/* If engine is active, and has been initialized */
		this.active = true;
		this.init = false;
		
		/* Engine Data */
		this.initTime = null;
		this.tick = 0; // Times rendered
		this.lastRender = performance.now();
		this.computeTime = 0;
		this.deltaTime = 0;
		this.fps = 0;
		
		/* RenderData */
		this.Camera = new OpenEngine.Camera(this);
		this.Sky = new OpenEngine.Sky();
		this.Meshes = [];
		
		/* After everythings setup, initialize the engine */
		if(this.initialize()) {
			return this;
		} else {
			return null;
		}
		
	};
	
	/* Engine Initialization Function */
	Engine.prototype.initialize = function() {
		/* Setup Shader Program */
		this.createShaderProgram();
		
		/* Resize Canvas Element */
		this.resize();
		
		/* Init */
		if(this.gl) {
			this.initTime = Date.now();
			this.init = true;
			
			console.log("[OpenEngine]: Engine successfully loaded! (v" + OpenEngine.version + ")");
			
			return true;
		}
		
		console.log("[OpenEngine]: Failed to construct engine.  WEBGL context may not be supported by ur browser.");
		
		return false;
	};
	
	/* Engine Setup Shader Program */
	Engine.prototype.createShaderProgram = function() {
		let shaderProgram = this.gl.createProgram();
		this.gl.attachShader(shaderProgram, this.loadShader(this.gl.VERTEX_SHADER, OpenEngine.Source.vsSource));
		this.gl.attachShader(shaderProgram, this.loadShader(this.gl.FRAGMENT_SHADER, OpenEngine.Source.fsSource));
		this.gl.linkProgram(shaderProgram);

		// Error handling
		if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
			alert("Unable to initialize the shader program: " + this.gl.getProgramInfoLog(shaderProgram));
			return;
		}
		
		this.programInfo = {
			program: shaderProgram,
			attribLocations: {
				vertexPosition: this.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
				vertexColor: this.gl.getAttribLocation(shaderProgram, 'aVertexColor'),
			},
			uniformLocations: {
				projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
				modelViewMatrix: this.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
			}
		};
	};
	
	/* Engine Shader Loader */
	Engine.prototype.loadShader = function(type, source) {
		let Shader = this.gl.createShader(type);

		this.gl.shaderSource(Shader, source);
		this.gl.compileShader(Shader);

		// Error handling
		if (!this.gl.getShaderParameter(Shader, this.gl.COMPILE_STATUS)) {
			alert("An error occurred compiling the shaders: " + this.gl.getShaderInfoLog(Shader));
			this.gl.deleteShader(Shader);
			return;
		}

		return Shader;
	};
	
	/* Engine Mesh Builder Constructor */
	Engine.prototype.AddMesh = function(Mesh) {
	    Mesh.geometry.UpdateGeometry(Mesh.color);
		
		this.Meshes.push(Mesh);
	};
	
	/* Engine Render Function */
	Engine.prototype.render = function() {
		if(!this.active || !this.init) {return;}
		
		let now = performance.now();
		this.deltaTime = now - this.lastRender;
		this.fps = 1000 / this.deltaTime;
		
		/* Clear Engine Background (Sky) Color, Set color, Set Depth Testing */
		this.gl.clearColor(this.Sky.skyColor.r, this.Sky.skyColor.g, this.Sky.skyColor.b, this.Sky.skyColor.a);
		this.gl.clearDepth(1.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);
		
		/* Use Camera For Engine Projection */
		if(this.Camera.Matrix4.needsUpdated || this.Camera.CheckNeedsMatrixUpdate()) {
			this.Camera.Matrix4.ClearMatrix();
			this.Camera.Matrix4.SetMatrixPerspective(this.Camera.fov, this.Camera.aspect, this.Camera.near, this.Camera.far);
			this.Camera.Matrix4.SetMatrixPosition(this.Camera.position);
			this.Camera.Matrix4.SetMatrixRotation(this.Camera.rotation);
			
			this.Camera.Matrix4.needsUpdated = false;
		}

		/* Render SkyBox */
		this.RenderMesh(this.Sky.SkyBox.pz);

		/* Render All Meshes Added In Engine */
		for(let i = 0; i < this.Meshes.length; i++) {
			this.RenderMesh(this.Meshes[i]);
		}
		
		/* Performance Information */
		this.computeTime = performance.now() - now;
		this.lastRender = now;
		
		/* Increment Tick Counter */
		this.tick++;
	};

	/* Engine Render Mesh */
	Engine.prototype.RenderMesh = function(Mesh, matrix) {
	    /* Mesh Position/Scale/Rotation */
        if(Mesh.Matrix4.needsUpdated || Mesh.CheckNeedsMatrixUpdate()) {
            Mesh.Matrix4.ClearMatrix();
            Mesh.Matrix4.SetMatrixPosition(Mesh.position);
            Mesh.Matrix4.SetMatrixScale(Mesh.scale);
            Mesh.Matrix4.SetMatrixRotation(Mesh.rotation);

            Mesh._position = Mesh.position.clone();
            Mesh._scale = Mesh.scale.clone();
            Mesh._rotation = Mesh.rotation.clone();

            Mesh.Matrix4.needsUpdated = false;
        }

        /* Set Positions For Mesh */
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, Mesh.geometry.GetBufferPositions());
        this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);

        /* Set Color For Mesh */
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, Mesh.geometry.GetBufferColors());
        this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexColor, 4, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexColor);

        /* Set Indicies For Mesh */
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, Mesh.geometry.GetBufferIndex());

        /* Tell WebGL To Use Active Engine Program */
        this.gl.useProgram(this.programInfo.program);

        /* Set the shader uniforms */
        this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.projectionMatrix, false, (matrix || this.Camera.Matrix4.matrix));
        this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.modelViewMatrix, false, Mesh.Matrix4.matrix);

        /* Render Mesh */
        this.gl.drawElements(this.gl.TRIANGLES, Mesh.geometry.indices.length, this.gl.UNSIGNED_SHORT, 0);
	};
	
	/* Engine Resize Function */
	Engine.prototype.resize = function() {
		this.canvas.width = this.canvas.getBoundingClientRect().width;
		this.canvas.height = this.canvas.getBoundingClientRect().height;
		
		this.Camera.aspect = this.canvas.width / this.canvas.height;
		this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
	};
	
	/* Get Engine Canvas */
	Engine.prototype.GetCanvas = function() {
		return this.canvas;
	};
	
	/* Get Engine Active GL Context */
	Engine.prototype.GetActiveGLContext = function() {
		return this.gl;
	};
	
	/* Get Engine DeltaTime */
	Engine.prototype.GetDeltaTime = function() {
		return this.deltaTime;
	};
	
	/* Get Engine Fps */
	Engine.prototype.GetFps = function() {
		return this.fps;
	};
	
	/* Return Engine */
	OpenEngine.Engine = Engine;
	
}