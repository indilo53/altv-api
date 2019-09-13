import * as alt     from 'alt';
import * as natives from 'natives';
import EventEmitter from 'events';

import utils          from '../../../common/modules/utils/index';
import Player         from '../player/index';
import GameplayCamera from '../gameplaycamera/index';

class Game extends EventEmitter {

  get camera() {
    return this._camera;
  }

  get maxPlayers() {
    return 512;
  }

  get player() {
    return alt.Player.local;
  }

  get players() {
    return alt.Player.all;
  }

  constructor() {
    
    super();

    this.mouseInputEnabled = true;

    this.processEvents();

  }

  processEvents() {

    alt.on('connectionComplete', async () => {
      
      await utils.waitFor(() => alt.Player.local !== null && alt.Player.local.scriptID !== null && alt.Player.local.scriptID > 0);

      this._camera = new GameplayCamera();

      this.emit('ready');

    });

    alt.everyTick(() => this.emit('tick'));

    this.on('tick', () => this.processControls());
  }

  enableMouseInput(enable = true) {
    this.mouseInputEnabled = enable;
  }
  
  processControls() {


    if(!this.mouseInputEnabled) {

      natives.disableControlAction(0, 1,   true);
      natives.disableControlAction(0, 2,   true);
      natives.disableControlAction(0, 14,  true);
      natives.disableControlAction(0, 15,  true);
      natives.disableControlAction(0, 24,  true);
      natives.disableControlAction(0, 25,  true);
      natives.disableControlAction(0, 37,  true);
      natives.disableControlAction(0, 142, true);

    }

    if(natives.isControlJustPressed(0, 142) || natives.isDisabledControlJustPressed(0, 142)) {
      this.emit('mousedown', 'left');
      this.emit('mousedown:left');
    }

    if(natives.isControlJustPressed(0, 25) || natives.isDisabledControlJustPressed(0, 25)) {
      this.emit('mousedown', 'right');
      this.emit('mousedown:right');
    }

    if(natives.isControlJustReleased(0, 122) || natives.isDisabledControlJustReleased(0, 142)) {
      this.emit('mouseup', 'left');
      this.emit('mouseup:left');
    }

    if(natives.isControlJustReleased(0, 25) || natives.isDisabledControlJustReleased(0, 25)) {
      this.emit('mouseup', 'right');
      this.emit('mouseup:right');
    }

  }

  enableMouseInput(enable = true) {
    this.mouseInputEnabled = enable;
  }

  waitClick() {

    return new Promise((resolve, reject) => {

      const lastEnabled = this.mouseInputEnabled;

      this.enableMouseInput(false);

      this.once('mousedown', (btn) => {

        this.enableMouseInput(lastEnabled);

        const {x, y} = alt.getCursorPos();
        resolve({btn, x, y});
      });

    });

  }
}

export default new Game();
