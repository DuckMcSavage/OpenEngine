/* Source Class */

{
	
	/* Class Source */
	const Source = {};
	
	/* Vertex Shader Program */
	Source.vsSource = `
		attribute vec4 aVertexPosition;
		attribute vec4 aVertexColor;
		uniform mat4 uModelViewMatrix;
		uniform mat4 uProjectionMatrix;
		varying lowp vec4 vColor;
		void main(void) {
			gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
			vColor = aVertexColor;
		}
	`;
	
	/* Fragment Shader Program */
	Source.fsSource = `
		varying lowp vec4 vColor;
		void main(void) {
			gl_FragColor = vColor;
		}
	`;
	
	/* Set Vertex Shader Program */
	Source.setVsSource = function(string) {
		Source.vsSource = string;
		
		return Source.vsSource;
	};
	
	/* Set Fragment Shader Program */
	Source.setFsSource = function(string) {
		Source.fsSource = string;
		
		return Source.fsSource;
	};
	
	/* Return Source */
	OpenEngine.Source = Source;
	
}