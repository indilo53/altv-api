import * as natives from 'natives';

import constants from '../../../common/modules/constants/index';

const { PED_FACE_FEATURES } = constants;

class PedFaceFeatureCollection  {

  constructor(ped, data = {}) {

    this.ped = ped;
    this.tmp = {};
    this.set(data);
    
  }

  get() {

    const data = {};

    for(let k in PED_FACE_FEATURES)
      if(PED_FACE_FEATURES.hasOwnProperty(k))
        data[PED_FACE_FEATURES[k]] = this[PED_FACE_FEATURES[k]];

     return data;
  }

  set(data = {}) {

    for(let k in PED_FACE_FEATURES) {
      if(PED_FACE_FEATURES.hasOwnProperty(k) && data[PED_FACE_FEATURES[k]] !== undefined) {
        this.tmp[PED_FACE_FEATURES[k]] = data[PED_FACE_FEATURES[k]];
        this[PED_FACE_FEATURES[k]]     = data[PED_FACE_FEATURES[k]];
      }
    }
  }

  *data() {

    for(let k in PED_FACE_FEATURES) {
      if(PED_FACE_FEATURES.hasOwnProperty(k)) {
        const feature = PED_FACE_FEATURES[k];
        yield this[feature];
      }
    }

  }

  setDefault() {
    for(let k in PED_FACE_FEATURES) {
      if(PED_FACE_FEATURES.hasOwnProperty(k)) {
        const feature = PED_FACE_FEATURES[k];
        natives.setPedFaceFeature(this.ped.handle, feature, 0.0);
      }
    }
  }

}

for(let k in PED_FACE_FEATURES) {
  if(PED_FACE_FEATURES.hasOwnProperty(k)) {

    const feature = PED_FACE_FEATURES[k];

    Object.defineProperty(PedFaceFeatureCollection.prototype, feature, {

      get: function() {
        return this.tmp[feature] === undefined ? 0.0 : this.tmp[feature];
      },

      set: function(val) {
        this.tmp[feature] = val;
        natives.setPedFaceFeature(this.ped.handle, feature, val);
      },

      enumerable  : false,
      configurable: true,

    })

  }
}

export default PedFaceFeatureCollection;
