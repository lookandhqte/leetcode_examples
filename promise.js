"use strict";
const cache = {
  fn: [],
  values: [],
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
    let valuesIndex = cache.values.indexOf(argsKey);
    if (fnIndex !== -1 && valuesIndex !== -1) {
      //нужно добавить проверку на undefined в ress
      //бывают ситуации, когда функция кэширована
      // значения кэшированы, но результат конкретно у этой функции и этих значений еще не вычислялся
      //в таком случае .res еще не существует, и нужно создать объект новый с этой же функцией и values
      // и вычислить результат
      const ress = cache.results.find(
        (elem) => elem.fnId == fnIndex && elem.valuesId == valuesIndex
      );
      if (!ress || ress == undefined) {
        let resId = cache.results.length;
        cache.results[resId] = {
          index: resId,
          fnId: fnIndex,
          valuesId: valuesIndex,
          res: fn(...args),
        };
        return cache.results[resId].res;
      } else {
        return ress.res;
      }
    }
    if (cache.values.includes(argsKey) == false) {
      cache.values.push(argsKey);
      let resId = cache.results.length;
      cache.results[resId] = {
        index: resId,
        fnId: cache.fn.indexOf(fn),
        valuesId: cache.values.indexOf(argsKey),
        res: fn(...args),
      };
      return cache.results[resId].res;
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
