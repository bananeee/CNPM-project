class Lesson2_Day extends Phaser.Scene {
    constructor() {
        super("Lesson2D");
    }

    preload() {
        this.load.image('btn', 'assets/Lesson2/ok.png');
        this.load.image('btn_next', 'assets/Lesson2/next_button.png');
        this.load.image('card0', 'assets/Lesson2/card0.png');
        this.load.image('card1', 'assets/Lesson2/card1.png');
        this.load.image('card2', 'assets/Lesson2/card2.png');
        this.load.image('card3', 'assets/Lesson2/card3.png');
        this.load.image('card4', 'assets/Lesson2/card4.png');
        this.load.image('card5', 'assets/Lesson2/card5.png');
        this.load.image('card6', 'assets/Lesson2/card6.png');
        this.load.image('card7', 'assets/Lesson2/card7.png');

        this.load.image('action0', 'assets/Lesson2/action0.png');
        this.load.image('action1', 'assets/Lesson2/action1.png');
        this.load.image('action2', 'assets/Lesson2/action2.png');
        this.load.image('action3', 'assets/Lesson2/action3.png');
        this.load.image('action4', 'assets/Lesson2/action4.png');
        this.load.image('action5', 'assets/Lesson2/action5.png');
        this.load.image('action6', 'assets/Lesson2/action6.png');
        this.load.image('action7', 'assets/Lesson2/action7.png');
    }

    create() {
        this.gameSetup();
        this.cardSetup();
    }

    update() {

    }

    gameSetup() {
        this.buttonNext = this.add.image(config.width * 0.5, config.height * 0.9, 'btn_next');
        this.buttonNext.setInteractive().on('pointerdown', function() {
            this.scene.start('Lesson3');   
        }, this).visible = false;

        this.coordinateImage = {
            x: [19 / 229, 0.2, 73 / 229, 100 / 229, 127 / 229, 154 / 229, 181 / 229, 209 / 229],
            y: [0.63, 0.63, 0.63, 0.63, 0.63, 0.63, 0.63, 0.63]
        }
    }

    cardSetup() {
        this.card = [];
        
        for (let i = 0; i <= 7; i++) {
            this.card.push({image: this.add.image(config.width * this.coordinateImage.x[i], 
                                config.height * this.coordinateImage.y[i], 'card' + i),
                        button: this.add.image(config.width * this.coordinateImage.x[i], 
                                config.height * this.coordinateImage.y[i] + 30, 'btn')});
            
            if (i != 0) {
                this.card[i].image.visible = false;
                this.card[i].button.visible = false;
            }

            this.card[i].button = this.buttonInteraction(this.card[i].button, i);


            // card[i].button.setInteractive().on('pointerdown', function() {
            //     if (i == 7) {
            //         this.buttonNext.visible = true;
            //     } else {
            //         card[ i+1 ].image.visible = true;
            //         card[ i+1 ].button.visible = true;
            //     }  
            // }, this);
        }
    }

    buttonInteraction(button, i) {
        button.setInteractive().on('pointerdown', function() {
            if (i == 7) {
                this.buttonNext.visible = true;
            } else {
                this.card[ i+1 ].image.visible = true;
                this.card[ i+1 ].button.visible = true;
            }  
            this.card[i].image.destroy();
            this.card[i].button.destroy();
            this.card[i].image = this.add.image(config.width * this.coordinateImage.x[i], 
                config.height * this.coordinateImage.y[i], 'action' + i)
        }, this);
        
        button.setInteractive().on('pointerover', function() {
            button.setTint(0x75ffff);
        })

        button.setInteractive().on('pointerout', function() {
            button.clearTint();
        })

        return button;
    }
}