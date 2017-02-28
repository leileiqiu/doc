var app = angular.module("myApp",['ui.router','myRoute']);

app.controller("mainCtrl",function($scope,$rootScope){
    $scope.mainInfo = "this is main";
});

app.config(["$stateProvider" , "$urlRouterProvider",function($stateProvider , $urlRouterProvider){
    $stateProvider.state("home",{ //导航用的名字，如<a ui-sref="login">login</a>里的login
        url:'/', //访问路径
        templateUrl:'../module/report/views/report.html',
        controller: 'myRouteCtrl'
    })
    $urlRouterProvider.otherwise('/');
}]);
/**
 * Created by qli on 2017/1/13.
 */
