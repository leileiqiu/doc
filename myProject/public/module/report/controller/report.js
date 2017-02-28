var myRoute = angular.module("myRoute",[]);

myRoute.controller('myRouteCtrl', function($scope,$http,myService) {
    //获取所有用户
    $scope.getUsers = function(){
        myService.getUsers().then(function(resp){
            //resp是一个响应对象
            $scope.usersInfo = resp.data;
        },function(resp){
            //带有错误信息的resp

        });
    };
    //注册用户
    $scope.addInfo = function(){
        $('#myModal').modal('hide');
        var userObjData = {
            "myDate": $scope.myDate,
            "myCompany": $scope.myCompany,
            "mySpecification": $scope.mySpecification,
            "myBatchNumber": $scope.myBatchNumber,
            "myNumber": $scope.myNumber,
            "myWeight": $scope.myWeight,
            "myPrice": $scope.myPrice,
            "myAmountOfMoney": $scope.myAmountOfMoney
        };
        $http({
            url:'/addInfo',
            method:'post',
            dataType:'json',
            data: userObjData
        }).success(function(data,header,config,status){
            //响应成功
            $scope.getUsers();

        }).error(function(data,header,config,status){
            //处理响应失败
        });
    };
    //删除用户
    $scope.deleteInfo = function(user){
        console.log("user",user);
        var userObjData = {
            "myDate": user.myDate,
            "myCompany": user.myCompany,
            "mySpecification": user.mySpecification,
            "myBatchNumber": user.myBatchNumber,
            "myNumber": user.myNumber,
            "myWeight": user.myWeight,
            "myPrice": user.myPrice,
            "myAmountOfMoney": user.myAmountOfMoney
        };
        $http({
            url:'/deleteInfo',
            method:'delete',
            dataType:'json',
            params: userObjData
        }).success(function(data,header,config,status){
            //响应成功
            $scope.getUsers();

        }).error(function(data,header,config,status){
            //处理响应失败
        });
    };
    $scope.showAddInfo = function(){
        $('#myModal').modal('show');
    };
});