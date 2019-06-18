import * as alt from 'alt';

const Utils = {}

Utils.delay = function(timeout) {

  return new Promise((resolve, reject) => {
    alt.setTimeout(resolve, timeout);
  });

}

Utils.nextTick = function() {
  
  return new Promise((resolve, reject) => {
    alt.nextTick(resolve);
  });

}

Utils.joaat = function(key){

  const keyLowered = key.toLowerCase();
  const length     = keyLowered.length;

  let hash, i;

  for (hash = i = 0; i < length; i++) {
    hash += keyLowered.charCodeAt(i);
    hash += (hash <<  10);
    hash ^= (hash >>>  6);
  }

  hash += (hash <<   3);
  hash ^= (hash >>> 11);
  hash += (hash <<  15);

  return Utils.toUnsigned(hash);

}

Utils.getDistance = function(a, b, useZ = true) {

  if(!a || !b)
    return Infinity;

  if(useZ) {

    return Math.sqrt(
      Math.pow(b.x - a.x, 2) +
      Math.pow(b.y - a.y, 2) +
      Math.pow(b.z - a.z, 2)
    );

  } else {

    return Math.sqrt(
      Math.pow(b.x - a.x, 2) +
      Math.pow(b.y - a.y, 2)
    );

  }

}

Utils.getRandomFloat = function(min, max) {
  return Math.random() * (max - min) + min;
}

Utils.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

Utils.getRandomBool = function() {
  return Math.random() >= 0.5;
}

Utils.getRandomString = function(length = 8) {

  let s = '';

  const randomchar = () => {

    const n = Math.floor(Math.random() * 62);

    if (n < 10)
      return n; //1-10

    if (n < 36)
      return String.fromCharCode(n + 55); //A-Z

    return String.fromCharCode(n + 61); //a-z

  }

  while (s.length < length)
    s += randomchar();

  return s;
}

Utils.nameClass = function(name, cls) {
    return ({[name] : class extends cls {}})[name];
}

Utils.promisify = function(start, ended, check = () => true, run = null, delay = 100) {

  return function(...args) {

    return new Promise((resolve, reject) => {

      start.apply(this, args);

      const interval = alt.setInterval(() => {

        if(ended.apply(this, args)) {
          alt.clearInterval(interval);
          const success = check.apply(this, args);
          resolve(success);
          return;
        }

        if(run !== null)
          run.apply(this, args);

      }, delay);

    });

  }

}

Utils.toSigned = function(value, nbit = 32) {
  value = value << 32 - nbit;
  value = value >> 32 - nbit;
  return value;
}

Utils.toUnsigned= function(value) {
  return (value >>> 0);
}

Utils.waitFor = function(check, timeout = -1, delay = 100) {

  return new Promise((resolve, reject) => {

    const start = +new Date;

    const interval = alt.setInterval(() => {

      const now     = +new Date;
      const success = check();

      if(success || (timeout !== -1 && (now - start >= timeout))) {
        alt.clearInterval(interval);
        resolve(success);
      }

    }, delay);

  });

}

export default Utils;
