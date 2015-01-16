module.exports = function($state, UserState, LocalStore, CONFIG, MODE) {
    return {
        restrict: 'A',
        replace: true,
        template: require('../tpl/dev-box.html'),
        scope: true,
        link: function($scope) {
            $scope.visible = !!CONFIG.devBox;
            $scope.mode = MODE;
            $scope.state = $state;

            $scope.accessToken = UserState.getAccessToken();
            $scope.user = UserState.getUser();
            $scope.$on('user:logout', function() {
                $scope.accessToken = null;
                $scope.user = null;
            });

            $scope.purgeLocalStore = function() {
                LocalStore.purge();
                window.alert('Local store purged.');
            };

            $scope.logout = function() {
                UserState.logout({ redirect: false });
            };
        }
    };
};
