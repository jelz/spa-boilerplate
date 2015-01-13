var todo = angular.module('todo', []);

todo.factory('TodoRepository', require('./todo-repository.js'));

todo.listState = {
    template: require('./tpl/list.html'),
    controller: require('./controller/list-controller.js')
};

todo.sidebarState = {
    template: require('./tpl/info.html'),
    controller: require('./controller/info-controller.js')
};

module.exports = todo;
