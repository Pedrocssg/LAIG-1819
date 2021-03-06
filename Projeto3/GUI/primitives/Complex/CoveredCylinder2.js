/**
 * CoveredCylinder2
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

/**
 * CoveredCylinder2 class, representing the NURBS version of the cylinder primitive with covers.
 * @extends CGFobject
 */
class CoveredCylinder2 extends CGFobject {
	/**
	 * Constructor of the class CoveredCylinder2.
	 * @param {CGFscene} scene Scene of the application.
	 * @param {Number} base Base radius.
	 * @param {Number} top Top radius.
	 * @param {Number} height Height of the cylinder.
	 * @param {Number} slices Slices of the cylinder.
	 * @param {Number} stacks Stacks of the cylinder.
	 */
	constructor(scene, base, top, height, slices, stacks)
	{
		super(scene);

		this.height = height;
		this.cylinder = new Cylinder2(scene, base, top, height, slices, stacks);
		this.circleBase = new MyCircle(scene, slices, base);
		this.circleTop = new MyCircle(scene, slices, top);
  	};

	/**
	 * Positions the covers on the cylinder primitive and displays the result.
	 */
	display()
	{
      var degToRad = Math.PI / 180;

      this.scene.pushMatrix();
        this.cylinder.display();

        this.scene.pushMatrix();
            this.scene.rotate(180*degToRad,1,0,0);
            this.circleBase.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0,0,this.height);
            this.circleTop.display();
        this.scene.popMatrix();

      this.scene.popMatrix();
	};

	/**
     * Updates the texture coordinates.
     * @param  {Number} s s texture coordinate
     * @param  {Number} t t texture coordinate
     */
	updateTexCoords(s, t) {
		this.cylinder.updateTexCoords(s, t);
		this.circleBase.updateTexCoords(s, t);
		this.circleTop.updateTexCoords(s, t);
	}

};
