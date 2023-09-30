import * as Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];
  
    constructor() {
      super({
        key: 'MenuScene'
      });
    }
  
    init(): void {
      this.startKey = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.S
      );
      this.startKey.isDown = false;
    }
  
    create(): void {
      this.add.text(100, 200, 'Squimshed!', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });

      this.add.text(100, 400, 'Press S to get squimshed!').setFontFamily('Arial').setFontSize(32).setColor('#ffff00');
      /*
      this.bitmapTexts.push(
        this.add.bitmapText(
          this.sys.canvas.width / 2 - 120,
          this.sys.canvas.height / 2,
          'font',
          'PRESS S TO PLAY',
          30
        )
      );
  
      this.bitmapTexts.push(
        this.add.bitmapText(
          this.sys.canvas.width / 2 - 120,
          this.sys.canvas.height / 2 - 100,
          'font',
          'Dragon Cave',
          100
        )
      );
      */
    }
  
    update(): void {
      if (this.startKey.isDown) {
        this.scene.start('GameScene');
      }
    }
  }
  