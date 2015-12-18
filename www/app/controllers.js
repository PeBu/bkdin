
var app;
(function (app) {
    var controller;
    (function (controller) {
        'use strict';
        var Home = (function () {
            function Home($rootScope, $scope, $sce, service) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.$sce = $sce;
                this.service = service;
                this.handle = 'home';
                $scope.vm = this;
                $scope.$on('$ionicView.loaded', function (evt, args) {
                    _this.service.onViewEvent('loaded');
                });
                $scope.$on('$ionicView.unloaded', function (evt, args) {
                    _this.service.onViewEvent('unloaded');
                });
                $scope.$on('$ionicView.beforeEnter', function (evt, args) {
                    _this.emitEvent('hide_back_button', false);
                    _this.emitEvent('hide_menu_button', true);
                    _this.emitEvent('hide_home_button', false);
                    _this.service.onViewEvent('beforeEnter');
                });
                $scope.$on('$ionicView.afterEnter', function (evt, args) {
                    _this.service.onViewEvent('afterEnter');
                });
                $scope.$on('$ionicView.enter', function (evt, args) {
                    _this.service.onViewEvent('enter');
                });
                $scope.$on('$ionicView.beforeLeave', function (evt, args) {
                    _this.service.onViewEvent('beforeLeave');
                });
                $scope.$on('$ionicView.afterLeave', function (evt, args) {
                    _this.service.onViewEvent('afterLeave');
                });
                $scope.$on('$ionicView.leave', function (evt, args) {
                    _this.service.onViewEvent('leave');
                });
                $scope.$on('$rootScope.orientationChange', function (evt, args) {
                    _this.service.onViewEvent('orientationChange');
                });
                $scope.$on('$destroy', function () {
                    _this.service.onViewEvent('destroyed');
                });
                this.service.onViewEvent('created');
            }
            Home.prototype.emitEvent = function (name, data) {
                var args = {
                    sender: this.handle,
                    name: name,
                    data: data
                };
                this.$rootScope.$emit('$rootScope.mobcEvent', args);
            };
            Home.prototype.getResStr = function (res, empty) {
                var result = this.service.data.getResStr(this.handle, res, empty);
                if (!result || result === res) {
                    result = this.service.data.getAppResStr(res, empty);
                }
                if (result === 'none') {
                    result = '';
                }
                return result;
            };
            Home.prototype.trustHtml = function (html) {
                var result = html;
                if (html) {
                    result = this.$sce.trustAsHtml(html);
                }
                return result;
            };
            Home.prototype.isMedia = function (mediaQuery) {
                return this.service.data.isMedia(mediaQuery);
            };
            Home.prototype.maxHeight = function (val) {
                var result;
                var dec = 0;
                dec += 50;
                if (val > 0) {
                    result = Math.floor((this.service.data.getFullHeight() - dec) * (val / 100));
                }
                else {
                    result = this.service.data.getFullHeight() + val - dec;
                }
                return result.toString() + 'px';
            };
            Home.prototype.onScroll = function () {
                this.service.onViewEvent('scroll');
            };
            Home.prototype.onScrollComplete = function () {
                this.service.onViewEvent('scrollComplete');
            };
            Home.$inject = ['$rootScope', '$scope', '$sce', 'serviceHome'];
            return Home;
        })();
        controller.Home = Home;
        app.registerController('controllerHome', Home);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));

var app;
(function (app) {
    var controller;
    (function (controller) {
        'use strict';
        var Main = (function () {
            function Main($rootScope, $scope, $sce, service) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.$sce = $sce;
                this.service = service;
                this.handle = 'main';
                $scope.vm = this;
                this.service.ionic.navBar.showBar();
                this.service.ionic.navBar.hideBar();
                $scope.$on('$ionicView.loaded', function (evt, args) {
                    _this.service.onViewEvent('loaded');
                });
                $scope.$on('$ionicView.unloaded', function (evt, args) {
                    _this.service.onViewEvent('unloaded');
                });
                $scope.$on('$ionicView.beforeEnter', function (evt, args) {
                    _this.emitEvent('hide_back_button', true);
                    _this.emitEvent('hide_menu_button', true);
                    _this.emitEvent('hide_home_button', true);
                    _this.service.onViewEvent('beforeEnter');
                });
                $scope.$on('$ionicView.afterEnter', function (evt, args) {
                    _this.service.onViewEvent('afterEnter');
                });
                $scope.$on('$ionicView.enter', function (evt, args) {
                    _this.service.onViewEvent('enter');
                });
                $scope.$on('$ionicView.beforeLeave', function (evt, args) {
                    _this.service.onViewEvent('beforeLeave');
                });
                $scope.$on('$ionicView.afterLeave', function (evt, args) {
                    _this.service.onViewEvent('afterLeave');
                });
                $scope.$on('$ionicView.leave', function (evt, args) {
                    _this.service.onViewEvent('leave');
                });
                $scope.$on('$rootScope.orientationChange', function (evt, args) {
                    _this.service.onViewEvent('orientationChange');
                });
                $scope.$on('$destroy', function () {
                    _this.service.onViewEvent('destroyed');
                });
                this.service.onViewEvent('created');
            }
            Main.prototype.emitEvent = function (name, data) {
                var args = {
                    sender: this.handle,
                    name: name,
                    data: data
                };
                this.$rootScope.$emit('$rootScope.mobcEvent', args);
            };
            Main.prototype.getResStr = function (res, empty) {
                var result = this.service.data.getResStr(this.handle, res, empty);
                if (!result || result === res) {
                    result = this.service.data.getAppResStr(res, empty);
                }
                if (result === 'none') {
                    result = '';
                }
                return result;
            };
            Main.prototype.trustHtml = function (html) {
                var result = html;
                if (html) {
                    result = this.$sce.trustAsHtml(html);
                }
                return result;
            };
            Main.prototype.isMedia = function (mediaQuery) {
                return this.service.data.isMedia(mediaQuery);
            };
            Main.prototype.maxHeight = function (val) {
                var result;
                var dec = 0;
                if (this.isMedia('sm-portrait+md+lg')) {
                    dec += 50;
                }
                if (val > 0) {
                    result = Math.floor((this.service.data.getFullHeight() - dec) * (val / 100));
                }
                else {
                    result = this.service.data.getFullHeight() + val - dec;
                }
                return result.toString() + 'px';
            };
            Main.prototype.onScroll = function () {
                this.service.onViewEvent('scroll');
            };
            Main.prototype.onScrollComplete = function () {
                this.service.onViewEvent('scrollComplete');
            };
            Main.$inject = ['$rootScope', '$scope', '$sce', 'serviceMain'];
            return Main;
        })();
        controller.Main = Main;
        app.registerController('controllerMain', Main);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));

var app;
(function (app) {
    var controller;
    (function (controller) {
        'use strict';
        var Sickness = (function () {
            function Sickness($rootScope, $scope, $sce, service) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.$sce = $sce;
                this.service = service;
                this.handle = 'sickness';
                $scope.vm = this;
                this.service.ionic.navBar.showBar();
                this.service.ionic.navBar.hideBar();
                $scope.$on('$ionicView.loaded', function (evt, args) {
                    _this.service.onViewEvent('loaded');
                });
                $scope.$on('$ionicView.unloaded', function (evt, args) {
                    _this.service.onViewEvent('unloaded');
                });
                $scope.$on('$ionicView.beforeEnter', function (evt, args) {
                    _this.emitEvent('hide_back_button', false);
                    _this.emitEvent('hide_menu_button', true);
                    _this.emitEvent('hide_home_button', false);
                    _this.service.onViewEvent('beforeEnter');
                });
                $scope.$on('$ionicView.afterEnter', function (evt, args) {
                    _this.service.onViewEvent('afterEnter');
                });
                $scope.$on('$ionicView.enter', function (evt, args) {
                    _this.service.onViewEvent('enter');
                });
                $scope.$on('$ionicView.beforeLeave', function (evt, args) {
                    _this.service.onViewEvent('beforeLeave');
                });
                $scope.$on('$ionicView.afterLeave', function (evt, args) {
                    _this.service.onViewEvent('afterLeave');
                });
                $scope.$on('$ionicView.leave', function (evt, args) {
                    _this.service.onViewEvent('leave');
                });
                $scope.$on('$rootScope.orientationChange', function (evt, args) {
                    _this.service.onViewEvent('orientationChange');
                });
                $scope.$on('$destroy', function () {
                    _this.service.onViewEvent('destroyed');
                });
                this.service.onViewEvent('created');
            }
            Sickness.prototype.emitEvent = function (name, data) {
                var args = {
                    sender: this.handle,
                    name: name,
                    data: data
                };
                this.$rootScope.$emit('$rootScope.mobcEvent', args);
            };
            Sickness.prototype.getResStr = function (res, empty) {
                var result = this.service.data.getResStr(this.handle, res, empty);
                if (!result || result === res) {
                    result = this.service.data.getAppResStr(res, empty);
                }
                if (result === 'none') {
                    result = '';
                }
                return result;
            };
            Sickness.prototype.trustHtml = function (html) {
                var result = html;
                if (html) {
                    result = this.$sce.trustAsHtml(html);
                }
                return result;
            };
            Sickness.prototype.isMedia = function (mediaQuery) {
                return this.service.data.isMedia(mediaQuery);
            };
            Sickness.prototype.maxHeight = function (val) {
                var result;
                var dec = 0;
                if (val > 0) {
                    result = Math.floor((this.service.data.getFullHeight() - dec) * (val / 100));
                }
                else {
                    result = this.service.data.getFullHeight() + val - dec;
                }
                return result.toString() + 'px';
            };
            Sickness.prototype.onScroll = function () {
                this.service.onViewEvent('scroll');
            };
            Sickness.prototype.onScrollComplete = function () {
                this.service.onViewEvent('scrollComplete');
            };
            Sickness.$inject = ['$rootScope', '$scope', '$sce', 'serviceSickness'];
            return Sickness;
        })();
        controller.Sickness = Sickness;
        app.registerController('controllerSickness', Sickness);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));

var app;
(function (app) {
    var controller;
    (function (controller) {
        'use strict';
        var Sickness2 = (function () {
            function Sickness2($rootScope, $scope, $sce, service) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.$sce = $sce;
                this.service = service;
                this.handle = 'sickness2';
                $scope.vm = this;
                $scope.$on('$ionicView.loaded', function (evt, args) {
                    _this.service.onViewEvent('loaded');
                });
                $scope.$on('$ionicView.unloaded', function (evt, args) {
                    _this.service.onViewEvent('unloaded');
                });
                $scope.$on('$ionicView.beforeEnter', function (evt, args) {
                    _this.emitEvent('hide_back_button', false);
                    _this.emitEvent('hide_menu_button', true);
                    _this.emitEvent('hide_home_button', false);
                    _this.service.onViewEvent('beforeEnter');
                });
                $scope.$on('$ionicView.afterEnter', function (evt, args) {
                    _this.service.onViewEvent('afterEnter');
                });
                $scope.$on('$ionicView.enter', function (evt, args) {
                    _this.service.onViewEvent('enter');
                });
                $scope.$on('$ionicView.beforeLeave', function (evt, args) {
                    _this.service.onViewEvent('beforeLeave');
                });
                $scope.$on('$ionicView.afterLeave', function (evt, args) {
                    _this.service.onViewEvent('afterLeave');
                });
                $scope.$on('$ionicView.leave', function (evt, args) {
                    _this.service.onViewEvent('leave');
                });
                $scope.$on('$rootScope.orientationChange', function (evt, args) {
                    _this.service.onViewEvent('orientationChange');
                });
                $scope.$on('$destroy', function () {
                    _this.service.onViewEvent('destroyed');
                });
                this.service.onViewEvent('created');
            }
            Sickness2.prototype.emitEvent = function (name, data) {
                var args = {
                    sender: this.handle,
                    name: name,
                    data: data
                };
                this.$rootScope.$emit('$rootScope.mobcEvent', args);
            };
            Sickness2.prototype.getResStr = function (res, empty) {
                var result = this.service.data.getResStr(this.handle, res, empty);
                if (!result || result === res) {
                    result = this.service.data.getAppResStr(res, empty);
                }
                if (result === 'none') {
                    result = '';
                }
                return result;
            };
            Sickness2.prototype.trustHtml = function (html) {
                var result = html;
                if (html) {
                    result = this.$sce.trustAsHtml(html);
                }
                return result;
            };
            Sickness2.prototype.isMedia = function (mediaQuery) {
                return this.service.data.isMedia(mediaQuery);
            };
            Sickness2.prototype.maxHeight = function (val) {
                var result;
                var dec = 0;
                dec += 50;
                if (this.isMedia('sm+md+lg')) {
                    dec += 50;
                }
                if (val > 0) {
                    result = Math.floor((this.service.data.getFullHeight() - dec) * (val / 100));
                }
                else {
                    result = this.service.data.getFullHeight() + val - dec;
                }
                return result.toString() + 'px';
            };
            Sickness2.prototype.onScroll = function () {
                this.service.onViewEvent('scroll');
            };
            Sickness2.prototype.onScrollComplete = function () {
                this.service.onViewEvent('scrollComplete');
            };
            Sickness2.$inject = ['$rootScope', '$scope', '$sce', 'serviceSickness2'];
            return Sickness2;
        })();
        controller.Sickness2 = Sickness2;
        app.registerController('controllerSickness2', Sickness2);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));

var app;
(function (app) {
    var controller;
    (function (controller) {
        'use strict';
        var Sickness3 = (function () {
            function Sickness3($rootScope, $scope, $sce, service) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.$sce = $sce;
                this.service = service;
                this.handle = 'sickness3';
                $scope.vm = this;
                $scope.$on('$ionicView.loaded', function (evt, args) {
                    _this.service.onViewEvent('loaded');
                });
                $scope.$on('$ionicView.unloaded', function (evt, args) {
                    _this.service.onViewEvent('unloaded');
                });
                $scope.$on('$ionicView.beforeEnter', function (evt, args) {
                    _this.emitEvent('hide_back_button', false);
                    _this.emitEvent('hide_menu_button', true);
                    _this.emitEvent('hide_home_button', false);
                    _this.service.onViewEvent('beforeEnter');
                });
                $scope.$on('$ionicView.afterEnter', function (evt, args) {
                    _this.service.onViewEvent('afterEnter');
                });
                $scope.$on('$ionicView.enter', function (evt, args) {
                    _this.service.onViewEvent('enter');
                });
                $scope.$on('$ionicView.beforeLeave', function (evt, args) {
                    _this.service.onViewEvent('beforeLeave');
                });
                $scope.$on('$ionicView.afterLeave', function (evt, args) {
                    _this.service.onViewEvent('afterLeave');
                });
                $scope.$on('$ionicView.leave', function (evt, args) {
                    _this.service.onViewEvent('leave');
                });
                $scope.$on('$rootScope.orientationChange', function (evt, args) {
                    _this.service.onViewEvent('orientationChange');
                });
                $scope.$on('$destroy', function () {
                    _this.service.onViewEvent('destroyed');
                });
                this.service.onViewEvent('created');
            }
            Sickness3.prototype.emitEvent = function (name, data) {
                var args = {
                    sender: this.handle,
                    name: name,
                    data: data
                };
                this.$rootScope.$emit('$rootScope.mobcEvent', args);
            };
            Sickness3.prototype.getResStr = function (res, empty) {
                var result = this.service.data.getResStr(this.handle, res, empty);
                if (!result || result === res) {
                    result = this.service.data.getAppResStr(res, empty);
                }
                if (result === 'none') {
                    result = '';
                }
                return result;
            };
            Sickness3.prototype.trustHtml = function (html) {
                var result = html;
                if (html) {
                    result = this.$sce.trustAsHtml(html);
                }
                return result;
            };
            Sickness3.prototype.isMedia = function (mediaQuery) {
                return this.service.data.isMedia(mediaQuery);
            };
            Sickness3.prototype.maxHeight = function (val) {
                var result;
                var dec = 0;
                dec += 50;
                if (this.isMedia('sm+md+lg')) {
                    dec += 50;
                }
                if (val > 0) {
                    result = Math.floor((this.service.data.getFullHeight() - dec) * (val / 100));
                }
                else {
                    result = this.service.data.getFullHeight() + val - dec;
                }
                return result.toString() + 'px';
            };
            Sickness3.prototype.onScroll = function () {
                this.service.onViewEvent('scroll');
            };
            Sickness3.prototype.onScrollComplete = function () {
                this.service.onViewEvent('scrollComplete');
            };
            Sickness3.$inject = ['$rootScope', '$scope', '$sce', 'serviceSickness3'];
            return Sickness3;
        })();
        controller.Sickness3 = Sickness3;
        app.registerController('controllerSickness3', Sickness3);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));

var app;
(function (app) {
    var controller;
    (function (controller) {
        'use strict';
        var Welcome = (function () {
            function Welcome($rootScope, $scope, $sce, service) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.$sce = $sce;
                this.service = service;
                this.handle = 'welcome';
                $scope.vm = this;
                $scope.$on('$ionicView.loaded', function (evt, args) {
                    _this.service.onViewEvent('loaded');
                });
                $scope.$on('$ionicView.unloaded', function (evt, args) {
                    _this.service.onViewEvent('unloaded');
                });
                $scope.$on('$ionicView.beforeEnter', function (evt, args) {
                    _this.emitEvent('hide_back_button', false);
                    _this.emitEvent('hide_menu_button', true);
                    _this.emitEvent('hide_home_button', false);
                    _this.service.onViewEvent('beforeEnter');
                });
                $scope.$on('$ionicView.afterEnter', function (evt, args) {
                    _this.service.onViewEvent('afterEnter');
                });
                $scope.$on('$ionicView.enter', function (evt, args) {
                    _this.service.onViewEvent('enter');
                });
                $scope.$on('$ionicView.beforeLeave', function (evt, args) {
                    _this.service.onViewEvent('beforeLeave');
                });
                $scope.$on('$ionicView.afterLeave', function (evt, args) {
                    _this.service.onViewEvent('afterLeave');
                });
                $scope.$on('$ionicView.leave', function (evt, args) {
                    _this.service.onViewEvent('leave');
                });
                $scope.$on('$rootScope.orientationChange', function (evt, args) {
                    _this.service.onViewEvent('orientationChange');
                });
                $scope.$on('$destroy', function () {
                    _this.service.onViewEvent('destroyed');
                });
                this.service.onViewEvent('created');
            }
            Welcome.prototype.emitEvent = function (name, data) {
                var args = {
                    sender: this.handle,
                    name: name,
                    data: data
                };
                this.$rootScope.$emit('$rootScope.mobcEvent', args);
            };
            Welcome.prototype.getResStr = function (res, empty) {
                var result = this.service.data.getResStr(this.handle, res, empty);
                if (!result || result === res) {
                    result = this.service.data.getAppResStr(res, empty);
                }
                if (result === 'none') {
                    result = '';
                }
                return result;
            };
            Welcome.prototype.trustHtml = function (html) {
                var result = html;
                if (html) {
                    result = this.$sce.trustAsHtml(html);
                }
                return result;
            };
            Welcome.prototype.isMedia = function (mediaQuery) {
                return this.service.data.isMedia(mediaQuery);
            };
            Welcome.prototype.maxHeight = function (val) {
                var result;
                var dec = 0;
                dec += 50;
                if (this.isMedia('sm+md+lg')) {
                    dec += 50;
                }
                if (val > 0) {
                    result = Math.floor((this.service.data.getFullHeight() - dec) * (val / 100));
                }
                else {
                    result = this.service.data.getFullHeight() + val - dec;
                }
                return result.toString() + 'px';
            };
            Welcome.prototype.onScroll = function () {
                this.service.onViewEvent('scroll');
            };
            Welcome.prototype.onScrollComplete = function () {
                this.service.onViewEvent('scrollComplete');
            };
            Welcome.$inject = ['$rootScope', '$scope', '$sce', 'serviceWelcome'];
            return Welcome;
        })();
        controller.Welcome = Welcome;
        app.registerController('controllerWelcome', Welcome);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));

var app;
(function (app) {
    var controller;
    (function (controller) {
        'use strict';
        var Start = (function () {
            function Start($scope, $state, data) {
                this.$scope = $scope;
                this.$state = $state;
                this.data = data;
                $scope.vm = this;
            }
            Start.prototype.gotoHome = function () {
                if (!Start.isInit) {
                    Start.isInit = true;
                    if (this.data.homePage) {
                        this.$state.transitionTo(this.data.homePage);
                    }
                }
            };
            Start.isInit = false;
            Start.$inject = ['$scope', '$state', 'serviceData'];
            return Start;
        })();
        controller.Start = Start;
        app.registerController('controllerStart', Start);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
