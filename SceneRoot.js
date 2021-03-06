class SceneRoot extends Phaser.Scene {
    constructor() {
        super("Menu");
    }
    preload() {
        this.load.image('button1', 'assets/lesson1.png');
        this.load.image('button2', 'assets/lesson2.png');

    }

    create() {
        this.textSetup();
        this.buttonImageSetup();

    }

    buttonImageSetup() {
        // Choose lesson
        this.add.image(0.325 * config.width, 0.4 * config.height, 'button1').setInteractive().on('pointerdown', function () {
            console.log('change scene');
            this.scene.start('Lesson1');
        }, this).on('pointerover', function () {
            this.morningDetail.setColor('#ff0000');
        }, this).on('pointerout', function () {
            this.morningDetail.setColor('#000000');
        }, this);

        this.add.image(0.675 * config.width, 0.4 * config.height, 'button2').setInteractive().on('pointerdown', function () {
            console.log('change scene');
            this.scene.start('Choose');
        }, this).on('pointerover', function () {
            this.afternoonDetail.setColor('#ff0000');
        }, this).on('pointerout', function () {
            this.afternoonDetail.setColor('#000000');
        }, this);;
    }

    textSetup() {
        // Lesson detail
        this.morningDetail = this.make.text({
            x: 0.325 * config.width,
            y: 0.7 * config.height,
            text: 'Weekdays and weekends',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: '25px Arial',
                fill: 'black',
                align: 'center',
                wordWrap: { width: 200 }
            }
        });
        this.afternoonDetail = this.make.text({
            x: 0.675 * config.width,
            y: 0.7 * config.height,
            text: 'A day in the life of a primary school learner',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: '25px Arial',
                fill: 'black',
                align: 'center',
                wordWrap: { width: 300 }
            }
        });

    }
}
