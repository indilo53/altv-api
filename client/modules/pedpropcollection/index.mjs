import * as natives from 'natives';

import constants from '../../../common/modules/constants/index';

const { PED_PROPS } = constants;

class PedPropCollection  {

  constructor(ped, data = {}) {

    this.ped = ped;
    this.set(data);
    
  }

  get() {

    const data = {};

    for(let k in PED_PROPS)
      if(PED_PROPS.hasOwnProperty(k))
        data[PED_PROPS[k]] = this[PED_PROPS[k]];

     return data;
  }

  set(data = {}) {

    for(let k in PED_PROPS)
      if(PED_PROPS.hasOwnProperty(k) && data[PED_PROPS[k]] !== undefined)
        this[PED_PROPS[k]] = data[PED_PROPS[k]];
  }

  drawableCount(prop) {
    return natives.getNumberOfPedPropDrawableVariations(this.ped.handle, prop);
  }

  textureCount(prop, drawable) {
    return natives.getNumberOfPedTextureVariations(this.ped.handle, prop, drawable);
  }

  *data() {

    for(let k in PED_PROPS) {
      if(PED_PROPS.hasOwnProperty(k)) {
        const prop = PED_PROPS[k];
        yield this[prop];
      }
    }

  }

  setDefault() {
    for(let k in PED_PROPS) {
      if(PED_PROPS.hasOwnProperty(k)) {
        const prop = PED_PROPS[k];
        natives.clearPedProp(this.ped.handle, prop);
      }
    }
  }

}

for(let k in PED_PROPS) {
  if(PED_PROPS.hasOwnProperty(k)) {

    const prop = PED_PROPS[k];

    Object.defineProperty(PedPropCollection.prototype, prop, {

      get: function() {

        return {
          index  : natives.getPedPropIndex(this.ped.handle, prop),
          texture: natives.getPedPropTextureIndex(this.ped.handle, prop),
        }

      },

      set: function(val) {
        const { index, texture } = val;
        natives.setPedPropIndex(this.ped.handle, prop, index, texture, false);
      },

      enumerable  : false,
      configurable: true,

    })

  }
}

export default PedPropCollection;
