"use strict";
const cache = {
  fn: [],
  results: [],
};

function memoize(fn) {
  if (cache.fn.includes(fn)) {
    return;
  } else {
    cache.fn.push(fn);
  }
  return function (...args) {
    let fnIndex = cache.fn.indexOf(fn);
    let argsKey = JSON.stringify(args);
    const ress = cache.results.find(
      (elem) => elem.fnId == fnIndex && elem.values == argsKey
    );
    if (!ress || ress == undefined) {
      cache.results.push({
        fnId: fnIndex,
        values: argsKey,
        res: fn(...args),
      });
      const resulto = cache.results.find(
        (elem) => elem.fnId == fnIndex && elem.values == argsKey
      );
      return resulto.res;
    } else {
      return ress.res;
    }
  };
}

// let callCount = 0;
// const memoizedFn = memoize(function (a, b) {
//   callCount += 1;
//   return a + b;
// });
// memoizedFn(2, 2); // 5, кэшировалось
// memoizedFn(2, 2); // повторный вызов
// console.log(callCount);
// memoizedFn(1, 2);
// console.log(callCount);
// //["call","call","getCallCount","call","getCallCount"]
// //[[2,2],[2,2],[],[1,2],[]]
