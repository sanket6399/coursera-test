(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', function ($scope) {
  $scope.name = "";
  $scope.displaymsg = ""
  $scope.display = function () {
    var word = 0;
    var i = 0;
    while($scope.name.length){
      if($scope.name[i]==" "){
        i++;
        continue;
      }
      else{
        word = 1;
        break;
      }
    }
    var totalNameValue = calculateCommasInString($scope.name);
    var sendmsg = "";
    if (!word){
      sendmsg = "Please enter data first";
    }
    else if (totalNameValue < 4){
      sendmsg = "Enjoy!";
    }
    else if (totalNameValue >= 4){
      sendmsg = "Too much!";
    }
    $scope.displaymsg = sendmsg;
  };

  function calculateCommasInString(string) {
    var comma = string.split(",")
    return comma.length;
  }
});

})();
