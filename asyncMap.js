async function mapAsync(iterable, callback, concurrency) {
    const results = [];  // Store results of mapping
    const executing = []; // Store currently running promises
  
    // For each item in the iterable, apply the callback
    for (const [index, item] of iterable.entries()) {
      // Create a promise for the current item and store its result in the correct index
      const promise = Promise.resolve().then(() => callback(item, index, iterable));
  
      // Store the result at the correct index
      results[index] = promise;
  
      // Add the promise to the list of executing promises
      executing.push(promise);
  
      // If the number of executing promises exceeds the concurrency limit, wait for one to finish
      if (executing.length >= concurrency) {
        await Promise.race(executing);  // Wait for the first promise to resolve
        // Remove resolved promises from the executing array
        executing.splice(executing.findIndex(p => p === promise), 1);
      }
    }
  
    // Once the loop is done, wait for any remaining promises to resolve
    await Promise.all(executing);
  
    // Return all results, ensuring that they are resolved
    return Promise.all(results);
  }
  module.exports = mapAsync;