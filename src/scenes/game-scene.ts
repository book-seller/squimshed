import * as Phaser from 'phaser';
import { Player } from '../player';

export class GameScene extends Phaser.Scene {

  player: Phaser.Physics.Arcade.Sprite
  platforms: Phaser.Physics.Arcade.StaticGroup
  walls: Phaser.Physics.Arcade.Group
  coins: Phaser.GameObjects.Group
  topWall: Phaser.Types.Physics.Arcade.ImageWithDynamicBody

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
      /*
      maxSize: 100,
      createCallback: function (alien) {
        alien.setName(`alien${this.getLength()}`);
        console.log('Created', alien.name);
      },
      removeCallback: function (alien) {
        console.log('Removed', alien.name);
      }
      */
    });
    
    // this.coins.create(62, 200)

    this.coins = this.physics.add.group({
      key: 'coin',
      setXY: { x: 62, y: 150 },
      allowGravity: false
    })

    this.coins.create(550, 440, 'coin')

    this.walls = this.physics.add.group();
    // The wall sprite is 400x32
    this.topWall = this.physics.add.image(400, 16, 'wall').setImmovable(true)
    this.topWall.setScale(2, 1)
    this.topWall.body.setAllowGravity(false);
    // Adding a wall to the walls group breaks everything. Weird. 
    // this.walls.add(topWall)

    this.player = new Player(this, 100, 450);

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.physics.add.collider(this.player, this.topWall);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.coins, this.platforms);

    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
  }

  update(): void {
    // Move walls
    // this.topWall.setY(this.topWall.y + .1)
    // Whyyyyyyy???!!!!
    this.player.update()
  }

  collectCoin(player, coin): void {
    // console.log('collectCoin() -> collision detected')
    coin.disableBody(true, true)
  }

}
