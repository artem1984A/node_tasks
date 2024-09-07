const mapAsync = require('./asyncMap')

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function asyncTask(item) {
  await delay(1000); // Simulate asynchronous work
  return item * 2; // Just return double the value for testing
}

async function test() {
  const items = [1, 2, 3, 4, 5];

  // Process the array with a concurrency limit of 2
  const result = await mapAsync(items, asyncTask, 2);

  console.log(result); // Should log: [2, 4, 6, 8, 10]
}

test();