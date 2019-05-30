import natives from 'natives'

import math from '../../../common/modules/math/index';
import Camera from '../camera/index';

const { Vector3, Matrix4 } = math;

class GameplayCamera extends Camera {

  get farClip() {
    return natives.getGameplayCamFarClip();
  }

  get farDof() {
    return natives.getGameplayCamFarDof();
  }

  get fov() {
    return natives.getGameplayCamFov();
  }

  get nearDof() {
    return natives.getGameplayCamNearDof();
  }

  get matrix() {

    this.copy.position = this.position;
    this.copy.rotation = this.rotation;

    return this.copy.matrix;
  }

  get position() {
    const position = natives.getGameplayCamCoord();
    return new Vector3(position[0], position[1], position[2]);
  }

  get rendering() {
    return !!natives.isGameplayCamRendering();
  }

  get rotation() {
    const rotation = natives.getGameplayCamRot();
    return new Vector3(rotation[0], rotation[1], rotation[2]);
  }

  constructor() {
    super(0);
  }

  init() {

    if(this.copy == undefined) {
      this.copy     = Camera.create();
      this.copy.fov = this.fov;
    }

  }

}

export default GameplayCamera;
