import alt from 'alt'
import natives from 'natives';
import EventEmitter from 'events';

import utils from '../../../common/modules/utils/index';
import game  from '../game/index';
import Ped   from '../ped/index';
import Model from '../model/index';

class Player extends EventEmitter {

  get exists() {
    return this.ped.exists;
  }

  get idle() {
    return this.ped.isTaskActive(CTASKS.CTaskPlayerIdles);
  }

  get maxArmour() {
    return natives.getPlayerMaxArmour(this.id);
  }

  set maxArmour(val) {
    natives.setPlayerMaxArmour(this.id, val);
  }

  set model(val) {
    natives.setPlayerModel(this.id, +val);
  }

  get model() {
    return this.ped.model;
  }

  get name() {
    return natives.getPlayerName(this.id);
  }

  get onFoot() {
    return this.ped.isCTaskActive(CTASKS.CTaskPlayerOnFoot);
  }

  get owned() {
    const localPlayer = alt.getLocalPlayer();
    return localPlayer !== null && this.id === localPlayer.id;
  }

  get ped() {
    const player = alt.players.find(e => e.id === this.id);
    return new Ped(player.scriptID);
  }

  constructor(id) {

    super();

    this.id  = id;
    this.sid = -1;
  }

  valueOf() {
    return this.id;
  }

}

export default Player;
