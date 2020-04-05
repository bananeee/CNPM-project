class SceneChild1 extends Phaser.Scene {
    constructor() {
        super("Lesson1");
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('star', 'asset/star.png');
    }

    create() {
        this.add.image( config.width / 2, config.height / 2, 'background')
        // this.scene.start("playGame");
      }

    update() {
        
    }
}