var todo = angular.module('todo', []);

todo.factory('TodoRepository', require('./todo-repository.js'));

todo.listState = {
    template: require('./tpl/list.html'),
    controller: require('./controllers/list-controller.js')
};

todo.sidebarState = {
    template: require('./tpl/info.html'),
    controller: require('./controllers/info-controller.js')
};

module.exports = todo;
