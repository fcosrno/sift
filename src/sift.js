(function() {
    angular
        .module('sift', [])
        .factory('DataService', DataService)
        .directive('siftPanel', SiftPanel);


    function SiftPanel() {
        var directive = {
            restrict: 'EA',
            template: '<div class="panel panel-default"> <div class="panel-heading"> <div class="row"> <div class="col-xs-6"> <div class="form-group"> <input type="text" ng-model="vm.titleFilter" class="form-control" id="exampleInputEmail3" placeholder="Filter by title..."> </div> </div> <div class="col-xs-6"> <div class="checkbox"> <label> <input type="checkbox" ng-click="vm.showSelected()">Selected only </label> </div> </div> </div> </div> <div class="panel-body" ng-if="vm.loading || vm.errors"> <div ng-if="vm.loading" class="text-center"> <i class="fa fa-refresh fa-spin fa-2x"></i> <p>Loading items</p> </div> <div ng-if="vm.errors" class="alert alert-warning text-center"> <i class="fa fa-warning"></i> {{vm.errors}} </div> </div> <ul class="list-group list-striped list-hover panel-filter-list"> <li ng-click="vm.toggleSelected(item.id)" class="list-group-item" ng-class="{\'selected\': vm.isSelected(item.id)}" ng-repeat="item in vm.currentItems | filter:vm.titleFilter | orderBy:\'title\'"> <i ng-if="!vm.isSelected(item.id)" class="fa fa-circle-thin"></i> <i ng-if="vm.isSelected(item.id)" class="fa fa-check"></i> {{item.title}} </li> </ul> <input type="hidden" name="selected_items" value="{{vm.selectedItems.toString()}}"> </div>',
            scope: {
                url: '@',
                titleAs: '@',
            },
            controller: SiftController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    SiftController.$inject = ['DataService'];

    function SiftController(DataService) {
        var vm = this;
        console.log('Url is ', vm.url, 'titelAs is ', vm.titleAs);
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
                if (vm.items.length < 1) vm.errors = "There are no items to display.";
            });
        }

        function getItems() {
            return DataService.getItems(vm.url)
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

    DataService.$inject = ['$http'];

    function DataService($http) {
        return {
            getItems: getItems
        };

        function getItems(url) {
            return $http.get(url)
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

})();