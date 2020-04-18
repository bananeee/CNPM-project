console.clear();
var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 610,
    parent: 'game_box',
    //backgroundColor: 0xffffff,
    scene: [Lesson2_Day, SceneChild1, SceneChild2_1],
  }
  
  var game = new Phaser.Game(config);
  