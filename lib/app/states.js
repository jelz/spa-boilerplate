module.exports = function($stateProvider, $urlRouterProvider) {
    var modules = require('./modules.js');

    $stateProvider.state('app', {
        abstract: true,
        views: {
            'nav@':  {
                template: require('./tpl/nav.html'),
                controller: function($scope, UserState) {
                    $scope.isLogged = UserState.isLogged();
                    $scope.$on('user:logout', function() { $scope.isLogged = false; });
                }
            }
        }
    });

    $stateProvider.state('app.todo', {
        url: '/todo',
        views: {
            'sidebar@': modules.todo.sidebarState,
            'content@': modules.todo.listState
        }
    });

    $stateProvider.state('app.mail', {
        url: '/mail',
        views: {
            'sidebar@': modules.mail.sidebarState,
            'content@': modules.mail.redirectState
        }
    });

    $stateProvider.state('app.mail.compose', {
        url: '/compose',
        views: {
            'content@': modules.mail.composeState
        }
    });

    $stateProvider.state('app.mail.folder', {
        url: '/{folderName:[a-z]+}',
        views: {
            'content@': modules.mail.folderState
        }
    });

    $stateProvider.state('app.mail.folder.message', {
        url: '/{messageId:[1-9][0-9]*}',
        views: {
            'content@': modules.mail.messageState
        }
    });

    $stateProvider.state('app.user', {
        abstract: true,
        url: '/user'
    });

    $stateProvider.state('app.user.profile', {
        url: '/profile',
        views: {
            'content@': modules.user.profileState
        }
    });

    $urlRouterProvider.otherwise('/todo');
};
