class Imagee {
    constructor(xx, yy) {
        this.x = xx;
        this.y = yy;
    }

    wrap(image) {
        let temp = this.x;
        this.x = image.x;
        image.x = temp;

        temp = this.y;
        this.y = image.y;
        image.y = temp;

    }
}