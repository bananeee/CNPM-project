class SceneChoose extends Phaser.Scene {
    constructor() {
        super("Choose");
    }

    preload() {
        this.load.image('back', 'assets/back.png');
        this.load.image('start2', 'assets/Lesson2/orange.png');

        this.load.image('morning', 'assets/Lesson2/morning.png');
        this.load.image('afternoon', 'assets/Lesson2/afternoon.png');
    }

    create() {
        this.buttonGameModeSetup();
        
        this.startGameUI();
        
        this.backButtonSetup();
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

    buttonGameModeSetup() {
        this.morningBtn = this.add.image(0.325 * config.width, 0.5 * config.height, 'morning');
        this.afternoonBtn = this.add.image(0.675 * config.width, 0.5 * config.height, 'afternoon');

        this.morningBtn.on('pointerover', function () {
            this.setTint(0xc9c9c9);
        }).on('pointerout', function () {
            this.clearTint();
        }).on('pointerdown', function () {
            this.scene.start('Menu');
        }, this);

        this.afternoonBtn.on('pointerover', function () {
            this.setTint(0xc9c9c9);
        }).on('pointerout', function () {
            this.clearTint();
        }).on('pointerdown', function () {
            this.scene.start('Menu');
        }, this);
    }

    startGameUI() {
        this.cover = new Phaser.Geom.Rectangle(0, 0, config.width, config.height);

        this.graphicCover = this.add.graphics({ fillStyle: { color: 0xffffff } })
                                .fillRectShape(this.cover)
                                .setAlpha(0.4);

        this.startGameBtn = this.add.image(config.width / 2, config.height / 2, 'start2').setInteractive();
        this.startGameBtn.on('pointerover', function () {
            this.setAlpha(0.8);
        }).on('pointerout', function () {
            this.setAlpha(1 / 0.8);
        }).on('pointerdown', function () {
            this.graphicCover.destroy();
            this.startGameBtn.destroy();
            
            this.morningBtn.setInteractive();
            this.afternoonBtn.setInteractive();
        }, this);

    }
}