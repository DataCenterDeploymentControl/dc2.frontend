function DashBoardCtrl($scope, $location, $localStorage, AuthFactory) {
  $scope.$storage = $localStorage;
  $scope.foobar = {};
  $scope.foobar.myData = [
    {
      key: 'Memory Free',
      color: '#00FF00',
      values: [
        {
          label: 'Virt1',
          value: 39
        },
        {
          label: 'Virt2',
          value: 80
        },
        {
          label: 'Virt3',
          value: 20
        }
      ]
    },
    {
      key: 'Memory Used',
      color: '#FF0000',
      values: [
        {
          label: 'Virt1',
          value: 30
        },
        {
          label: 'Virt2',
          value: 65
        },
        {
          label: 'Virt3',
          value: 18
        }
      ]
    }
  ]
  $scope.foobar.options = {
      "chart": {
        "type": 'multiBarChart',
        "height": 450,
        "stacked": false,
        "stackedOffset":0,
        "x": function(d) { return d.label },
        "y": function(d) { return d.value },
        "showValues": true,
        "showControls": true,
        "margin": {
          "top": 30,
          "bottom":30,
          "left":30,
          "right":30
        }
      }
  };
  $scope.$watch('$scope.foobar', function(newVar, oldVar){
    console.log('controller watch');
    console.log(newVar);
    console.log(oldVar);
  }) ;

  $scope.addData = function() {
    console.log('in addData');
    var data1 = {
      label: 'Virt2',
      value: 80
    };
    var data2 = {
      label: 'Virt2',
      value: 65
    };
    $scope.foobar.myData[0].values.push(data1);
    $scope.foobar.myData[1].values.push(data2);
    console.log($scope.foobar);
  }
}

dc2DashboardControllers.controller('DashBoardCtrl', ['$scope', '$location', '$localStorage', 'AuthFactory', DashBoardCtrl]);
