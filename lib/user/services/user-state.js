var defaultToTrue = function(obj, key) {
    obj[key] = obj[key] === false ? false : true;
};

module.exports = function($rootScope, $http, AccessToken, LocalStore, INITIAL_USER, CONFIG) {
    var currentUser = INITIAL_USER;

    return {
        setUser: function(user) { currentUser = user; },
        getUser: function() { return currentUser; },
        isLogged: function() { return AccessToken.isStored(); },
        getAccessToken: function() { return AccessToken.get(); },

        login: function() {
            var encoded = encodeURIComponent(window.location.href);

            window.location.href = CONFIG.loginUrl + '?redirect_uri=' + encoded;
        },

        logout: function(opts) {
            opts = opts || {};

            defaultToTrue(opts, 'purge');
            defaultToTrue(opts, 'redirect');
            defaultToTrue(opts, 'notify');

            AccessToken.remove();
            AccessToken.removeHeader($http);
            currentUser = null;

            if (opts.purge) { LocalStore.purge(); }
            if (opts.redirect) { window.location.href = CONFIG.logoutUrl; }
            if (opts.notify) { $rootScope.$broadcast('user:logout'); }
        }
    };
};
