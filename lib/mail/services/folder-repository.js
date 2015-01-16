var FOLDER_MOCK = [
    { name: 'Inbox', normalizedName: 'inbox' },
    { name: 'Working copies', normalizedName: 'drafted' },
    { name: 'Sent', normalizedName: 'sent' },
    { name: 'Trash', normalizedName: 'trash' }
];

module.exports = function() {
    return {
        get: function() {
            return angular.copy(FOLDER_MOCK);
        },

        getFirst: function() {
            return angular.copy(FOLDER_MOCK[0]);
        },

        getByNormalizedName: function(name) {
            var found = null;

            angular.forEach(FOLDER_MOCK, function(folder) {
                if (folder.normalizedName === name) {
                    found = folder;
                }
            });

            return angular.isObject(found) ? angular.copy(found) : null;
        }
    };
};
