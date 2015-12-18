angular.module('app.service', []);
angular.module('app.controller', []);
angular.module('app.directive', []);
angular.module('app.filter', []);
angular.module('app.view', []);
angular.module('app', [
    'app.service',
    'app.controller',
    'app.directive',
    'app.filter',
    'app.view',
    'ionic',
    'ui.slider',
    'ionic.wizard',
    'angular-virtual-keyboard',
    'tabSlideBox',
    'ionic-modal-select',
    'ionic-datepicker'
]);

angular.module('app').config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    return new router.Setting($stateProvider, $urlRouterProvider);
}]);
angular.module('app').config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.withCredentials = app.datas.app.provider.http.withCredentials;
}]);
angular.module('app').config(['$ionicConfigProvider', function ($ionicConfigProvider) {
    var data = app.datas.app.provider.ionic;
    $ionicConfigProvider.views.transition(data.views.transition);
    $ionicConfigProvider.views.maxCache(data.views.maxCache);
    $ionicConfigProvider.views.forwardCache(data.views.forwardCache);
    $ionicConfigProvider.backButton.icon(data.backButton.icon);
    $ionicConfigProvider.backButton.text(data.backButton.text);
    $ionicConfigProvider.backButton.previousTitleText(data.backButton.previousTitleText);
    $ionicConfigProvider.tabs.style(data.tabs.style);
    $ionicConfigProvider.tabs.position(data.tabs.position);
    $ionicConfigProvider.templates.maxPrefetch(data.templates.maxPrefetch);
    $ionicConfigProvider.navBar.alignTitle(data.navBar.alignTitle);
    $ionicConfigProvider.navBar.positionPrimaryButtons(data.navBar.positionPrimaryButtons);
    $ionicConfigProvider.navBar.positionSecondaryButtons(data.navBar.positionSecondaryButtons);
}]);

