const SimpleCache = require('./SimpleCache');

// Create new simple cache object
cache = new SimpleCache();
const today = new Date();
// Add 1 hour to the current time for testing
today.setHours(today.getHours() + 1);
const todayFormattedDate = `${today.getMonth() + 1}/${today.getDate() + 1}/${today.getFullYear()}`;
// console.log(`todayFormattedDate: ${todayFormattedDate}`);

test('SimpleCache test add() and get() methods', () => {
  cache.add('testKey1', 'Hello', todayFormattedDate);
  // console.log(cache.get('testKey1'));
  expect(cache.get('testKey1').value).toEqual('Hello');
  expect(cache.get('testKey1').success).toEqual(true);
});

test('SimpleCache test remove() and get() methods', () => {
  cache.remove('testKey1');
  // console.log(cache.get('testKey1'));
  expect(cache.get('testKey1').value).toBeFalsy();
  expect(cache.get('testKey1').success).toEqual(true);
});

// Test to remove same key again
test('SimpleCache test remove() and get() methods', () => {
  let removedAgain = cache.remove('testKey1');
  // console.log(removedAgain);
  expect(removedAgain.value).toBeFalsy();
  expect(removedAgain.success).toEqual(false);
});

test('SimpleCache test remove() add() and get() methods', () => {
  cache.remove('testKey1');
  cache.add('testKey1', 'Hello World!', todayFormattedDate);
  // console.log(cache.get('testKey1'));
  expect(cache.get('testKey1').value).toEqual('Hello World!');
  expect(cache.get('testKey1').success).toEqual(true);
});

test('SimpleCache test update() and get() methods', () => {
  cache.update('testKey1', 'Hello World y\'all!', todayFormattedDate);
  // console.log(cache.get('testKey1'));
  expect(cache.get('testKey1').value).toEqual('Hello World y\'all!');
  expect(cache.get('testKey1').success).toEqual(true);
});