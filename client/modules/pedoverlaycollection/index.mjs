import * as natives from 'natives';

import constants from '../../../common/modules/constants/index';

const { PED_OVERLAYS } = constants;

class PedOverlayCollection  {

  constructor(ped, data = {}) {

    this.ped = ped;
    this.set(data);
    this.tmp = {};
  }

  get() {

    const data = {};

    for(let k in PED_OVERLAYS)
      if(PED_OVERLAYS.hasOwnProperty(k))
        data[PED_OVERLAYS[k]] = this[PED_OVERLAYS[k]];

    for(let k in PED_OVERLAYS)
      if(PED_OVERLAYS.hasOwnProperty(k))
        for(let l in (this.tmp[k] || {}))
          data[PED_OVERLAYS[k]][l] = this.tmp[k][l];

     return data;
  }

  set(data = {}) {

    for(let k in PED_OVERLAYS) {

      const overlay = PED_OVERLAYS[k];

      if(PED_OVERLAYS.hasOwnProperty(k) && data[overlay] !== undefined)
        this[overlay] = data[overlay];
    }
  }

}

for(let k in PED_OVERLAYS) {
  if(PED_OVERLAYS.hasOwnProperty(k)) {

    const overlay = PED_OVERLAYS[k];

    Object.defineProperty(PedOverlayCollection.prototype, overlay, {

      get: function() {

        return {
          count  : natives.getNumHeadOverlayValues(overlay),
          index  : natives.getPedHeadOverlayValue(this.ped.handle, overlay),
          color1 : this.tmp[overlay] ? (this.tmp[overlay].color1  === undefined ? 0   : this.tmp[overlay].color1)  : 0,
          color2 : this.tmp[overlay] ? (this.tmp[overlay].color2  === undefined ? 0   : this.tmp[overlay].color2)  : 0,
          opacity: this.tmp[overlay] ? (this.tmp[overlay].opacity === undefined ? 0.0 : this.tmp[overlay].opacity) : 0.0,
        }

      },

      set: function(val) {
        
        const { index, opacity, color1, color2} = val;
        
        this.tmp[overlay] = {index, opacity, color1, color2};

        natives.setPedHeadOverlay(this.ped.handle, overlay, index, opacity);

        let colorType = 0;

        switch(overlay) {

          case PED_OVERLAYS.BEARD:
          case PED_OVERLAYS.EYEBROWS:
          case PED_OVERLAYS.CHEST_HAIR:
            colorType = 1;
            break;

          case PED_OVERLAYS.BLUSH:
          case PED_OVERLAYS.LIPSTICK:
            colorType = 2;
            break;

          default:
            colorType = 0;
            break;
        }

        natives.setPedHeadOverlayColor(this.ped.handle, overlay, colorType, color1, color2);
      },

      enumerable  : false,
      configurable: true,

    })

  }
}

export default PedOverlayCollection;
