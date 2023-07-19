class mainScene extends Phaser.Scene {
    constructor() {
        super("mainGame");
    }

    cursors;
    batsman;
    ball;
    stamp;
    fielders;
    score = 0;
    scoreText;

    // Add a new variable to track the ball thrower's state
    ballThrower = {
    x: config.width/2 ,
    y: config.height/2 - 50,
    throwing: false
    };
    minDistanceThreshold = 150; // Adjust the threshold as needed.
  
    create() {
        // Create game objects and set up physics
      
        // Create the bg sprite
        this.background = this.add.image(0, 0, 'bg');
        this.background.setOrigin(0, 0);
      
        // Create the stamp sprite
        this.stamp = this.physics.add.sprite(config.width/2, config.height-10, 'stamp');
        this.stamp.setScale(0.3);
        //this.stamp.setCollideWorldBounds(true);
        this.stamp.setDepth(1);

        // Create the batsman sprite
        this.batsman = this.physics.add.sprite(config.width/2, config.height, 'batsman');
        this.batsman.setScale(0.2);
        this.batsman.setCollideWorldBounds(true);
        this.batsman.setGravityY(1000);
      
        // Create the ball thrower sprite
        this.ballThrower = this.physics.add.sprite(config.width/2, config.height/2 + 5, 'fielder');
        this.ballThrower.setCollideWorldBounds(true);
        this.ballThrower.setScale(0.1);

        // Create the ball sprite
        this.ball = this.physics.add.sprite(config.width/2, config.height/2, 'ball');
        this.ball.setCollideWorldBounds(true);
        //this.ball.setBounce(1);
        this.ball.setScale(0.03);
      
        // Create the fielder sprites
        this.fielders = this.physics.add.group({
          key: 'fielder',
          repeat: 3,
          setXY: { x: 100, y: 100, stepX: 200 }
        });
      
        this.fielders.children.iterate(function (fielder) {
          fielder.setCollideWorldBounds(true);
          fielder.setBounce(1);
          //chage scale
          fielder.setScale(0.2);
        });
      
        // Create the score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px'});
      
        // Enable keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
      
        // Set up collisions
        this.physics.add.overlap(this.ball, this.batsman, this.ballHitBatsman, null, this, true);
        this.physics.add.collider(this.ball, this.fielders, this.ballHitFielder, null, this);
    }
    
    update() {
        // Update game logic
        
        if (!this.ballThrower.throwing && Math.random() < 0.01) {
              // Start throwing the ball
              this.ballThrower.throwing = true;
              
              this.throwBall(this.ball);
        }
      
        // Check for user input, e.g., a mouse click or touch event.
        if (this.input.activePointer.isDown) {
            var randomXVelocity = 0;

            if (this.input.x < game.config.width / 2 - 50) {
                randomXVelocity = Phaser.Math.Between(0, game.config.width / 2 - 1000); // Adjust the range as needed.
            } 
            else if (this.input.x > game.config.width / 2 + 50) {
                randomXVelocity = Phaser.Math.Between(game.config.width / 2, game.config.width); // Adjust the range as needed.  
            } 

            // Calculate the distance between the player and the ball.
            var distance = Phaser.Math.Distance.Between(this.batsman.x, this.batsman.y, this.ball.x, this.ball.y);
            console.log(distance);

            // If the distance is below the threshold, add random velocity in the Y-axis.
            if (distance < this.minDistanceThreshold) {
                var randomYVelocity = Phaser.Math.Between(-500, -200);
                this.ball.setVelocity(randomXVelocity, randomYVelocity);
            }
        }
      
        // Update the score text
        this.scoreText.setText('Score: ' + this.score);
    }

    doBatting(){

    }
    throwBall(ball)
    {
        // Calculate the new velocity based on three given directions (example directions)
        const directionOptions = ['left', 'right', 'straight'];
        const chosenDirection = Phaser.Utils.Array.GetRandom(directionOptions);

        // Set the ball's velocity based on the chosen direction
        var ballVelocityY = 200;
        var ballVelocityX = 0;
        switch (chosenDirection) {
            case 'left':
            ballVelocityX = -50;
            break;
            case 'right':
            ballVelocityX = 50;
            break;
        } 
    // Apply the velocity to the ball.
    this.ball.setVelocity(ballVelocityX, ballVelocityY);

    }

    ballHitBatsman(ball, batsman) {
    // Handle ball hitting the batsman

    // Increment the score
    this.score += 1;

    }

    ballHitFielder(ball, fielder) {
    // Handle ball hitting a fielder

    // Game over logic
    this.physics.pause();
    this.ball.setTint(0xff0000);
    this.add.text(200, 200, 'Game Over', { fontSize: '48px', fill: '#000' });
    }

}