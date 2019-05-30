import alt          from 'alt';
import natives      from 'natives';
import EventEmitter from 'events';

import utils          from '../../../common/modules/utils/index';
import Player         from '../player/index';
import GameplayCamera from '../gameplaycamera/index';

class Game extends EventEmitter {

  get camera() {
    return this._camera;
  }

  get maxPlayers() {
     return 32;
  }

  get player() {
    return this._player;
  }

  get players() {

    const players = [];

    for(let i=0, max = this.maxPlayers; i<max; i++)
      if(natives.networkIsPlayerActive(i))
        players.push(new Player(i));

    return players;
  }

  constructor() {
    
    super();
    
    this.bindEvents();

  }

  bindEvents() {

    alt.on('connectionComplete', async () => {

      let altPlayer;

      await utils.waitFor(() => {
        altPlayer = alt.getLocalPlayer();
        return altPlayer !== null;
      })

      this._camera = new GameplayCamera();
      this._player = new Player(altPlayer.id);

      this.emit('ready');

    });

  }
}

export default new Game();
