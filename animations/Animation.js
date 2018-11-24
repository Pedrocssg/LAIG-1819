/**
 * Animation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 /**
  * Animation class, representing an object's animation.
  */
class Animation extends CGFobject {
	/**
	 * @constructor constructor of the class Animation.
	 * @param {scene of the application} scene
	 * @param {total time of the animation in ms} time
	 */
	constructor(scene, time) {
			super(scene);
			this.time = time;
			this.currTime = 0;
			this.transformation = new mat4.create();
			this.degToRad = Math.PI / 180;
			this.previousTime = 0;
			this.deltaTime = this.scene.period;
			this.finished = false;

			this.initBuffers();
  };

	hasFinished() {
			return this.finished;
	};

	apply(currTime) {

	};

	update(currTime) {
			this.apply(currTime);
	};
};
