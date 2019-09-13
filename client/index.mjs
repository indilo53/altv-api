import * as alt from 'alt';

/* Common */
import constants from '../common/modules/constants/index';
import hashes from '../common/modules/hashes/index';
import utils from '../common/modules/utils/index';
import math from '../common/modules/math/index';

/* Client */
import game from './modules/game/index';
import helpers from './modules/helpers/index';
import tasks from './modules/tasks/index';

import Camera from './modules/camera/index';
import Entity from './modules/entity/index';
import Model from './modules/model/index';
import Ped from './modules/ped/index';
import PedComponentCollection from './modules/pedcomponentcollection/index'
import Player from './modules/player/index';

const callbacks  = {};
let   callbackId = 0;

alt.onServer('altv-api:response', (id, ...args) => {

  if(callbacks[id] !== undefined) {

    callbacks[id](...args);
    delete callbacks[id];
  
  }

});

function request(name, cb, ...args) {

  const id      = (callbackId + 1 < 1000000) ? callbackId + 1 : 0;
  callbacks[id] = cb;

  alt.emitServer('altv-api:request', name, id, ...args);

  callbackId = id;
}

function requestp(name, ...args) {
  return new Promise((resolve, reject) => {
    request(name, resolve, ...args);
  });
}

export default {

  constants,
  hashes,
  utils,
  math,

  game,
  helpers,
  tasks,

  types: {
    Camera,
    Entity,
    Model,
    Ped,
    PedComponentCollection,
    Player,
    Vehicle: alt.Vehicle
  },

  request,
  requestp,
}
