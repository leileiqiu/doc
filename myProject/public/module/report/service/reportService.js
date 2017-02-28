var myRoute = angular.module("myRoute");

myRoute.service('myService', function($http) {
    console.log("instance myService......");
    var privateValue = "I am Private";
    this.variable = "This is public";
    this.getPrivate = function() {
        return privateValue;
    };

    this.getUsers = function() {
        return $http({ method: 'GET', url: '/getUsers'});
    };
});



