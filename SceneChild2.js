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

        this.load.image('btn', 'assets/Lesson2/apple_buton.png');
    }

    create() {



        this.gameSetup();

        this.setUpDropzone();

        this.cardSetup();

        this.inputManager();

        this.button = this.add.image(100, 100, "btn").setInteractive();

        this.button.on("pointerdown", function() {

            console.log("true");
            if (!this.checkWrongCards()) {
                this.drawBorderRed();
            }
        }, this);

    }

    update() {

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
                this.arrayCardsConfuse[dropZone.name].x = gameObject.input.dragStartX;
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

        this.arrayCardsConfuse = [];

        this.arrayZone = [];

        this.arrayWrongCards = [];
    }

    cardSetup() {
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