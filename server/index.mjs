import * as alt  from 'alt';
import constants from '../common/modules/constants/index';
import utils     from '../common/modules/utils/index';

const callbacks = {};

function registerCallback(name, cb) {
  callbacks[name] = cb;
}

alt.onClient('altv-api:request', (player, name, id, ...args) => {

  if(callbacks[name] === undefined)
    return;
    
  callbacks[name](player, (...data) => {
    alt.emitClient(player, 'altv-api:response', id, ...data);
  }, ...args);

});

export default {
  
  constants,
  utils,

  registerCallback,
}

