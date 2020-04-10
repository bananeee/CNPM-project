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
            //this.children.bringToTop(gameObject);
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


        this.input.on('dragend', function(pointer, gameObject) {
            this.stop = false;
            gameObject.clearTint();
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