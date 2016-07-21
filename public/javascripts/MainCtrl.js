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
        var textArea  = document.getElementById('jsonInput');
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

    // function to create prettified string
    var prettify = function(jsonInput) {
        
        var prettyJson   = "";      // variable to store new output
        var tabCount     = 0;       // store amount of tabs required

        var jsonArray    = stringToArray(jsonInput);
        var arrayLength  = jsonArray.length;

        // store whether inside key / value attribute
        var quotes = {
            inside: false,
            lastQuote: ""
        }

        // function to write the correct amount of tabs
        var writeTabs = function() {
            
            for (var i = 0; i < tabCount; i++) {
                prettyJson = prettyJson + '\t';
            }
        }

        for (var i = 0; i < arrayLength; i++) {

            var jChar = jsonArray.pop();

            switch (jChar) {
                case '{':
                    prettyJson = prettyJson + jChar + '\n';
                    tabCount++;
                    writeTabs();

                    break;
                case '}':
                    tabCount--;
                    prettyJson = prettyJson + '\n';
                    writeTabs();
                    prettyJson = prettyJson + jChar;

                    break;
                case '[':
                    break;
                case ']':
                    break;
                case '"':
                    if (quotes.inside && quotes.lastQute === '"') {
                        prettyJson = prettyJson + jChar + '\xa0';
                        quotes.inside = false;
                    } else {
                        prettyJson = prettyJson + jChar;
                        quotes.inside = true;
                    }

                    break;
                case "'":
                    if (quotes.inside && quotes.lastQuote === "'") {
                        prettyJson = prettyJson + jChar + '\xa0';
                        quotes.inside = false;
                    } else {
                        prettyJson = prettyJson + jChar;
                        quotes.inside = true;
                    }

                    break;
                default:
                    prettyJson = prettyJson + jChar;
                    break;
            }
        }

        // return prettified json
        return prettyJson;
    }

    // function convert string to array (stack)
    var stringToArray = function(inputString) {

        var strArray = [];
        var count    = 0;

        for (var i = (inputString.length - 1); i > -1; i--) {
            strArray[i] = inputString[count];

            count++;
        }

        return strArray;
    }
});
