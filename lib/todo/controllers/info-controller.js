module.exports = function($scope, $rootScope) {

    $scope.$on('todo:change', function(e, items) {
        $scope.counter = { todo: 0, done: 0 };

        angular.forEach(items, function(item) {
            $scope.counter[item.done ? 'done' : 'todo'] += 1;
        });
    });

    $scope.purge = function() {
        if (window.confirm('Are you sure?')) {
            $rootScope.$broadcast('todo:purge');
        }
    };
};
