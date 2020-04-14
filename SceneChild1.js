class SceneChild1 extends Phaser.Scene {
    constructor() {
        super("Lesson1");
    }

    preload() {
        this.load.image('background', 'assets/background.png');

        this.load.image('pk0', 'assets/SceneChild1/Package0.png');
        this.load.image('pk1', 'assets/SceneChild1/Package1.png');
        this.load.image('pk2', 'assets/SceneChild1/Package2.png');
        this.load.image('pk3', 'assets/SceneChild1/Package3.png');
        this.load.image('pk4', 'assets/SceneChild1/Package4.png');
        this.load.image('pk5', 'assets/SceneChild1/Package5.png');
        this.load.image('pk6', 'assets/SceneChild1/Package6.png');

        this.load.image('trolleyLeft', 'assets/SceneChild1/trolley_left.png');
        this.load.image('trolleyRight', 'assets/SceneChild1/trolley_right.png');

        this.load.image('nameTag_left', 'assets/SceneChild1/trolley_left_nametag.png');
        this.load.image('nametag_right', 'assets/SceneChild1/trolley_right_nametag.png');
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
        if (this.packageOnTrack.length != 0 && !this.stop) {
            this.move(3);
        }

        // this.text1.setText("Track " + this.packageOnTrack.length);
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
        this.packageSize = { width: 210, height: 165 };

        this.stop = false; // stop all animation when dragging

        this.packageStacked = []; // package wait to be displayed
        this.packageOnTrack = []; // package is being displayed

        this.duration = 1000; // duration for animation

        this.slotWeekday = 0;
        this.slotWeekend = 5;

        this.packageSlot = [{ x: 0.085 * config.width, y: 0.8 * config.height }, { x: 0.22 * config.width, y: 0.8 * config.height },
            { x: 0.36 * config.width, y: 0.8 * config.height }, { x: 0.113 * config.width, y: 0.611 * config.height },
            { x: 0.25 * config.width, y: 0.611 * config.height }, { x: 0.67 * config.width, y: 0.8 * config.height },
            { x: 0.825 * config.width, y: 0.8 * config.height }
        ];

        this.coordinate_nametag = {
            left: { x: 234, y: 582 },
            right: { x: 789, y: 582 }
        }
    }

    // Drop zone 
    setUpDropzone() {
        // this.zoneWeekDay = this.add.zone(0.23 * config.width, 0.78 * config.height, 0.46 * config.width, 0.46 * config.height).setRectangleDropZone(0.46 * config.width, 0.46 * config.height);
        // this.zoneWeekend = this.add.zone(0.77 * config.width, 0.78 * config.height, 0.46 * config.width, 0.46 * config.height).setRectangleDropZone(0.46 * config.width, 0.46 * config.height);

        this.zoneWeekDay = this.add.image(0.23 * config.width, 0.78 * config.height, "trolleyLeft").setName("weekDays").setInteractive();
        this.zoneWeekend = this.add.image(0.77 * config.width, 0.78 * config.height, "trolleyRight").setName("weeKends").setInteractive();

        this.nametagLetf = this.add.image(this.coordinate_nametag.left.x, this.coordinate_nametag.left.y, "nameTag_left");
        this.nametagRight = this.add.image(this.coordinate_nametag.right.x, this.coordinate_nametag.right.y, "nametag_right");

        this.nametagLetf.setDisplaySize(410 - 60, 60 - 5);
        this.nametagRight.setDisplaySize(410 - 60, 60 - 5);

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
            packages.push(this.add.image(-this.packageSize.width / 2, config.height * 0.33, 'pk' + i).setName(i).setInteractive({ draggable: true }));
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
            gameObject.setTint(0xff0000);
            this.stop = true;
            this.timedEvent.paused = true; // these two stop and timeEvent must go together
        }, this);

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        }, this);


        this.input.on('dragenter', function(pointer, gameObject, dropZone) {
            dropZone.setTint(0xcdd1ce);
            if (dropZone.name === "weekDays") this.nametagLetf.setTint(0xcdd1ce);
            else
                this.nametagRight.setTint(0xcdd1ce);
        }, this);

        this.input.on('dragleave', function(pointer, gameObject, dropZone) {
            dropZone.clearTint();
            this.nametagLetf.clearTint();
            this.nametagRight.clearTint();

        }, this);


        this.correctDrop = false; // checking if drop correctly
        this.input.on('drop', function(pointer, gameObject, dropZone) {
            if ((dropZone.name === "weekDays" && gameObject.name < 5) ||
                dropZone.name === "weeKends" && gameObject.name >= 5) {

                this.packageOnTrack.splice(this.findPackageByName(gameObject.name), 1);

                this.correctDrop = true;
                var packagePos;
                if (dropZone.name === "weekDays" && gameObject.name < 5) {
                    packagePos = this.packageSlot[this.slotWeekday];
                    this.slotWeekday++;
                } else {
                    packagePos = this.packageSlot[this.slotWeekend];
                    this.slotWeekend++;
                }
                gameObject.setScale(1 / 1.5);
                this.tweenItem(gameObject, packagePos.x, packagePos.y, this.duration);

            } else {
                // Fill color nametags
                if (dropZone.name === "weekDays") {
                    this.nametagLetf.setTint(0xe8200e);
                } else
                    this.nametagRight.setTint(0xe8200e);

                this.correctDrop = false;
            }
        }, this);

        this.input.on('dragend', function(pointer, gameObject, dropped) {
            gameObject.input.enabled = false;
            gameObject.clearTint();
            
            if (!dropped) {
                this.tweenItem(gameObject, gameObject.input.dragStartX, gameObject.input.dragStartY, this.duration);
            } else if (dropped && !this.correctDrop) {
                var timedEvent = this.time.delayedCall(500, function() {
                    this.tweenItem(gameObject, gameObject.input.dragStartX, gameObject.input.dragStartY, this.duration - 500);
                }, [], this);
            }

            var timedEvent = this.time.delayedCall(this.duration, function() {
                this.stop = false;
                this.nametagLetf.clearTint();
                this.nametagRight.clearTint();
                this.timedEvent.paused = false;
                if ((dropped && !this.correctDrop) || !dropped) {
                    gameObject.input.enabled = true;
                }
            }, [], this);

        }, this);

    }

    // Package moves on track
    move(speed) {
        let i = 0;
        while (i < this.packageOnTrack.length) {
            if (this.packageOnTrack[i].x >= config.width + this.packageSize.width / 2) { // end position
                // this.packageOnTrack[i].x = -config.width / 2; 
                this.packageOnTrack[i].x = -this.packageSize.width / 2; // start position
                this.packageStacked.push(this.packageOnTrack[i]);
                this.packageOnTrack.splice(i, 1)
                i--;
            } else {
                this.packageOnTrack[i].x += speed;
            }
            i++;
        }
    }

    // moving item to position
    tweenItem(gameObject, desX, desY, durations) {
        var tween = this.tweens.add({
            targets: gameObject,
            x: desX,
            y: desY,
            duration: durations,
            ease: 'Linear'
        });
    }

    findPackageByName(name) {
        let i = 0;
        while (i < this.packageOnTrack.length) {
            if (this.packageOnTrack[i].name == name) {
                return i;
            } else {
                i++;
            }
        }
    }

    onEvent() {
        this.delay++;
        if (this.packageStacked.length > 0) {
            this.packageOnTrack.push(this.packageStacked.shift());
        }

    }

}