var user = angular.module('user', []);

user.factory('UserState', require('./services/user-state.js'));
user.factory('UserRepository', require('./services/user-repository.js'));
user.directive('appUserBox', require('./directives/user-box-directive.js'));

user.profileState = {
    template: require('./tpl/profile.html'),
    controller: function($scope, $state, UserState) {
        $scope.user = UserState.getUser();
        $scope.$on('user:logout', function() { $state.go('app.todo'); });
    },
    resolve: {
        user: function(UserRepository) {
            return UserRepository.me();
        }
    }
};

module.exports = user;
