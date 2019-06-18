import * as alt     from 'alt';
import * as natives from 'natives';
import math         from '../../../common/modules/math/index';
import utils        from '../../../common/modules/utils/index';

const { Vector3, Matrix4 } = math;

const Helpers = {};

Helpers.screenToWorld = function(x, y, fov, near, far, right, forward, up, at)
{
  const fovRatio    = (360 - fov) / 360;
  const [_, sX, sY] = natives.getActiveScreenResolution();
  const sX2         = sX/2;
  const sY2         = sY/2;
  const aspect      = sX / sY;

  const transformMatrix = new Matrix4();

  transformMatrix.set(
    right.x,   right.z,   right.y,   0,
    forward.x, forward.z, forward.y, 0,
    up.x,      up.z,      up.y,      0,
    at.x,      at.z,      at.y,      1,
  );

  const _x = x / sX2 - 1;
  const _y = 1 - y / sY2;

  const dx = Math.tan(fovRatio * 0.5) * _x * aspect;
  const dy = Math.tan(fovRatio * 0.5) * _y;

  let p1 = new Vector3(dx * near, near, dy * near);
  let p2 = new Vector3(dx * far,  far,  dy * far);

  const p3 = transformMatrix.transformPoint(p1);
  const p4 = transformMatrix.transformPoint(p2);

  return {
    near : new Vector3(p3.x, p3.z, p3.y),
    far  : new Vector3(p4.x, p4.z, p4.y)
  };

}

Helpers.fadeIn = utils.promisify(
  (duration = 0) => {
    natives.doScreenFadeIn(duration)
  },
  (duration = 0) => {
    return natives.isScreenFadedIn();
  },
  (duration = 0) => {
    return natives.isScreenFadedIn();
  }
)

Helpers.fadeOut = utils.promisify(
  (duration = 0) => {
    natives.doScreenFadeOut(duration)
  },
  (duration = 0) => {
    return natives.isScreenFadedOut();
  },
  (duration = 0) => {
    return natives.isScreenFadedOut();
  }
)

export default Helpers;