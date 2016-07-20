angular.module('MainCtrl', []).controller('MainController', function($scope) {

    // alert visibility states
    // default is false
    $scope.alerts = {
        showValid: false,
        showError: false
    }

    // scope function to prettify string in textarea
    $scope.prettify = function() {
        
        // get text area and its values
        var textArea = document.getElementById('jsonInput');
        var jsonInput = textArea.value;

        // if string is valid json
        if (validate(jsonInput)) {
            
            // show appropriate alerts
            $scope.alerts.showValid = true;
            $scope.alerts.showError = false;

            // prettify the json
            textArea.value = prettify(jsonInput);
        } else {
            
            // show error alert
            $scope.alerts.showValid = false;
            $scope.alerts.showError = true;
        }
    }

    // method to validate string as JSON
    var validate = function(jsonInput) {

        // attempt to parse string to JSON
        try {
            JSON.parse(jsonInput);
        } catch (e) {
            
            // if there is an error, string 
            // is not valid JSON, return false
            return false;
        }

        // if it succeeds, it is valid 
        // JSON so return true
        return true;
    }

    var prettify = function(jsonInput) {
        
    }
});
