/* Sky Class Extends > Color3, Color4 */

{

	/* Class Sky */
	const Sky = function() {
        this.skyColor = new OpenEngine.Color4.Black();

        this.SkyBox = new OpenEngine.SkyBox();

	    return this;
	};

	/* Return Sky */
	OpenEngine.Sky = Sky;

}