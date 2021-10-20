const vsSource = `

//-----Max Allowed Type Of Lights In Engine-----
const int MAX_LIGHTS = 25;

//----------Data-----------
attribute vec4 aVertexPosition;
attribute vec4 aVertexNormal;
attribute vec4 aVertexColor;

//----------Engine Lighting-----------
uniform highp vec3 uAmbientLight;
uniform highp vec3 uAmbientColor;

//----------World & Model Matrix's-----------
uniform mat4 uWorldMatrix;
uniform mat4 uNormalMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

//----------Directional Lights-----------
uniform highp int uNumbDirectionalLights;
uniform highp vec3 uDirectionalLights[MAX_LIGHTS];
varying highp float vDirectionalLights[MAX_LIGHTS];

//----------Point Lights-----------
uniform highp int uNumbPointLights;
uniform highp vec3 uPointLights[MAX_LIGHTS];
varying highp vec3 vPointLights[MAX_LIGHTS];

//----------Standard Color Of Mesh-----------
varying highp vec4 vColor;
varying highp vec3 vNormal;

void main(void) {
	//Apply Lighting per Light as Data
	
	// Set vNormal & vertexPosition
	vNormal = mat3(uNormalMatrix) * vec3(aVertexNormal);
	vec4 vertexPosition = uModelViewMatrix * aVertexPosition;
	
	for(int i = 0; i < MAX_LIGHTS; i++) {
		// Render All Directional Lights
		if(i < uNumbDirectionalLights) {
		   vDirectionalLights[i] = max(dot(vNormal, normalize(uDirectionalLights[i])), 0.0);
		}
		
		// Render All Point Lights
		if(i < uNumbPointLights) {
			vPointLights[i] = uPointLights[i] - vec3(vertexPosition);
		}
	}
	
	// Set Default Color Of Mesh
	vColor = aVertexColor;
	
	// Set Position & Matrix Data Of Mesh
	gl_Position = uProjectionMatrix * uWorldMatrix * uModelViewMatrix * aVertexPosition;
}

`;

/* Return Vertex Shader Source */
export default vsSource;