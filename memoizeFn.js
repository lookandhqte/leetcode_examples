//2623. Memoize

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

//Пример использования
let callCount = 0;
const memoizedFn = memoize(function (a, b) {
  callCount += 1;
  return a + b;
});
memoizedFn(2, 3); // 5, кэшировалось
memoizedFn(2, 3); // 5, значения взяты из кэша, функция повторно не вызывалась
console.log(callCount); // 1
memoizedFn(1, 2); // 3, кэшировалось
console.log(callCount); // 2
