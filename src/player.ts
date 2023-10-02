import * as Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  walkSpeed: number = 235
  jumpSpeed: number = 550
  isDead: boolean
  jumpSound: Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // super(scene, x, y, 'derg', 0);
    super(scene, x, y, 'derg-spritesheet', 0);
    // Enable Player's Physics Body
    scene.physics.world.enable(this)
    this.setCollideWorldBounds(true);
    this.body.onCollide = true;

    this.jumpSound = scene.sound.add('jump')

    this.anims.create({
      key: 'stand',
      frames: [{ key: 'derg-spritesheet', frame: 0 }],
      frameRate: 20
    })

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('derg-spritesheet', { start: 1, end: 2 }),
      frameRate: 10,
      repeat: -1,
    })

    scene.add.existing(this)

    this.cursors = scene.input.keyboard.createCursorKeys()
  }

  update(): void {
    if (!this.isDead) {
      if (this.cursors.left.isDown) {
        this.setVelocityX(-this.walkSpeed);
        this.setFlip(true, false)
        this.anims.play('walk', true);
      }
      else if (this.cursors.right.isDown) {
        this.setVelocityX(this.walkSpeed);
        this.setFlip(false, false)
        this.anims.play('walk', true);
      }
      else {
        this.setVelocityX(0);
        this.anims.play('stand');
      }

      if (this.cursors.up.isDown && this.body.touching.down) {
        this.setVelocityY(-this.jumpSpeed)
        this.jumpSound.play()
      }
    }
  }
}
