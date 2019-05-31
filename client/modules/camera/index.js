import alt from 'alt'
import natives from 'natives'

import utils from '../../../common/modules/utils/index';
import math from '../../../common/modules/math/index';
import Entity from '../entity/index';

const { Vector3, Matrix4 } = math;

class Camera {


  get active() {
    return !!natives.isCamActive(this.handle);
  }

  set active(val) {
    natives.setCamActive(this.handle, val)
  }

  get animCurrentPhase() {
    return natives.getCamAnimCurrentPhase(this.handle);
  }

  set animCurrentPhase(val) {
    natives.setCamAnimCurrentPhase(this.handle, val)
  }

  get position() {
    const position = natives.getCamCoord(this.handle);
    return new Vector3(position.x, position.y, position.z);
  }

  set position(val) {
    natives.setCamCoord(this.handle, val.x, val.y, val.z);
  }

  get farClip() {
    return natives.getCamFarClip(this.handle);
  }

  set farClip(val) {
    natives.setCamFarClip(this.handle, val);
  }

  get farDof() {
    return natives.getCamFarDof(this.handle);
  }

  set farDof(val) {
    natives.setCamFarDof(this.handle, val);
  }

  get fov() {
    return natives.getCamFov(this.handle);
  }

  set fov(val) {
    natives.getCamFov(this.handle, val);
  }

  get forwardVector() {
    return new Vector3(this.matrix.m11, this.matrix.m13, this.matrix.m12);
  }

  get matrix() {

    const pos  = this.position;
    const quat = this.rotation.quaternion();

    const matrix = new Matrix4();

    matrix.fromQuaternion(quat);
    matrix.translate(pos);

    return matrix;
  }

  set matrix(val) {
    this.position = {x: val.m30, y: val.m31, z: val.m32};
    this.rotation = val.quaternion().euler();
  }

  get nearClip() {
    return natives.getCamNearClip(this.handle);
  }

  set nearClip(val) {
    natives.setCamNearClip(this.handle, val);
  }

  get rendering() {
    return !natives.isGameplayCamRendering() && this.active;
  }

  get rightVector() {
    return new Vector3(this.matrix.m01, this.matrix.m03, this.matrix.m02);
  }

  get rotation() {
    const rotation = natives.getCamRot(this.handle);
    return new Vector3(rotation.x, rotation.y, rotation.z);
  }

  set rotation(val) {
    natives.setCamRot(this.handle, val.x, val.y, val.z);
  }

  get splineNodeIndex() {
    return natives.getCamSplineNodeIndex(this.handle);
  }

  get splineNodePhase() {
    return natives.getCamSplineNodePhase(this.handle);
  }

  get splinePhase() {
    return natives.getCamSplinePhase(this.handle);
  }

  set splinePhase(val) {
    natives.setCamSplinePhase(val);
  }

  get upVector() {
    return new Vector3(this.matrix.m20, this.matrix.m22, this.matrix.m21);
  }

  static create(position = Vector3.zero, rotation = Vector3.zero, fov = 90, p8 = true, p9 = 2) {
    const handle = natives.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, fov, p8, p9);
    return new (this)(handle);
  }

  static renderScripted(render = true, easeTime = 0, p3 = true, p4 = true) {

    const ease = easeTime > 0;

    natives.renderScriptCams(render, ease, easeTime, p3, p4);

    if(ease)
      return utils.delay(easeTime);
    else
      return new Promise(resolve => resolve());
  }

  constructor(handle) {
    this.handle = handle;
  }

  point(target, offset = Vector3.zero) {

    if(!target) {
      natives.stopCamPointing(this.handle);
      return;
    }

    if(target instanceof Vector3) {

      natives.pointCamAtCoord(this.handle, target.x + offset.x, target.y + offset.y, target.z + offset.z);

    } else if(target instanceof Entity) {

      natives.pointCamAtEntity(this.handle, target.handle, offset.x, offset.y, offset.z, 1);

    } /* else if(target instanceof PedBone) {
      PointCamAtPedBone(this.handle, target.ped.handle, target.index, offset.x, offset.y, offset.z, 1);

    } */
  }

  render(render = true, easeTime = 0, p3 = true, p4 = true) {
    this.active = render;
    return this.constructor.renderScripted(render, easeTime, p3, p4);
  }

  valueOf() {
    return this.handle;
  }

}

export default Camera;
