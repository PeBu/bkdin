
var app;
(function (app) {
    var directive;
    (function (_directive) {
        var Button = (function () {
            function Button() {
                var directive = {};
                directive.restrict = 'E';
                directive.link = function (scope, element, attributes) {
                    if (!attributes.btnType) {
                        element.attr('type', 'button');
                    }
                    else {
                        element.attr('type', attributes.btnType);
                    }
                    element.addClass('button');
                    if (attributes.btnIcon || attributes.btnIconLeft || attributes.btnIconRight) {
                        element.addClass('button-icon');
                        if (~(attributes.btnIcon || attributes.btnIconLeft || attributes.btnIconRight).indexOf('ion-')) {
                            element.addClass((attributes.btnIcon || attributes.btnIconLeft || attributes.btnIconRight));
                        }
                        else {
                            element.addClass('ion-' + (attributes.btnIcon || attributes.btnIconLeft || attributes.btnIconRight));
                        }
                        if (attributes.btnIconRight) {
                            element.addClass('icon-right');
                        }
                        else {
                            element.addClass('icon-left');
                        }
                    }
                    if (attributes.btnStyle) {
                        element.addClass('button-' + attributes.btnStyle);
                    }
                    if (attributes.btnSize) {
                        element.addClass('button-' + attributes.btnSize);
                    }
                    if (attributes.btnColor) {
                        element.addClass('button-' + attributes.btnColor);
                    }
                    else {
                        element.addClass('button-mobc');
                    }
                };
                return directive;
            }
            Button.$inject = [];
            return Button;
        })();
        _directive.Button = Button;
        app.registerDirective('button', Button);
    })(directive = app.directive || (app.directive = {}));
})(app || (app = {}));

var app;
(function (app) {
    var directive;
    (function (_directive) {
        var ValidSubmit = (function () {
            function ValidSubmit(parse) {
                var directive = {};
                directive.require = '^form';
                directive.restrict = 'A';
                directive.link = function (scope, element, attrs, form) {
                    form.$submitted = true;
                    var fn = parse(attrs.onValidSubmit);
                    element.on('submit', function (event) {
                        scope.$apply(function () {
                            element.addClass('ng-submitted');
                            form.$submitted = true;
                            if (form.$valid) {
                                if (typeof fn === 'function') {
                                    fn(scope, { $event: event });
                                }
                            }
                        });
                    });
                };
                return directive;
            }
            ValidSubmit.$inject = ['$parse'];
            return ValidSubmit;
        })();
        _directive.ValidSubmit = ValidSubmit;
        app.registerDirective('onValidSubmit', ValidSubmit);
    })(directive = app.directive || (app.directive = {}));
})(app || (app = {}));

var app;
(function (app) {
    var directive;
    (function (_directive) {
        var Validate = (function () {
            function Validate(timeout) {
                var directive = {};
                directive.require = '^form';
                directive.restrict = 'AEC';
                directive.link = function (scope, element, attrs, form) {
                    var inputs;
                    timeout(function () {
                        inputs = element.find("input");
                        for (var i = 0; i < inputs.length; i++) {
                            processInputs(inputs[i]);
                        }
                    }, 0, true);
                    var processInputs = function (input) {
                        var attributes = input.attributes;
                        var inp = angular.element(input);
                        if ((attributes.getNamedItem('data-ng-model') || attributes.getNamedItem('ng-model')) && attributes.getNamedItem('name')) {
                            var value = attributes.getNamedItem('data-ng-model') || attributes.getNamedItem('ng-model');
                            console.log('change', inp);
                            scope.$watch(input, function (newval, oldval) {
                                if (newval !== oldval) {
                                    console.log('change', newval);
                                    if (inp.hasClass('ng-invalid')) {
                                        element.removeClass('has-success').addClass('has-error');
                                    }
                                    else {
                                        element.removeClass('has-error').addClass('has-success');
                                    }
                                }
                            }, false);
                        }
                    };
                };
                return directive;
            }
            Validate.$inject = ['$timeout'];
            return Validate;
        })();
        _directive.Validate = Validate;
        app.registerDirective('validate', Validate);
    })(directive = app.directive || (app.directive = {}));
})(app || (app = {}));

