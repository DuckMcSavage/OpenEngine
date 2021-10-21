import vsSource from './ShaderSource/vertex.js';
import fsSource from './ShaderSource/fragment.js';

/* Class Source */
const Source = {};

/* Default Vertex Shader Program */
Source.vsSource = vsSource;

/* Default Fragment Shader Program */
Source.fsSource = fsSource;

/* Shader Creator */
Source.createShaderProgram = function(gl, vsSource, fsSource, shaderName) {
	let shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, Source.loadShaderProgram(gl, gl.VERTEX_SHADER, vsSource));
	gl.attachShader(shaderProgram, Source.loadShaderProgram(gl, gl.FRAGMENT_SHADER, fsSource));
	gl.linkProgram(shaderProgram);

	// Error handling
	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram));
		
		return null;
	}
	
	return Source.getShaderProgram(gl, shaderProgram, shaderName);
};

/* Shader Loader */
Source.loadShaderProgram = function(gl, type, source) {
	let Shader = gl.createShader(type);

	gl.shaderSource(Shader, source);
	gl.compileShader(Shader);

	// Error handling
	if (!gl.getShaderParameter(Shader, gl.COMPILE_STATUS)) {
		alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(Shader));
		gl.deleteShader(Shader);
		
		return null;
	}

	return Shader;
};

/* Get Shader Program */
Source.getShaderProgram = function(gl, shaderProgram, shaderName) {
	let attribLocations = {};
	let uniformLocations = {};
	
	if(shaderName == 1) {
		/* Default Shader */

		// Data
		attribLocations.textureCoords = gl.getAttribLocation(shaderProgram, 'aTextureCoords');
		attribLocations.vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
		attribLocations.vertexNormal = gl.getAttribLocation(shaderProgram, 'aVertexNormal');
		attribLocations.vertexColor = gl.getAttribLocation(shaderProgram, 'aVertexColor');

        // Textures
        uniformLocations.useTexture = gl.getUniformLocation(shaderProgram, 'uUseTexture');
        uniformLocations.textureSampler = gl.getUniformLocation(shaderProgram, 'uTextureSampler');

        // Engine Lighting
		uniformLocations.ambientLight = gl.getUniformLocation(shaderProgram, 'uAmbientLight');
		uniformLocations.ambientColor = gl.getUniformLocation(shaderProgram, 'uAmbientColor');

		// Lighting Per Mesh
		uniformLocations.lightsEnabled = gl.getUniformLocation(shaderProgram, 'uLightsEnabled');

        // Matrix's
		uniformLocations.worldMatrix = gl.getUniformLocation(shaderProgram, 'uWorldMatrix');
		uniformLocations.projectionMatrix = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
		uniformLocations.modelViewMatrix = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');
		uniformLocations.normalMatrix = gl.getUniformLocation(shaderProgram, 'uNormalMatrix');

        // Directional Lights
		uniformLocations.numbDirectionalLights = gl.getUniformLocation(shaderProgram, 'uNumbDirectionalLights');
		uniformLocations.directionalLights = gl.getUniformLocation(shaderProgram, 'uDirectionalLights');
		uniformLocations.directionalLightColors = gl.getUniformLocation(shaderProgram, 'uDirectionalLightColors');
		uniformLocations.directionalLightIntensities = gl.getUniformLocation(shaderProgram, 'uDirectionalLightIntensities');

        // Point Lights
		uniformLocations.numbPointLights = gl.getUniformLocation(shaderProgram, 'uNumbPointLights');
		uniformLocations.pointLights = gl.getUniformLocation(shaderProgram, 'uPointLights');
		uniformLocations.pointLightColors = gl.getUniformLocation(shaderProgram, 'uPointLightColors');
		uniformLocations.pointLightRanges = gl.getUniformLocation(shaderProgram, 'uPointLightRanges');
		uniformLocations.pointLightIntensities = gl.getUniformLocation(shaderProgram, 'uPointLightIntensities');
	}
	
	return {
		program: shaderProgram,
		attribLocations: attribLocations,
		uniformLocations: uniformLocations
	};
};


/* Return Source */
export default Source;