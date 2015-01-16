var mail = angular.module('mail', []);

mail.factory('FolderRepository', require('./services/folder-repository.js'));
mail.factory('MailRepository', require('./services/mail-repository.js'));

mail.redirectState = {
    template: '<em>Redirecting to {{ first.name }}...</em>',
    controller: function($scope, FolderRepository, $state) {
        $scope.first = FolderRepository.getFirst();
        $state.go('app.mail.folder', { folderName: $scope.first.normalizedName });
    }
};

mail.sidebarState = {
    template: require('./tpl/sidebar.html'),
    controller: function($scope, FolderRepository) {
        $scope.folders = FolderRepository.get();
    }
};

mail.folderState = {
    template: require('./tpl/folder.html'),
    controller: function($scope, FolderRepository, $stateParams, messages) {
        $scope.folder = FolderRepository.getByNormalizedName($stateParams.folderName);
        $scope.messages = messages;
    },
    resolve: {
        messages: function(MailRepository, $stateParams) {
            return MailRepository.query({ folder: $stateParams.folderName });
        }
    }
};

mail.messageState = {
    template: require('./tpl/message.html'),
    controller: function($scope, FolderRepository, $stateParams, message) {
        $scope.folder = FolderRepository.getByNormalizedName($stateParams.folderName);
        $scope.message = message;
    },
    resolve: {
        message: function(MailRepository, $stateParams) {
            return MailRepository.get({ id: $stateParams.messageId, folder: $stateParams.folderName });
        }
    }
};

mail.composeState = {
    template: require('./tpl/compose.html')
};

module.exports = mail;