var app;
(function (app) {
    var directive;
    (function (_directive) {
        var ShowWhen = (function () {
            function ShowWhen($window, ngIfDirective) {
                var ngIf = ngIfDirective[0];
                var directive = {};
                directive.transclude = ngIf.transclude;
                directive.priority = ngIf.priority;
                directive.terminal = ngIf.terminal;
                directive.restrict = ngIf.restrict;
                directive.link = function ($scope, element, attributes) {
                    var value = attributes.showWhen;
                    var custom;
                    try {
                        custom = $scope.$eval(value);
                    }
                    catch (err) {
                    }
                    if (custom) {
                        value = custom;
                    }
                    else {
                        value = value.toLowerCase();
                    }
                    attributes.ngIf = function () {
                        return custom;
                    };
                    ngIf.link.apply(ngIf, arguments);
                    function getMediaByName(name) {
                        var result;
                        switch (name) {
                            case 'sm':
                                result = '(max-width:767px)';
                                break;
                            case 'sm-portrait':
                                result = '(max-width:767px) and (orientation: portrait)';
                                break;
                            case 'sm-landscape':
                                result = '(max-width:767px) and (orientation: landscape)';
                                break;
                            case 'md':
                                result = '(min-width:768px) and (max-width:1280px)';
                                break;
                            case 'md-portrait':
                                result = '(min-width:768px) and (max-width:1280px) and (orientation: portrait)';
                                break;
                            case 'md-landscape':
                                result = '(min-width:768px) and (max-width:1280px) and (orientation: landscape)';
                                break;
                            case 'lg':
                                result = '(min-width:1281px)';
                                break;
                            case 'lg-portrait':
                                result = '(min-width:1281px) and (orientation: portrait)';
                                break;
                            case 'lg-landscape':
                                result = '(min-width:1281px) and (orientation: landscape)';
                                break;
                            default:
                                return '(min-device-width : 320px)';
                                break;
                        }
                        return result;
                    }
                    function checkExpose() {
                        var mq = '';
                        if (~value.indexOf('+')) {
                            var mqs = value.split('+');
                            mqs.forEach(function (q, idx) {
                                mq += getMediaByName(q) + ((idx !== mqs.length - 1) ? ' , ' : '');
                            });
                        }
                        else {
                            mq = (~['sm', 'sm-portrait', 'sm-landscape', 'md', 'md-portrait', 'md-landscape', 'lg', 'lg-portrait', 'lg-landscape'].indexOf(value)) ? getMediaByName(value) : value;
                        }
                        custom = $window.matchMedia(mq).matches;
                    }
                    var debouncedCheck = ionic.debounce(function () {
                        $scope.$apply(function () {
                            checkExpose();
                        });
                    }, 300, false);
                    function onResize() {
                        debouncedCheck();
                    }
                    ionic.on('resize', onResize, $window);
                    $scope.$on('$destroy', function () {
                        ionic.off('resize', onResize, $window);
                    });
                    checkExpose();
                };
                return directive;
            }
            ShowWhen.$inject = ['$window', 'ngIfDirective'];
            return ShowWhen;
        })();
        _directive.ShowWhen = ShowWhen;
        app.registerDirective('showWhen', ShowWhen);
    })(directive = app.directive || (app.directive = {}));
})(app || (app = {}));

var app;
(function (app) {
    var directive;
    (function (_directive) {
        var EnterIsTab = (function () {
            function EnterIsTab(timeout, parse) {
                var directive = {};
                directive.restrict = 'A';
                directive.require = '^form';
                directive.priority = 2;
                directive.link = function (scope, element, attributes, form) {
                    var fn = parse(attributes.enterIsTab);
                    if (fn) {
                        var counter;
                        if (angular.isFunction(fn)) {
                            counter = fn(scope);
                        }
                        else {
                            counter = fn;
                        }
                        var classname = form.$name + '_tab_';
                        element.addClass(classname + counter);
                        element.bind('keydown', function (ev) {
                            if ((ev.keyCode || ev.which) === 13) {
                                var ele = angular.element(document.getElementsByClassName(classname + (counter + 1)));
                                if (ele && ele.length > 0) {
                                    ev.preventDefault();
                                    ele[0].focus();
                                }
                                else {
                                    timeout(function () {
                                        element[0].blur();
                                    }, 0, true);
                                }
                            }
                        });
                    }
                };
                return directive;
            }
            EnterIsTab.$inject = ['$timeout', '$parse'];
            return EnterIsTab;
        })();
        _directive.EnterIsTab = EnterIsTab;
        app.registerDirective('enterIsTab', EnterIsTab);
    })(directive = app.directive || (app.directive = {}));
})(app || (app = {}));
