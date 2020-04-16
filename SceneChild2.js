class SceneChild2 extends Phaser.Scene {
    constructor() {
        super("Lesson2");
    }

    preload() {
        this.load.image('background', 'assets/Lesson2/card1.png');
        this.load.image('background', 'assets/Lesson2/card2.png');
    }

    create() {

    }

    update() {

    }
    
    gameSetup() {
        //this.
    }

    cardSetup() {
        this.card = [];
        for (let i = 0; i < 8; i++) {
            this.card.push(this.)
        }
    }
}