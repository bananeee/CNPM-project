class SceneChild2_1 extends Phaser.Scene {
    constructor() {
        super("Lesson3");
    }

    preload() {

        this.load.image('pk0', 'assets/Lesson2/card1.png');
        this.load.image('pk1', 'assets/Lesson1/Package1.png');
        this.load.image('pk2', 'assets/Lesson2/card2.png');
    }

    create() {
        this.zone1 = this.add.zone(19 / 229 * config.width, 0.63 * config.height, 105, 1000).setName(1).setInteractive();
        this.zone2 = this.add.zone(0.2 * config.width, 0.63 * config.height, 105, 1000).setName(2).setInteractive();
        this.zone2.input.dropZone = true;
        this.zone1.input.dropZone = true;
        var graphic1 = this.add.graphics();
        graphic1.lineStyle(2, 0xffff00);
        graphic1.strokeRect(this.zone1.x - this.zone1.input.hitArea.width / 2,
            this.zone1.y - this.zone1.input.hitArea.height / 2,
            this.zone1.input.hitArea.width, this.zone1.input.hitArea.height);
        var graphic2 = this.add.graphics();
        graphic2.lineStyle(2, 0xffff00);
        graphic2.strokeRect(this.zone2.x - this.zone2.input.hitArea.width / 2,
            this.zone2.y - this.zone2.input.hitArea.height / 2,
            this.zone2.input.hitArea.width, this.zone2.input.hitArea.height);



        this.text1 = this.add.text(32, 32);
        this.content = 0;

        this.pk0 = this.add.image(19 / 229 * config.width, 0.63 * config.height, "pk0").setName(1).setInteractive({ draggable: true });
        this.pk2 = this.add.image(0.2 * config.width, 0.63 * config.height, "pk2").setName(2).setInteractive({ draggable: true });

        this.dragS = false;
        this.zoneDragged;
        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            if (this.dragS == false) {
                //this.dragId = gameObject.name;
                this.zoneDragged = dropZone;
                this.dragS = true;
            } else {
                this.zoneDragged.setName(dropZone.name);
                //this.moveImage(zoneDragged)
                dropZone.setName(gameObject.name);
                this.zoneDragged = dropZone;
                
            }
            
            
        }, this);

        this.input.on('dragend', function (pointer, gameObject) {
            this.dragS = false;
        }, this);

        // this.input.on('dragstart', function(pointer, gameObject, dropZone) {
        //     this.dragId = gameObject.name;
        //     this.zoneDragged = dropZone;
        //     this.text1.setText([
        //         'x: ' + dropZone.x,
        //         'y: ' + dropZone.y
        //     ])
        // }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
        });


    }

    update() {
        //this.text1.text = this.content;
        // if (this.checkOverlap(this.pk0, this.pk2))
        // {
        //     this.text1.text = 'Overlapping: true';
        // }
        // else
        // {
        //     this.text1.text = 'Overlapping: false';
        // }
        if (this.dragS == true) {
            this.text1.setText([
                // 'x: ' + dropZone.x,
                // 'y: ' + dropZone.y
                this.zoneDragged.name
            ])
        }
        
    }

    // checkOverlap(image1, image2) {

    //     var boundsA = image1.getBounds();
    //     var boundsB = image2.getBounds();

    //     return Phaser.Rectangle.intersects(boundsA, boundsB);

    // }

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
