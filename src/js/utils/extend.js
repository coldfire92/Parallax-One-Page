'use strict';

export default function(obj1, obj2) {
  for (var i in obj2) {
     if (obj2.hasOwnProperty(i)) {
        obj1[i] = obj2[i];
     }
  }
  return obj1;
}

