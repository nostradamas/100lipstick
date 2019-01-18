import { ResourceLoader } from './app/base/ResourceLoader.js';
import { BackGround } from './app/runtime/BackGround.js';
import { UserName } from './app/runtime/UserName.js';
import { Coin } from './app/runtime/Coin.js';
import { Lipstick } from './app/player/Lipstick.js';
import { ShopButton } from './app/player/ShopButton.js';
import { ExitButton } from './app/player/ExitButton.js';
import { Shop } from './app/runtime/Shop.js';
import { Stage } from './app/runtime/Stage.js';
import { RecycleButton } from './app/player/RecycleButton.js';
import { DataStore } from './app/base/DataStore.js';
import { Director } from './app/Director.js';

export class Main {
  constructor() {
    this.canvas = document.getElementById('game_canvas');
    this.ctx = this.canvas.getContext('2d');
    this.dataStore = DataStore.getInstance();
    this.director = Director.getInstance();
    const loader = ResourceLoader.create();
    loader.onLoaded(map => this.onResourceFirstLoaded(map));
  }

  onResourceFirstLoaded(map) {
    this.dataStore.canvas = this.canvas;
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    this.director.isGameOver = true;
    this.dataStore.showShop = false;
    this.dataStore
      .put('background', BackGround)
      .put('username', UserName)
      .put('coin', Coin)
      .put('stage', Stage)
      .put('lipstick', Lipstick)
      .put('shopBtn', ShopButton)
      .put('recycleBtn', RecycleButton)
      .put('shop', Shop)
      .put('exitBtn', ExitButton);
    this.dataStore.get('background').draw();
    this.dataStore.get('username').draw();
    this.dataStore.get('coin').draw();
    this.dataStore.get('shopBtn').draw();
    this.dataStore.get('recycleBtn').draw();

    const stage = this.dataStore.get('stage');
    const stageX = [
      this.canvas.width / 4 - stage.width / 2,
      this.canvas.width / 2 - stage.width / 2,
      this.canvas.width / 2 + stage.width,
    ];
    const stageY = [
      this.canvas.height / 4 + this.canvas.height / 30,
      this.canvas.height / 4 + this.canvas.height / 30 * 2 + stage.height,
      this.canvas.height / 4 + this.canvas.height / 30 * 3 + stage.height * 2,
      this.canvas.height / 4 + this.canvas.height / 30 * 4 + stage.height * 3,
    ];
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 3; j++) {
        this.dataStore.get('stage').draw(stageX[i], stageY[j]);
      }
    }
    this.registerEvent();
  }

  init() {
    this.director.isGameOver = false;
    this.dataStore
      .put('background', BackGround);
    this.registerEvent();
    this.director.run();
  }

  registerEvent() {
    this.canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      const touches = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
      };
      if (!this.dataStore.showShop) {
        this.director.handleShopBtn(touches);
      } else {
        this.director.handleExitBtn(touches);
      }
    });
  }
}
