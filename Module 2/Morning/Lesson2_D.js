class Lesson2_D extends Phaser.Scene {
    constructor() {
        super("Lesson2D_1");
    }

    preload() {
        this.load.image('back', 'assets/back.png');
        this.load.image('start2', 'assets/Lesson2/orange.png');

        this.load.image('ball1', 'assets/lesson2/apple_ball1.png');
        this.load.image('ball2', 'assets/lesson2/orange_ball1.png');

        this.load.image('btn', 'assets/Lesson2/ok.png');
        this.load.image('btn_next', 'assets/Lesson2/next_button.png');

        this.load.image('cardD0', 'assets/Lesson2/card0.png');
        this.load.image('cardD1', 'assets/Lesson2/card1.png');
        this.load.image('cardD2', 'assets/Lesson2/card2.png');
        this.load.image('cardD3', 'assets/Lesson2/card3.png');
        this.load.image('cardD4', 'assets/Lesson2/card4.png');
        this.load.image('cardD5', 'assets/Lesson2/card5.png');
        this.load.image('cardD6', 'assets/Lesson2/card6.png');
        this.load.image('cardD7', 'assets/Lesson2/card7.png');

        this.load.image('actionD0', 'assets/Lesson2/action0.png');
        this.load.image('actionD1', 'assets/Lesson2/action1.png');
        this.load.image('actionD2', 'assets/Lesson2/action2.png');
        this.load.image('actionD3', 'assets/Lesson2/action3.png');
        this.load.image('actionD4', 'assets/Lesson2/action4.png');
        this.load.image('actionD5', 'assets/Lesson2/action5.png');
        this.load.image('actionD6', 'assets/Lesson2/action6.png');
        this.load.image('actionD7', 'assets/Lesson2/action7.png');
    }

    create() {
        this.backButtonSetup();             // add back to menu button

        this.gameSetup();                   // set up game variable
        
        this.cardSetup();                   // display and set up card, button and text in card

        this.progressBar();                 // display progress bar
    }

    update() {

    }

    gameSetup() {
        this.caption1 = this.make.text({
            x: 0.5 * config.width,
            y: 0.14 * config.height,
            text: 'Luke\'s school day',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 35px Arial',
                fill: 'black',               
            }
        });

        this.buttonNext = this.add.image(config.width * 0.5, config.height * 0.9, 'btn_next');
        this.buttonNext.setInteractive().on('pointerdown', function () {
            this.scene.start('End2D_1');
        }, this).on('pointerover', function () {
            this.setTint(0x03b5fc);
        }).on('pointerout', function () {
            this.clearTint();;
        }).visible = false;

        this.coordinateImage = {
            x: [19 / 229, 0.2, 73 / 229, 100 / 229, 127 / 229, 154 / 229, 181 / 229, 209 / 229],
            y: [0.63, 0.63, 0.63, 0.63, 0.63, 0.63, 0.63, 0.63]
        }

         // set up time display above the card
        this.time = [ "7:30", "8:00", "8:30", "13:00", "14:30", "16:00", "19:00", "21:00"	];

    }

    cardSetup() {
        this.card = [];

        for (let i = 0; i <= 7; i++) {
            this.card.push({
                image: this.add.image( config.width * this.coordinateImage.x[i],
                    config.height * this.coordinateImage.y[i], 'cardD' + i ),
                button: this.add.image( config.width * this.coordinateImage.x[i],
                    config.height * this.coordinateImage.y[i] + 30, 'btn' ),
                time: this.add.text( (this.coordinateImage.x[i]) * config.width, 
                    (this.coordinateImage.y[i] - 0.24) * config.height, 
                    this.time[i] ).setFontFamily('Arial').setFontSize(30).setColor('#000000').setOrigin(0.5)
            });
     
            if (i != 0) {
                this.card[i].image.visible = false;
                this.card[i].button.visible = false;
                this.card[i].time.visible = false;
            }

            this.card[i].button = this.buttonInteraction(this.card[i].button, i);

        }
    }

    // set up button in card behavior
    buttonInteraction(button, i) {
        button.setInteractive().on('pointerdown', function () {
            if (i == 7) {
                this.buttonNext.visible = true;
            } else {
                this.card[i + 1].image.visible = true;
                this.card[i + 1].button.visible = true;
                this.card[i + 1].time.visible = true;
            }
            this.card[i].image.destroy();
            this.card[i].button.destroy();
            this.card[i].image = this.add.image(config.width * this.coordinateImage.x[i],
                config.height * this.coordinateImage.y[i], 'actionD' + i)
        }, this);

        button.setInteractive().on('pointerover', function () {
            button.setTint(0x03b5fc);
        })

        button.setInteractive().on('pointerout', function () {
            button.clearTint();
        })

        return button;
    }

    backButtonSetup() {
        this.backBtn = this.add.image(config.width * 0.05, config.height * 0.1, 'back');
        this.backBtn.setInteractive().on('pointerover', function () {
            this.setAlpha(0.5);
        }).on('pointerout', function () {
            this.setAlpha(2);
        }).on('pointerdown', function () {
            this.scene.start('Menu');
        }, this);
    }

    progressBar() {
        //Can change configuration
        let bar = new Phaser.Geom.Rectangle(config.width / 3, config.height * 0.07, config.width / 3, 10);
        this.graphicCover = this.add.graphics({ fillStyle: { color: 0xccbbba } })
            .fillRectShape(bar)
            .setAlpha(0.4);

        //Can change configuration
        this.ball1 = this.add.image(config.width / 3 + 25, config.height * 0.07 - 14, "ball1");
        this.ball2 = this.add.image(config.width / 3 + 65, config.height * 0.07 - 14, "ball2");
    }

}