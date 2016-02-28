angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http) {
	$scope.TC=1;
	var yyyymmdd = function() {
		var now = new Date();
		if (now.getDay()==6){
			now.setDate(now.getDate() - 1);
		}
		if (now.getDay()==0){
			now.setDate(now.getDate() - 2);
		}
		var yyyy = now.getFullYear();
		var mm = now.getMonth() < 9 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1); // getMonth() is zero-based
		var dd  = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
		var arr = [];
		arr.push(yyyy);
		arr.push(mm);
		arr.push(dd);
		return arr.join("-");
	};
	$scope.day=yyyymmdd();
	$http.get('http://dolarsat.marioperez.com.mx/data/'+$scope.day+'.json').then(function(resp) {
		$scope.day=resp.data.day;
		$scope.TC=resp.data.value;
	},function(){
		$scope.TC='-'
	})
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableNotifications: true
  };
  $scope.token = window.token;
});
