const WEAPON_DATA    = require('../data/weapons.json');
const COMPONENT_DATA = require('../data/weapons.json');

const WEAPONS    = new Map();
const COMPONENTS = new Map();

for(let i=0; i<WEAPON_DATA.length; i++)
  WEAPON_DATA_BY_HASH[WEAPON_DATA[i].hash] = WEAPON_DATA[i];

  export default WEAPON_DATA_BY_HASH;
