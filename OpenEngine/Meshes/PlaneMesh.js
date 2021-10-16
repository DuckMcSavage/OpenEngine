/* PlaneMesh Class > extends Mesh */

{

	/* Class PlaneMesh */
	const PlaneMesh = function() {
		let Mesh = new OpenEngine.Mesh();

		// Setup Cube Geometry
		Mesh.geometry.positions = [
			-1.0, -1.0, 0,
			1.0, -1.0,  0,
			1.0,  1.0,  0,
			-1.0,  1.0, 0
		];
		Mesh.geometry.indices = [
			0,  1,  2,      0,  2,  3
		];

		Mesh.geometry.UpdateGeometry();

		return Mesh;
	};

	/* Return CubeMesh */
	OpenEngine.Mesh.PlaneMesh = PlaneMesh;

}