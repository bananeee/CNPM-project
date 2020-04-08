class SceneChild1 extends Phaser.Scene {
    constructor() {
        super("Lesson1");
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('pk0', 'assets/Package1.png');
        this.load.image('pk1', 'assets/Package2.png');
        this.load.image('pk2', 'assets/Package3.png');
    }

    create() {

        this.stop = false;                              // stop all animation when dragging

        this.packageStacked = [];                       // package wait to be displayed
        this.packageOnTrack = [];                       // package is being displayed

        this.setUpDropzone();
        this.packageSetup();

        this.inputManager();

        // Repeatedly put package to the screen after a duration
        this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.onEvent, callbackScope: this, loop: true });

        // DEBUG TEXT
        this.text1 = this.add.text(32, 32, { fill: '0x32a852' });
        this.text2 = this.add.text(32, 52, { fill: '#32a852' });
        this.text3 = this.add.text(32, 72, { fill: '#32a852' });
        this.text100 = this.add.text(32, 92, { fill: '#32a852' });
    }

    update() {
        if (this.packageOnTrack.length != 0 && this.stop == false) {
            this.move(2);
        }


        this.text1.setText("Track " + this.packageOnTrack.length);
        this.text2.setText("Staged " + this.packageStacked.length);
        this.text3.setText("Stop " + this.stop);
        var pointer = this.input.activePointer;
        this.text100.setText([
            'x: ' + pointer.x,
            'y: ' + pointer.y,
            'isDown: ' + pointer.isDown
        ]);
    }

    // Drop zone 
    setUpDropzone() {
        this.zoneWeekDay = this.add.zone(0.23 * config.width, 0.78 * config.height).setRectangleDropZone(0.46 * config.width, 0.46 * config.height);
        this.zoneHoliay = this.add.zone(0.77 * config.width, 0.78 * config.height).setRectangleDropZone(0.46 * config.width, 0.46 * config.height);

        var graphic1 = this.add.graphics();
        graphic1.lineStyle(2, 0xffff00);
        graphic1.strokeRect(this.zoneWeekDay.x - this.zoneWeekDay.input.hitArea.width / 2,
            this.zoneWeekDay.y - this.zoneWeekDay.input.hitArea.height / 2,
            this.zoneWeekDay.input.hitArea.width, this.zoneWeekDay.input.hitArea.height);
        var graphic2 = this.add.graphics();
        graphic2.lineStyle(2, 0xffff00);
        graphic2.strokeRect(this.zoneHoliay.x - this.zoneHoliay.input.hitArea.width / 2,
            this.zoneHoliay.y - this.zoneHoliay.input.hitArea.height / 2,
            this.zoneHoliay.input.hitArea.width, this.zoneHoliay.input.hitArea.height);
    }

    // Random the order of package and set up 
    packageSetup() {
        for (let i = 0; i < 3; i++) {
            this.packageStacked.push(
                this.add.image(config.width / 2, config.height / 2, 'pk' + i).setInteractive({ draggable: true }));
        }
    }

    // Manage drag and click event
    inputManager() {
        this.input.dragDistanceThreshold = 16;

        this.input.on('dragstart', function (pointer, gameObject) {
            this.children.bringToTop(gameObject);
            // gameObject.setTint(0xff0000);
            this.stop = true;
        }, this);

        this.input.on('dragstart', function (pointer, gameObject) {

            gameObject.setTint(0xff0000);

        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {

            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            gameObject.input.enabled = false;

        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {

            gameObject.clearTint();
            if (!dropped) {
                
                var tween = this.tweens.add({
                    targets: gameObject,
                    x: gameObject.input.dragStartX,
                    y: gameObject.input.dragStartY,
                    // delay: 1000,
                    duration: 1000,
                    ease: 'Linear'
                });
                // gameObject.x = gameObject.input.dragStartX;
                // gameObject.y = gameObject.input.dragStartY;

            }
            var timedEvent = this.time.delayedCall(1000, function () {
                this.stop = false;
            }, [], this);
        }, this);

    }

    // Package moves on track
    move(speed) {
        let i = 0;
        while (i < this.packageOnTrack.length) {
            if (this.packageOnTrack[i].x > config.width) {
                this.packageOnTrack[i].x = config.width / 2;
                this.packageStacked.push(this.packageOnTrack[i]);
                this.packageOnTrack.splice(i, 1)
                i--;
            } else {
                this.packageOnTrack[i].x += speed;
            }
            i++;
        }
    }


    onEvent() {
        if (this.packageStacked.length > 0)
            this.packageOnTrack.push(this.packageStacked.shift());
    }

}