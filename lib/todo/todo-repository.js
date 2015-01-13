var KEY = 'todos';
var MOCK = [
    { value: 'Walk the dog', done: false },
    { value: 'Drink a beer', done: true }
];

module.exports = function($q, LocalStore) {
    return {
        query: function() {
            var d = $q.defer();

            if (!LocalStore.has(KEY)) {
                LocalStore.set(KEY, MOCK);
            }

            d.resolve(LocalStore.get(KEY));

            return d.promise;
        },

        update: function(items) {
            LocalStore.set(KEY, items);
        }
    };
};
