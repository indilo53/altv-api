import * as alt from 'alt';
import * as natives from 'natives';

import EventEmitter from 'events';
import memoize      from 'micro-memoize';
import math         from '../../../common/modules/math/index';
import utils        from '../../../common/modules/utils/index';
import constants    from '../../../common/modules/constants/index';
import Model        from '../model/index';

const { Vector3, Quaternion, Matrix4 } = math;

class Entity extends EventEmitter {

  get collisionLoaded() {
    return !!natives.hasCollisionLoadedAroundEntity(this.handle);
  }

  get entityType() {
    return this.getEntityType(this.handle); // Pass handle to invalidate memoizee cache when handle is modified
  }

  get exists() {
    return !!natives.doesEntityExist(this.handle);
  }

  get isPed() {
    return this.getIsPed(this.handle);  // Pass handle to invalidate memoizee cache when handle is modified
  }

  get isObject() {
    return this.getIsObject(this.handle); // Pass handle to invalidate memoizee cache when handle is modified
  }

  get isVehicle() {
    return this.getIsVehicle(this.handle); // Pass handle to invalidate memoizee cache when handle is modified
  }

  get forwardVector() {
    return new Vector3(this.matrix.m10, this.matrix.m11, this.matrix.m12);
  }

  get heading() {
    return natives.getEntityHeading(this.handle);
  }

  set heading(val) {
    natives.setEntityHeading(this.handle, val);
  }

  get health() {
    return natives.getEntityHealth(this.handle);
  }

  set health(val) {
    const health = Math.floor(val);
    natives.setEntityHealth(this.handle, health);
  }

  get maxHealth() {
    return natives.getEntityMaxHealth(this.handle);
  }

  set maxHealth(val) {
    const health = Math.floor(val);
    natives.setEntityMaxHealth(this.handle, health);
  }

  get matrix() {

    const m = natives.getEntityMatrix(this.handle);
    const matrix = new Matrix4();

    matrix.set(
      m[1].x, m[1].y, m[1].z, 0,
      m[2].x, m[2].y, m[2].z, 0,
      m[3].x, m[3].y, m[3].z, 0,
      m[4].x, m[4].y, m[4].z, 1
    );

    return matrix;
  }

  set matrix(val) {

    const q         = val.quaternion();
    this.position   = {x: val.m30, y: val.m31, z: val.m32};
    this.quaternion = {x: q.x, y: q.y, z: q.z, w: q.w};
  }

  get model() {
    return new Model(natives.getEntityModel(this.handle));
  }

  get netHandle() {
    return natives.networkGetNetworkIdFromEntity(this.handle);
  }

  get position() {
    const p = natives.getEntityCoords(this.handle, true);
    return new Vector3(p.x, p.y, p.z);
  }

  set position(val) {
    natives.setEntityCoordsNoOffset(this.handle, val.x, val.y, val.z, true, true, true);
  }

  set positionOffseted(val) {
    natives.setEntityCoords(this.handle, val.x, val.y, val.z, false, false, false, true);
  }

  get quaternion() {
    const q = natives.getEntityQuaternion(this.handle);
    return new Quaternion(q[0], q[1], q[2], q[3]);
  }

  set quaternion(val) {
    natives.setEntityQuaternion(this.handle, val.x, val.y, val.z, val.w);
  }

  get rightVector() {
    return new Vector3(this.matrix.m00, this.matrix.m01, this.matrix.m02);
  }

  get rotation() {
    const r = natives.getEntityRotation(this.handle);
    return new Vector3(r.x, r.y, r.z);
  }

  set rotation(val) {
    natives.setEntityRotation(this.handle, val.x, val.y, val.z);
  }

  get screenPositionRatio() {

    const position = this.position;
    const result   = natives.getScreenCoordFromWorldCoord(position.x, position.y, position.z);
    const success  = !!result[0];

    if(success)
      return {x: result[1], y: result[2]};
    else
      return null;
  }

  get screenPosition() {

    const result     = natives.getActiveScreenResolution();
    const resolution = {x: result[0], y: result[1]};
    const ratio      = this.screenPositionRatio;

    if(ratio === null)
      return null;
    else
      return {x: Math.floor(ratio.x * resolution.x), y: Math.floor(ratio.y * resolution.y)};
  }

  get upVector() {
    return new Vector3(this.matrix.m20, this.matrix.m21, this.matrix.m22);
  }

  constructor(handle) {

    super();

    this.handle = handle;

    ['getEntityType', 'getIsPed', 'getIsObject', 'getIsVehicle'].forEach(e => {
      this[e] = memoize(this[e]).bind(this);
    });

  }

  freeze(toggle = true) {
    natives.freezeEntityPosition(this.handle, toggle);
  }

  getEntityType(_handle) {

    let type;

    if(this.isPed())
      type = constants.ENTITY_TYPES.PED;
    else if(this.isObject())
      type = constants.ENTITY_TYPES.OBJECT;
    else if(this.isVehicle())
      type = constants.ENTITY_TYPES.VEHICLE;
    else
      type = constants.ENTITY_TYPES.UNKNOWN;

    return type;

  }

  distanceTo(position, useZ = true) {
    return utils.getDistance(this.position, position, useZ);
  }

  getIsPed(_handle) {
    return !!natives.isEntityAPed(this.handle);
  }

  getIsObject(_handle) {
    return !!natives.isEntityAnObject(this.handle);
  }

  getIsVehicle(_handle) {
    return !!natives.isEntityAVehicle(this.handle);
  }

  inRangeTo(position, radius = 1.0, useZ = true) {
    return this.distanceTo(position, useZ) <= radius;
  }

  async teleport(position) {

    this.position = position;
    this.freeze(true);

    await this.requestCollision(position);

    this.freeze(false);
  }

  valueOf() {
    return this.handle;
  }

}

Entity.prototype.requestCollision = utils.promisify(
  function(position) { natives.requestCollisionAtCoord(position.x, position.y, position.z);},
  function(position) { return this.collisionLoaded }
);

export default utils.withCache(Entity, (args, curr) => args[0] === curr.handle, self => self.exists);;
