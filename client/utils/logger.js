const log = function () {
  // log.history = log.history || [];
  // log.history.push(arguments);
  //  console.log(Array.prototype.slice.call(arguments));
   console.log(...arguments);
};

export default log;
