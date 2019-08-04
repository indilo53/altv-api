import * as natives from 'natives';

class PedHeadBlendData  {

  get shapeFirst () { return this._shapeFirst; }
  get shapeSecond() { return this._shapeSecond; }
  get shapeThird () { return this._shapeThird; }
  get skinFirst  () { return this._skinFirst; }
  get skinSecond () { return this._skinSecond; }
  get skinThird  () { return this._skinThird; }
  get shapeMix   () { return this._shapeMix; }
  get skinMix    () { return this._skinMix; }
  get thirdMix   () { return this._thirdMix; }

  set shapeFirst (val) { this._shapeFirst  = val; natives.setPedHeadBlendData(this.ped.handle, this.shapeFirst, this.shapeSecond, this.shapeThird, this.skinFirst, this.skinSecond, this.skinThird, this.shapeMix, this.skinMix, this.thirdMix, false); }
  set shapeSecond(val) { this._shapeSecond = val; natives.setPedHeadBlendData(this.ped.handle, this.shapeFirst, this.shapeSecond, this.shapeThird, this.skinFirst, this.skinSecond, this.skinThird, this.shapeMix, this.skinMix, this.thirdMix, false); }
  set shapeThird (val) { this._shapeThird  = val; natives.setPedHeadBlendData(this.ped.handle, this.shapeFirst, this.shapeSecond, this.shapeThird, this.skinFirst, this.skinSecond, this.skinThird, this.shapeMix, this.skinMix, this.thirdMix, false); }
  set skinFirst  (val) { this._skinFirst   = val; natives.setPedHeadBlendData(this.ped.handle, this.shapeFirst, this.shapeSecond, this.shapeThird, this.skinFirst, this.skinSecond, this.skinThird, this.shapeMix, this.skinMix, this.thirdMix, false); }
  set skinSecond (val) { this._skinSecond  = val; natives.setPedHeadBlendData(this.ped.handle, this.shapeFirst, this.shapeSecond, this.shapeThird, this.skinFirst, this.skinSecond, this.skinThird, this.shapeMix, this.skinMix, this.thirdMix, false); }
  set skinThird  (val) { this._skinThird   = val; natives.setPedHeadBlendData(this.ped.handle, this.shapeFirst, this.shapeSecond, this.shapeThird, this.skinFirst, this.skinSecond, this.skinThird, this.shapeMix, this.skinMix, this.thirdMix, false); }
  set shapeMix   (val) { this._shapeMix    = val; natives.setPedHeadBlendData(this.ped.handle, this.shapeFirst, this.shapeSecond, this.shapeThird, this.skinFirst, this.skinSecond, this.skinThird, this.shapeMix, this.skinMix, this.thirdMix, false); }
  set skinMix    (val) { this._skinMix     = val; natives.setPedHeadBlendData(this.ped.handle, this.shapeFirst, this.shapeSecond, this.shapeThird, this.skinFirst, this.skinSecond, this.skinThird, this.shapeMix, this.skinMix, this.thirdMix, false); }
  set thirdMix   (val) { this._thirdMix    = val; natives.setPedHeadBlendData(this.ped.handle, this.shapeFirst, this.shapeSecond, this.shapeThird, this.skinFirst, this.skinSecond, this.skinThird, this.shapeMix, this.skinMix, this.thirdMix, false); }

  constructor(ped, data = {}) {

    this.ped = ped;
    
    this._shapeFirst  = 0;
    this._shapeSecond = 21;
    this._shapeThird  = 0;
    this._skinFirst   = 0;
    this._skinSecond  = 0;
    this._skinThird   = 0;
    this._shapeMix    = 0.0;
    this._skinMix     = 0.0;
    this._thirdMix    = 0.0;

    this.set(data);  
  }

  get() {

    return {
      shapeFirst : this.shapeFirst,
      shapeSecond: this.shapeSecond,
      shapeThird : this.shapeThird,
      skinFirst  : this.skinFirst,
      skinSecond : this.skinSecond,
      skinThird  : this.skinThird,
      shapeMix   : this.shapeMix,
      skinMix    : this.skinMix,
      thirdMix   : this.thirdMix,
    };

  }

  set(data = {}) {

    this.shapeFirst  = data.shapeFirst  === undefined ? this.shapeFirst  : data.shapeFirst;
    this.shapeSecond = data.shapeSecond === undefined ? this.shapeSecond : data.shapeSecond;
    this.shapeThird  = data.shapeThird  === undefined ? this.shapeThird  : data.shapeThird;
    this.skinFirst   = data.skinFirst   === undefined ? this.skinFirst   : data.skinFirst;
    this.skinSecond  = data.skinSecond  === undefined ? this.skinSecond  : data.skinSecond;
    this.skinThird   = data.skinThird   === undefined ? this.skinThird   : data.skinThird;
    this.shapeMix    = data.shapeMix    === undefined ? this.shapeMix    : data.shapeMix;
    this.skinMix     = data.skinMix     === undefined ? this.skinMix     : data.skinMix;
    this.thirdMix    = data.thirdMix    === undefined ? this.thirdMix    : data.thirdMix;
 
  }

}

export default PedHeadBlendData;
