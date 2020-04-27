class SceneEnd2_2 extends Phaser.Scene {
    constructor() {
        super("End2_2");
    }
    preload() {
        this.load.image('imgDragon', 'assets/dragon.png');
        this.load.image('btnGoToLesson', 'assets/go to lesson.png');
    }
    create() {

        this.imgaDragon = this.add.image(config.width / 2, config.height / 2, "imgDragon");

        this.btnGoToLesson = this.add.image(config.width / 2, config.height * 5 / 6, "btnGoToLesson");

    }
    update() {

    }
}