console.clear();
var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 610,
    parent: 'game_box',
    backgroundColor: 0xfffdf0,
    scene: [SceneEnd2_1,SceneRoot, Lesson2_Day, SceneChild1, SceneEnd1, SceneChild2D, 
             SceneEnd2_2, SceneChoose]
}

var game = new Phaser.Game(config);