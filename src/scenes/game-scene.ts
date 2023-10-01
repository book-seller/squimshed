import * as Phaser from 'phaser';
import { Player } from '../player';

export class GameScene extends Phaser.Scene {

  player: Phaser.Physics.Arcade.Sprite
  platforms: Phaser.Physics.Arcade.StaticGroup
  walls: Phaser.Physics.Arcade.Group
  coins: Phaser.GameObjects.Group
  // topWall: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  topWall: Phaser.GameObjects.TileSprite

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(): void { }

  create(): void {
    this.cameras.main.setBounds(0, 0, 1000, 700);
    this.physics.world.setBounds(0, 0, 1000, 700);

    // this.add.image(400, 300, 'sky');

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    this.coins = this.add.group({
      defaultKey: 'coin',
    });
    
    this.coins = this.physics.add.group({
      key: 'coin',
      setXY: { x: 62, y: 150 },
      allowGravity: false
    })

    this.coins.create(550, 440, 'coin')
    this.coins.create(720, 300, 'coin')
    this.coins.create(690, 150, 'coin')

    this.walls = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
    // The wall sprite is 400x32 <- now it is 100 x 40
    // this.topWall = this.physics.add.image(400, 16, 'wall').setImmovable(true)
    this.topWall = this.add.tileSprite(400, 16, 800, 40, 'wall')
    // this.topWall.setScale(2, 1)
    // this.topWall.body.setAllowGravity(false);
    // Adding a wall to the walls group breaks everything. Weird. 
    this.walls.add(this.topWall)

    this.player = new Player(this, 100, 450);

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.physics.add.collider(this.player, this.topWall);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.coins, this.platforms);

    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
  }

  update(): void {
    // Move walls
    this.topWall.setY(this.topWall.y + .1)
    // Whyyyyyyy???!!!!
    this.player.update()
  }

  collectCoin(player, coin): void {
    // console.log('collectCoin() -> collision detected')
    coin.disableBody(true, true)
  }

}
