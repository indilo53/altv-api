import { Vector3 } from 'math.gl/dist/esm/index'
import Quaternion from '../quaternion/index';

const RAD2DEG = 180 / Math.PI;
const DEG2RAD = Math.PI / 180;

class _Vector3 extends Vector3 {
  
  static get back()    { return new (this)( 0, -1,  0); }
  static get down()    { return new (this)( 0,  0, -1); }
  static get forward() { return new (this)( 0,  1,  0); }
  static get left()    { return new (this)(-1,  0,  0); }
  static get one()     { return new (this)( 1, -1,  1); }
  static get right()   { return new (this)( 1,  0,  0); }
  static get up()      { return new (this)( 0,  0,  1); }
  static get zero()    { return new (this)( 0,  0,  0); }

  quaternion() {

    const quat = new Quaternion();

    const pitch = (this.x % 360) * DEG2RAD;
    const roll  = (this.y % 360) * DEG2RAD;
    const yaw   = (this.z % 360) * DEG2RAD;
  
    const cy = Math.cos(yaw   * 0.5)
    const sy = Math.sin(yaw   * 0.5)
    const cr = Math.cos(roll  * 0.5)
    const sr = Math.sin(roll  * 0.5)
    const cp = Math.cos(pitch * 0.5)
    const sp = Math.sin(pitch * 0.5)
  
    quat.x = cy * sp * cr - sy * cp * sr
    quat.y = cy * cp * sr + sy * sp * cr
    quat.z = sy * cr * cp - cy * sr * sp
    quat.w = cy * cr * cp + sy * sr * sp
  
    return quat;

  }
}

export default _Vector3;
