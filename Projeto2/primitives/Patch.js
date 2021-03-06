/**
 * Patch
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 /**
  * Patch class, representing a 2D or 3D surfaces.
  */
class Patch extends CGFobject {
		/**
		 * @constructor constructor of the class Patch.
		 * @param {scene of the application.} scene
		 * @param {Number of U points in the patch.} nPointsU
		 * @param {Number of V points in the patch.} nPointsV
		 * @param {Number of U parts in the patch.} nPartsU
		 * @param {Number of V parts in the patch.} nPartsV
     * @param {Array of control points of the patch.} controlPoints
		 */
		constructor(scene, nPointsU, nPointsV, nPartsU, nPartsV, controlPoints) {
				super(scene);

        this.nPointsU = nPointsU;
        this.nPointsV = nPointsV;
				this.nPartsU = nPartsU;
				this.nPartsV = nPartsV;
        this.controlPoints = controlPoints;

				this.createSurface();
	  };

		/**
	   * Creates the NURBS surface using the WebCGF library.
	   */
		createSurface() {
        let controlPoints = [];
        for (var i = 0, k = 0; i < this.nPointsU; i++) {
            let uPoint = [];
            for (var j = 0; j < this.nPointsV; j++, k++) {
                this.controlPoints[k].push(1);
                uPoint.push(this.controlPoints[k]);
            }
            controlPoints.push(uPoint);
        }

				let nurbsSurface = new CGFnurbsSurface(this.nPointsU-1, this.nPointsV-1, controlPoints);

				this.nurbsPlane = new CGFnurbsObject(this.scene, this.nPartsU, this.nPartsV, nurbsSurface);
		};

		/**
		 * Returns a specific vertex of the patch.
		 * @param {u coordinate of the point.} u
		 * @param {v coordinate of the point.} v
		 */
		getPoint(u, v) {
				this.nurbsPlane.evalObj.getPoint(u, v);
		};

		/**
		 * Displays the patch surface.
		 */
		display() {
				this.nurbsPlane.display();
		};

		/**
		 * Updates the texture coordinates.
	 	 * @param {s texture coordinate.} s
	 	 * @param {t texture coordinate.} t
		 */
		updateTexCoords(s, t) {};
};
