(function() {
  angular
    .module('sift', ['restangular'])
    .controller('PanelFilter', PanelFilter);

  PanelFilter.$inject = ['$scope','Restangular'];
  function PanelFilter($scope,Restangular) {
    var vm = this;
    vm.selectedItems = vm.items = vm.currentItems = [];
    vm.toggleSelected = toggleSelected;
    vm.showSelected = showSelected;
    vm.showSelectedStatus = false;
    vm.isSelected = isSelected;

    activate();

    function activate(){
      return Restangular.allUrl('items','http://jsonplaceholder.typicode.com/posts').getList().then(function(items) {
        vm.items = items;
        vm.currentItems = vm.items;
      });
    }

    function toggleSelected(id) {
      if (vm.isSelected(id)) {
        vm.selectedItems.splice(vm.isSelected(id) - 1, 1);
      } else {
        vm.selectedItems.push(id);
      }
    }

    function isSelected(id) {
      return vm.selectedItems.indexOf(id) + 1;
    }

    function showSelected() {
      if (vm.showSelectedStatus) {
        vm.currentItems = vm.items;
      } else {
        vm.currentItems = [];
        angular.forEach(vm.items, function(item) {
          if (vm.isSelected(item.id)) {
            vm.currentItems.push(item);
          }
        });
      }
      vm.showSelectedStatus = !vm.showSelectedStatus;
    }
  }
})();