class SceneEnd1 extends Phaser.Scene {
    constructor() {
        super("End1");
    }
    preload() {
        this.load.image('imgDragon', 'assets/dragon.png');
        this.load.image('btnGoToLesson', 'assets/go to lesson.png');
    }
    create() {
        this.captionSceneEnd1 = this.add.text(0.5*config.width, 0.11*config.height, 'Well done! You completed the card!')
        .setFontFamily('Arial').setFontSize(40).setColor('#000000').setOrigin(0.5);

        this.imgaDragon = this.add.image(config.width / 2, config.height / 2, "imgDragon");

        this.btnGoToLesson = this.add.image(config.width / 2, config.height * 5 / 6, "btnGoToLesson");
        this.btnGoToLesson.setInteractive()
        .on("pointerdown", function () {
           this.scene.start("Menu");
        }, this).on('pointerover', function () {
            this.setTint(0x03b5fc);
        }).on('pointerout', function () {
            this.clearTint();
        });
    }
    update() {

    }
}