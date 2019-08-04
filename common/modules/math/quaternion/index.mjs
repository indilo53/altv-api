import { Quaternion } from 'math.gl/dist/esm/index'
import Vector3        from '../vector3/index';

const RAD2DEG = 180 / Math.PI;
const DEG2RAD = Math.PI / 180;

class _Quaternion extends Quaternion {

  euler() {

    const euler = {};

    const ysqr = this.y * this.y;

    const t0 = 2.0 * (this.w * this.x + this.y * this.z);
    const t1 = 1.0 - 2.0 * (this.x * this.x + ysqr);
    euler.x = Math.atan2(t0, t1) * RAD2DEG;

    let t2 = 2.0 * (this.w * this.y - this.z * this.x);
    t2     = (t2 >  1.0) ?  1.0 : t2;
    t2     = (t2 < -1.0) ? -1.0 : t2;
    euler.y = Math.asin(t2) * RAD2DEG;

    const t3 = 2.0 * (this.w * this.z + this.x * this.y);
    const t4 = 1.0 - 2.0 * (ysqr + this.z * this.z);
    euler.z = Math.atan2(t3, t4) * RAD2DEG;

    return new Vector3(euler.x, euler.y, euler.z);

  }

}

export default _Quaternion;
