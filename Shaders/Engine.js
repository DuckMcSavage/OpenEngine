import OpenEngine from '../OpenEngine.max.js';
/* Class Engine */

const Engine = function(canvas) {
	/* Check if canvas exists */
	if(!canvas) {
		console.error("A canvas element is required for setting up an engine!");
		return;
	};

	/* Set Active Engine */
	OpenEngine.setActiveEngine(this);
	
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
	this.WorldMatrix = new OpenEngine.Matrix4();
	this.Camera = new OpenEngine.Camera(this);
	this.Sky = new OpenEngine.Sky();
	this.Meshes = [];
	this.Lights = [];
	this.LightsData = [];
	
	this.ambientLevel = 0;
	this.ambientColor = new OpenEngine.Color3(1, 1, 1);
	
	/* Engine Values */
	Engine.DEFAULT_SHADER = 1;
	Engine.TEXTURE_SHADER = 2;
	
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
	this.shaderProgram = OpenEngine.Shaders.createShaderProgram(this.getActiveGLContext(), OpenEngine.Shaders.vsSource, OpenEngine.Shaders.fsSource, Engine.DEFAULT_SHADER);
	
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

/* Engine Mesh Builder Constructor */
Engine.prototype.Add = function(Item) {
	if(Item._isMesh) {
		this.Meshes.push(Item);
	} else if(Item._isLight) {
		this.Lights.push(Item);
	}
};

/* Engine Render Function */
Engine.prototype.render = function() {
	if(!this.active || !this.init) {return;}
	
	let now = performance.now();
	this.deltaTime = now - this.lastRender;
	this.fps = 1000 / this.deltaTime;

    /* Before Rendering Starts Make Sure Canvas Is Set To The Correct Size */
	if(this.canvas.width != this.canvas.getBoundingClientRect().width || this.canvas.height != this.canvas.getBoundingClientRect().height) {
        this.resize();
	}
	
	/* Clear Engine Background (Sky) Color, Set color, Set Depth Testing */
	this.gl.clearColor(this.Sky.skyColor.r, this.Sky.skyColor.g, this.Sky.skyColor.b, this.Sky.skyColor.a);
	this.gl.clearDepth(1);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.depthFunc(this.gl.LEQUAL);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);
	
	/* Use Camera For Engine Projection */
	this.Camera.RenderCamera(this.WorldMatrix);

	/* Render SkyBox (if exists) */
	if(this.Sky.SkyBox && this.Sky.SkyBox.enabled) {
		this.Sky.SkyBox.RenderSkyBox();
	}

	/* Use Shader For Lights & Meshes */
	this.gl.useProgram(this.shaderProgram.program);

	/* Set All Lights Added In Engine */
	this.SetEngineLights();
	
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

/* Engine Render Light */
Engine.prototype.SetEngineLights = function() {
	this.LightsData.DirectionalLights = [];
	this.LightsData.DirectionalLightColors = [];
	this.LightsData.DirectionalLightIntensities = [];

	this.LightsData.PointLights = [];
	this.LightsData.PointLightColors = [];
	this.LightsData.PointLightRanges = [];
	this.LightsData.PointLightIntensities = [];

	for(let i = 0; i < this.Lights.length; i++) {
	    if(!this.Lights[i].enabled) {continue;}

		if(this.Lights[i]._isDirectionalLight) {
			this.LightsData.DirectionalLights = this.LightsData.DirectionalLights.concat(this.Lights[i].direction.toArray());
			this.LightsData.DirectionalLightColors = this.LightsData.DirectionalLightColors.concat(this.Lights[i].color.toArray());
		    this.LightsData.DirectionalLightIntensities.push(this.Lights[i].intensity);
		} else if(this.Lights[i]._isPointLight) {
			this.LightsData.PointLights = this.LightsData.PointLights.concat(this.Lights[i].position.toArray());
			this.LightsData.PointLightColors = this.LightsData.PointLightColors.concat(this.Lights[i].color.toArray());
			this.LightsData.PointLightRanges.push(this.Lights[i].range);
			this.LightsData.PointLightIntensities.push(this.Lights[i].intensity);
		}
	}

	/* Set ALL Active Lights In Engine (all active lights effect mesh) (if any) */
    this.gl.uniform1i(this.shaderProgram.uniformLocations.numbDirectionalLights, this.LightsData.DirectionalLights.length);
    if(this.LightsData.DirectionalLights.length > 0) {
        this.gl.uniform3fv(this.shaderProgram.uniformLocations.directionalLights, this.LightsData.DirectionalLights);
        this.gl.uniform3fv(this.shaderProgram.uniformLocations.directionalLightColors, this.LightsData.DirectionalLightColors);
        this.gl.uniform1fv(this.shaderProgram.uniformLocations.directionalLightIntensities, this.LightsData.DirectionalLightIntensities);
    }

    /* Set ALL Active Lights In Engine (all active lights effect mesh) (if any) */
    this.gl.uniform1i(this.shaderProgram.uniformLocations.numbPointLights, this.LightsData.PointLights.length);
    if(this.LightsData.PointLights.length > 0) {
        this.gl.uniform3fv(this.shaderProgram.uniformLocations.pointLights, this.LightsData.PointLights);
        this.gl.uniform3fv(this.shaderProgram.uniformLocations.pointLightColors, this.LightsData.PointLightColors);
        this.gl.uniform1fv(this.shaderProgram.uniformLocations.pointLightRanges, this.LightsData.PointLightRanges);
        this.gl.uniform1fv(this.shaderProgram.uniformLocations.pointLightIntensities, this.LightsData.PointLightIntensities);
    }
};

/* Engine Render Mesh */
Engine.prototype.RenderMesh = function(Mesh, matrix) {
    if(!Mesh) {return console.error("[OpenEngine]: Mesh is null.");}
    if(!Mesh.geometry) {return console.error("[OpenEngine]: Mesh must include geometry.");}
    if(!Mesh.material) {return console.error("[OpenEngine]: Mesh must include material.");}

    /* Set Front/Back Face Culling For Mesh */
	if(Mesh.material.cullFrontFace || Mesh.material.cullBackFace) {
		this.gl.enable(this.gl.CULL_FACE);
		
		if(Mesh.material.cullFrontFace && !Mesh.material.cullBackFace) {
			this.gl.cullFace(this.gl.FRONT);
		} else if(!Mesh.material.cullFrontFace && Mesh.material.cullBackFace) {
			this.gl.cullFace(this.gl.BACK);
		} else {
			this.gl.cullFace(this.gl.FRONT_AND_BACK);
		}
	} else {
		this.gl.disable(this.gl.CULL_FACE);
	}
	
	/* Mesh Position/Scale/Rotation */
	if(Mesh.Matrix4.needsUpdated || Mesh.CheckNeedsMatrixUpdate()) {
		if(!Mesh.position.compare(Mesh._position) || Mesh.Matrix4.needsUpdated) {
			Mesh.Matrix4.SetMatrixPosition(Mesh.position.inverseByInt(0, 0, 1));
			Mesh._position = Mesh.position.clone();
		}
		if(!Mesh.scale.compare(Mesh._scale) || Mesh.Matrix4.needsUpdated) {
			Mesh.geometry.SetBufferPositions();
			Mesh._scale = Mesh.scale.clone();
		}
		if(!Mesh.rotation.compare(Mesh._rotation) || Mesh.Matrix4.needsUpdated) {
			Mesh.Matrix4.SetMatrixRotation(Mesh.rotation);
			Mesh._rotation = Mesh.rotation.clone();
		}

		Mesh.Matrix4.needsUpdated = false;
	}
	if(Mesh.material.CheckNeedsUpdate()) {
		Mesh.material.SetBufferColors();
		
		Mesh.material._color = Mesh.material.color.clone();
	}

    /* Set Color For Mesh */
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, Mesh.material.GetBufferColor());
    this.gl.vertexAttribPointer(this.shaderProgram.attribLocations.vertexColor, 4, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.shaderProgram.attribLocations.vertexColor);

    /* Set Texture For Mesh (if exists) */
    this.gl.uniform1i(this.shaderProgram.uniformLocations.useTexture, Mesh.material.texture ? true : false);
	if(Mesh.material.texture) {
		/* Set Texture For Mesh */
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, Mesh.geometry.GetBufferTextureCoords());
		this.gl.vertexAttribPointer(this.shaderProgram.attribLocations.textureCoords, 2, this.gl.FLOAT, false, 0, 0);
		this.gl.enableVertexAttribArray(this.shaderProgram.attribLocations.textureCoords);
		
		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D, Mesh.material.texture.texture);
		this.gl.uniform1i(this.shaderProgram.uniformLocations.uTextureSampler, 0);
	}

	/* Set Ambient Lighting For Mesh */
	this.gl.uniform3f(this.shaderProgram.uniformLocations.ambientLight, this.ambientLevel, this.ambientLevel, this.ambientLevel);

	/* Set Ambient Lighting For Mesh */
	this.gl.uniform3f(this.shaderProgram.uniformLocations.ambientColor, this.ambientColor.r, this.ambientColor.g, this.ambientColor.b);

    /* Tell Shaders To/or Not To Compile Lights */
    this.gl.uniform1i(this.shaderProgram.uniformLocations.lightsEnabled, Mesh.material.lightsEnabled);

    /* Set Positions For Mesh */
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, Mesh.geometry.GetBufferPositions());
    this.gl.vertexAttribPointer(this.shaderProgram.attribLocations.vertexPosition, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.shaderProgram.attribLocations.vertexPosition);

    /* Set Normals For Mesh */
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, Mesh.geometry.GetBufferNormals());
    this.gl.vertexAttribPointer(this.shaderProgram.attribLocations.vertexNormal, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.shaderProgram.attribLocations.vertexNormal);

    /* Set Indicies For Mesh */
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, Mesh.geometry.GetBufferIndex());

	/* Set the shader uniforms */
	this.gl.uniformMatrix4fv(this.shaderProgram.uniformLocations.worldMatrix, false, this.WorldMatrix.matrix);
	this.gl.uniformMatrix4fv(this.shaderProgram.uniformLocations.projectionMatrix, false, (matrix || this.Camera.Matrix4.matrix));
	this.gl.uniformMatrix4fv(this.shaderProgram.uniformLocations.modelViewMatrix, false, Mesh.Matrix4.matrix);
	this.gl.uniformMatrix4fv(this.shaderProgram.uniformLocations.normalMatrix, false, Mesh.geometry.SetNormalsMatrix());

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
Engine.prototype.getCanvas = function() {
	return this.canvas;
};

/* Get Engine Active GL Context */
Engine.prototype.getActiveGLContext = function() {
	return this.gl;
};

/* Get Engine Active Camera */
Engine.prototype.getActiveCamera = function() {
	return this.Camera;
};

/* Get Engine DeltaTime */
Engine.prototype.getDeltaTime = function() {
	return this.deltaTime;
};

/* Get Engine Fps */
Engine.prototype.getFps = function() {
	return this.fps;
};

/* Return Engine */
export default Engine;