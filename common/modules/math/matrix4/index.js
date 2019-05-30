import { Matrix4 } from 'math.gl/dist/esm/index'
import Quaternion  from '../quaternion/index';

class _Matrix4 extends Matrix4 {

  // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion
  quaternion() {

    const q     = {x: 0, y: 0, z: 0, w: 1};
    const scale = this[0][0] + this[1][1] + this[2][2];

    if (scale > 0) {

      const S = Math.sqrt(scale + 1.0) * 2; // S=4*qw

      q.x = (this[1][2] - this[2][1]) / S;
      q.y = (this[2][0] - this[0][2]) / S;
      q.z = (this[0][1] - this[1][0]) / S;
      q.w = 0.25 * S;

    } else if ((this[0][0] > this[1][1]) & (this[0][0] > this[2][2])) {

      const S = Math.sqrt(1.0 + this[0][0] - this[1][1] - this[2][2]) * 2; // S=4*qx

      q.x = 0.25 * S;
      q.y = (this[0][1] + this[1][0]) / S;
      q.z = (this[0][2] + this[2][0]) / S;
      q.w = (this[1][2] - this[2][1]) / S;

    } else if (this[1][1] > this[2][2]) {

      const S = Math.sqrt(1.0 + this[1][1] - this[0][0] - this[2][2]) * 2; // S=4*qy

      q.x = (this[1][0] + this[0][1]) / S;
      q.y = 0.25 * S;
      q.z = (this[2][1] + this[1][2]) / S;
      q.w = (this[2][0] - this[0][2]) / S;

    } else {

      const S = Math.sqrt(1.0 + this[2][2] - this[0][0] - this[1][1]) * 2; // S=4*qz

      q.x = (this[2][0] + this[0][2]) / S;
      q.y = (this[2][1] + this[1][2]) / S;
      q.z = 0.25 * S;
      q.w = (this[0][1] - this[1][0]) / S;

    }

    return new Quaternion(q.x, q.y, q.z, q.w);

  }

}

export default _Matrix4;
