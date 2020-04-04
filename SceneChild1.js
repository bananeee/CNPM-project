class SceneChild1 extends Phaser.Scene {
    constructor() {
        super("Lesson1");
    }

    preload() {
        this.load.image('background', 'asset/background.png');
        this.load.image('star', 'asset/star.png');
    }

    create() {
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db");
        this.bg = this.add.image(config.width / 2, config.height / 2, 'background').setScale(0.5);
    }

    update() {
        
    }
}