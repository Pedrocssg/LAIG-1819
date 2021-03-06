/**
 * Yuki
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

/**
 * Yuki class, representing a 3D object: the Yuki character.
 * @extends BoardPiece
 */
class Yuki extends BoardPiece {
    /**
     * Constructor of the class Yuki.
     * @param {CGFscene} scene Scene of the application.
     * @param {Number} xPos X coordinate of the Yuki character.
     * @param {Number} yPos Y coordinate of the Yuki character.
     * @param {Number} zPos Z coordinate of the Yuki character.
     */
    constructor(scene, xPos, yPos, zPos) {
        super(scene, xPos, yPos, zPos);

        this.pickingEnabled = true;
        this.type = "player";

        this.yukiBody = new MySphere(this.scene, 0.5, 32, 32);
        this.yukiHead = new MySphere(this.scene, 0.3, 32, 32);
        this.yukiBase = new MyCoveredCylinder(this.scene, 0.5, 0.5, 0.1, 32, 32);
        this.yukiSupport = new MyCoveredCylinder(this.scene, 0.075, 0.075, 0.2, 32, 32);
        this.yukiArm = new MyCoveredCylinder(this.scene, 0.1, 0.1, 0.75, 32, 32);

        this.snowAppearance = new CGFappearance(this.scene);
        this.snowAppearance.setAmbient(0.1,0.1,0.1,1);
        this.snowAppearance.setDiffuse(0.6,0.6,0.6,1);
        this.snowAppearance.setSpecular(0.3,0.3,0.3,1);
        this.snowAppearance.setShininess(150);
        this.snowAppearance.loadTexture("../scenes/images/snow.jpg");

        this.snowAppearance2 = new CGFappearance(this.scene);
        this.snowAppearance2.setAmbient(0.1,0.1,0.1,1);
        this.snowAppearance2.setDiffuse(0.4,0.4,0.4,1);
        this.snowAppearance2.setSpecular(0.3,0.3,0.3,1);
        this.snowAppearance2.setShininess(150);
        this.snowAppearance2.loadTexture("../scenes/images/snow.jpg");

        this.metalAppearance = new CGFappearance(this.scene);
        this.metalAppearance.setAmbient(0.5,0.5,0.5,1);
        this.metalAppearance.setDiffuse(0.6,0.6,0.6,1);
        this.metalAppearance.setSpecular(0.3,0.3,0.3,1);
        this.metalAppearance.setShininess(150);
        this.metalAppearance.loadTexture("../scenes/images/metal.png");
    };

    /**
     * Yuki Display function.
     */
    display() {
        this.scene.registerForPick(101, this);

        var degToRad = Math.PI / 180;

        if (this.animation !== null) {
            this.animate();
        }

        this.scene.pushMatrix();
            this.scene.translate(this.xPos, this.yPos, this.zPos);
            this.scene.scale(0.5, 0.5, 0.5);

            this.scene.pushMatrix();
                this.scene.translate(0, 1.2, 0);
                this.scene.scale(1.25, 1.75, 1);
                this.snowAppearance.apply();
                this.yukiBody.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(0, 2.2, 0);
                this.snowAppearance.apply();
                this.yukiHead.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(0, 0.1, 0);
                this.scene.rotate(-90*degToRad, 1, 0, 0);
                this.metalAppearance.apply();
                this.yukiSupport.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.rotate(-90*degToRad, 1, 0, 0);
                this.metalAppearance.apply();
                this.yukiBase.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(0.8, 1, 0);
                this.scene.rotate(30*degToRad, 0, 0, 1);
                this.scene.rotate(-90*degToRad, 1, 0, 0);
                this.snowAppearance2.apply();
                this.yukiArm.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.rotate(180*degToRad, 0, 1, 0);
                this.scene.translate(0.8, 1, 0);
                this.scene.rotate(30*degToRad, 0, 0, 1);
                this.scene.rotate(-90*degToRad, 1, 0, 0);
                this.snowAppearance2.apply();
                this.yukiArm.display();
            this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.clearPickRegistration();
    }

    /**
     * Clears the animation variable by setting it to null.
     * If the game is still playing or the movie is not playing, the game state updates.
     */
    clearAnimation() {
        this.animation = null;

        if (!this.scene.game.hasGameEnded() && !this.scene.game.isPlayingMovie()) {
            this.scene.game.setState();
        }
    }

    /**
     * Updates the texture coordinates.
     * @param  {Number} s s texture coordinate
     * @param  {Number} t t texture coordinate
     */
    updateTexCoords(s, t) {};

 }
