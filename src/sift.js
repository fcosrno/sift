(function() {
    angular
        .module('sift', [])
        .factory('DataService', DataService)
        .controller('PanelFilter', PanelFilter);

    DataService.$inject = ['$http'];

    function DataService($http) {
        return {
            getItems: getItems
        };

        function getItems() {
            return $http.get('http://jsonplaceholder.typicode.com/posts')
                .then(getItemsComplete)
                .catch(getItemsFailed);

            function getItemsComplete(response) {
                return response.data;
            }

            function getItemsFailed(error) {
                console.log('XHR Failed for getItems.' + error.data);
            }
        }
    }

    PanelFilter.$inject = ['DataService'];

    function PanelFilter(DataService) {
        var vm = this;
        vm.loading = true;
        vm.errors = null;
        vm.selectedItems = vm.items = vm.currentItems = [];
        vm.toggleSelected = toggleSelected;
        vm.showSelected = showSelected;
        vm.showSelectedStatus = false;
        vm.isSelected = isSelected;

        activate();

        function activate() {
            return getItems().then(function() {
                vm.loading = false;
                if(vm.items.length<1) vm.errors="There are no items to display.";
            });
        }

        function getItems() {
            return DataService.getItems()
                .then(function(data) {
                    vm.items = vm.currentItems = data;
                    return vm.items;
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