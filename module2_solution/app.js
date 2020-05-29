(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListAddController', ShoppingListAddController)
.controller('ShoppingListShowController', ShoppingListShowController)
.service('ShoppingListService', ShoppingListService);


ShoppingListAddController.$inject = ['ShoppingListService'];
function ShoppingListAddController(ShoppingListService) {

  var itemAdder = this;
  ShoppingListService.addsShoppingList();
  itemAdder.items = ShoppingListService.getItems();

  itemAdder.removeItem = function (itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  };
}


ShoppingListShowController.$inject = ['ShoppingListService'];
function ShoppingListShowController(ShoppingListService) {
    var showList = this;
    showList.items = ShoppingListService.boughtItems();
}


function ShoppingListService() {
  var service = this;
  var items = [];
  var newitems = [];

  service.addsShoppingList = function () {
    items = [
      {
        "Name" : "Cookies",
        "quantity" : 2
      },
      {
        "Name" : "Chips",
        "quantity" : 5
      },
      {
        "Name" : "Chocolates",
        "quantity" : 6
      },
      {
        "Name" : "Butter Cubes",
        "quantity" : 4
      },
      {
        "Name" : "Cheese Cubes",
        "quantity" : 3
      }
    ];
  };

  service.removeItem = function (itemIndex) {
    newitems.push(items[itemIndex]);
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
  service.boughtItems = function () {
    return newitems;
  };
}

})();
