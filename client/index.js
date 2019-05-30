/* Common */
import constants from '../common/modules/constants/index';
import hashes from '../common/modules/hashes/index';
import utils from '../common/modules/utils/index';
import math from '../common/modules/math/index';

/* Client */
import game from './modules/game/index';
import tasks from './modules/tasks/index';

import Camera from './modules/camera/index';
import Entity from './modules/entity/index';
import Model from './modules/model/index';
import Ped from './modules/ped/index';
import PedComponentCollection from './modules/pedcomponentcollection/index'
import Player from './modules/player/index';

export default {

  constants,
  hashes,
  utils,
  math,

  game,
  tasks,

  types: {
    Camera,
    Entity,
    Model,
    Ped,
    PedComponentCollection,
    Player,
  },

}

