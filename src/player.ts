import * as Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys

    walkSpeed: number = 235
    jumpSpeed: number = 550

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'derg', 0);
        // Enable Player's Physics Body
        scene.physics.world.enable(this)
        // All of these attempts to enable the body failed, sigh
        // scene.game.physics.arcade.enableBody(this);
        // scene.physics.add.sprite(x, y, 'dude')
        // this.enableBody();
        // this.anchor.setTo(0.5, 0);
        // Bounce = artificial difficulty
        // this.setBounce(0.2);
        this.setCollideWorldBounds(true);

        // This enables the world 'collide' event, which will be detected by the scene collider
        this.body.onCollide = true;

        // TODO: Bring this back when we have dragon animations
        /*
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        */

        scene.add.existing(this);

        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    update(): void {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.walkSpeed);
      
            // this.anims.play('left', true);
          }
          else if (this.cursors.right.isDown) {
            this.setVelocityX(this.walkSpeed);
      
            // this.anims.play('right', true);
          }
          else {
            this.setVelocityX(0);
      
            // this.anims.play('turn');
          }
      
          if (this.cursors.up.isDown && this.body.touching.down) {
            this.setVelocityY(-this.jumpSpeed);
          }

          // This doesn't work
          /*
          if (this.body.touching.up && this.body.touching.down) {
            console.log('Squimshed!')
          }
          */
    }
}
