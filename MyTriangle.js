/**
 * MyTriangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTriangle extends CGFobject
{
	constructor(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3)
	{
		super(scene);

		this.minS = 0.0;
		this.maxS = 1.0;
		this.minT = 0.0;
		this.maxT = 1.0;
		this.texCoords = [];

		this.x1 = x1;
		this.y1 = y1;
		this.z1 = z1;
		this.x2 = x2;
		this.y2 = y2;
		this.z2 = z2;
		this.x3 = x3;
		this.y3 = y3;
		this.z3 = z3;

		this.initBuffers();
	};

	initBuffers()
	{
		this.vertices = [
			this.x1, this.y1, this.z1,
			this.x2, this.y2, this.z2,
			this.x3, this.y3, this.z3,
		];

		this.indices = [
			2, 0, 1
		];

		this.primitiveType=this.scene.gl.TRIANGLES;

		var ux = this.x2-this.x1;
		var uy = this.y2-this.y1;
		var uz = this.z2-this.z1;
		var vx = this.x3-this.x1;
		var vy = this.y3-this.y1;
		var vz = this.z3-this.z1;

		var nx = uy*vz - uz*vy
		var ny = uz*vx - ux*vz
		var nz = ux*vy - uy*vx
		this.normals = [
			nx, ny, nz,
			nx, ny, nz,
			nx, ny, nz
		];

		var u = vec3.fromValues(this.x1, this.y1, this.z1);
		var v = vec3.fromValues(this.x2, this.y2, this.z2);
		var t = vec3.fromValues(this.x3, this.y3, this.z3);

		var vt = Math.sqrt(Math.pow(v[0] - t[0], 2) + Math.pow(v[1] - t[1], 2) + Math.pow(v[2] - t[2], 2));
		var ut = Math.sqrt(Math.pow(u[0] - t[0], 2) + Math.pow(u[1] - t[1], 2) + Math.pow(u[2] - t[2], 2));
		var uv = Math.sqrt(Math.pow(u[0] - v[0], 2) + Math.pow(u[1] - v[1], 2) + Math.pow(u[2] - v[2], 2));

		var angle = Math.acos((Math.pow(vt, 2) - Math.pow(ut, 2) + Math.pow(uv, 2)) / (2 * vt * uv));

		var d = vt * Math.sin(angle);

		this.texCoords = [
			this.minS, d*this.maxT,
			uv*this.maxS, d*this.maxT,
			(uv-vt*Math.cos(angle))*this.maxS, (d-vt*Math.sin(angle))*this.maxT
		];

		this.initGLBuffers();
	};
};
