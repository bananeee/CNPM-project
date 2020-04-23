class SceneRoot extends Phaser.Scene {
    constructor() {
        super("Menu");
    }
    preload() {
        this.load.image('button1', 'assets/lesson1.png');
        this.load.image('button2', 'assets/lesson2.png');

    }

    create() {
        this.add.image(0.325 * config.width,0.5 * config.height, 'button1').setInteractive().on('pointerdown', function(){
            console.log('change scene');
            this.scene.start('Lesson1');           
        }, this);

        this.add.image(0.675 * config.width,0.5 * config.height, 'button2').setInteractive().on('pointerdown', function(){
            console.log('change scene');
            this.scene.start('Choose');           
        }, this);


        

    }
    
    update(){

    }

}
