const Storage = {
  parseLocalStorage(key) {
    const value = JSON.parse(localStorage.getItem(key));
    return value;
  }, // NOT SURE ABOUT STRINGS RETURNED INSTEAD OF LIST/OBJECTS

  checkStorage() {
    let keys = [];
    const number_of_keys = localStorage.length;

    for (let i = 0; i < number_of_keys; i++) {
      if (number_of_keys === 0) {
        return keys;
      } else {
        keys.push(localStorage.key(i));
      }
    }

    return keys;
  },

  cleanStorage(key) {
    localStorage.removeItem(key);
  },

  updateStorage(key, value) {
    this.cleanStorage(key);
    localStorage.setItem(key, JSON.stringify(value));
  },
};

export default Storage;
