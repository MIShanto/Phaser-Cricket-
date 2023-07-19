const config = {
  type: Phaser.AUTO,
  width: 785,
  height: 359,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [loadingScene, mainScene]
};

const game = new Phaser.Game(config);

