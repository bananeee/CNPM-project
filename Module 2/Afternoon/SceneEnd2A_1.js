class SceneEnd2A_1 extends Phaser.Scene {
    constructor() {
        super("End2A_1");
    }
    preload() {
        this.load.image('orange', 'assets/Lesson2/orange_ball2.png');
        this.load.image('ball1', 'assets/Lesson2/apple_ball1.png');
        this.load.image('ball2', 'assets/Lesson2/orange_ball1.png');
    }
    create() {

        this.textSetup();

        this.progressBar();

        this.contentSetup();

        this.showContent();

    }

    update() {
        this.graphics.clear();
        this.rect.x = this.orange.x;
        this.graphics.fillRectShape(this.rect);

    }

    contentSetup() {
        this.graphics = this.add.graphics({
            
            fillStyle: { color: 0xfffdf0 }
        });

        this.rect = new Phaser.Geom.Rectangle(config.width / 4, config.height / 2 - 50, 500, 100);

        this.graphics.fillRectShape(this.rect);

        this.orange = this.add.image(config.width / 4, config.height / 2, "orange");

    }

    textSetup() {
        this.captionSceneEnd2A = this.make.text({
            x: 0.5 * config.width,
            y: 0.5 * config.height,
            text: 'Great! >.<',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: '80px Arial',
                fill: '#4bc3f2',
            },
        });
    }

    showContent() {
        this.tweens.add({
            targets: this.orange,
            x: config.width * 3 / 4,
            angle: 180 * 6,
            ease: 'Bounce.easeOut',
            duration: 5000,
        }, this);

        this.tweens.add({
            targets: this.ball2,
            x: 657,
            angle: 180 * 6,
            ease: 'Power1',
            duration: 800,
            delay: 6000,

            completeDelay: 600,
            onComplete: function () {
                this.scene.start("Lesson2D_2");
            },
            onCompleteScope: this,

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