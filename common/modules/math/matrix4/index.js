import alt from 'alt';
import { Matrix4 } from 'math.gl/dist/esm/index';
import Quaternion  from '../quaternion/index';

class _Matrix4 extends Matrix4 {

    get m00() {return this[0]}
    get m01() {return this[1]}
    get m02() {return this[2]}
    get m03() {return this[3]}
    get m10() {return this[4]}
    get m11() {return this[5]}
    get m12() {return this[6]}
    get m13() {return this[7]}
    get m20() {return this[8]}
    get m21() {return this[9]}
    get m22() {return this[10]}
    get m23() {return this[11]}
    get m30() {return this[12]}
    get m31() {return this[13]}
    get m32() {return this[14]}
    get m33() {return this[15]}

    set m00(val) {this[0] = val;}
    set m01(val) {this[1] = val;}
    set m02(val) {this[2] = val;}
    set m03(val) {this[3] = val;}
    set m10(val) {this[4] = val;}
    set m11(val) {this[5] = val;}
    set m12(val) {this[6] = val;}
    set m13(val) {this[7] = val;}
    set m20(val) {this[8] = val;}
    set m21(val) {this[9] = val;}
    set m22(val) {this[10] = val;}
    set m23(val) {this[11] = val;}
    set m30(val) {this[12] = val;}
    set m31(val) {this[13] = val;}
    set m32(val) {this[14] = val;}
    set m33(val) {this[15] = val;}

  // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion
  quaternion() {

    const q     = {x: 0, y: 0, z: 0, w: 1};
    const scale = this.m00 + this.m11 + this.m22;

    if (scale > 0) {

      const S = Math.sqrt(scale + 1.0) * 2; // S=4*qw

      q.x = (this.m12 - this.m21) / S;
      q.y = (this.m20 - this.m02) / S;
      q.z = (this.m01 - this.m10) / S;
      q.w = 0.25 * S;

    } else if ((this.m00 > this.m11) & (this.m00 > this.m22)) {

      const S = Math.sqrt(1.0 + this.m00 - this.m11 - this.m22) * 2; // S=4*qx

      q.x = 0.25 * S;
      q.y = (this.m01 + this.m10) / S;
      q.z = (this.m02 + this.m20) / S;
      q.w = (this.m12 - this.m21) / S;

    } else if (this.m11 > this.m22) {

      const S = Math.sqrt(1.0 + this.m11 - this.m00 - this.m22) * 2; // S=4*qy

      q.x = (this.m10 + this.m01) / S;
      q.y = 0.25 * S;
      q.z = (this.m21 + this.m12) / S;
      q.w = (this.m20 - this.m02) / S;

    } else {

      const S = Math.sqrt(1.0 + this.m22 - this.m00 - this.m11) * 2; // S=4*qz

      q.x = (this.m20 + this.m02) / S;
      q.y = (this.m21 + this.m12) / S;
      q.z = 0.25 * S;
      q.w = (this.m01 - this.m10) / S;

    }

    return new Quaternion(q.x, q.y, q.z, q.w);

  }

}

export default _Matrix4;
