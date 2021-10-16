/* ColorGradient Class Extends > Color3, Color4 */

{

	/* Class ColorGradient */
	const ColorGradient = function() {
        this.colors = [
            new OpenEngine.Color3.Black(),
            new OpenEngine.Color3.Black(),
            new OpenEngine.Color3.White(),
            new OpenEngine.Color3.White(),
        ];

        this._isColorGradient = true;

	    return this;
	};

	/* Return Sky */
	OpenEngine.ColorGradient = ColorGradient;

}