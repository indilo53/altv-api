import natives from 'natives';

import utils  from '../../../common/modules/utils/index';
import hashes from '../../../common/modules/hashes/index';

const { TASKS } = hashes;

const Tasks = {};

Tasks.achieveHeading = utils.promisify(
  (ped, heading, timeout = 0) => {
    natives.taskAchieveHeading(ped.handle, heading, timeout);
  },
  (ped, heading, timeout = 0) => {
    return !ped.isTaskActive(TASKS.TASK_ACHIEVE_HEADING);
  },
  (ped, heading, timeout = 0) => {
    return Math.abs(heading - ped.heading) <= 1.0;
  }
);

Tasks.aimGunAtCoord = utils.promisify(
  (ped, position, timeout = -1) => {
    natives.taskAimGunAtCoord(ped.handle, position.x, position.y, position.z, timeout);
  },
  (ped, position, timeout = -1) => {
    return !ped.isTaskActive(TASKS.TASK_AIM_GUN_AT_COORD);
  }
);

Tasks.aimGunAtEntity = utils.promisify(
  (ped, entity, timeout = -1) => {
    natives.taskAimGunAtEntity(ped.handle, entity.handle, timeout);
  },
  (ped, entity, timeout = -1) => {
    return !ped.isTaskActive(TASKS.TASK_AIM_GUN_AT_ENTITY);
  }
);

Tasks.arrestPed = utils.promisify(
  (ped, arrestedPed) => {
    natives.taskArrestPed(ped.handle, arrestedPed.handle);
  },
  (ped, entity, timeout = -1) => {
    return !ped.isTaskActive(TASKS.TASK_ARREST_PED);
  }
);

Tasks.chatToPed = utils.promisify(
  (ped, targetPed, p2 = 16, p3 = 0, p4 = 0, p5 = 0, p6 = 0, p7 = 0) => {
    natives.taskChatToPed(ped.handle, targetPed.handle, p2, p3, p4, p5, p6, p7);
  },
  (ped, targetPed, p2 = 16, p3 = 0, p4 = 0, p5 = 0, p6 = 0, p7 = 0) => {
    return !ped.isTaskActive(TASKS.TASK_CHAT_TO_PED);
  }
);

Tasks.climb = utils.promisify(
  (ped, unused = true) => {
    natives.taskClimb(ped.handle, unused);
  },
  (ped, targetPed, p2 = 16, p3 = 0, p4 = 0, p5 = 0, p6 = 0, p7 = 0) => {
    return !ped.isTaskActive(TASKS.TASK_CLIMB);
  }
);

Tasks.climbLadder = utils.promisify(
  (ped, unused = true) => {
    natives.taskClimbLadder(ped.handle, unused);
  },
  (ped, targetPed, p2 = 16, p3 = 0, p4 = 0, p5 = 0, p6 = 0, p7 = 0) => {
    return !ped.isTaskActive(TASKS.TASK_CLIMB);
  }
);

Tasks.goStraightToCoord = utils.promisify(
  (ped, position, speed = 1.0, timeout = -1, targetHeading = 0.0, distanceToSlide = 0.0, radius = 3.0) => {
    natives.taskGoStraightToCoord(ped.handle, position.x, position.y, position.z, speed, timeout, targetHeading, distanceToSlide);
  },
  (ped, position, speed = 1.0, timeout = -1, targetHeading = 0.0, distanceToSlide = 0.0, radius = 3.0) => {
    return !ped.isTaskActive(TASKS.TASK_GO_STRAIGHT_TO_COORD);
  },
  (ped, position, speed = 1.0, timeout = -1, targetHeading = 0.0, distanceToSlide = 0.0, radius = 3.0) => {
    return ped.inRangeTo(position, radius, false);
  }
);

Tasks.goToCoordAnyMeans = utils.promisify(
  (ped, position, speed = 1.0, walkingStyle = 786603, radius = 3.0) => {
    natives.taskGoToCoordAnyMeans(ped.handle, position.x, position.y, position.z, speed, 0, 0, walkingStyle, 0xbf800000);
  },
  (ped, position, speed = 1.0, walkingStyle = 786603, radius = 3.0) => {
    return !ped.isTaskActive(TASKS.TASK_GO_TO_COORD_ANY_MEANS);
  },
  (ped, position, speed = 1.0, walkingStyle = 786603, radius = 3.0) => {
    return ped.inRangeTo(position, radius, false);
  }
);

Tasks.goToEntity = utils.promisify(
  (ped, target, duration = -1, distance = 0.25, speed = 1.0, p5 = 1073741824, p6 = 0) => {
    natives.taskGoToEntity(ped.handle, target.handle, duration, distance, speed, p5, p6);
  },
  (ped, target, duration = -1, distance = 0.25, speed = 1.0, p5 = 1073741824, p6 = 0) => {
    return !ped.isTaskActive(TASKS.TASK_GOTO_ENTITY);
  },
  (ped, target, duration = -1, distance = 0.25, speed = 1.0, p5 = 1073741824, p6 = 0) => {
    return ped.inRangeTo(target.position, distance, false);
  }
);

export default Tasks;
