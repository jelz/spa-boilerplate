module.exports = function(MODE, $state, LocalStore) {
    return {
        restrict: 'A',
        replace: true,
        template: require('../tpl/dev-box.html'),
        scope: true,
        link: function($scope) {
            $scope.visible = MODE === 'dev';
            $scope.mode = MODE;
            $scope.state = $state;

            $scope.purgeLocalStore = function() {
                LocalStore.purge();
                window.alert('Local store purged.');
            };
        }
    };
};
