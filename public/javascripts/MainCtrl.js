angular.module('MainCtrl', []).controller('MainController', function($scope) {

    $scope.alerts = {
        showValid: false,
        showError: false
    }

    $scope.prettify = function() {
        var jsonInput = document.getElementById('jsonInput');

        if (validate(jsonInput.value)) {
            $scope.alerts.showValid = true;
            $scope.alerts.showError = false;
        } else {
            $scope.alerts.showValid = false;
            $scope.alerts.showError = true;
        }
    };

    var validate = function(jsonInput) {
        try {
            JSON.parse(jsonInput);
        } catch (e) {
            return false;
        }

        return true;
    };
});
