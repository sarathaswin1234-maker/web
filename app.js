const myapp = angular.module("myapp", []);

myapp.service("myservice",function($http){
    let task=[];
    this.getTasks=function(){
        $http.get("http://localhost:8080/get").then(res=>{
            res.data.forEach(element => {
                task.push(element)
            });
        }).catch(err=>console.log(err));
        return task;
    }
    this.addTasks=function(tas){
        $http.post("http://localhost:8080/post",tas).then(res=>{
            
            return res.data;
        }).catch(err=>console.log(err));
    }
    this.deleteTasks=function(ind){
        $http.delete("http://localhost:8080/delete/"+ind).then(res=>{
            console.log(res);
        })
    }
    this.updateTasks=function(obj){
        $http.put("http://localhost:8080/update/"+obj.ind,{task:obj.upind}).then(
            res=>res
        ).catch(e=>console.log(e));
    }

})
myapp.factory("myfactory",function(){
    return{
        load:function(){
            return "simple factory loaded"
        }
    }
})

myapp.directive("mydirect",function(){
    return{
        restrict:'E',
        scope:{
            username:'='
        },
        template:`<h3>hello custom directive by {{username}}</h3>`
    }
})
myapp.controller("myctrl", function ($scope,myfactory, myservice) {
    $scope.user={name:"sudharshan"}
    $scope.tasks = myservice.getTasks();
    $scope.message="";
    $scope.tog=0;
    $scope.addTask=function(tas){
        $scope.message=myservice.addTasks({task:tas});
        $scope.task='';
    }
    $scope.deleteTask=function(ind){
        
        $scope.message=myservice.deleteTasks(ind);
        console.log($scope.message);
    }
    $scope.update=function(ind,upind){
        let va=myservice.updateTasks({ind,upind});
        console.log(va);
        $scope.tog=0;
    }
    $scope.updateTask=function(){
        $scope.tog=1;
    }
    $scope.factor=function(){
        console.log(myfactory.load())
    }
    myservice.getTasks();
});