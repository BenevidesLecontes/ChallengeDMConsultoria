const app = angular.module('ChallengeDmApp', ['ngRoute']).config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
    $locationProvider.html5Mode({enabled: true, requireBase: false});

    $routeProvider.when('/', {
        templateUrl: './templates/invoice/index.html',
        controller: 'InvoiceController'
    }).otherwise('/');
}]);

