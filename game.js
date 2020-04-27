console.clear();
var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 610,
    parent: 'game_box',
    backgroundColor: 0xfffdf0,
    scene: [ SceneRoot,  SceneChild1, SceneEnd1,  SceneChoose, Lesson2_D,
            SceneEnd2D_1, SceneChild2D, Lesson2_A, SceneEnd2A_1, SceneChild2A, 
            SceneEnd2_2]
}

var game = new Phaser.Game(config);