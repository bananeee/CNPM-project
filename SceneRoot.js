class SceneRoot extends Phaser.Scene {
    constructor() {
        super("Menu");
    }
    preload() {
        this.load.image('button1', 'assets/lesson1.png');
        this.load.image('button2', 'assets/lesson2.png');
    }

    create() {
        this.add.image(200, 200, 'button1').setInteractive().on('pointerdown', function(){
            console.log('change scene');
            this.scene.start('Lesson1');           
        }, this);

        this.add.image(600, 200, 'button2').setInteractive().on('pointerdown', function(){
            console.log('change scene');
            this.scene.start('Lesson2D');           
        }, this);


        

    }
    
    update(){

    }

}
