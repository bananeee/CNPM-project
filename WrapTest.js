describe("Check Wrap Image Array", () => {
    it("Wrap 2 image", () => {

        let img1 = new Imagee(300, 400);
        let img2 = new Imagee(600, 400);

        img1.wrap(img2);
        console.log(img2.x);
        expect([img2.x, img2.y]).toEqual([300, 400]);
    })
})