'use strict';
var router;
(function (router) {
    var eViewtype;
    (function (eViewtype) {
        eViewtype[eViewtype["abstract"] = 0] = "abstract";
        eViewtype[eViewtype["virtual"] = 1] = "virtual";
        eViewtype[eViewtype["view"] = 2] = "view";
        eViewtype[eViewtype["modal"] = 3] = "modal";
        eViewtype[eViewtype["tab"] = 4] = "tab";
    })(eViewtype || (eViewtype = {}));
    var Setting = (function () {
        function Setting($stateProvider, $urlRouterProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.data = app.datas.app.global;
            this.mainContainer = this.data.pages.menu;
            this.init();
        }
        Setting.capitalize = function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        };
        Setting.prototype.addState = function (viewType, container, state, authenticate) {
            if (viewType === 0 /* abstract */) {
                this.$stateProvider.state(state, {
                    url: '/' + state,
                    abstract: true,
                    templateUrl: state + '.html',
                    controller: 'controller' + Setting.capitalize(state)
                });
            }
            else {
                if (container) {
                    var viewContainer = {};
                    Object.defineProperty(viewContainer, 'content' + Setting.capitalize(container), {
                        value: {
                            templateUrl: state + '.html',
                            controller: 'controller' + Setting.capitalize(state)
                        },
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                    this.$stateProvider.state(container + '.' + state, {
                        url: '/' + state,
                        authenticate: authenticate || 0,
                        views: viewContainer,
                    });
                }
                else {
                    switch (viewType) {
                        case 1 /* virtual */:
                            this.$stateProvider.state(state, {
                                url: '/' + state,
                                authenticate: authenticate || 0,
                            });
                            break;
                        case 2 /* view */:
                            this.$stateProvider.state(state, {
                                url: '/' + state,
                                authenticate: authenticate || 0,
                                templateUrl: state + '.html',
                                controller: 'controller' + Setting.capitalize(state)
                            });
                            break;
                        case 3 /* modal */:
                            this.$stateProvider.state(state, {
                                url: '/' + state,
                                authenticate: authenticate || 0,
                                isModal: true,
                            });
                            break;
                        default:
                            break;
                    }
                }
            }
        };
        Setting.prototype.init = function () {
            var _this = this;
            Object.getOwnPropertyNames(this.data.views).forEach(function (state) {
                var content = _this.data.views[state];
                switch (content.type.toLowerCase()) {
                    case 'menu':
                        if (!_this.mainContainer) {
                            _this.mainContainer = state;
                        }
                        _this.addState(0 /* abstract */, '', state, 0);
                        break;
                    case 'view':
                        content.container.forEach(function (container) {
                            if (container) {
                                _this.addState(2 /* view */, _this.mainContainer ? _this.mainContainer + '.' + container : container, state, content.authenticate);
                            }
                            else {
                                _this.addState(2 /* view */, _this.mainContainer, state, content.authenticate);
                            }
                        });
                        break;
                    case 'modal':
                        _this.addState(3 /* modal */, '', state, content.authenticate);
                        break;
                    case 'tab':
                        break;
                    case 'virtual':
                        _this.addState(1 /* virtual */, '', state, content.authenticate);
                        break;
                }
            });
            this.$urlRouterProvider.otherwise('/' + (this.data.pages.menu ? this.data.pages.menu + '.' + this.data.pages.home : this.data.pages.home).replace(/\./g, '/'));
        };
        return Setting;
    })();
    router.Setting = Setting;
})(router || (router = {}));

'use strict';
angular.module('app').run([
    '$timeout',
    '$ionicPlatform',
    '$rootScope',
    '$state',
    '$window',
    'serviceIonicWrapper',
    'serviceData',
    'serviceAppInit',
    function routes($timeout, $ionicPlatform, $rootScope, $state, $window, ionicWrapper, data, init) {
        $ionicPlatform.ready(function () {
            console.log(ionic.Platform);
            console.log(ionic.Platform.device());
            if (!ionic.Platform.isWebView()) {
                if (ionic.Platform.isIOS()) {
                    ionic.keyboard.disable();
                }
            }
            $ionicPlatform.isFullScreen = true;
            if ($window.cordova && $window.cordova.plugins.Keyboard) {
                $ionicPlatform.registerBackButtonAction(function (e) {
                    e.preventDefault();
                    return false;
                }, 101);
                cordova.plugins.Keyboard.disableScroll(true);
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if ($window.StatusBar) {
            }
            if ($window.cordova && $window.AndroidFullScreen) {
            }
        });
        $window.addEventListener('pageshow', function (evt) {
            if (!data.hasInit) {
                return;
            }
            $rootScope.$emit('$rootScope.mobcEvent', {
                sender: 'app-state',
                name: 'doLoginSilent'
            });
        }, false);
        $window.addEventListener('resize', function (evt) {
            $rootScope.$broadcast('$rootScope.resize', evt);
        }, false);
        $window.addEventListener('orientationchange', function (evt) {
            $rootScope.$broadcast('$rootScope.orientationChange', evt);
        }, false);
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (!data.hasInit) {
                return;
            }
            if (toState.name === data.app.global.pages.logout) {
                $rootScope.$emit('$rootScope.mobcEvent', {
                    sender: 'app-state',
                    name: 'doLogout'
                });
                event.preventDefault();
                return;
            }
            if (toState.authenticate && !data.isLogin && data.app.global.pages.login) {
                ionicWrapper.modal.create(data.app.global.pages.login + '_modal');
                $timeout(function () {
                    $rootScope.$emit('$rootScope.mobcEvent', {
                        sender: 'app-state',
                        name: 'loginRedirect',
                        data: { redirect: (toState.url && data.app.global.pages.login !== toState.name) ? toState.name : null }
                    });
                }, 250, true);
                event.preventDefault();
                return;
            }
            if (toState.isModal) {
                ionicWrapper.modal.create(toState.name + '_modal');
                event.preventDefault();
                return;
            }
        });
    }
]);

'use strict';
var app;
(function (app) {
    function registerController(name, obj) {
        angular.module('app.controller').controller(name, obj);
    }
    app.registerController = registerController;
    function registerDirective(name, directive) {
        angular.module('app.directive').directive(name, directive);
    }
    app.registerDirective = registerDirective;
    function registerFilter(className, services) {
        if (services === void 0) { services = []; }
    }
    app.registerFilter = registerFilter;
    function registerValue(name, value) {
        angular.module('app.service').value(name, value);
    }
    app.registerValue = registerValue;
    function registerConstant(name, value) {
        angular.module('app.service').constant(name, value);
    }
    app.registerConstant = registerConstant;
    function registerFactory(name, obj) {
    }
    app.registerFactory = registerFactory;
    function registerService(name, obj) {
        angular.module('app.service').service(name, obj);
    }
    app.registerService = registerService;
})(app || (app = {}));
