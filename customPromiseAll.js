function customPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completedPromises = 0;
    let rejected = false;  // Flag to check if a promise has been rejected

    promises.forEach((promise, index) => {
      // Handle each promise (whether it's already resolved or still pending)
      Promise.resolve(promise) // Ensure it's treated as a promise
        .then(value => {
          if (rejected) return; // If a rejection occurred, stop processing

          results[index] = value; // Store result at the correct index
          completedPromises++;

          // If all promises have completed, resolve with results
          if (completedPromises === promises.length) {
            resolve(results);
          }
        })
        .catch(error => {
          if (!rejected) { // Reject only once
            rejected = true; // Set the rejection flag
            reject(error); // Reject the outer promise
          }
        });
    });

    // If no promises are passed in the array, resolve immediately
    if (promises.length === 0) {
      resolve([]);
    }
  });
}
  module.exports = customPromiseAll;