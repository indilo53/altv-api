import * as alt from 'alt';
import * as natives from 'natives';

import constants                from '../../../common/modules/constants/index';
import hashes                   from '../../../common/modules/hashes/index';
import utils                    from '../../../common/modules/utils/index';
import math                     from '../../../common/modules/math/index';
import Entity                   from '../entity/index';
import Model                    from '../model/index';
import PedHeadBlendData         from '../pedheadblenddata/index';
import PedFaceFeatureCollection from '../pedfacefeaturecollection/index';
import PedComponentCollection   from '../pedcomponentcollection/index';
import PedOverlayCollection     from '../pedoverlaycollection/index';
import PedPropCollection        from '../pedpropcollection/index';
import tasks                    from '../tasks/index';

const RAD2DEG = 180 / Math.PI;
const DEG2RAD = Math.PI / 180;

const { CTASKS, RAGODLL_TYPES } = constants;
const { TASKS }                 = hashes;
const { Vector3, Matrix4 }      = math;

import WEAPON_DATA from '../../../common/data/weapons.json';

class Ped extends Entity {

  static create(model, position, heading = 0.0, network = true) {

    model        = model instanceof Model ? model : new Model(model);
    const handle = natives.createPed(26, model.hash, position.x, position.y, position.z, heading, network, false);

    return new (this)(handle);
  }

  get activeTasks() { // Lot of native calls ! Use it for debugging purposes

     const active = [];
     const status = this.taskStatus;

     for(let k in status)
       if(status[k] !== 7)
         active.push(status[k]);

     return active;

  }

  get activeTaskNames() { // Lot of native calls ! Use it for debugging purposes

     const active = [];
     const status = this.taskStatusNames;

     for(let k in status)
       if(status[k] !== 7)
         active.push(k);

     return active;

  }

  get armour() {
    return natives.getPedArmour(this.handle);
  }

  set armour(val) {
    const armour = Math.floor(val);
    natives.setPedArmour(this.handle, armour);
  }

  get components() {
    return this._components;
  }

  set components(val) {
    this._components = val;
    this._components.set(val);
  }

  get cTasks() { // Lot of native calls ! Use it for debugging purposes

    const tasks = [];

    for(let k in CTASKS)
      if(CTASKS.hasOwnProperty(k) && this.isCTaskActive(CTASKS[k]))
        tasks.push(CTASKS[k]);

    return tasks;

  }

  get cTaskNames() { // Lot of native calls ! Use it for debugging purposes

    const names = [];

    for(let k in CTASKS)
      if(CTASKS.hasOwnProperty(k) && this.isCTaskActive(CTASKS[k]))
        names.push(k);

    return names;
  }

  get headBlendData() {
    return this._headBlendData;
  }

  set headBlendData(val) {
    this._headBlendData = val;
    this._headBlendData.set(val);
  }

  get maxHealth() {
    return this.getMaxHealth();
  }
  
  get direction() {
    const heading = (this.heading + 90) * DEG2RAD;
    return new Vector3(Math.cos(heading), Math.sin(heading), Math.tanh(this.quaternion.euler().z * DEG2RAD));
  }

  get faceFeatures() {
    return this._faceFeatures;
  }

  set faceFeatures(val) {
    this._faceFeatures = val;
    this._faceFeatures.set(val);
  }

  get maxHealth() {
    return natives.getPedMaxHealth(this.handle);
  }

  set maxHealth(val) {
    const health = Math.floor(val);
    natives.setPedMaxHealth(this.handle, health);
  }

  get overlays() {
    return this._overlays;
  }

  set overlays(val) {
    this._overlays = val;
    this._overlays.set(val);
  }

  get props() {
    return this._props;
  }

  set props(val) {
    this.props = val;
    this._props.set(val);
  }

  get taskStatus() { // Lot of native calls ! Use it for debugging purposes

    const status = {};

    for(let k in TASKS)
      if(TASKS.hasOwnProperty(k))
        status[TASKS[k]] = natives.getScriptTaskStatus(this.handle, TASKS[k]);

    return status;

  }

  get taskStatusNames() { // Lot of native calls ! Use it for debugging purposes

    const status = {};

    for(let k in TASKS)
      if(TASKS.hasOwnProperty(k))
        status[k] = natives.getScriptTaskStatus(this.handle, TASKS[k]);

    return status;

  }

  get weapons() {

    const weapons = [];

    for(let i=0; i<WEAPON_DATA.length; i++) {

      const { hash } = WEAPON_DATA[i];

      if(this.hasWeapon(hash))
        weapons.push(hash);

    }

    return weapons;

  }

  constructor(handle) {

    super(handle);

    this._headBlendData = new PedHeadBlendData(this);
    this._faceFeatures  = new PedFaceFeatureCollection(this);
    this._components    = new PedComponentCollection(this);
    this._overlays      = new PedOverlayCollection(this);
    this._props         = new PedPropCollection(this);

  }

  clearTasks() {
    natives.clearPedTasks(this.handle);
  }

  clearTasksImmediately() {
    natives.clearPedTasksImmediately(this.handle);
  }

  clone(heading = 0.0, network = true) {
    const handle = natives.clonePed(this.handle, heading, network, false);
    return new (this)(handle);
  }

  hasWeapon(hash) {

    if(typeof hash === 'string')
      hash = joaat(hash);

    return natives.hasPedGotWeapon(this.handle, hash, false);

  }

  isCTaskActive(id) {
    return !!natives.getIsTaskActive(this.handle, id);
  }

  isTaskActive(hash) {
    return natives.getScriptTaskStatus(this.handle, hash) !== 7;
  }

  ragdoll(time, ragdollType = RAGODLL_TYPES.NORMAL, p4 = false, p5 = false, p6 = false) {
    natives.setPedToRagdoll(this.handle, time, time, ragdollType, p4, p5, p6);
    return utils.delay(time);
  }

  setIntoVehicle(vehicle, seatIndex = -1) {
    natives.setPedIntoVehicle(this.handle, vehicle, seatIndex);
  }

  valueOf() {
    return this.handle;
  }

}

// Create taskFooBar member functions from tasks
for(let k in tasks) {
  if(tasks.hasOwnProperty(k)) {

    const firstCharUpper = k[0].toUpperCase();
    const name           = firstCharUpper + k.substr(1);

    Ped.prototype['task' + name] = function(...args) {
      return tasks[k](this, ...args);
    }

  }
}

export default utils.withCache(Ped, (args, curr) => args[0] === curr.handle, self => self.valid && self.exists);
