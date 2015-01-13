var app;

require('./modules.js');

app = angular.module('app', [
    'ui.router',
    'todo',
    'mail'
]);

app.config(require('./states.js'));

app.config(function($logProvider) {
    $logProvider.debugEnabled(window.APP_MODE === 'dev');
});

app.run(function($rootScope, $log, MODE, CONFIG) {
    $rootScope.app = $rootScope.app || {};
    $rootScope.app.MODE = MODE;
    $rootScope.app.CONFIG = CONFIG;
    $log.debug('Application started in *' + MODE + '* mode.');
});

app.run(function($rootScope, $log) {
    $rootScope.$on('$stateChangeError', function() {
        $log.error('State router error.');
    });
});

app.directive('appLayout', require('./directives/layout-directive.js'));
app.directive('appDevBox', require('./directives/dev-box-directive.js'));

module.exports = app;
