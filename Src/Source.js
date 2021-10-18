/* Class Source */
const Source = {};

/* Default Vertex Shader Program */
Source.vsSource = `
	const int MAX_LIGHTS = 10;
	attribute vec4 aVertexPosition;
	attribute vec3 aVertexNormal;
	attribute vec4 aVertexColor;
	
	uniform vec3 uAmbientLight;
	uniform vec3 uAmbientColor;
	uniform mat4 uNormalMatrix;
	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;
	uniform vec3 uLightDirections[MAX_LIGHTS];
	
	varying lowp vec4 vColor;
	varying highp vec3 vLighting;
	
	void main(void) {
		for(int i = 0; i < MAX_LIGHTS; i++) {
			highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
			highp float directional = max(dot(transformedNormal.xyz, normalize(uLightDirections[i])), 0.0);
			vLighting += directional;
		}
		vLighting = uAmbientLight + (uAmbientColor * vLighting);
		
		vColor = aVertexColor;
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
	}
`;
// http://voxelent.com/html/beginners-guide/chapter_6/ch6_Wall_LightArrays.html
/* Default Fragment Shader Program */
Source.fsSource = `
	varying lowp vec4 vColor;
	varying highp vec3 vLighting;
	
	void main(void) {
		gl_FragColor = vec4(vColor.rgb * vLighting, vColor.a);
	}
`;

/* Texture Vertex Shader Program */
Source.vsTextureSource = `
	attribute vec4 aVertexPosition;
	attribute vec3 aVertexNormal;
	attribute vec2 aTextureCoord;
	
	uniform vec3 uAmbientLight;
	uniform vec3 uAmbientColor;
	uniform mat4 uNormalMatrix;
	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;
	
	varying highp vec2 vTextureCoord;
	varying highp vec3 vLighting;
	
	void main(void) {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
		vTextureCoord = aTextureCoord;
		
		highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
		highp float directional = max(dot(transformedNormal.xyz, normalize(vec3(0, 1, 0))), 0.0);
		vLighting = uAmbientLight + (uAmbientColor * directional);
	}
`;
/* Texture Fragment Shader Program */
Source.fsTextureSource = `
	varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
	
    uniform sampler2D uSampler;
	
    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }
`;

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
		// Default Shader
		attribLocations.vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
		attribLocations.vertexNormal = gl.getAttribLocation(shaderProgram, 'aVertexNormal');
		attribLocations.vertexColor = gl.getAttribLocation(shaderProgram, 'aVertexColor');
		
		uniformLocations.projectionMatrix = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
		uniformLocations.modelViewMatrix = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');
		uniformLocations.normalMatrix = gl.getUniformLocation(shaderProgram, 'uNormalMatrix');
		uniformLocations.ambientLight = gl.getUniformLocation(shaderProgram, 'uAmbientLight');
		uniformLocations.ambientColor = gl.getUniformLocation(shaderProgram, 'uAmbientColor');
		uniformLocations.lightDirections = gl.getUniformLocation(shaderProgram, 'uLightDirections');
	} else if(shaderName == 2) {
		// Default Shader that Supports Textures
		attribLocations.vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
		attribLocations.vertexNormal = gl.getAttribLocation(shaderProgram, 'aVertexNormal');
		attribLocations.textureCoord = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
		
		uniformLocations.projectionMatrix = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
		uniformLocations.modelViewMatrix = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');
		uniformLocations.normalMatrix = gl.getUniformLocation(shaderProgram, 'uNormalMatrix');
		uniformLocations.uSampler = gl.getUniformLocation(shaderProgram, 'uSampler');
		uniformLocations.ambientLight = gl.getUniformLocation(shaderProgram, 'uAmbientLight');
		uniformLocations.ambientColor = gl.getUniformLocation(shaderProgram, 'uAmbientColor');
	}
	
	return {
		program: shaderProgram,
		attribLocations: attribLocations,
		uniformLocations: uniformLocations
	};
};


/* Return Source */
export default Source;