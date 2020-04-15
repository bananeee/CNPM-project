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
        this.add.image(config.width / 2, config.height / 2, 'background');
        this.pk0 = this.add.image(300, 400, "pk0").setInteractive({ draggable: true });
        this.pk2 = this.add.image(600, 400, "pk2").setInteractive({ draggable: true });

        this.pk0.input.dropZone = true;
        this.pk2.input.dropZone = true;

        this.input.dragDistanceThreshold = 0;

        this.input.on('dragstart', function(pointer, gameObject) {
            this.x = gameObject.x;
            this.y = gameObject.y;
            // console.log(this.x, this.y);

        }, this);

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.xx = this.pk2.x;
        this.yy = this.pk2.y;

        this.input.on('dragenter', function(pointer, gameObject, dropZone) {

            // dropZone.setTint(0x00ff00);
            // console.log(this.pk0.x, this.pk0.y);
            // console.log(dropZone.x, dropZone.y);

            // var xx = dropZone.x;
            // var yy = dropZone.y;

            dropZone.x = gameObject.input.dragStartX;
            dropZone.y = gameObject.input.dragStartY;

            // this.x = xx;
            // this.y = yy;
            // console.log(this.xx, this.yy);
        }, this);

        this.input.on('dragleave', function(pointer, gameObject, dropZone) {

            // dropZone.clearTint();
            // console.log(this.xx, this.yy);


        }, this);

        this.input.on('dragend', function(pointer, gameObject, dropped) {
            // console.log(this.x, this.y)
            if (dropped) {
                gameObject.x = this.xx;
                gameObject.y = this.yy;
            }

            console.log(this.xx, this.yy);

        }, this);



    }
}


// this.packageStaged = [];
// this.packageOnTrack = [];
// for (let i = 0; i < 3; i++) {
//     this.packageStaged.push(
//         this.add.image(config.width / 2, config.height / 2, 'pk' + i).setInteractive({ draggable: true }));
// }

// this.stop = 1;
// this.input.dragDistanceThreshold = 16;
// this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
//     gameObject.x = dragX;
//     gameObject.y = dragY;
//     var self = this;
//     self.stop = 1000;
// this.stop = 1000;
// });

// this.input.on('dragstart', function (pointer) {

//     stop = 1000;

// });
// this.input.on('dragend', function(pointer, gameObject) {

//     this.stop = false;

// });
// this.text1 = this.add.text(32, 32);
// this.text2 = this.add.text(32, 52);
// this.text3 = this.add.text(32, 72);
// this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.onEvent, callbackScope: this, loop: true });





// if (this.packageOnTrack.length != 0 && this.stop == 1) {
//     this.move(2);
// }
// this.text1.setText("Track " + this.packageOnTrack.length);
// this.text2.setText("Staged " + this.packageStaged.length);
// this.text3.setText("Stop " + this.stop);


// move(speed) {
//     let i = 0;
//     while (i < this.packageOnTrack.length) {
//         if (this.packageOnTrack[i].x > config.width) {
//             this.packageOnTrack[i].x = config.width / 2;
//             this.packageStaged.push(this.packageOnTrack[i]);
//             this.packageOnTrack.splice(i, 1)
//             i--;
//         } else {
//             this.packageOnTrack[i].x += speed;
//         }
//         i++;
//     }
// }

// onEvent() {
//     if (this.packageStaged.length > 0)
//         this.packageOnTrack.push(this.packageStaged.shift());
// }