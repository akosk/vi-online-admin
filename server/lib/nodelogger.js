import Log from 'log';
const log=new Log('debug');

const wrapper={};
wrapper.debug= function() {
  log.debug(Array.prototype.slice.call(arguments));
};
wrapper.info= function() {
  log.info(Array.prototype.slice.call(arguments));
};

export default wrapper;
