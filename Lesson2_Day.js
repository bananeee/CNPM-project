class Lesson2_Day extends Phaser.Scene {
    constructor() {
        super("Lesson2D");
    }

    preload() {
        this.load.image('btn', 'assets/Lesson2/next_button.png');
        this.load.image('pk0', 'assets/Lesson2/action0.png');
        this.load.image('pk1', 'assets/Lesson2/action1.png');
        this.load.image('pk2', 'assets/Lesson2/action2.png');
        this.load.image('pk3', 'assets/Lesson2/action3.png');
        this.load.image('pk4', 'assets/Lesson2/action4.png');
        this.load.image('pk5', 'assets/Lesson2/action5.png');
        this.load.image('pk6', 'assets/Lesson2/action6.png');
        this.load.image('pk7', 'assets/Lesson2/action7.png');
    }

    create() {
        this.gameSetup();
        this.cardSetup();
    }

    update() {

    }

    gameSetup() {
        this.buttonNext = this.add.image(config.width * 0.5, config.height * 0.9, 'btn');
        this.buttonNext.setInteractive().on('pointerdown', function() {
            //
        }).visible = false;

        this.coordinateImage = {
            x: [19 / 229, 0.2, 73 / 229, 100 / 229, 127 / 229, 154 / 229, 181 / 229, 209 / 229],
            y: [0.63, 0.63, 0.63, 0.63, 0.63, 0.63, 0.63, 0.63]
        }
    }

    cardSetup() {
        let card = [];
        
        for (let i = 0; i <= 7; i++) {
            card.push({image: this.add.image(config.width * this.coordinateImage.x[i], 
                                config.height * this.coordinateImage.y[i], 'pk' + i),
                        button: this.add.image(config.width * this.coordinateImage.x[i], 
                                config.height * this.coordinateImage.y[i] + 30, 'btn')});
            
            if (i != 0) {
                card[i].image.visible = false;
                card[i].button.visible = false;
            }

            card[i].button.setInteractive().on('pointerdown', function() {
                if (i == 7) {
                    this.buttonNext.visible = true;
                } else {
                    card[ i+1 ].image.visible = true;
                    card[ i+1 ].button.visible = true;
                }  
            }, this);
        }
    }
}