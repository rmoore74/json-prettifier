angular.module('MainCtrl', []).controller('MainController', function($scope) {

    $scope.prettify = function() {
        var jsonInput = document.getElementById('jsonInput');

        alert(validate(jsonInput.value));
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
