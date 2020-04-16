class SceneChild2_1 extends Phaser.Scene {
    constructor() {
        super("Lesson3");
    }

    preload() {
   
        this.load.image('pk0', 'assets/Lesson1/Package0.png');
        this.load.image('pk1', 'assets/Lesson1/Package1.png');
        this.load.image('pk2', 'assets/Lesson1/Package2.png');
    }

    create() {
        this.zoneWeekDay = this.add.image(0.23 * config.width, 0.78 * config.height, "trolleyLeft").setName("weekDays").setInteractive();
        this.zoneWeekDay = this.add.image(0.23 * config.width, 0.78 * config.height, "trolleyLeft").setName("weekDays").setInteractive();
        
        this.text1 = this.add.text(32, 32);
        this.content = 0;

        this.pk0 = this.add.image(300, 400, "pk0").setInteractive({ draggable: true });
        this.pk2 = this.add.image(600, 400, "pk2").setInteractive({ draggable: true });

        this.input.dragDistanceThreshold = 0;
        
        // this.physics.add.existing(this.pk0);
        // this.physics.add.existing(this.pk2);

        this.input.on('dragenter', function(pointer, gameObject, dropZone) {
            dropZone.setTint(0xcdd1ce);
            if (dropZone.name === "weekDays") this.nametagLetf.setTint(0xcdd1ce);
            else
                this.nametagRight.setTint(0xcdd1ce);
        }, this);

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
        });

        
    }

    update() {
        this.text1.text = this.content;
        // if (this.checkOverlap(this.pk0, this.pk2))
        // {
        //     this.text1.text = 'Overlapping: true';
        // }
        // else
        // {
        //     this.text1.text = 'Overlapping: false';
        // }
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
