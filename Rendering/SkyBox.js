/* SkyBox Class */

{

	/* Class SkyBox */
	const SkyBox = function() {

        this.pz = new OpenEngine.Mesh.PlaneMesh();
        this.pz.position.z = new OpenEngine.Vector3(0, 0, -10);
        this.pz.geometry.UpdateGeometry(this.pz.color);

	    return this;
	};

	/* Return SkyBox */
	OpenEngine.SkyBox = SkyBox;

}