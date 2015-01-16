var app;

require('./modules.js');

app = angular.module('app', [
    'ui.router',
    'todo',
    'mail',
    'user'
]);

app.config(require('./states.js'));
app.directive('appLayout', require('./directives/layout-directive.js'));
app.directive('appDevBox', require('./directives/dev-box-directive.js'));

app.run(function($rootScope, $log) {
    $rootScope.$on('$stateChangeError', function() {
        $log.error('State router error.');
    });
});

module.exports = app;
