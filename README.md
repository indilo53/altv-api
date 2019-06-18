# WIP - Contributions are welcome


```js
import * as alt from 'alt'
import * as natives from 'natives'

import $ from './modules/altv-api/client/index.js';

const { CTASKS, PED_COMPONENTS }                     = $.constants;
const { PED_MODELS, TASKS }                          = $.hashes;
const { Vector3, Quaternion }                        = $.math;
const { Camera, Model, Ped, PedComponentCollection } = $.types;
const { joaat, delay, waitFor }                      = $.utils;

$.game.on('ready', async () => {

  try {

    const player  = $.game.player;
    const model   = new Model('mp_m_freemode_01');
    const success = await model.request();

    if(!success)
      throw new Error('Missing model');

    await player.ped.teleport(new Vector3(0, 0, 72));

    player.model   = model;
    const ped      = player.ped;
    const position = ped.position;
    const clone    = ped.clone();

    ped.components.setDefault();

    clone.position = new Vector3(position.x + 1.0, position.y + 1.0, position.z + 1.0);

    while(true) {
      await clone.taskGoToEntity(ped, -1, 3.0, 4.0);
    }

  } catch(err) { alt.logError(err); }

});
```
