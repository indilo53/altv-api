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

  get position() {
    const position = natives.getGameplayCamCoord();
    return new Vector3(position.x, position.y, position.z);
  }

  get rendering() {
    return !!natives.isGameplayCamRendering();
  }

  get rotation() {
    const rotation = natives.getGameplayCamRot();
    return new Vector3(rotation.x, rotation.y, rotation.z);
  }

  constructor() {
    super(0);
  }

}

export default GameplayCamera;
