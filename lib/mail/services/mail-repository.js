module.exports = function(CONFIG, FolderRepository, $http, $q) {
    var baseUrl = CONFIG.apiUrl + '/mail/';

    return {
        query: function(opts) {
            opts = angular.isObject(opts) ? opts : {};
            opts.folder = opts.folder || FolderRepository.getFirst();

            return $http.get(baseUrl + opts.folder + '.json').then(function(res) {
                return res.data;
            });
        },

        get: function(opts) {
            opts = angular.isObject(opts) ? opts : {};

            if (!opts.folder || !opts.id) {
                return $q.reject('Invalid options.');
            }

            return this.query({ folder: opts.folder }).then(function(messages) {
                var found = null;

                angular.forEach(messages, function(msg) {
                    found = parseInt(msg.id, 10) === parseInt(opts.id, 10) ? msg : found;
                });

                return angular.isObject(found) ? found : $q.reject('Message not found.');
            });
        }
    };
};
