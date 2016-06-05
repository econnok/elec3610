
var myApp = angular.module('myApp', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider){

	$routeProvider.when('/', {
		templateUrl: 'main.html'
		});
		
	$routeProvider.when('/events', {
		templateUrl: 'events.html'
		});
	$routeProvider.when('/host', {
		templateUrl: 'host.html'
		});
	$routeProvider.when('/upload', {
		templateUrl: 'upload.html'
		});		
	
				$routeProvider.when('/charge', {
		templateUrl: 'charge.html'
		});		

}]);

myApp.controller('AppCtrl', ['$scope', '$http','$location','$rootScope', '$route', '$window', function($scope, $http, $location,$rootScope, $route, $window) {


$scope.icalurl = {};
$scope.globaluser= {};


    $scope.slick = function () {
            $(document).ready(function(){
      $('.slickslider').slick(
        );
    });
    }

    $scope.private = function () {

    	$(document).ready(function(){
    		console.log('ayyo');
    		$(".btn#private").click(function() {
    			    var $this = $(this);

    			$this.toggleClass('SeeMore2');
    			if($this.hasClass('SeeMore2')){
    				$this.text('Host Public Event');   
    				$('.form-group.private').removeClass('hidden');      
    			} else {
    				$this.text('Host Private Event');
    				$('.form-group.private').addClass('hidden');
    			}

    			

    		});

    	});
    }

$scope.initial= function(user){
	$scope.globaluser.user = user;
console.log($scope.globaluser.user+"@##@#@@##@#@");
}


	var refresh = function(){ // refresh all infomration on the page
	
			console.log("refresh comments");
	
		$http.get('/eventsrouter').success(function(response){ // ask server through this route
			console.log("SUCCESS i got something from server through post router"); // print to console
			$scope.kevents = response;
		}) ;//asl the server through this route
	
	};
	
	refresh();

//### FUNCTIONS GO HERE ###

	$scope.addEvent = function (user) {
		
	
	
	console.log("%%%%%%%%%%%" + user);
	
		if(!$scope.kevent){ // if the input is blank
			console.log("BLANK!!");
			return;
		}
		$scope.kevent.author = user;

		var kevent = $scope.kevent;
		//var post.author = user.id;


		//console.log(kevent);

		$http.post('/eventsrouter',kevent); // PUSH contact through post route
		$scope.kevent = "" // should delete post in text box ; 
		$route.reload();
		$window.location.reload();
		refresh();
		$location.path( '/events' );
		 


		
	};






    console.log("Hello World from controller");



	

}]);



