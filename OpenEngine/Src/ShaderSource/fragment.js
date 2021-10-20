const fsSource = `

//-----Max Allowed Type Of Lights In Engine-----
const int MAX_LIGHTS = 25;

//----------Engine Lighting-----------
uniform highp vec3 uAmbientLight;
uniform highp vec3 uAmbientColor;

//----------Directional Lights-----------
uniform highp int uNumbDirectionalLights;
uniform highp vec3 uDirectionalLightColors[MAX_LIGHTS];
varying highp float vDirectionalLights[MAX_LIGHTS];

//----------Point Lights-----------
uniform highp int uNumbPointLights;
uniform highp vec3 uPointLightColors[MAX_LIGHTS];
varying highp vec3 vPointLights[MAX_LIGHTS];

//----------Standard Color Of Mesh-----------
varying highp vec4 vColor;
varying highp vec3 vNormal;

void main(void) {
	// Set Final Light Data (to be edited as needed)
	highp vec4 directionalLightData = vec4(0, 0, 0, 1);
	highp vec4 pointLightData = vec4(0, 0, 0, 1);
	
	// Define Normal,Lambert Data
	highp vec3 N = normalize(vNormal);
	highp float lambert = 0.0;

	//Apply Lighting per Light from Data
	for(int i = 0; i < MAX_LIGHTS; i++) {
		// Render All Directional Lights
		if(i < uNumbDirectionalLights) {
			directionalLightData += vec4(uDirectionalLightColors[i], 1.0) * vDirectionalLights[i];
		}
		
		// Render All Point Lights
		if(i < uNumbPointLights) {
			lambert = dot(N, normalize(vPointLights[i]));

			if(lambert > 0.05) {
				pointLightData += vec4(uPointLightColors[i], 1.0) * vColor * lambert;
			}
		}
	}

	// Apply Ambient Color / Level To Mesh
	gl_FragColor = vec4(uAmbientColor * uAmbientLight, 1.0);
	
	// Apply Directional Lights To Mesh
	gl_FragColor += vec4(directionalLightData.rgb, 1.0);
	
	// Apply Point Lights To Mesh
	gl_FragColor += vec4(pointLightData.rgb, 1.0);
	
	// Finalize
	gl_FragColor = vec4(gl_FragColor.rgb, 1.0);
}

`;

/* Return Fragment Shader Source */
export default fsSource;