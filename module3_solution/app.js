(function (){
'use strict';
angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItem', foundItem)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function foundItem() {
  var ddo = {
    templateUrl: 'found_item.html'
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService', '$filter'];
function NarrowItDownController(MenuSearchService, $filter){
  var searchText = this;
  searchText.itemDesc = "";
  searchText.menu_desc = [];

  var splitted_menu_desc = [];
  searchText.addDesc = function () {

  var description = MenuSearchService.addDesc(searchText.itemDesc);
  description = $filter('lowercase')(description);
  var promise = MenuSearchService.getMenuDescription();
  var splitted_desc = description.split(" ");
  var jindex = 0;
  var index_array = [];
  searchText.foundItem = [];

  promise.then(function (response) {
    searchText.categories = response.data.menu_items;
    for(var i = 0; i<=218; i++){
      searchText.menu_desc[i] = $filter('lowercase')(searchText.categories[i].description);
    }

    for (var i = 0; i<= 218; i++){
    splitted_menu_desc[i] = searchText.menu_desc[i].split(" ");
    }

    for(var i = 0; i <= 218; i++){
    var status = MenuSearchService.compareStrings(splitted_menu_desc[i] ,splitted_desc);
    if (status === 1){
      index_array[jindex] = i;
      jindex++;
    }
   }

  for(var i = 0; i < index_array.length; i++){
    searchText.foundItem[i] = searchText.categories[index_array[i]].name;
   }

 })/*
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });*/

 }

   searchText.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex, searchText.foundItem);
   };

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {

  var service = this;
  var completeDesc = "";

  service.addDesc = function (itemDesc) {
    var item = itemDesc;
    completeDesc = item;
    return completeDesc;
  };
  service.getMenuDescription = function () {
    var response = $http({
    method: "GET",
    url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };

  service.compareStrings = function(menu_desc, description){
    for (var i = 0; i < description.length; i++){
      for (var j = 0; j< menu_desc.length; j++){
          if(description[i] === menu_desc[j]){
            return 1;
          }
      }
    }
    return 0;

  }
  service.removeItem = function (itemIndex, foundItem) {
    foundItem.splice(itemIndex, 1);
  };
}
})();
