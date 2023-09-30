import * as Phaser from 'phaser';

export class GameScene extends Phaser.Scene {

  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  platforms: Phaser.Physics.Arcade.StaticGroup
  walls: Phaser.Physics.Arcade.Group
  topWall: Phaser.Types.Physics.Arcade.ImageWithDynamicBody

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(): void {}

  create(): void {
    this.add.image(400, 300, 'sky');

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    this.walls = this.physics.add.group();
    // The wall sprite is 400x32
    this.topWall = this.physics.add.image(400, 16, 'wall').setImmovable(true)
    this.topWall.setScale(2, 1)
    this.topWall.body.setAllowGravity(false);
    // This breaks everything. Weird. 
    // this.walls.add(topWall)

    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

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

    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.player, this.topWall);
    this.physics.add.collider(this.player, this.platforms);
  }

  update(): void {
    this.topWall.setY(this.topWall.y + .1)

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    }
    else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

}
