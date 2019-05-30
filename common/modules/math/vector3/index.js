import { Vector3 } from 'math.gl/dist/esm/index'

class _Vector3 extends Vector3 {
  static get back()    { return new (this)( 0, -1,  0); }
  static get down()    { return new (this)( 0,  0, -1); }
  static get forward() { return new (this)( 0,  1,  0); }
  static get left()    { return new (this)(-1,  0,  0); }
  static get one()     { return new (this)( 1, -1,  1); }
  static get right()   { return new (this)( 1,  0,  0); }
  static get up()      { return new (this)( 0,  0,  1); }
  static get zero()    { return new (this)( 0,  0,  0); }
}

export default _Vector3;
