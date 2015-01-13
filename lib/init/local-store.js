var PREFIX = 'app_store_local';
var STORAGE = window.localStorage;

var prefixed = function(key) {
    return '[' + PREFIX + '][' + window.location.host + '](' + key + ')';
};

module.exports = {
    has: function(key) {
        return !!STORAGE.getItem(prefixed(key));
    },
    get: function(key) {
        return JSON.parse(STORAGE.getItem(prefixed(key)) || 'null');
    },
    set: function(key, value) {
        STORAGE.setItem(prefixed(key), JSON.stringify(value));
    },
    remove: function(key) {
        STORAGE.removeItem(prefixed(key));
    },
    purge: function() {
        STORAGE.clear();
    }
};
