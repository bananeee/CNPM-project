class SceneEnd2_1 extends Phaser.Scene {
    constructor() {
        super("End2_1");
    }
    preload() {
        this.load.image('orange', 'assets/lesson2/orange_ball2.png');

    }
    create() {

        this.caption1 = this.make.text({
            x: 0.5 * config.width,
            y: 0.5 * config.height,
            text: 'Great! >.<',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: '80px Arial',
                fill: '#4bc3f2',               
            },
        });

        this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xaa0000 }, 
                                            fillStyle: { color: 0xffffff } });

        this.rect = new Phaser.Geom.Rectangle(config.width / 4, config.height / 2 - 50, 500, 100);

        this.graphics.fillRectShape(this.rect);

        this.ball = this.add.image(config.width / 4, config.height / 2, "orange");


        this.tweens.add({
            targets: this.ball,
            x: config.width * 3 / 4,
            angle: 180 * 6,
      
            ease: 'Bounce.easeOut',
            duration: 5000,
        }, this);

    }
    update() {
        this.graphics.clear();
        this.rect.x = this.ball.x;
        this.graphics.fillRectShape(this.rect);


    }
}