import * as Phaser from 'phaser';
import { Player } from '../player';

export class GameScene extends Phaser.Scene {

  player: Phaser.Physics.Arcade.Sprite
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
    // Adding a wall to the walls group breaks everything. Weird. 
    // this.walls.add(topWall)

    this.player = new Player(this, 100, 450);

    this.physics.add.collider(this.player, this.topWall);
    this.physics.add.collider(this.player, this.platforms);
  }

  update(): void {
    this.topWall.setY(this.topWall.y + .1)
    // Whyyyyyyy???!!!!
    this.player.update()
  }

}
