class SceneEnd2_2 extends Phaser.Scene {
    constructor() {
        super("End2_2");
    }
    preload() {
        this.load.image('apple', 'assets/lesson2/apple_ball2.png');
        this.load.image('ball1', 'assets/lesson2/apple_ball1.png');
        this.load.image('ball2', 'assets/lesson2/orange_ball1.png');
    }
    create() {

        this.textSetup();

        this.progressBar();

        this.contentSetup();

        this.showContent();

    }

    update() {
        this.graphics.clear();
        this.rect.x = this.apple.x;
        this.graphics.fillRectShape(this.rect);

    }

    contentSetup() {
        this.graphics = this.add.graphics({
            
            fillStyle: { color: 0xfffdf0 }
        });

        this.rect = new Phaser.Geom.Rectangle(config.width / 4, config.height / 2 - 50, 500, 100);

        this.graphics.fillRectShape(this.rect);

        this.apple = this.add.image(config.width / 4, config.height / 2, "apple");

    }

    textSetup() {
        this.captionSceneEnd2 = this.make.text({
            x: 0.5 * config.width,
            y: 0.5 * config.height,
            text: 'Excellent! >.<',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: '80px Arial',
                fill: '#4bc3f2',
            },
        });
    }

    showContent() {
        this.tweens.add({
            targets: this.apple,
            x: config.width * 4 / 5,
            angle: 180 * 6,
            ease: 'Bounce.easeOut',
            duration: 5000,
        }, this);

        this.tweens.add({
            targets: this.ball1,
            x: 617,
            angle: 180 * 6,
            ease: 'Power1',
            duration: 800,
            delay: 6000,

            completeDelay: 600,
            onComplete: function () {
                this.scene.start("End1");
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
        this.ball2 = this.add.image(657, config.height * 0.07 - 14, "ball2");
    }


}