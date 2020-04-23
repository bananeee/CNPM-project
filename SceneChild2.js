class SceneChild2 extends Phaser.Scene {
    constructor() {
        super("Lesson2D_2");
    }

    preload() {
        this.load.image('back', 'assets/back.png');

        this.load.image('action0', 'assets/Lesson2/action0.png');
        this.load.image('action1', 'assets/Lesson2/action1.png');
        this.load.image('action2', 'assets/Lesson2/action2.png');
        this.load.image('action3', 'assets/Lesson2/action3.png');
        this.load.image('action4', 'assets/Lesson2/action4.png');
        this.load.image('action5', 'assets/Lesson2/action5.png');
        this.load.image('action6', 'assets/Lesson2/action6.png');
        this.load.image('action7', 'assets/Lesson2/action7.png');
        this.load.image('restart', 'assets/Lesson2/restart_button.png');
        this.load.image('done', 'assets/Lesson2/done_button.png');
    }

    create() {

        this.gameSetup();

        this.setUpDropzone();

        this.cardSetup();

        this.buttonSetup();

        this.inputManager();

        this.backButtonSetup();
    
        this.CheckWobble();

    }

    update() {

    }

    CheckWobble() {
        this.timedEvent = this.time.addEvent({
            delay: 10000,
            callback: function() {
                for (let i = 0; i <= 7; i++) {
                    if (this.arrayCardsConfuse[i].state != i) {
                        this.Wobble(this.arrayCardsConfuse[i], this.duration);
                        break;
                    }
                }
            },
            callbackScope: this,
            loop: true
        }, this);
    }

    Wobble(gameObject, durations) {
        this.wobbleTween = this.tweens.add({
            targets: gameObject,
            x: gameObject.x + 15,
            duration: durations,
            yoyo: true,
            repeat: 5,
            ease: 'Sine.easeInOut',
            delay: 2,
            paused: false
        });
    }

    //Ham restart
    restartArray() {

        for (let i = 0; i <= 7; i++) {
            this.arrayCardsConfuseClone[this.arraySaveState[this.arrayCardsConfuse[i].state]] = this.arrayCardsConfuse[i];
        }

        for (let i = 0; i <= 7; i++) {
            this.arrayCardsConfuse[i] = this.arrayCardsConfuseClone[i];
            this.tweenItem(this.arrayCardsConfuse[i], config.width * this.coordinateImage.x[i], this.duration);
            this.arrayCardsConfuse[i].setName(i);
        }
    }

    buttonSetup() {
        // Nhan restart 
        this.btnRestart = this.add.image(this.coordinateButton.restart.x * config.width,
            this.coordinateButton.restart.y * config.height,
            "restart").setInteractive().on("pointerdown", function() {
            if (this.checkDrawBorder) {
                this.graphics.clear();
                this.checkDrawBorder = false;
            }
            this.restartArray();
        }, this).on('pointerover', function () {
            this.setTint(0x03b5fc);
        }).on('pointerout', function () {
            this.clearTint();;
        });

        // Nhan Button DONE thi ve bien cua image
        this.btnDone = this.add.image(this.coordinateButton.done.x * config.width,
                this.coordinateButton.done.y * config.height,
                "done")
            .setInteractive()
            .on("pointerdown", function() {
                // Check co Card sai thi draw border
                if (this.checkDrawBorder) {
                    this.graphics.clear();
                    this.checkDrawBorder = false;
                }
                if (!this.checkWrongCards()) {
                    this.drawBorderRed();
                }
            }, this).on('pointerover', function () {
                this.setTint(0x03b5fc);
            }).on('pointerout', function () {
                this.clearTint();
            });
    }

    tweenItem(gameObject, desX, durations) {
        var tween = this.tweens.add({
            targets: gameObject,
            x: desX,
            duration: durations,
            ease: 'Linear'
        });
    }

    drawBorderRed() {

        this.checkDrawBorder = true;

        this.graphics = this.add.graphics();

        this.graphics.lineStyle(2, 0xc41d29);

        for (let i = this.arrayWrongCards.length - 1; i >= 0; i--) {
            this.graphics.strokeRoundedRect(this.arrayWrongCards[i].x - this.arrayWrongCards[i].input.hitArea.width / 2,
                this.arrayWrongCards[i].y - this.arrayWrongCards[i].input.hitArea.height / 2,
                this.arrayWrongCards[i].input.hitArea.width,
                this.arrayWrongCards[i].input.hitArea.height,
                15);
        }

        this.arrayWrongCards = [];
    }

    checkWrongCards() {
        let check = true;
        for (let i = 0; i <= 7; i++) {
            if (i != this.arrayCardsConfuse[i].state) {
                this.arrayWrongCards.push(this.arrayCardsConfuse[i]);
                check = false;
            }
        }
        return check;
    }

    inputManager() {

        this.input.on('dragstart', function(pointer, gameObject) {
            this.children.bringToTop(gameObject);

        }, this);

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            if (this.checkDrawBorder) {
                this.graphics.clear();
                this.checkDrawBorder = false;
            }

        }, this);

        this.input.on('dragenter', function(pointer, gameObject, dropZone) {
            if (gameObject.name != dropZone.name) {
                let tempNameGameObject = gameObject.name;

                let temp = dropZone.x;
                this.tweenItem(this.arrayCardsConfuse[dropZone.name], gameObject.input.dragStartX, this.duration);
                gameObject.input.dragStartX = temp;

                temp = this.arrayCardsConfuse[dropZone.name].name;
                this.arrayCardsConfuse[dropZone.name].setName(gameObject.name);
                gameObject.setName(temp);

                temp = this.arrayCardsConfuse[dropZone.name];
                this.arrayCardsConfuse[dropZone.name] = this.arrayCardsConfuse[tempNameGameObject];
                this.arrayCardsConfuse[tempNameGameObject] = temp;
            }

        }, this);

        this.input.on('dragend', function(pointer, gameObject, dropped) {
            gameObject.x = gameObject.input.dragStartX;
        }, this);

    }

    gameSetup() {
        this.coordinateImage = {
            x: [19 / 229, 0.2, 73 / 229, 100 / 229, 127 / 229, 154 / 229, 181 / 229, 209 / 229],
            y: [0.63, 0.63, 0.63, 0.63, 0.63, 0.63, 0.63, 0.63]
        }

        this.coordinateButton = {
            restart: { x: 0.38, y: 0.91 },
            done: { x: 0.62, y: 0.91 }
        }

        this.duration = 100;

        this.arrayCardsConfuse = [];

        this.arrayCardsConfuseClone = [0, 0, 0, 0, 0, 0, 0, 0];

        this.arraySaveState = [0, 0, 0, 0, 0, 0, 0, 0];

        this.arrayZone = [];

        this.arrayWrongCards = [];

        // Hiển thị thời gian
        this.time = [ "7:30", "8:00", "8:30", "13:00", "14:30", "16:00", "19:00", "21:00"	];
        for (let i = 0; i <= 7; i++){
            this.add.text( (this.coordinateImage.x[i]) * config.width, 
                    (this.coordinateImage.y[i] - 0.24) * config.height, 
                    this.time[i] ).setFontFamily('Arial').setFontSize(30).setColor('#000000').setOrigin(0.5)
        }
    }

    cardSetup() {


        let arrayCardsCorrect = [];
        for (let i = 0; i <= 7; i++) {
            arrayCardsCorrect.push(this.add.image(config.width * this.coordinateImage.x[i], config.height * this.coordinateImage.y[i], 'action' + i)
                .setState(i)
                .on('pointerover', function(pointer) {
                    this.setTint(0xcdd1ce);
                })
                .on('pointerout', function(pointer) {
                    this.clearTint();
                })
                .setInteractive({ draggable: true }));
        }

        let i = 0;
        while (arrayCardsCorrect.length > 0) {
            let index = Math.floor(Math.random() * arrayCardsCorrect.length);

            arrayCardsCorrect[index].x = config.width * this.coordinateImage.x[i];
            arrayCardsCorrect[index].y = config.height * this.coordinateImage.y[i];
            arrayCardsCorrect[index].setName(i);
            this.arraySaveState[arrayCardsCorrect[index].state] = i;
            i++;

            this.arrayCardsConfuse.push(arrayCardsCorrect[index]);
            arrayCardsCorrect.splice(index, 1);
        }

    }

    setUpDropzone() {

        for (let i = 0; i <= 7; i++) {
            this.arrayZone.push(this.add.zone(config.width * this.coordinateImage.x[i], config.height * this.coordinateImage.y[i], 107, window.innerHeight)
                .setName(i)
                .setRectangleDropZone(107, window.innerHeight));
        }

    }

    backButtonSetup() {
        this.backBtn = this.add.image(config.width * 0.05, config.height * 0.1, 'back');
        this.backBtn.setInteractive().on('pointerover', function() {
            this.setAlpha(0.5);
        }).on('pointerout', function() {
            this.setAlpha(2);
        }).on('pointerdown', function() {
            this.scene.start('Menu');
        }, this)
    }
}