import * as Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = []
    private music: Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound
  
    constructor() {
      super({
        key: 'MenuScene'
      });
    }
  
    init(): void {
      this.startKey = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.S
      );
      this.startKey.isDown = false
    }
  
    create(): void {
      this.add.text(100, 200, 'Squimshed!', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' })
      this.add.text(100, 400, 'Press S to get squimshed!').setFontFamily('Arial').setFontSize(32).setColor('#ffff00')

      this.music = this.sound.add('intro')
      this.music.play()
    }
  
    update(): void {
      if (this.startKey.isDown) {
        this.music.stop()
        this.scene.start('GameScene')
      }
    }
  }
  