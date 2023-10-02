import * as Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys
    walkSpeed: number = 235
    jumpSpeed: number = 550
    isDead: boolean
    jumpSound: Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'derg', 0);
        // Enable Player's Physics Body
        scene.physics.world.enable(this)
        this.setCollideWorldBounds(true);
        this.body.onCollide = true;

        this.jumpSound = scene.sound.add('jump')

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
      if (!this.isDead) {
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
          this.setVelocityY(-this.jumpSpeed)
          this.jumpSound.play()
        }
      }
    }
}
