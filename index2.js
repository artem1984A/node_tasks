const customPromiseAll = require('./customPromiseAll');

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.reject('Error');

customPromiseAll([p1, p2, p3])
  .then(results => console.log(results))  // Will not be called
  .catch(error => console.log(error));    // Logs: 'Error'