module.exports = function(MODE, CONFIG, $state, LocalStore) {
    return {
        restrict: 'A',
        replace: true,
        template: require('../tpl/dev-box.html'),
        scope: true,
        link: function($scope) {
            $scope.visible = !!CONFIG.devBox;
            $scope.mode = MODE;
            $scope.state = $state;

            $scope.purgeLocalStore = function() {
                LocalStore.purge();
                window.alert('Local store purged.');
            };
        }
    };
};
