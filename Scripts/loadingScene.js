class loadingScene extends Phaser.Scene {
    constructor() {
        super("loadGame");
    }

    preload() {
        // Load game assets
        this.load.image('batsman', 'assets/batsman.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('stamp', 'assets/stamp.png');
        this.load.image('bg', 'assets/bg.jpg');
        this.load.image('fielder', 'assets/fielder.png');
    }

    create(){
        this.add.text(20, 20, "Loading game...");
        this.scene.start("mainGame");
    }
}