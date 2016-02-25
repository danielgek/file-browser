require('angularjs-watcher-count');
var explorerApp = angular.module('explorerApp', ['ngMaterial', 'ngAnimate', 'ui.router']);
explorerApp.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {


    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "pages/home.html",
            controller: 'homeController',
            resolve: {
                device: ['adbService',
                    function(adbService) {
                        return adbService.track();
                    }
                ],
                props: ['adbService', 'device',
                    function(adbService, device) {
                        return adbService.getProps();
                    }
                ],
                stats: ['adbService', 'device',
                    function(adbService, device) {
                        return adbService.getStats();
                    }
                ]
            }
        }).state('files', {
            url: "/files",
            templateUrl: "pages/files.html",
            controller: 'filesController',
            resolve: {
                fileListInit: ['adbService',
                    function(adbService) {
                        return adbService.getFileList('/');
                    }
                ]
            }
        }).state('apps', {
            url: "/apps",
            templateUrl: "pages/apps.html",
            controller: 'appsController',
            resolve: {
                appListInit: ['adbService',
                    function(adbService) {
                        return adbService.getAppsList();
                    }
                ]
            }
        });

    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('orange');

    $mdIconProvider
        .icon('menu', 'img/icons/menu.svg', 24);


}).run(['$rootScope',function($rootScope){

    $rootScope.stateIsLoading = false;
    $rootScope.$on('$stateChangeStart', function() {
        $rootScope.stateIsLoading = true;
    });
    $rootScope.$on('$stateChangeSuccess', function() {
        $rootScope.stateIsLoading = false;
    });
    $rootScope.$on('$stateChangeError', function() {
        //catch error
    });

}]);
