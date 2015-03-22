(function() {
  angular
    .module('sift', [])
    .controller('PanelFilter', PanelFilter);

  function PanelFilter() {
    var vm = this;
    vm.selectedItems = [];
    vm.toggleSelected = toggleSelected;
    vm.showSelected = showSelected;
    vm.showSelectedStatus = false;
    vm.isSelected = isSelected;
    vm.items = [{
      id: 1,
      title: 'Cras justo odio'
    }, {
      id: 2,
      title: 'Dapibus ac facilisis in'
    }, {
      id: 3,
      title: 'Morbi leo risus'
    }, {
      id: 4,
      title: 'Porta ac consectetur ac'
    }, {
      id: 5,
      title: 'Vestibulum at eros'
    }, {
      id: 6,
      title: 'Egestas eget quam'
    }, {
      id: 7,
      title: 'Nullam id dolor id nibh ultricies'
    }, {
      id: 8,
      title: 'Consectetuer adipiscing elit'
    }, {
      id: 9,
      title: 'Vel illum dolore eu feugiat'
    }];
    vm.currentItems = vm.items;

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