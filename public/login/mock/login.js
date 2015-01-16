/**
 * This file simulates proper backend flow.
 * Please refer to README.md for more implementation details.
 */

(function() {
    var DEFAULT_REDIRECT_URI = window.location.protocol + '//' + window.location.host;
    var SEPARATOR = '___';

    var getUUID = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0;
            var v = c === 'x' ? r : (r&0x3|0x8);

            return v.toString(16);
        });
    };

    var getRedirectUri = function() {
        var match = /[?&]redirect_uri=([^&]*)/.exec(window.location.search);

        return (match && decodeURIComponent(match[1].replace(/\+/g, ' '))) || DEFAULT_REDIRECT_URI;
    };

    var getRedirectUriWithToken = function() {
        var redirectUri = getRedirectUri();

        if (!/#/.test(redirectUri)) {
            redirectUri += /\/$/.test(redirectUri) && (redirectUri.match(/\//g) || []).length > 2 ? '#' : '/#';
        }

        return redirectUri + SEPARATOR + getUUID();
    };

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            window.location.href = getRedirectUriWithToken();
        }, false);
    }, false);
}());
