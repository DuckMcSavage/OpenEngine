const fsSource = `

//-----Max Allowed Type Of Lights In Engine-----
const int MAX_LIGHTS = 10;

//----------Use Texture Instead Of Color-----------
uniform bool uUseTexture;
uniform highp sampler2D uTextureSampler;

//----------Engine Lighting-----------
uniform highp vec3 uAmbientLight;
uniform highp vec3 uAmbientColor;

//----------Lights Enabled For Mesh-----------
uniform bool uLightsEnabled;

//----------Directional Lights-----------
uniform highp int uNumbDirectionalLights;
uniform highp vec3 uDirectionalLightColors[MAX_LIGHTS];
uniform highp float uDirectionalLightIntensities[MAX_LIGHTS];
varying highp float vDirectionalLights[MAX_LIGHTS];

//----------Point Lights-----------
uniform highp int uNumbPointLights;
uniform highp float uPointLightRanges[MAX_LIGHTS];
uniform highp vec3 uPointLightColors[MAX_LIGHTS];
uniform highp float uPointLightIntensities[MAX_LIGHTS];
varying highp vec3 vPointLights[MAX_LIGHTS];

//----------Standard Color Of Mesh-----------
varying highp vec2 vTextureCoords;
varying highp vec4 vColor;
varying highp vec3 vNormal;

void main(void) {
    highp vec4 meshVColor = vColor;

    // If Use Texture Then Set Texture Instead Of Color
    if(uUseTexture) {
        meshVColor = texture2D(uTextureSampler, vTextureCoords);
    }

	// Set Final Light Data (to be edited as needed)
	highp vec4 directionalLightData = vec4(0, 0, 0, 1);
	highp vec4 pointLightData = vec4(0, 0, 0, 1);

	if(uLightsEnabled) {
	    // Define Normal,Lambert Data
        highp vec3 N = normalize(vNormal);

        //Apply Lighting per Light from Data
        for(int i = 0; i < MAX_LIGHTS; i++) {
            // Render All Directional Lights
            if(i < uNumbDirectionalLights) {
                directionalLightData += vec4(uDirectionalLightColors[i], 1.0) * meshVColor * vDirectionalLights[i] * uDirectionalLightIntensities[i];
            }

            // Render All Point Lights
            if(i < uNumbPointLights) {
                highp float lambert = dot(N, normalize(vPointLights[i]));
                highp float distFromLight = N.x * vPointLights[i].x + N.y * vPointLights[i].y + N.z * vPointLights[i].z;

                if(lambert > 0.05) {
                    pointLightData += vec4(uPointLightColors[i], 1.0) * meshVColor * max(lambert - distFromLight/uPointLightRanges[i], 0.05) * uPointLightIntensities[i];
                }
            }
        }
	}

	// Apply Ambient Color / Level To Mesh
	gl_FragColor = meshVColor * vec4(uAmbientColor * uAmbientLight, 1.0);

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