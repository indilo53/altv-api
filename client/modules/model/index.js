import * as natives from 'natives'
import utils from '../../../common/modules/utils/index.js'

class Model {

  get loaded() {
    return !!natives.hasModelLoaded(this.hash);
  }

  constructor(hashOrName) {
    this.hash = (typeof hashOrName === 'number') ? utils.toSigned(hashOrName) : utils.joaat(hashOrName);
  }

  request(cache = false, timeout = 5000) {

    if (!natives.isModelInCdimage(this.hash) || !natives.isModelValid(this.hash)) {
      resolve(false);
      return;
    }

    natives.requestModel(this.hash);

    return utils.waitFor(() => this.loaded, timeout);

  }

  setAsNoLongerNeeded() {
    natives.setModelAsNoLongerNeeded(this.hash);
  }

  valueOf() {
    return this.hash;
  }

}

export default Model;
