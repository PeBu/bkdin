
var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var ApiLocalstorage = (function () {
            function ApiLocalstorage() {
            }
            ApiLocalstorage.doLog = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (!ApiLocalstorage.verbose) {
                    console.log(args);
                }
            };
            ApiLocalstorage.prototype.load = function (item) {
                var result = null;
                if (item) {
                    try {
                        result = localStorage.getItem(item);
                    }
                    catch (error) {
                        result = '';
                        ApiLocalstorage.doLog('lS::load::error');
                    }
                    try {
                        result = JSON.parse(result);
                    }
                    catch (error) {
                        ApiLocalstorage.doLog('lS::load::parse error');
                    }
                }
                ApiLocalstorage.doLog('lS::load', item, '=', result);
                return result;
            };
            ApiLocalstorage.prototype.save = function (item, value) {
                if (item) {
                    if (angular.isObject(value)) {
                        value = JSON.stringify(value);
                    }
                    localStorage.setItem(item, value);
                    ApiLocalstorage.doLog('lS::save:saved', item, '=', value);
                }
            };
            ApiLocalstorage.prototype.del = function (item) {
                if (item) {
                    localStorage.removeItem(item);
                    ApiLocalstorage.doLog('lS::del:removed', item);
                }
            };
            ApiLocalstorage.prototype.clearAll = function () {
                localStorage.clear();
                ApiLocalstorage.doLog('lS::del:clear all');
            };
            ApiLocalstorage.verbose = true;
            ApiLocalstorage.$inject = [];
            return ApiLocalstorage;
        })();
        service.ApiLocalstorage = ApiLocalstorage;
        app.registerService('serviceApiLocalstorage', ApiLocalstorage);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var AppInit = (function () {
            function AppInit() {
            }
            AppInit.$inject = [
            ];
            return AppInit;
        })();
        service.AppInit = AppInit;
        app.registerService('serviceAppInit', AppInit);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var Home = (function () {
            function Home($rootScope, $state, $timeout, data, ionic) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.$timeout = $timeout;
                this.data = data;
                this.ionic = ionic;
                this.handle = 'home';
                this.isControllerCreated = false;
                this.$rootScope.$on('$rootScope.mobcEvent', function (evt, args) {
                    _this.onServiceEvent(args.sender, args.name, args.data);
                });
            }
            Home.prototype.emitEvent = function (name, data) {
                var args = {
                    sender: this.handle,
                    name: name,
                    data: data
                };
                this.$rootScope.$emit('$rootScope.mobcEvent', args);
            };
            Home.prototype.getSlides = function () {
                var result;
                result = this.data.languages.home[this.data.currLang].slides;
                if (!result) {
                    result = this.data.languages.home[this.data.defLang].slides;
                }
                return result;
            };
            Home.prototype.gotoSlide = function (idx) {
                console.log(idx);
                this.ionic.slideBox.slide(idx, 0, 'slide_' + this.handle);
            };
            Home.prototype.gotoHome = function () {
                if (this.data.homePage) {
                    this.$state.transitionTo(this.data.homePage);
                }
            };
            Home.prototype.gotoPage = function (state) {
                this.$state.transitionTo(state);
            };
            Home.prototype.onCreate = function () {
                this.isControllerCreated = true;
            };
            Home.prototype.onDestroy = function () {
                this.isControllerCreated = false;
            };
            Home.prototype.onServiceEvent = function (sender, name, data) {
                if (sender !== this.handle) {
                    switch (name) {
                        case 'login':
                            break;
                        case 'socket':
                            break;
                    }
                }
            };
            Home.prototype.onViewEvent = function (name) {
                var _this = this;
                switch (name) {
                    case 'created':
                        this.onCreate();
                        break;
                    case 'destroyed':
                        this.onDestroy();
                        break;
                    case 'loaded':
                        this.$timeout(function () {
                            _this.ionic.slideBox.slide(1, 0, 'slide_' + _this.handle);
                            _this.ionic.slideBox.slide(0, 0, 'slide_' + _this.handle);
                        }, 250, true);
                        break;
                    case 'unloaded':
                        break;
                    case 'beforeEnter':
                        break;
                    case 'afterEnter':
                        break;
                    case 'enter':
                        break;
                    case 'beforeLeave':
                        break;
                    case 'afterLeave':
                        break;
                    case 'leave':
                        break;
                    case 'orientationChange':
                        break;
                    case 'scroll':
                        break;
                    case 'scrollComplete':
                        break;
                }
            };
            Home.$inject = [
                '$rootScope',
                '$state',
                '$timeout',
                'serviceData',
                'serviceIonicWrapper'
            ];
            return Home;
        })();
        service.Home = Home;
        app.registerService('serviceHome', Home);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var Main = (function () {
            function Main($rootScope, $state, $timeout, data, ionic) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.$timeout = $timeout;
                this.data = data;
                this.ionic = ionic;
                this.handle = 'main';
                this.isControllerCreated = false;
                this.personTypeList = this.data.getResStr(this.handle, 'inp_type_options') || [];
                this.teacherTypeList = this.data.getResStr(this.handle, 'inp_teacher_options') || [];
                this.holiday = '';
                this.oldMonth = 0;
                this.$rootScope.$on('$rootScope.mobcEvent', function (evt, args) {
                    _this.onServiceEvent(args.sender, args.name, args.data);
                });
                this.initPerson();
            }
            Main.prototype.test = function (newVal, oldVal) {
                console.log('date selected', newVal, oldVal);
            };
            Main.prototype.test2 = function (day, month, year) {
                console.log('date changed ', day, month, year);
                if (month === 12 && this.oldMonth != month) {
                    console.log('date holiday');
                    var list = [];
                    list.push('24.12.' + year);
                    list.push('25.12.' + year);
                    list.push('26.12.' + year);
                    list.push('27.12.' + year);
                    list.push('28.12.' + year);
                    list.push('29.12.' + year);
                    this.holiday = list.join(',');
                }
                this.oldMonth = month;
            };
            Main.prototype.initPerson = function () {
                var _this = this;
                this.person = {
                    lastName: 'Von der Weiden',
                    firstName: 'Nico',
                    senderName: 'Silke Von der Weiden',
                    senderMail: '',
                    remarks: '',
                    teacher: this.teacherTypeList[0],
                    type: this.personTypeList[0],
                    sickness: null,
                    sicknessFrom: '14.12.2015',
                    sicknessTo: '15.12.2015'
                };
                var id = this.data.getResStr(this.handle, 'type_options_default_id', true);
                if (id) {
                    this.personTypeList.forEach(function (item, idx) {
                        if (item.id === id) {
                            _this.person.type = _this.personTypeList[idx];
                        }
                    });
                }
            };
            Main.prototype.emitEvent = function (name, data) {
                var args = {
                    sender: this.handle,
                    name: name,
                    data: data
                };
                this.$rootScope.$emit('$rootScope.mobcEvent', args);
            };
            Main.prototype.gotoHome = function () {
                if (this.data.homePage) {
                    this.$state.transitionTo(this.data.homePage);
                }
            };
            Main.prototype.gotoPage = function (state) {
                this.$state.transitionTo(state);
            };
            Main.prototype.gotoSlide = function (idx) {
                this.ionic.slideBox.slide(idx, 0, 'main_tpl');
            };
            Main.prototype.onCreate = function () {
                this.isControllerCreated = true;
            };
            Main.prototype.onDestroy = function () {
                this.isControllerCreated = false;
            };
            Main.prototype.onServiceEvent = function (sender, name, data) {
                if (sender !== this.handle) {
                    switch (name) {
                        case 'login':
                            break;
                        case 'socket':
                            break;
                    }
                }
            };
            Main.prototype.onViewEvent = function (name) {
                var _this = this;
                switch (name) {
                    case 'created':
                        this.onCreate();
                        break;
                    case 'destroyed':
                        this.onDestroy();
                        break;
                    case 'loaded':
                        this.$timeout(function () {
                            _this.gotoSlide(3);
                        }, 250, true);
                        break;
                    case 'unloaded':
                        break;
                    case 'beforeEnter':
                        break;
                    case 'afterEnter':
                        break;
                    case 'enter':
                        break;
                    case 'beforeLeave':
                        break;
                    case 'afterLeave':
                        break;
                    case 'leave':
                        break;
                    case 'orientationChange':
                        break;
                    case 'scroll':
                        break;
                    case 'scrollComplete':
                        break;
                }
            };
            Main.$inject = [
                '$rootScope',
                '$state',
                '$timeout',
                'serviceData',
                'serviceIonicWrapper'
            ];
            return Main;
        })();
        service.Main = Main;
        app.registerService('serviceMain', Main);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var Sickness = (function () {
            function Sickness($rootScope, $state, data, ionic) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.data = data;
                this.ionic = ionic;
                this.handle = 'sickness';
                this.isControllerCreated = false;
                this.$rootScope.$on('$rootScope.mobcEvent', function (evt, args) {
                    _this.onServiceEvent(args.sender, args.name, args.data);
                });
            }
            Sickness.prototype.emitEvent = function (name, data) {
                var args = {
                    sender: this.handle,
                    name: name,
                    data: data
                };
                this.$rootScope.$emit('$rootScope.mobcEvent', args);
            };
            Sickness.prototype.gotoHome = function () {
                if (this.data.homePage) {
                    this.$state.transitionTo(this.data.homePage);
                }
            };
            Sickness.prototype.gotoPage = function (state) {
                this.$state.transitionTo(state);
            };
            Sickness.prototype.onCreate = function () {
                this.isControllerCreated = true;
            };
            Sickness.prototype.onDestroy = function () {
                this.isControllerCreated = false;
            };
            Sickness.prototype.onServiceEvent = function (sender, name, data) {
                if (sender !== this.handle) {
                    switch (name) {
                        case 'login':
                            break;
                        case 'socket':
                            break;
                    }
                }
            };
            Sickness.prototype.onViewEvent = function (name) {
                switch (name) {
                    case 'created':
                        this.onCreate();
                        break;
                    case 'destroyed':
                        this.onDestroy();
                        break;
                    case 'loaded':
                        break;
                    case 'unloaded':
                        break;
                    case 'beforeEnter':
                        break;
                    case 'afterEnter':
                        break;
                    case 'enter':
                        break;
                    case 'beforeLeave':
                        break;
                    case 'afterLeave':
                        break;
                    case 'leave':
                        break;
                    case 'orientationChange':
                        break;
                    case 'scroll':
                        break;
                    case 'scrollComplete':
                        break;
                }
            };
            Sickness.$inject = [
                '$rootScope',
                '$state',
                'serviceData',
                'serviceIonicWrapper'
            ];
            return Sickness;
        })();
        service.Sickness = Sickness;
        app.registerService('serviceSickness', Sickness);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var Sickness2 = (function () {
            function Sickness2($rootScope, $state, data, ionic) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.data = data;
                this.ionic = ionic;
                this.handle = 'sickness2';
                this.isControllerCreated = false;
                this.$rootScope.$on('$rootScope.mobcEvent', function (evt, args) {
                    _this.onServiceEvent(args.sender, args.name, args.data);
                });
            }
            Sickness2.prototype.emitEvent = function (name, data) {
                var args = {
                    sender: this.handle,
                    name: name,
                    data: data
                };
                this.$rootScope.$emit('$rootScope.mobcEvent', args);
            };
            Sickness2.prototype.gotoHome = function () {
                if (this.data.homePage) {
                    this.$state.transitionTo(this.data.homePage);
                }
            };
            Sickness2.prototype.gotoPage = function (state) {
                this.$state.transitionTo(state);
            };
            Sickness2.prototype.onCreate = function () {
                this.isControllerCreated = true;
            };
            Sickness2.prototype.onDestroy = function () {
                this.isControllerCreated = false;
            };
            Sickness2.prototype.onServiceEvent = function (sender, name, data) {
                if (sender !== this.handle) {
                    switch (name) {
                        case 'login':
                            break;
                        case 'socket':
                            break;
                    }
                }
            };
            Sickness2.prototype.onViewEvent = function (name) {
                switch (name) {
                    case 'created':
                        this.onCreate();
                        break;
                    case 'destroyed':
                        this.onDestroy();
                        break;
                    case 'loaded':
                        break;
                    case 'unloaded':
                        break;
                    case 'beforeEnter':
                        break;
                    case 'afterEnter':
                        break;
                    case 'enter':
                        break;
                    case 'beforeLeave':
                        break;
                    case 'afterLeave':
                        break;
                    case 'leave':
                        break;
                    case 'orientationChange':
                        break;
                    case 'scroll':
                        break;
                    case 'scrollComplete':
                        break;
                }
            };
            Sickness2.$inject = [
                '$rootScope',
                '$state',
                'serviceData',
                'serviceIonicWrapper'
            ];
            return Sickness2;
        })();
        service.Sickness2 = Sickness2;
        app.registerService('serviceSickness2', Sickness2);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var Sickness3 = (function () {
            function Sickness3($rootScope, $state, data, ionic) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.data = data;
                this.ionic = ionic;
                this.handle = 'sickness3';
                this.isControllerCreated = false;
                this.$rootScope.$on('$rootScope.mobcEvent', function (evt, args) {
                    _this.onServiceEvent(args.sender, args.name, args.data);
                });
            }
            Sickness3.prototype.emitEvent = function (name, data) {
                var args = {
                    sender: this.handle,
                    name: name,
                    data: data
                };
                this.$rootScope.$emit('$rootScope.mobcEvent', args);
            };
            Sickness3.prototype.gotoHome = function () {
                if (this.data.homePage) {
                    this.$state.transitionTo(this.data.homePage);
                }
            };
            Sickness3.prototype.gotoPage = function (state) {
                this.$state.transitionTo(state);
            };
            Sickness3.prototype.onCreate = function () {
                this.isControllerCreated = true;
            };
            Sickness3.prototype.onDestroy = function () {
                this.isControllerCreated = false;
            };
            Sickness3.prototype.onServiceEvent = function (sender, name, data) {
                if (sender !== this.handle) {
                    switch (name) {
                        case 'login':
                            break;
                        case 'socket':
                            break;
                    }
                }
            };
            Sickness3.prototype.onViewEvent = function (name) {
                switch (name) {
                    case 'created':
                        this.onCreate();
                        break;
                    case 'destroyed':
                        this.onDestroy();
                        break;
                    case 'loaded':
                        break;
                    case 'unloaded':
                        break;
                    case 'beforeEnter':
                        break;
                    case 'afterEnter':
                        break;
                    case 'enter':
                        break;
                    case 'beforeLeave':
                        break;
                    case 'afterLeave':
                        break;
                    case 'leave':
                        break;
                    case 'orientationChange':
                        break;
                    case 'scroll':
                        break;
                    case 'scrollComplete':
                        break;
                }
            };
            Sickness3.$inject = [
                '$rootScope',
                '$state',
                'serviceData',
                'serviceIonicWrapper'
            ];
            return Sickness3;
        })();
        service.Sickness3 = Sickness3;
        app.registerService('serviceSickness3', Sickness3);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var Welcome = (function () {
            function Welcome($rootScope, $state, data, ionic) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.data = data;
                this.ionic = ionic;
                this.handle = 'welcome';
                this.isControllerCreated = false;
                this.$rootScope.$on('$rootScope.mobcEvent', function (evt, args) {
                    _this.onServiceEvent(args.sender, args.name, args.data);
                });
            }
            Welcome.prototype.emitEvent = function (name, data) {
                var args = {
                    sender: this.handle,
                    name: name,
                    data: data
                };
                this.$rootScope.$emit('$rootScope.mobcEvent', args);
            };
            Welcome.prototype.gotoHome = function () {
                if (this.data.homePage) {
                    this.$state.transitionTo(this.data.homePage);
                }
            };
            Welcome.prototype.gotoPage = function (state) {
                this.$state.transitionTo(state);
            };
            Welcome.prototype.onCreate = function () {
                this.isControllerCreated = true;
            };
            Welcome.prototype.onDestroy = function () {
                this.isControllerCreated = false;
            };
            Welcome.prototype.onServiceEvent = function (sender, name, data) {
                if (sender !== this.handle) {
                    switch (name) {
                        case 'login':
                            break;
                        case 'socket':
                            break;
                    }
                }
            };
            Welcome.prototype.onViewEvent = function (name) {
                switch (name) {
                    case 'created':
                        this.onCreate();
                        break;
                    case 'destroyed':
                        this.onDestroy();
                        break;
                    case 'loaded':
                        break;
                    case 'unloaded':
                        break;
                    case 'beforeEnter':
                        break;
                    case 'afterEnter':
                        break;
                    case 'enter':
                        break;
                    case 'beforeLeave':
                        break;
                    case 'afterLeave':
                        break;
                    case 'leave':
                        break;
                    case 'orientationChange':
                        break;
                    case 'scroll':
                        break;
                    case 'scrollComplete':
                        break;
                }
            };
            Welcome.$inject = [
                '$rootScope',
                '$state',
                'serviceData',
                'serviceIonicWrapper'
            ];
            return Welcome;
        })();
        service.Welcome = Welcome;
        app.registerService('serviceWelcome', Welcome);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var Data = (function () {
            function Data($rootScope, $window) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$window = $window;
                this.hasInit = false;
                this.isCordova = false;
                this.isLogin = false;
                this.accountType = 0;
                this.currLang = 'de';
                this.defLang = 'de';
                this.app = app.datas.app;
                this.menus = app.datas.menus;
                this.languages = app.datas.languages;
                this.homePage = this.app.global.pages.menu ? this.app.global.pages.menu + '.' + this.app.global.pages.home : this.app.global.pages.home;
                this.startPage = this.app.global.pages.menu ? this.app.global.pages.menu + '.' + this.app.global.pages.start : this.app.global.pages.start;
                this.medias = {
                    'sm': '(max-width:767px)',
                    'sm-portrait': '(max-width:767px) and (orientation: portrait)',
                    'sm-landscape': '(max-width:767px) and (orientation: landscape)',
                    'md': '(min-width:768px) and (max-width:1280px)',
                    'md-portrait': '(min-width:768px) and (max-width:1280px) and (orientation: portrait)',
                    'md-landscape': '(min-width:768px) and (max-width:1280px) and (orientation: landscape)',
                    'lg': '(min-width:1281px)',
                    'lg-portrait': '(min-width:1281px) and (orientation: portrait)',
                    'lg-landscape': '(min-width:1281px) and (orientation: landscape)'
                };
                this.mediaCache = {};
                this.isCordova = !(!$window.cordova && !$window.PhoneGap && !$window.phonegap);
                if (this.app.global.pages.start && this.app.global.views[this.app.global.pages.start].type === 'modal') {
                    this.startPage = this.app.global.pages.start;
                }
                $rootScope.$on('$rootScope.resize', function (evt, args) {
                    _this.reCalcCache();
                });
            }
            Data.prototype.getResStr = function (moduleName, resource, empty) {
                var result = (!empty) ? resource : '';
                if (this.languages[moduleName]) {
                    var resStr = this.languages[moduleName][this.currLang];
                    if (!resStr && this.currLang !== this.defLang) {
                        resStr = this.languages[moduleName][this.defLang];
                    }
                    if (resStr && resStr[resource]) {
                        result = resStr[resource];
                    }
                }
                return result;
            };
            Data.prototype.getAppResStr = function (res, empty) {
                return this.getResStr('app-global', res, empty);
            };
            Data.prototype.setBadge = function (itemName, count) {
                var _this = this;
                var obj = this.menus;
                Object.getOwnPropertyNames(obj).forEach(function (el) {
                    _this.menus[el].items.list.forEach(function (item) {
                        if (item.name === itemName && item.hasBadge) {
                            item.countBadge = count;
                        }
                    });
                });
            };
            Data.prototype.reCalcCache = function () {
                for (var mediaQuery in this.mediaCache) {
                    this.mediaCache[mediaQuery] = window.matchMedia(mediaQuery).matches;
                }
            };
            Data.prototype.getFullHeight = function () {
                return this.$window.innerHeight;
            };
            Data.prototype.getFullWidth = function () {
                return this.$window.innerWidth;
            };
            Data.prototype.isMedia = function (mediaQuery) {
                var _this = this;
                if (!mediaQuery) {
                    return true;
                }
                var result = false;
                var mq = '';
                var length = mediaQuery.split('+').length - 1;
                mediaQuery.replace(' ', '').split('+').forEach(function (q, idx) {
                    if (_this.medias[q]) {
                        mq += _this.medias[q];
                    }
                    else {
                        mq += q;
                    }
                    mq += (idx !== length) ? ' , ' : '';
                });
                if (this.mediaCache[mq]) {
                    result = this.mediaCache[mq];
                }
                else {
                    result = this.mediaCache[mq] = this.$window.matchMedia(mq).matches;
                }
                return result;
            };
            Data.$inject = ['$rootScope', '$window'];
            return Data;
        })();
        service.Data = Data;
        app.registerService('serviceData', Data);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var IonicBackdrop = (function () {
            function IonicBackdrop(backdrop) {
                this.backdrop = backdrop;
            }
            IonicBackdrop.prototype.show = function () {
                this.backdrop.retain();
                IonicBackdrop.counter++;
            };
            IonicBackdrop.prototype.hide = function () {
                if (IonicBackdrop.counter) {
                    this.backdrop.release();
                    IonicBackdrop.counter--;
                }
            };
            IonicBackdrop.prototype.hideAll = function () {
                var counter = IonicBackdrop.counter;
                for (var i = 0; i < counter; i++) {
                    this.hide();
                }
            };
            IonicBackdrop.prototype.getCount = function () {
                return IonicBackdrop.counter;
            };
            IonicBackdrop.counter = 0;
            IonicBackdrop.$inject = ['$ionicBackdrop'];
            return IonicBackdrop;
        })();
        service.IonicBackdrop = IonicBackdrop;
        app.registerService('serviceIonicBackdrop', IonicBackdrop);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var IonicHistory = (function () {
            function IonicHistory(history) {
                this.history = history;
            }
            IonicHistory.prototype.viewHistory = function () {
                return this.history.viewHistory();
            };
            IonicHistory.prototype.currentView = function () {
                return this.history.currentView();
            };
            IonicHistory.prototype.currentHistoryId = function () {
                return this.history.currentHistoryId();
            };
            IonicHistory.prototype.setCurrentTitle = function (title) {
                return this.history.currentTitle(title);
            };
            IonicHistory.prototype.getCurrentTitle = function () {
                return this.history.currentTitle();
            };
            IonicHistory.prototype.backView = function () {
                return this.history.backView();
            };
            IonicHistory.prototype.backTitle = function () {
                return this.history.backTitle();
            };
            IonicHistory.prototype.forwardView = function () {
                return this.history.forwardView();
            };
            IonicHistory.prototype.currentStateName = function () {
                return this.history.currentStateName();
            };
            IonicHistory.prototype.goBack = function () {
                this.history.goBack();
            };
            IonicHistory.prototype.clearHistory = function () {
                this.history.clearHistory();
            };
            IonicHistory.prototype.clearCache = function () {
                this.history.clearCache();
            };
            IonicHistory.prototype.setOptionAnimate = function (val) {
                this.history.nextViewOptions({
                    disableAnimate: val
                });
            };
            IonicHistory.prototype.setOptionBack = function (val) {
                this.history.nextViewOptions({
                    disableBack: val
                });
            };
            IonicHistory.prototype.setOptionRoot = function (val) {
                this.history.nextViewOptions({
                    historyRoot: val
                });
            };
            IonicHistory.$inject = ['$ionicHistory'];
            return IonicHistory;
        })();
        service.IonicHistory = IonicHistory;
        app.registerService('serviceIonicHistory', IonicHistory);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var IonicLoading = (function () {
            function IonicLoading(loading) {
                this.loading = loading;
            }
            IonicLoading.prototype.show = function (msg) {
                this.loading.hide();
                IonicLoading.isVisible = true;
                this.loading.show({
                    template: msg,
                    noBackdrop: false,
                    delay: 0,
                });
            };
            IonicLoading.prototype.hide = function () {
                this.loading.hide();
                return;
                if (IonicLoading.isVisible) {
                    IonicLoading.isVisible = false;
                    this.loading.hide();
                }
            };
            IonicLoading.isVisible = false;
            IonicLoading.$inject = ['$ionicLoading'];
            return IonicLoading;
        })();
        service.IonicLoading = IonicLoading;
        app.registerService('serviceIonicLoading', IonicLoading);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var IonicModal = (function () {
            function IonicModal(modal) {
                this.modal = modal;
            }
            IonicModal.prototype.create = function (name, options) {
                var _this = this;
                if (IonicModal.handle[name]) {
                    this.show(name);
                    return;
                }
                this.modal.fromTemplateUrl(name + '.html', {
                    scope: options && options.scope,
                    animation: options && options.animation || 'slide-in-up',
                    focusFirstInput: (options && typeof options.focusFirstInput !== "undefined") ? options.focusFirstInput : false,
                    backdropClickToClose: (options && typeof options.backdropClickToClose !== "undefined") ? options.backdropClickToClose : true,
                    hardwareBackButtonClose: (options && typeof options.hardwareBackButtonClose !== "undefined") ? options.hardwareBackButtonClose : true,
                }).then(function (mod) {
                    if (!~name.indexOf('_modal')) {
                        IonicModal.handle.push(name);
                        IonicModal.handle[name] = mod;
                        _this.show(name);
                    }
                });
            };
            IonicModal.prototype.show = function (name) {
                if (IonicModal.handle[name]) {
                    IonicModal.handle[name].show();
                }
            };
            IonicModal.prototype.isShown = function (name) {
                var result = false;
                if (IonicModal.handle[name]) {
                    result = IonicModal.handle[name].isShown();
                }
                return result;
            };
            IonicModal.prototype.hide = function (name) {
                if (IonicModal.handle[name]) {
                    IonicModal.handle[name].hide();
                }
            };
            IonicModal.prototype.destroy = function (name) {
                if (IonicModal.handle[name]) {
                    IonicModal.handle[name].hide();
                    IonicModal.handle[name].remove();
                    IonicModal.handle[name] = null;
                    delete IonicModal.handle[name];
                    IonicModal.handle.splice(IonicModal.handle.indexOf(name), 1);
                }
            };
            IonicModal.handle = [];
            IonicModal.$inject = ['$ionicModal'];
            return IonicModal;
        })();
        service.IonicModal = IonicModal;
        app.registerService('serviceIonicModal', IonicModal);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var IonicNavBar = (function () {
            function IonicNavBar(navbar) {
                this.navbar = navbar;
            }
            IonicNavBar.prototype.align = function (direction, handle) {
                if (handle) {
                    this.navbar.$getByHandle(handle).align(direction);
                }
                else {
                    this.navbar.align(direction);
                }
            };
            IonicNavBar.prototype.setBackButton = function (show, handle) {
                if (handle) {
                    this.navbar.$getByHandle(handle).showBackButton(show);
                }
                else {
                    this.navbar.showBackButton(show);
                }
            };
            IonicNavBar.prototype.getBackButtonShow = function (handle) {
                if (handle) {
                    return this.navbar.$getByHandle(handle).showBackButton();
                }
                else {
                    return this.navbar.showBackButton();
                }
            };
            IonicNavBar.prototype.showBackButton = function (handle) {
                if (handle) {
                    this.navbar.$getByHandle(handle).showBackButton(true);
                }
                else {
                    this.navbar.showBackButton(true);
                }
            };
            IonicNavBar.prototype.hideBackButton = function (handle) {
                if (handle) {
                    this.navbar.$getByHandle(handle).showBackButton(false);
                }
                else {
                    this.navbar.showBackButton(false);
                }
            };
            IonicNavBar.prototype.setBar = function (show, handle) {
                if (handle) {
                    this.navbar.$getByHandle(handle).showBar(false);
                }
                else {
                    this.navbar.showBar(false);
                }
            };
            IonicNavBar.prototype.getBarShow = function (handle) {
                if (handle) {
                    return this.navbar.$getByHandle(handle).showBar();
                }
                else {
                    return this.navbar.showBar();
                }
            };
            IonicNavBar.prototype.showBar = function (handle) {
                if (handle) {
                    this.navbar.$getByHandle(handle).showBar(true);
                }
                else {
                    this.navbar.showBar(true);
                }
            };
            IonicNavBar.prototype.hideBar = function (handle) {
                if (handle) {
                    this.navbar.$getByHandle(handle).showBar(false);
                }
                else {
                    this.navbar.showBar(false);
                }
            };
            IonicNavBar.prototype.setTitle = function (title, handle) {
                if (handle) {
                    this.navbar.$getByHandle(handle).title(title);
                }
                else {
                    this.navbar.title(title);
                }
            };
            IonicNavBar.$inject = ['$ionicNavBarDelegate'];
            return IonicNavBar;
        })();
        service.IonicNavBar = IonicNavBar;
        app.registerService('serviceIonicNavBar', IonicNavBar);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var IonicPopover = (function () {
            function IonicPopover(popover) {
                this.popover = popover;
            }
            IonicPopover.prototype.create = function (name, options) {
                if (IonicPopover.handle[name]) {
                    this.destroy(name);
                }
                this.popover.fromTemplateUrl(name + '.html', {
                    scope: options && options.scope,
                    focusFirstInput: (options && typeof options.focusFirstInput !== "undefined") ? options.focusFirstInput : false,
                    backdropClickToClose: (options && typeof options.backdropClickToClose !== "undefined") ? options.backdropClickToClose : true,
                    hardwareBackButtonClose: (options && typeof options.hardwareBackButtonClose !== "undefined") ? options.hardwareBackButtonClose : true
                }).then(function (pop) {
                    IonicPopover.handle.push(name);
                    IonicPopover.handle[name] = pop;
                });
            };
            IonicPopover.prototype.show = function (name, event_OR_element) {
                var elem = angular.element(event_OR_element.srcElement);
                if (IonicPopover.handle[name]) {
                    IonicPopover.handle[name].show(event_OR_element);
                }
            };
            IonicPopover.prototype.isShown = function (name) {
                var result = false;
                if (IonicPopover.handle[name]) {
                    result = IonicPopover.handle[name].isShown();
                }
                return result;
            };
            IonicPopover.prototype.hide = function (name) {
                if (IonicPopover.handle[name]) {
                    IonicPopover.handle[name].hide();
                }
            };
            IonicPopover.prototype.destroy = function (name) {
                if (IonicPopover.handle[name]) {
                    IonicPopover.handle[name].hide();
                    IonicPopover.handle[name].remove();
                    delete IonicPopover.handle[name];
                    IonicPopover.handle.splice(IonicPopover.handle.indexOf(name), 1);
                }
            };
            IonicPopover.handle = [];
            IonicPopover.$inject = ['$ionicPopover'];
            return IonicPopover;
        })();
        service.IonicPopover = IonicPopover;
        app.registerService('serviceIonicPopover', IonicPopover);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var IonicPopup = (function () {
            function IonicPopup($rootScope, popup) {
                this.$rootScope = $rootScope;
                this.popup = popup;
            }
            IonicPopup.prototype.confirmNoYes = function (msg, cb) {
                this.popup.confirm({
                    title: 'Bitte Bestätigen',
                    template: msg,
                    cancelText: 'Nein',
                    okText: 'Ja',
                    okType: 'button-energized'
                }).then(function (res) {
                    if (cb) {
                        cb(res);
                    }
                });
            };
            IonicPopup.prototype.info = function (msg, cb) {
                this.popup.alert({
                    title: 'Information',
                    subTitle: '',
                    template: msg,
                    okType: 'button-energized',
                }).then(function (res) {
                    if (cb) {
                        cb(res);
                    }
                });
            };
            IonicPopup.prototype.alert = function (msg, cb) {
                this.popup.alert({
                    title: 'Fehler',
                    subTitle: '',
                    template: msg,
                    okType: 'button-energized',
                }).then(function (res) {
                    if (cb) {
                        cb(res);
                    }
                });
            };
            IonicPopup.prototype.prompt = function (title, val, cb) {
                var scope = this.$rootScope.$new(true);
                scope.data = {};
                scope.data.response = val;
                this.popup.prompt({
                    title: title,
                    scope: scope,
                    buttons: [
                        { text: 'Abbruch' },
                        {
                            text: 'OK',
                            type: 'button-energized',
                            onTap: function (e) {
                                return scope.data.response;
                            }
                        }
                    ]
                }).then(function (res) {
                    cb(res);
                });
            };
            IonicPopup.$inject = ['$rootScope', '$ionicPopup'];
            return IonicPopup;
        })();
        service.IonicPopup = IonicPopup;
        app.registerService('serviceIonicPopup', IonicPopup);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var IonicScroll = (function () {
            function IonicScroll(scroll, $timeout) {
                this.scroll = scroll;
                this.$timeout = $timeout;
            }
            IonicScroll.prototype.resize = function (handle) {
                var _this = this;
                if (handle) {
                    this.$timeout(function () {
                        _this.scroll.$getByHandle(handle).resize();
                    }, 250, true);
                }
                else {
                    this.$timeout(function () {
                        _this.scroll.resize();
                    }, 250, true);
                }
            };
            IonicScroll.prototype.scrollTop = function (animate, handle) {
                if (handle) {
                    this.scroll.$getByHandle(handle).scrollTop(animate);
                }
                else {
                    this.scroll.scrollTop(animate);
                }
            };
            IonicScroll.prototype.scrollBottom = function (animate, handle) {
                if (handle) {
                    this.scroll.$getByHandle(handle).scrollBottom(animate);
                }
                else {
                    this.scroll.scrollBottom(animate);
                }
            };
            IonicScroll.prototype.scrollTo = function (left, top, animate, handle) {
                if (handle) {
                    this.scroll.$getByHandle(handle).scrollTo(left, top, animate);
                }
                else {
                    this.scroll.scrollTo(left, top, animate);
                }
            };
            IonicScroll.prototype.scrollBy = function (left, top, animate, handle) {
                if (handle) {
                    this.scroll.$getByHandle(handle).scrollBy(left, top, animate);
                }
                else {
                    this.scroll.scrollBy(left, top, animate);
                }
            };
            IonicScroll.prototype.zoomTo = function (level, originLeft, originTop, animate, handle) {
                if (handle) {
                    this.scroll.$getByHandle(handle).zoomTo(level, animate, originLeft, originTop);
                }
                else {
                    this.scroll.zoomTo(level, animate, originLeft, originTop);
                }
            };
            IonicScroll.prototype.zoomBy = function (factor, originLeft, originTop, animate, handle) {
                if (handle) {
                    this.scroll.$getByHandle(handle).zoomBy(factor, animate, originLeft, originTop);
                }
                else {
                    this.scroll.zoomBy(factor, animate, originLeft, originTop);
                }
            };
            IonicScroll.prototype.getScrollPosition = function (handle) {
                if (handle) {
                    return this.scroll.$getByHandle(handle).getScrollPosition();
                }
                else {
                    return this.scroll.getScrollPosition();
                }
            };
            IonicScroll.prototype.anchorScroll = function (animate, handle) {
                if (handle) {
                    this.scroll.$getByHandle(handle).anchorScroll(animate);
                }
                else {
                    this.scroll.anchorScroll(animate);
                }
            };
            IonicScroll.prototype.getScrollView = function (handle) {
                if (handle) {
                    return this.scroll.$getByHandle(handle).getScrollView();
                }
                else {
                    return this.scroll.getScrollView();
                }
            };
            IonicScroll.$inject = ['$ionicScrollDelegate', '$timeout'];
            return IonicScroll;
        })();
        service.IonicScroll = IonicScroll;
        app.registerService('serviceIonicScroll', IonicScroll);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var IonicSideMenu = (function () {
            function IonicSideMenu($rootScope, sideMenu) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.sideMenu = sideMenu;
                this.asideMin = '1024px';
                this.aside = false;
                this.setAsideMin(1024);
                $rootScope.$on('$ionicExposeAside', function (evt, isAsideExposed) {
                    _this.aside = isAsideExposed;
                });
            }
            IonicSideMenu.prototype.setAsideMin = function (min) {
                this.asideMin = min.toString() + 'px';
                ionic.trigger('resize', { target: window });
            };
            IonicSideMenu.prototype.toggleLeft = function (handle) {
                if (!this.aside) {
                    if (handle) {
                        this.sideMenu.$getByHandle(handle).toggleLeft();
                    }
                    else {
                        this.sideMenu.toggleLeft();
                    }
                }
            };
            IonicSideMenu.prototype.toggleRight = function (handle) {
                if (!this.aside) {
                    if (handle) {
                        this.sideMenu.$getByHandle(handle).toggleRight();
                    }
                    else {
                        this.sideMenu.toggleRight();
                    }
                }
            };
            IonicSideMenu.prototype.openLeft = function (handle) {
                if (!this.aside) {
                    if (handle) {
                        this.sideMenu.$getByHandle(handle).toggleLeft(true);
                    }
                    else {
                        this.sideMenu.toggleLeft(true);
                    }
                }
            };
            IonicSideMenu.prototype.openRight = function (handle) {
                if (!this.aside) {
                    if (handle) {
                        this.sideMenu.$getByHandle(handle).toggleRight(true);
                    }
                    else {
                        this.sideMenu.toggleRight(true);
                    }
                }
            };
            IonicSideMenu.prototype.closeLeft = function (handle) {
                if (!this.aside) {
                    if (handle) {
                        this.sideMenu.$getByHandle(handle).toggleLeft(false);
                    }
                    else {
                        this.sideMenu.toggleLeft(false);
                    }
                }
            };
            IonicSideMenu.prototype.closeRight = function (handle) {
                if (!this.aside) {
                    if (handle) {
                        this.sideMenu.$getByHandle(handle).toggleRight(false);
                    }
                    else {
                        this.sideMenu.toggleRight(false);
                    }
                }
            };
            IonicSideMenu.prototype.isOpen = function (handle) {
                if (handle) {
                    return this.sideMenu.$getByHandle(handle).isOpenLeft() || this.sideMenu.$getByHandle(handle).isOpenRight() || this.aside;
                }
                else {
                    return this.sideMenu.isOpenLeft() || this.sideMenu.isOpenRight() || this.aside;
                }
            };
            IonicSideMenu.prototype.isOpenLeft = function (handle) {
                if (handle) {
                    return this.sideMenu.$getByHandle(handle).isOpenLeft() || this.aside;
                }
                else {
                    return this.sideMenu.isOpenLeft() || this.aside;
                }
            };
            IonicSideMenu.prototype.isOpenRight = function (handle) {
                if (handle) {
                    return this.sideMenu.$getByHandle(handle).isOpenRight() || this.aside;
                }
                else {
                    return this.sideMenu.isOpenRight() || this.aside;
                }
            };
            IonicSideMenu.prototype.getOpenRatio = function (handle) {
                if (handle) {
                    return this.sideMenu.$getByHandle(handle).getOpenRatio();
                }
                else {
                    return this.sideMenu.getOpenRatio();
                }
            };
            IonicSideMenu.prototype.getCanDragContent = function (handle) {
                if (handle) {
                    return this.sideMenu.$getByHandle(handle).canDragContent();
                }
                else {
                    return this.sideMenu.canDragContent();
                }
            };
            IonicSideMenu.prototype.setCanDragContent = function (canDrag, handle) {
                if (handle) {
                    this.sideMenu.$getByHandle(handle).canDragContent(canDrag);
                }
                else {
                    this.sideMenu.canDragContent(canDrag);
                }
            };
            IonicSideMenu.$inject = ['$rootScope', '$ionicSideMenuDelegate'];
            return IonicSideMenu;
        })();
        service.IonicSideMenu = IonicSideMenu;
        app.registerService('serviceIonicSideMenu', IonicSideMenu);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var IonicSlideBox = (function () {
            function IonicSlideBox(slideBox, $timeout) {
                this.slideBox = slideBox;
                this.$timeout = $timeout;
            }
            IonicSlideBox.prototype.update = function (handle) {
                var _this = this;
                if (handle) {
                    this.$timeout(function () {
                        _this.slideBox.$getByHandle(handle).update();
                    }, 1050, true);
                }
                else {
                    this.$timeout(function () {
                        _this.slideBox.update();
                    }, 1050, true);
                }
            };
            IonicSlideBox.prototype.slide = function (to, speed, handle) {
                if (handle) {
                    this.slideBox.$getByHandle(handle).slide(to, speed);
                }
                else {
                    this.slideBox.slide(to, speed);
                }
            };
            IonicSlideBox.prototype.getEnableSlide = function (handle) {
                if (handle) {
                    return this.slideBox.$getByHandle(handle).enableSlide();
                }
                else {
                    return this.slideBox.enableSlide();
                }
            };
            IonicSlideBox.prototype.setEnableSlide = function (canSlide, handle) {
                if (handle) {
                    this.slideBox.$getByHandle(handle).enableSlide(canSlide);
                }
                else {
                    this.slideBox.enableSlide(canSlide);
                }
            };
            IonicSlideBox.prototype.previous = function (handle) {
                if (handle) {
                    this.slideBox.$getByHandle(handle).previous();
                }
                else {
                    this.slideBox.previous();
                }
            };
            IonicSlideBox.prototype.next = function (handle) {
                if (handle) {
                    this.slideBox.$getByHandle(handle).next();
                }
                else {
                    this.slideBox.next();
                }
            };
            IonicSlideBox.prototype.stop = function (handle) {
                if (handle) {
                    this.slideBox.$getByHandle(handle).stop();
                }
                else {
                    this.slideBox.stop();
                }
            };
            IonicSlideBox.prototype.start = function (handle) {
                if (handle) {
                    this.slideBox.$getByHandle(handle).start();
                }
                else {
                    this.slideBox.start();
                }
            };
            IonicSlideBox.prototype.currentIndex = function (handle) {
                if (handle) {
                    return this.slideBox.$getByHandle(handle).currentIndex();
                }
                else {
                    return this.slideBox.currentIndex();
                }
            };
            IonicSlideBox.prototype.slidesCount = function (handle) {
                if (handle) {
                    return this.slideBox.$getByHandle(handle).slidesCount();
                }
                else {
                    return this.slideBox.slidesCount();
                }
            };
            IonicSlideBox.$inject = ['$ionicSlideBoxDelegate', '$timeout'];
            return IonicSlideBox;
        })();
        service.IonicSlideBox = IonicSlideBox;
        app.registerService('serviceIonicSlideBox', IonicSlideBox);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));

var app;
(function (app) {
    var service;
    (function (service) {
        'use strict';
        var IonicWrapper = (function () {
            function IonicWrapper(history, loading, navBar, popup, modal, popover, scroll, sideMenu, slideBox, backdrop) {
                this.history = history;
                this.loading = loading;
                this.navBar = navBar;
                this.popup = popup;
                this.modal = modal;
                this.popover = popover;
                this.scroll = scroll;
                this.sideMenu = sideMenu;
                this.slideBox = slideBox;
                this.backdrop = backdrop;
            }
            IonicWrapper.$inject = [
                'serviceIonicHistory',
                'serviceIonicLoading',
                'serviceIonicNavBar',
                'serviceIonicPopup',
                'serviceIonicModal',
                'serviceIonicPopover',
                'serviceIonicScroll',
                'serviceIonicSideMenu',
                'serviceIonicSlideBox',
                'serviceIonicBackdrop'
            ];
            return IonicWrapper;
        })();
        service.IonicWrapper = IonicWrapper;
        app.registerService('serviceIonicWrapper', IonicWrapper);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));
