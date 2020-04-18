class SceneChild2 extends Phaser.Scene {
    constructor() {
        super("Lesson2");
    }

    preload() {
        this.load.image('pk0', 'assets/Lesson2/action0.png');
        this.load.image('pk1', 'assets/Lesson2/action1.png');
        this.load.image('pk2', 'assets/Lesson2/action2.png');
        this.load.image('pk3', 'assets/Lesson2/action3.png');
        this.load.image('pk4', 'assets/Lesson2/action4.png');
        this.load.image('pk5', 'assets/Lesson2/action5.png');
        this.load.image('pk6', 'assets/Lesson2/action6.png');
        this.load.image('pk7', 'assets/Lesson2/action7.png');
        this.load.image('restart', 'assets/Lesson2/restart_button.png');
        this.load.image('done', 'assets/Lesson2/done_button.png');
    }

    create() {
        this.gameSetup();

        this.setUpDropzone();

        this.cardSetup();

        this.inputManager();

    }

    update() {

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
        this.graphics = this.add.graphics();

        this.graphics.lineStyle(2, 0xc41d29);

        for (let i = this.arrayWrongCards.length - 1; i >= 0; i--) {
            this.graphics.strokeRoundedRect(this.arrayWrongCards[i].x - this.arrayWrongCards[i].input.hitArea.width / 2,
                this.arrayWrongCards[i].y - this.arrayWrongCards[i].input.hitArea.height / 2,
                this.arrayWrongCards[i].input.hitArea.width,
                this.arrayWrongCards[i].input.hitArea.height,
                15);
        }
    }

    checkWrongCards() {
        let check = true;
        for (let i = this.arrayCardsConfuse.length - 1; i >= 0; i--) {
            if (i != this.arrayCardsConfuse[i].state) {
                this.arrayWrongCards.push(this.arrayCardsConfuse[i]);
                check = false;
            }
        }
        return check;
    }

    inputManager() {
        this.btnDone.on("pointerdown", function() {
            if (!this.checkWrongCards()) {
                this.drawBorderRed();
            }
        }, this);

        for (let i = this.arrayCardsConfuse.length - 1; i >= 0; i--) {
            this.arrayCardsConfuse[i].on('pointerover', function(pointer) {
                this.arrayCardsConfuse[i].setTint(0xcdd1ce);
            }, this);

            this.arrayCardsConfuse[i].on('pointerout', function(pointer) {
                this.arrayCardsConfuse[i].clearTint();
            }, this);
        }

        this.input.on('dragstart', function(pointer, gameObject) {
            this.children.bringToTop(gameObject);

        }, this);

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            this.graphics.clear();

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

        this.arrayZone = [];

        this.arrayWrongCards = [];
    }

    cardSetup() {
        this.btnRestart = this.add.image(this.coordinateButton.restart.x * config.width,
            this.coordinateButton.restart.y * config.height,
            "restart").setInteractive();

        this.btnDone = this.add.image(this.coordinateButton.done.x * config.width,
            this.coordinateButton.done.y * config.height,
            "done").setInteractive();

        let arrayCardsCorrect = [];
        for (let i = 0; i <= 7; i++) {
            arrayCardsCorrect.push(this.add.image(config.width * this.coordinateImage.x[i], config.height * this.coordinateImage.y[i], 'pk' + i)
                .setState(i)
                .setInteractive({ draggable: true }));
        }

        let i = 0;
        while (arrayCardsCorrect.length > 0) {
            let index = Math.floor(Math.random() * arrayCardsCorrect.length);

            arrayCardsCorrect[index].x = config.width * this.coordinateImage.x[i];
            arrayCardsCorrect[index].y = config.height * this.coordinateImage.y[i];
            arrayCardsCorrect[index].setName(i);
            i++;

            this.arrayCardsConfuse.push(arrayCardsCorrect[index]);

            arrayCardsCorrect.splice(index, 1);
        }
    }

    setUpDropzone() {

        // var graphics = this.add.graphics();

        // graphics.lineStyle(2, 0xffff00);

        for (let i = 0; i <= 7; i++) {
            this.arrayZone.push(this.add.zone(config.width * this.coordinateImage.x[i], config.height * this.coordinateImage.y[i], 107, window.innerHeight)
                .setName(i)
                .setRectangleDropZone(107, window.innerHeight));

            // graphics.strokeRect(this.arrayZone[i].x - this.arrayZone[i].input.hitArea.width / 2,
            //     this.arrayZone[i].y - this.arrayZone[i].input.hitArea.height / 2,
            //     this.arrayZone[i].input.hitArea.width,
            //     this.arrayZone[i].input.hitArea.height);
        }

    }
}