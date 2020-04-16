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

        this.zone1 = this.add.zone(300, 400, 210, 165).setName("0").setRectangleDropZone(210, 165);
        this.zone2 = this.add.zone(700, 400, 210, 165).setName("1").setRectangleDropZone(210, 165);
        this.zone3 = this.add.zone(1100, 400, 210, 165).setName("2").setRectangleDropZone(210, 165);

        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokeRect(this.zone1.x - this.zone1.input.hitArea.width / 2, this.zone1.y - this.zone1.input.hitArea.height / 2, this.zone1.input.hitArea.width, this.zone1.input.hitArea.height);
        graphics.strokeRect(this.zone2.x - this.zone2.input.hitArea.width / 2, this.zone2.y - this.zone2.input.hitArea.height / 2, this.zone2.input.hitArea.width, this.zone2.input.hitArea.height);
        graphics.strokeRect(this.zone3.x - this.zone3.input.hitArea.width / 2, this.zone3.y - this.zone3.input.hitArea.height / 2, this.zone3.input.hitArea.width, this.zone3.input.hitArea.height);

        this.pk0 = this.add.image(300, 400, "pk0").setName("0").setInteractive({ draggable: true });
        this.pk1 = this.add.image(700, 400, "pk1").setName("1").setInteractive({ draggable: true });
        this.pk2 = this.add.image(1100, 400, "pk2").setName("2").setInteractive({ draggable: true });

        this.refname = {
            "0": this.pk0,
            "1": this.pk1,
            "2": this.pk2
        };

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
        }, this);

        this.input.on('dragenter', function(pointer, gameObject, dropZone) {
            if (gameObject.name != dropZone.name) {

                // Doi tao do
                var temp = dropZone.x;

                this.refname[dropZone.name].x = gameObject.input.dragStartX;

                gameObject.input.dragStartX = temp;


                // Doi Ten Image
                var tempName = this.refname[dropZone.name].name;
                var tempNameGameObject = gameObject.name;

                this.refname[dropZone.name].setName(gameObject.name);

                gameObject.setName(tempName);



                // Doi ten Object
                var tempObject = this.refname[dropZone.name];

                this.refname[dropZone.name] = this.refname[tempNameGameObject];

                this.refname[tempNameGameObject] = tempObject;



                // console.log(this.refname[dropZone.name].name, dropZone.name);

            }

        }, this);

        this.input.on('dragend', function(pointer, gameObject, dropped) {
            gameObject.x = gameObject.input.dragStartX;

            // console.log(this.pk0.input.dragStartX);

        }, this);






        // this.pk0 = this.add.image(300, 400, 'pk0').setName("0").setInteractive({ draggable: true });
        // this.pk1 = this.add.image(600, 400, "pk1").setName("1").setInteractive({ draggable: true });
        // this.pk2 = this.add.image(900, 400, "pk2").setName("2").setInteractive({ draggable: true });

        // this.pk0.input.dropZone = true;
        // this.pk1.input.dropZone = true;
        // this.pk2.input.dropZone = true;

        // this.input.on('dragstart', function(pointer, gameObject) {

        // }, this);





        // this.input.on('dragleave', function(pointer, gameObject, dropZone) {

        // }, this);






    }
}