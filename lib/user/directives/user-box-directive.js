module.exports = function(UserState) {
    return {
        restrict: 'A',
        replace: true,
        template: require('../tpl/user-box.html'),
        scope: true,
        link: function($scope) {
            $scope.isLogged = UserState.isLogged();
            $scope.user = UserState.getUser();
            $scope.$on('user:logout', function() {
                $scope.isLogged = false;
                $scope.user = null;
            });

            $scope.login = function() { UserState.login(); };
            $scope.logout = function() { UserState.logout({ redirect: false }); };
        }
    };
};
