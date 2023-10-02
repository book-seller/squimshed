import * as Phaser from 'phaser';
import { Player } from '../player';

export class GameScene extends Phaser.Scene {
  // Sprites
  player: Player
  stonePlatforms: Phaser.Physics.Arcade.Group
  walls: Phaser.Physics.Arcade.Group
  coins: Phaser.GameObjects.Group
  topWall: Phaser.GameObjects.TileSprite
  bottomWall: Phaser.GameObjects.TileSprite
  leftWall: Phaser.GameObjects.TileSprite
  woodPlatforms: Phaser.Physics.Arcade.Group
  coinsLeftText: Phaser.GameObjects.Text
  // Colliders
  playerWallCollider: Phaser.Physics.Arcade.Collider
  playerStoneCollider: Phaser.Physics.Arcade.Collider
  playerWoodCollider: Phaser.Physics.Arcade.Collider

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(): void {
    // TODO: May need to initialize a lot of our fields as empty here so we can easily restart the level on death
    // Sprites
    this.stonePlatforms = undefined
    this.coins = undefined
    this.walls = undefined
    this.topWall = undefined
    this.bottomWall = undefined
    this.leftWall = undefined
    this.woodPlatforms = undefined
    this.player = undefined
    this.coinsLeftText = undefined
    // Colliders
    this.playerWallCollider = undefined
    this.playerStoneCollider = undefined
    this.playerWoodCollider = undefined
  }

  create(): void {
    this.cameras.main.setBounds(0, 0, 1000, 700);
    this.physics.world.setBounds(0, 0, 1000, 700);
    // Stone Platforms
    // this.stonePlatforms = this.physics.add.staticGroup();
    this.stonePlatforms = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
    this.stonePlatforms.add(this.add.tileSprite(180, 510, 40, 80, 'stone'))
    // Wood Platforms
    // Old platform.png is 400 x 32
    this.woodPlatforms = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
    this.woodPlatforms.add(this.add.tileSprite(750, 220, 400, 40, 'wood'))
    this.woodPlatforms.add(this.add.tileSprite(50, 250, 400, 40, 'wood'))
    this.woodPlatforms.add(this.add.tileSprite(600, 400, 400, 40, 'wood'))
    this.woodPlatforms.add(this.add.tileSprite(400, 568, 800, 40, 'wood'))
    // Treasures
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
    // Crushing walls
    this.walls = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
    this.topWall = this.add.tileSprite(440, 16, 800, 40, 'wall')
    this.walls.add(this.topWall)
    this.bottomWall = this.add.tileSprite(440, 600, 800, 40, 'wall')
    this.walls.add(this.bottomWall)
    this.leftWall = this.add.tileSprite(0, 400, 40, 800, 'wall')
    this.walls.add(this.leftWall)

    this.player = new Player(this, 100, 450);

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.coinsLeftText = this.add.text(30, 530, 'Coins Left: 4').setFontFamily('Monospace').setFontSize(32)
      .setColor('#fff').setScrollFactor(0, 0)

    this.playerWallCollider = this.physics.add.collider(this.player, this.walls, this.playerWallCollideCheck, null, this);
    this.playerStoneCollider = this.physics.add.collider(this.player, this.stonePlatforms);
    this.playerWoodCollider = this.physics.add.collider(this.player, this.woodPlatforms);

    /*
    this.physics.world.on('collide', (gameObject1, gameObject2) => {
      let collidedPlayer
      let collidedTopWall

      if (gameObject1 == this.player && gameObject2 == this.topWall) {
        console.log('[game-scene -> collide check] gameObject1 == this.player && gameObject2 == this.topWall')
        collidedPlayer = gameObject1
        collidedTopWall = gameObject2
      }
      if (gameObject1 == this.topWall && gameObject2 == this.player) {
        console.log('[game-scene -> collide check] gameObject1 == this.topWall && gameObject2 == this.player')
        collidedTopWall = gameObject1
        collidedPlayer = gameObject2
      }

      if (collidedPlayer && collidedTopWall && this.player.body.touching.up) {
        console.log('Touching up on wall - squimsh potential')
      }

      gameObject1.setAlpha(0.5);
      gameObject2.setAlpha(0.5);
    });
    */

    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
    this.physics.add.overlap(this.player, this.walls, this.playerWallOverlapCheck, null, this);
    this.physics.add.overlap(this.player, this.stonePlatforms, this.playerPlatformOverlapCheck, null, this);
    this.physics.add.overlap(this.player, this.woodPlatforms, this.playerPlatformOverlapCheck, null, this);
  }

  update(): void {
    // Move walls
    this.topWall.setY(this.topWall.y + .1)
    this.bottomWall.setY(this.bottomWall.y - .1)
    this.leftWall.setX(this.leftWall.x + .1)
    // Whyyyyyyy???!!!!
    this.player.update()
    // Death animation 
    if (this.player.isDead) {
      this.playOutDeath()
    }
  }

  playerWallCollideCheck(gameObject1, gameObject2): void {
    if (gameObject1 == this.leftWall || gameObject2 == this.leftWall) {
      console.log('playerWallCollideCheck() -> player is colliding with left wall')
      // Attempt to "help" Phaser's poor physics code
      if (this.player.getLeftCenter().x < this.leftWall.getRightCenter().x) {
        console.log('playerWallCollideCheck() -> trying to push player to right')
        this.player.setX(this.leftWall.getRightCenter().x + (this.player.width / 2));
      }
    }
  }

  playerPlatformOverlapCheck(gameObject1, gameObject2): void {
    this.die();
  }

  playerWallOverlapCheck(gameObject1, gameObject2): void {
      // console.log('Squimshed!');
      if (gameObject1 == this.topWall || gameObject2 == this.topWall) {
        // topWall overlaps work
        this.die();
      } else {
        // Need to do a more precise check for actual overlap of bottomWall
        // const _bottomWall: Phaser.GameObjects.TileSprite = gameObject1 == this.bottomWall ? gameObject1 : gameObject2
        /*
        const _bottomWallTopY = this.bottomWall.getTopCenter().y
        const _playerBottomY = this.player.getBottomCenter().y
        console.log(`playerWallOverlapCheck() -> Overlapping bottomWall | _bottomWallTopY = ${_bottomWallTopY} | _playerBottomY = ${_playerBottomY}`)
        */
      }
      
  }

  collectCoin(player, coin): void {
    // Can't collect when you're dead
    if (this.player.isDead) { return }

    coin.disableBody(true, true)
    this.coinsLeftText.setText('Coins Left: ' + this.coins.countActive(true))
    if (this.coins.countActive(true) < 1) {
      // Move to next scene
      // Scene.shutdown()
      this.scene.start()
    }
  }

  die(): void {
    if (!this.player.isDead) {
      this.player.isDead = true

      this.playerWallCollider.destroy()
      this.playerStoneCollider.destroy()
      this.playerWoodCollider.destroy()
      this.player.setCollideWorldBounds(false)

      this.player.setVelocityX(0)
      this.player.setVelocityY(-800)
    }
  }

  playOutDeath(): void {
    if (!Phaser.Geom.Rectangle.Overlaps(this.physics.world.bounds, this.player.getBounds())) {
      // console.log('update() -> Dead Player is out of bounds')
      if (this.player.y > this.physics.world.bounds.height * 2) {
        // console.log('update() -> Dead Player has fallen out of the world. Restarting scene.')
        this.scene.start()
      }
    }
  }

}
