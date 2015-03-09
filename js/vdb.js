angular.module('vdb', [])
  .controller('formController', ['$scope', function($scope) {
    $scope.cols = [];

    $scope.enterForm = function() {
      $scope.cols = [
        {text:'Columns'}]; //reset cols everytime form is entered
      for(i=0; i < columnNum; i++){
        var dropdown = $("#col"+i);
        //alert ($(dropdown).val());
        $scope.cols.push({text:$(dropdown).val()});

      }
    };

    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    $scope.archive = function() {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) $scope.todos.push(todo);
      });
    };
  }]);
