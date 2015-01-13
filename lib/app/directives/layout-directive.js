module.exports = function() {
    return {
        restrict: 'A',
        replace: true,
        template: require('../tpl/layout.html'),
        scope: true
    };
};
