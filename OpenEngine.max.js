/* OPEN ENGINE 3D */
/* VERSION 0 pre-alpha */
const OpenEngine = {};

import * as Matrix from './Src/Matrix.js';

/* Import Math Classes */
import Maths from './Maths/Math.js';
import Vector2 from './Maths/Vector2.js';
import Vector3 from './Maths/Vector3.js';
import Vector4 from './Maths/Vector4.js';
import Matrix4 from './Maths/Matrix4.js';
/* Import Material Classes */
import Material from './Materials/Material.js';
import Color3 from './Materials/Color3.js';
import Color4 from './Materials/Color4.js';
import ColorGradient from './Materials/ColorGradient.js';
import Texture from './Materials/Texture.js';
/* Import Mesh Classes */
import Geometry from './Meshes/Geometry.js';
import Mesh from './Meshes/Mesh.js';
/* Set Light Classes */
import Light from './Lights/Light.js';
/* Import Camera Classes */
import Camera from './Cameras/Camera.js';
/* Import Rendering Classes */
import Sky from './Rendering/Sky.js';
import SkyBox from './Rendering/SkyBox.js';
/* Import Main OpenEngine Source Classes */
import Source from './Src/Source.js';
import Engine from './Src/Engine.js';

/* OPEN ENGINE VERSION */
OpenEngine.version = 0.0;

/* ACTIVE ENGINE */
OpenEngine._activeEngine = null;

/* Setters */
OpenEngine.SetActiveEngine = function(engine) {
	OpenEngine._activeEngine = engine;
	return OpenEngine._activeEngine;
};

/* Getters */
OpenEngine.GetActiveEngine = function() {
	return OpenEngine._activeEngine;
};

/* Set Math Classes */
OpenEngine.Maths = Maths;
OpenEngine.Vector2 = Vector2;
OpenEngine.Vector3 = Vector3;
OpenEngine.Vector4 = Vector4;
OpenEngine.Matrix4 = Matrix4;
/* Set Material Classes */
OpenEngine.Material = Material;
OpenEngine.Color3 = Color3;
OpenEngine.Color4 = Color4;
OpenEngine.ColorGradient = ColorGradient;
OpenEngine.Texture = Texture;
/* Set Mesh Classes */
OpenEngine.Geometry = Geometry;
OpenEngine.Mesh = Mesh;
/* Set Light Classes */
OpenEngine.Light = Light;
/* Set Camera Classes */
OpenEngine.Camera = Camera;
/* Set Rendering Classes */
OpenEngine.Sky = Sky;
OpenEngine.SkyBox = SkyBox;
/* Set Main OpenEngine Source Classes */
OpenEngine.Source = Source;
OpenEngine.Engine = Engine;

export default OpenEngine;