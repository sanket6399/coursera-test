(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', function ($scope) {
  $scope.name = "";
  $scope.displaymsg = ""
  $scope.display = function () {
    var empty = checkEmpty($scope.name);
    var totalNameValue = calculateCommasInString($scope.name);
    var sendmsg = "";
    if (!empty){
      sendmsg = "Please enter data first"
    }
    else if (totalNameValue < 4){
      sendmsg = "Enjoy!";
    }
    else if (totalNameValue >= 4){
      sendmsg = "Too much!";
    }
    $scope.displaymsg = sendmsg;
  };

  function checkEmpty(string){
    var word = 0;
    for(var i = 0; i < string.length; i++){
      if(string.name[i]==" "){
        continue;
      }
      else{
        word = 1;
        break;
      }
    }
    return word;
 }
  function calculateCommasInString(string) {
    var comma = string.split(",")
    return comma.length;
  }
});

})();
