
angular.module('app').factory('serviceUpdate', ['$log', '$q', 'serviceIonicWrapper', function ($log, $q, ionic) {

    //
    var fs = new CordovaPromiseFS({
        persistent: isCordova,
        Promise: $q 
    });

    //
    var loader = new CordovaAppLoader({
        fs: fs,
         
        //serverRoot: app.datas.app.provider.appLoader.serverRoot,
        serverRoot: !app.datas.app.provider.appLoader.serverPath ? app.datas.app.provider.appLoader.serverRoot : app.datas.app.provider.appLoader.serverRoot + '/' + app.datas.app.provider.appLoader.serverPath,
        
        //localRoot: 'data2',
        localRoot: !app.datas.app.provider.appLoader.dataPath ? '.mobC' : '.mobC' + '/' +  app.datas.app.provider.appLoader.dataPath + '/',
        
        mode: 'mirror',
        cacheBuster: true, // make sure we're not downloading cached files.
        checkTimeout: 10000, // timeout for the "check" function - when you loose internet connection
        manifest: 'manifest.json' + "?" + Date.now()
    });

    var service = {

        check: function () {

            var defer = $q.defer();
            loader.check().then(function (updateAvailable) {
                
                if (updateAvailable) {
                    
                    ionic.popup.confirmNoYes('App updaten ?', function (res) {
                        if (res) {
                            defer.resolve(res);
                        }
                        else {
                            defer.reject(res);
                        }
                    });
                    
                }
                else {
                    defer.reject(updateAvailable);
                }
            });

            return defer.promise;
        },

        download: function (onprogress) {
            var defer = $q.defer();

            loader.download(onprogress).then(function (manifest) {
                defer.resolve(manifest);
            }, function (error) {
                defer.reject(error);
            });
            
            return defer.promise;
        },

        update: function (reload) {
            loader.update(reload);
        },

        isFileCached: function (file) {
            if (angular.isDefined(loader.cache)) {
                return loader.cache.isCached(file);
            }
            return false;
        },

        getCachedUrl: function (url) {
            if (angular.isDefined(loader.cache)) {
                return loader.cache.get(url);
            }
            return url;
        },
        
        getCachedHtmlUrl: function (url) {
            if (angular.isDefined(loader.cache)) {
                return loader.cache.getForHtml(url);
            }
            return url;
        }

    };

    return service;
}]);


angular.module('app').directive('img', ['$timeout', 'serviceUpdate', function ($timeout, serviceUpdate) {

    return {
        restrict: 'E',
        priority: 1002,

        link: function (scope, el, attrs) {
            
            // watch for changes
            attrs.$observe('ngSrc', function (src) {

                // do it in a timeout
                $timeout(function () {
                    
                    // check if image is cached
                    if (serviceUpdate.isFileCached(src)) {
                        el.attr('src', serviceUpdate.getCachedHtmlUrl(src));
                    }

                }, 500, true);
                
            });
        }
    };

}]);

//
window.BOOTSTRAP_OK = true;

// check for cordova
var isCordova = typeof cordova !== 'undefined';

// run
angular.module('app').run(['$rootScope', '$ionicPlatform', '$window', 'serviceUpdate',  function routes($rootScope, $ionicPlatform, $window, serviceUpdate) {
    window.BOOTSTRAP_OK = true;
    
    function checkUpdate() {
        
        //console.log('check for update');
        
        // check for update
        serviceUpdate.check()
            .then(function (updateAvailable) {
                
                
                // console.log('update is available ... ');
                return serviceUpdate.download();
            })
            .then(function () {
                // console.log('serviceUpdate... ');
                return serviceUpdate.update(true);
            },
            function (err) {
                if (err) {
                    console.error('Auto-update error:', err);
                }
        });
    }

    // 3. Chrome: On page becomes visible again
    function handleVisibilityChange() {
        if (!document.webkitHidden) {
            checkUpdate();
        }
    }
    
    // ionic is ready
    $ionicPlatform.ready(function () {
        //console.log('ionic ready')
        
        $window.BOOTSTRAP_OK = true;
        //console.log('checked for update ...');
        
        //
        checkUpdate();
        
        // listener for update
        $rootScope.$on('$rootScope.mobcEvent', function(evt, args) {
					
					if (args.name === 'checkUpdate') {
					   checkUpdate();
					}
		});
        
        //
        if ($window.cordova) {
           // document.addEventListener('resume', checkUpdate); 
        }
        //
        else {
            document.addEventListener("webkitvisibilitychange", handleVisibilityChange, false);
        };
        
        

    });

}]);
