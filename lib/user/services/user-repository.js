module.exports = function($http, UserState, CONFIG) {
    var baseUrl = CONFIG.apiUrl + '/user/';

    return {
        me: function() {
            return $http.get(baseUrl + 'me.json').then(function(res) {
                var user = res.data;

                UserState.setUser(user);

                return user;
            });
        }
    };
};
