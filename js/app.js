require('angularjs-watcher-count');
var explorerApp = angular.module('explorerApp', ['ngMaterial','ngAnimate','ui.router']);
explorerApp.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {


    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "pages/home.html",
            controller: 'homeController',
            resolve: {
                device : ['adbService', 
                    function(adbService){
                        return adbService.track();
                    }],
                props: ['adbService', 'device', 
                    function(adbService, device){
                        return adbService.getProps();
                    }],
                stats: ['adbService', 'device', 
                    function(adbService,device){
                        return adbService.getStats();
                    }]
            }
        }).state('files', {
            url: "/files",
            templateUrl: "pages/files.html",
            controller: 'filesController',
            resolve: {
                fileListInit: ['adbService',
                    function(adbService){
                        return adbService.getFileList('/');
                    }]
            }
        });;

    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('orange');

    $mdIconProvider
      .icon('menu', 'img/icons/menu.svg',24);

    
});