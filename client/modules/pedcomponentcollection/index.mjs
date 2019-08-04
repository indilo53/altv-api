import * as natives from 'natives';

import constants from '../../../common/modules/constants/index';

const { PED_COMPONENTS } = constants;

class PedComponentCollection  {

  constructor(ped, data = {}) {

    this.ped = ped;
    this.set(data);
    
  }

  get() {

    const data = {};

    for(let k in PED_COMPONENTS)
      if(PED_COMPONENTS.hasOwnProperty(k) && k !== 'INVALID' && k !== 'MAX')
        data[PED_COMPONENTS[k]] = this[PED_COMPONENTS[k]];

     return data;
  }

  set(data = {}) {

    for(let k in PED_COMPONENTS)
      if(PED_COMPONENTS.hasOwnProperty(k) && k !== 'INVALID' && k !== 'MAX' && data[PED_COMPONENTS[k]] !== undefined)
        this[PED_COMPONENTS[k]] = data[PED_COMPONENTS[k]];
  }

  drawableCount(component) {
    return natives.getNumberOfPedDrawableVariations(this.ped.handle, component);
  }

  textureCount(component, drawable) {
    return natives.getNumberOfPedTextureVariations(this.ped.handle, component, drawable);
  }

  setDefault() {
    natives.setPedDefaultComponentVariation(this.ped.handle);
  }

}

for(let k in PED_COMPONENTS) {
  if(PED_COMPONENTS.hasOwnProperty(k) && k !== 'INVALID' && k !== 'MAX') {

    const component = PED_COMPONENTS[k];

    Object.defineProperty(PedComponentCollection.prototype, component, {

      get: function() {

        const drawable = natives.getPedDrawableVariation(this.ped.handle, component);

        return {
          drawable     : drawable,
          drawableCount: this.ped.components.drawableCount(component),
          texture      : natives.getPedTextureVariation (this.ped.handle, component),
          textureCount : this.ped.components.textureCount(component, drawable),
          palette      : natives.getPedPaletteVariation (this.ped.handle, component),
        }

      },

      set: function(val) {
        const { drawable, texture, palette } = val;
        natives.setPedComponentVariation(this.ped.handle, component, drawable, texture, palette);
      },

      enumerable  : false,
      configurable: true,

    })

  }
}

export default PedComponentCollection;
