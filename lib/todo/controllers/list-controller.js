module.exports = function($scope, $rootScope, TodoRepository) {
    TodoRepository.query().then(function(items) {
        $scope.items = items;
    });

    $scope.reset = function() { $scope.model = { value: '' }; };
    $scope.reset();

    $scope.toggle = function(item) { item.done = !item.done; };

    $scope.remove = function(item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    };

    $scope.add = function() {
        if ($scope.model.value.length > 0) {
            $scope.items.push({ value: $scope.model.value, done: false });
            $scope.reset();
        }
    };

    $scope.$on('todo:purge', function() {
        $scope.items = [];
        $scope.reset();
    });

    $scope.$watch('items', function() {
        TodoRepository.update($scope.items);
        $rootScope.$broadcast('todo:change', $scope.items);
    }, true);
};
