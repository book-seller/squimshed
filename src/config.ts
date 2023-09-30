import * as Phaser from 'phaser';
import { BootScene } from './scenes/boot-scene';
import { GameScene } from './scenes/game-scene';
import { MenuScene } from './scenes/menu-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Squimshed',
  url: 'https://github.com/book-seller/squimshed',
  version: '1.0.0',
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene, MenuScene, GameScene],
  input: {
    keyboard: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 750 },
      debug: false
    }
  },
  backgroundColor: '#2c2c2c',
};
