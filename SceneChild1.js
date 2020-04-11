class SceneChild1 extends Phaser.Scene {
    constructor() {
        super("Lesson1");
    }

    preload() {
        this.load.image('background', 'assets/background.png');

        this.load.image('pk0', 'assets/Package0.png');
        this.load.image('pk1', 'assets/Package1.png');
        this.load.image('pk2', 'assets/Package2.png');
        this.load.image('pk3', 'assets/Package3.png');
        this.load.image('pk4', 'assets/Package4.png');
        this.load.image('pk5', 'assets/Package5.png');
        this.load.image('pk6', 'assets/Package6.png');

        this.load.image('trolleyLeft', 'assets/trolley_left.png');
        this.load.image('trolleyRight', 'assets/trolley_right.png');
    }

    create() {
        this.gameSetup();

        this.setUpDropzone();

        this.packageSetup();

        this.inputManager();

        // Repeatedly put package to the screen after a duration
        this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.onEvent, callbackScope: this, loop: true });

        // DEBUG TEXT
        this.text1 = this.add.text(32, 32, { fill: '0x32a852' });
        this.text2 = this.add.text(32, 52, { fill: '#32a852' });
        this.text3 = this.add.text(32, 72, { fill: '#32a852' });
        this.delay = 0;
        this.text4 = this.add.text(32, 92, { fill: '#32a852' });
        this.text100 = this.add.text(32, 112, { fill: '#32a852' });
    }

    update() {
        if (this.packageOnTrack.length != 0 && this.stop == false) {
            this.move(3);
        }

        this.text1.setText("Track " + this.packageOnTrack.length);
        this.text2.setText("Staged " + this.packageStacked.length);
        this.text3.setText("Stop " + this.stop);
        this.text4.setText("Delay " + this.delay);
        var pointer = this.input.activePointer;
        this.text100.setText([
            'x: ' + pointer.x,
            'y: ' + pointer.y
        ]);
    }

    gameSetup() {
        this.packageSize = { width: 200, height: 170 };

        this.stop = false; // stop all animation when dragging

        this.packageStacked = []; // package wait to be displayed
        this.packageOnTrack = []; // package is being displayed

        this.duration = 1000; // duration for animation
    }

    // Drop zone 
    setUpDropzone() {
        // this.zoneWeekDay = this.add.zone(0.23 * config.width, 0.78 * config.height, 0.46 * config.width, 0.46 * config.height).setRectangleDropZone(0.46 * config.width, 0.46 * config.height);
        // this.zoneWeekend = this.add.zone(0.77 * config.width, 0.78 * config.height, 0.46 * config.width, 0.46 * config.height).setRectangleDropZone(0.46 * config.width, 0.46 * config.height);

        this.zoneWeekDay = this.add.image(0.23 * config.width, 0.78 * config.height, "trolleyLeft").setName("weekDays").setInteractive();
        this.zoneWeekend = this.add.image(0.77 * config.width, 0.78 * config.height, "trolleyRight").setName("weeKends").setInteractive();

        this.zoneWeekend.input.dropZone = true;
        this.zoneWeekDay.input.dropZone = true;

        this.zoneWeekDay.setDisplaySize(0.46 * config.width, 0.46 * config.height);
        this.zoneWeekend.setDisplaySize(0.46 * config.width, 0.46 * config.height);

        // var graphic1 = this.add.graphics();
        // graphic1.lineStyle(2, 0xffff00);
        // graphic1.strokeRect(this.zoneWeekDay.x - this.zoneWeekDay.input.hitArea.width / 2,
        //     this.zoneWeekDay.y - this.zoneWeekDay.input.hitArea.height / 2,
        //     this.zoneWeekDay.input.hitArea.width, this.zoneWeekDay.input.hitArea.height);
        // var graphic2 = this.add.graphics();
        // graphic2.lineStyle(2, 0xffff00);
        // graphic2.strokeRect(this.zoneWeekend.x - this.zoneWeekend.input.hitArea.width / 2,
        //     this.zoneWeekend.y - this.zoneWeekend.input.hitArea.height / 2,
        //     this.zoneWeekend.input.hitArea.width, this.zoneWeekend.input.hitArea.height);
    }

    // Random the order of package and set up 
    packageSetup() {
        var packages = [];
        for (let i = 0; i < 7; i++) {
            if (i < 5)
                packages.push(this.add.image(-this.packageSize.width, config.height * 0.33, 'pk' + i).setName(i).setInteractive({ draggable: true }), );
            else
                packages.push(this.add.image(-this.packageSize.width, config.height * 0.33, 'pk' + i).setName(i).setInteractive({ draggable: true }), );
        }

        while (packages.length > 0) {
            var index = Math.floor(Math.random() * packages.length);
            this.packageStacked.push(packages[index]);
            packages.splice(index, 1);
        }
    }

    // Manage drag and click event
    inputManager() {
        this.input.dragDistanceThreshold = 0;

        this.input.on('dragstart', function(pointer, gameObject) {
            this.children.bringToTop(gameObject);
            // gameObject.setTint(0xff0000);
            this.stop = true;
            this.timedEvent.paused = true; // these two stop and timeEvent must go together
        }, this);

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        }, this);

        this.input.on('drop', function(pointer, gameObject, dropZone) {
            if ((dropZone.name === "weekDays" && gameObject.name < 5) ||
                dropZone.name === "weeKends" && gameObject.name >= 5) {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                this.correctDrop = true;
            } else {
                this.tweenItem(gameObject, gameObject.input.dragStartX, gameObject.input.dragStartY);
                this.correctDrop = false;
            }

        }, this);

        this.input.on('dragend', function(pointer, gameObject, dropped) {
            gameObject.input.enabled = false;
            gameObject.clearTint();
            if (!dropped) {
                this.tweenItem(gameObject, gameObject.input.dragStartX, gameObject.input.dragStartY);
            }
            var timedEvent = this.time.delayedCall(this.duration, function() {
                this.stop = false;
                this.timedEvent.paused = false;
                if (this.correctDrop = false)
                    gameObject.input.enabled = true;
            }, [], this);

        }, this);

    }

    // Package moves on track
    move(speed) {
        let i = 0;
        while (i < this.packageOnTrack.length) {
            if (this.packageOnTrack[i].x > config.width + this.packageSize.width / 2) { // end position
                this.packageOnTrack[i].x = -config.width / 2; // start position
                this.packageStacked.push(this.packageOnTrack[i]);
                this.packageOnTrack.splice(i, 1)
                i--;
            } else {
                this.packageOnTrack[i].x += speed;
            }
            i++;
        }
    }

    tweenItem(gameObject, desX, desY) {
        var tween = this.tweens.add({
            targets: gameObject,
            x: desX,
            y: desY,
            duration: this.duration,
            ease: 'Linear'
        });
    }

    onEvent() {
        this.delay++;
        if (this.packageStacked.length >= 0)
            this.packageOnTrack.push(this.packageStacked.shift());
    }


}