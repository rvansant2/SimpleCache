/**
 * A simple class for caching objects with expire time
 */
class SimpleCache {
  /**
   * Constructor
   */
  constructor() {
    // Initialize new map cache object
    this.cache = new Map();
  }

  /**
   * Method to add values to cache, indexed by key and expiry time
   * @param {*} key 
   * @param {*} value 
   * @param {*} expires 
   * @returns cache object
   */
  add(key, value, expires) {
    const expiry = expires ? new Date(expires) : new Date();
    this.cache.set(key, { value, expiry });
    return { success: true, message: 'Added successfully.', value: this.cache };
  }

  /**
   * Method to get value based on found key value
   * @param {*} key 
   * @returns cache value
   */
  get(key) {
    const cachedValue = this.cache.get(key);
    // console.log(`cachedValue: ${JSON.stringify(cachedValue)}`);
    if (cachedValue?.expiry && this.hasExpired(cachedValue.expiry)) {
      this.cache.delete(key);
      return { success: false, message: 'Key expired and removed.', value: null };
    }
    let value = cachedValue?.value;
    // console.log(`value: ${value}`);
    return { success: true, message: 'Retrieved successfully.', value: value ? value : cachedValue };
  }

  /**
   * 
   * @param {*} key 
   * @returns Boolean of found value by key and not expired
   */
  has(key) {
    const exists = this.cache.has(key) && !this.hasExpired(this.cache.get(key).expiry);
    return exists;
  }

  /**
   * Method to remove items in cache by key
   * @param {*} key 
   * @returns cache object sans removed item
   */
  remove(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key).value;
      this.cache.delete(key);
      return { success: true, message: 'Key removed successfully.', value };
    }
    console.log(`remove ${key}: ${this.cache.get(key)}`)
    return { success: false, message: 'Key not found.', value: null };
  }

  /**
   * Method to check the set expiry time
   * @param {*} expiry 
   * @returns 
   */
  hasExpired(expiry) {
    return new Date() > expiry;
  }

  /**
   * Method to update cache value.
   * @param {*} key 
   * @param {*} newValue 
   * @param {*} newExpiry 
   * @returns cache object
   */
  update(key, newValue, newExpiry) {
    if (this.cache.has(key)) {
      const exists = this.cache.get(key);
      const expiry = newExpiry ? new Date(newExpiry) : exists.expiry;
      this.cache.set(key, { value: newValue, expiry });
      return { success: true, message: 'Key updated successfully.', value: this.cache.get(key) };
    }
    return { success: false, message: 'Key not found.', value: null };
  }
}

// export SimpleCache class
// Note: should use ES6 exporting but trying to keep this simple with Jest testing.
module.exports = SimpleCache;