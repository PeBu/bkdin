// Generated by CoffeeScript 1.8.0
(function() {
  var MODULE_NAME, SLIDER_TAG, angularize, contain, events, gap, halfWidth, hide, module, offset, offsetLeft, pixelize, qualifiedDirectiveDefinition, roundStep, show, sliderDirective, width;

  MODULE_NAME = 'ui.slider';

  SLIDER_TAG = 'slider';

  angularize = function(element) {
    return angular.element(element);
  };

  pixelize = function(position) {
    return "" + position + "px";
  };

  hide = function(element) {
    return element.css({
      opacity: 0
    });
  };

  show = function(element) {
    return element.css({
      opacity: 1
    });
  };

  offset = function(element, position) {
    return element.css({
      left: position
    });
  };

  halfWidth = function(element) {
    return element[0].offsetWidth / 2;
  };

  offsetLeft = function(element) {
    return element[0].offsetLeft;
  };

  width = function(element) {
    return element[0].offsetWidth;
  };

  gap = function(element1, element2) {
    return offsetLeft(element2) - offsetLeft(element1) - width(element1);
  };

  contain = function(value) {
    if (isNaN(value)) {
      return value;
    }
    return Math.min(Math.max(0, value), 100);
  };

  roundStep = function(value, precision, step, floor) {
    var decimals, remainder, roundedValue, steppedValue;
    if (floor == null) {
      floor = 0;
    }
    if (step == null) {
      step = 1 / Math.pow(10, precision);
    }
    remainder = (value - floor) % step;
    steppedValue = remainder > (step / 2) ? value + step - remainder : value - remainder;
    decimals = Math.pow(10, precision);
    roundedValue = steppedValue * decimals / decimals;
    return parseFloat(roundedValue.toFixed(precision));
  };

  events = {
    mouse: {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup'
    },
    touch: {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend'
    }
  };

  sliderDirective = function($timeout) {
    return {
      restrict: 'E',
      scope: {
        floor: '@',
        ceiling: '@',
        values: '=?',
        step: '@',
        highlight: '@',
        precision: '@',
        buffer: '@',
        dragstop: '@',
        ngModel: '=?',
        ngModelLow: '=?',
        ngModelHigh: '=?',
        change: '&'
      },
      template: '<div class="slider-bar"><div class="selection"></div></div>\n<div class="handle low"></div><div class="handle high"></div>\n<div class="bubble limit low">{{ values.length ? values[floor || 0] : floor }}</div>\n<div class="bubble limit high">{{ values.length ? values[ceiling || values.length - 1] : ceiling }}</div>\n<div class="bubble value low">{{ values.length ? values[local.ngModelLow || local.ngModel || 0] : local.ngModelLow || local.ngModel || 0 }}</div>\n<div class="bubble value high">{{ values.length ? values[local.ngModelHigh] : local.ngModelHigh }}</div>',
      compile: function(element, attributes) {
        var high, low, range, watchables;
        range = (attributes.ngModel == null) && (attributes.ngModelLow != null) && (attributes.ngModelHigh != null);
        low = range ? 'ngModelLow' : 'ngModel';
        high = 'ngModelHigh';
        watchables = ['floor', 'ceiling', 'values', low];
        if (range) {
          watchables.push(high);
        }
        return {
          post: function(scope, element, attributes) {
            var bar, barWidth, bound, ceilBub, dimensions, e, flrBub, handleHalfWidth, highBub, lowBub, maxOffset, maxPtr, maxValue, minOffset, minPtr, minValue, ngDocument, offsetRange, selection, updateDOM, upper, valueRange, w, _i, _j, _len, _len1, _ref, _ref1;
            _ref = (function() {
              var _i, _len, _ref, _results;
              _ref = element.children();
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                e = _ref[_i];
                _results.push(angularize(e));
              }
              return _results;
            })(), bar = _ref[0], minPtr = _ref[1], maxPtr = _ref[2], flrBub = _ref[3], ceilBub = _ref[4], lowBub = _ref[5], highBub = _ref[6];
            selection = angularize(bar.children()[0]);
            if (!range) {
              _ref1 = [maxPtr, highBub];
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                upper = _ref1[_i];
                upper.remove();
              }
              if (!attributes.highlight) {
                selection.remove();
              }
            }
            scope.local = {};
            scope.local[low] = scope[low];
            scope.local[high] = scope[high];
            bound = false;
            ngDocument = angularize(document);
            handleHalfWidth = barWidth = minOffset = maxOffset = minValue = maxValue = valueRange = offsetRange = void 0;
            dimensions = function() {
              var value, _j, _len1, _ref2;
              if (scope.step == null) {
                scope.step = 1;
              }
              if (scope.floor == null) {
                scope.floor = 0;
              }
              if (scope.precision == null) {
                scope.precision = 0;
              }
              if (!range) {
                scope.ngModelLow = scope.ngModel;
              }
              if ((_ref2 = scope.values) != null ? _ref2.length : void 0) {
                if (scope.ceiling == null) {
                  scope.ceiling = scope.values.length - 1;
                }
              }
              scope.local[low] = scope[low];
              scope.local[high] = scope[high];
              for (_j = 0, _len1 = watchables.length; _j < _len1; _j++) {
                value = watchables[_j];
                if (typeof value === 'number') {
                  scope[value] = roundStep(parseFloat(scope[value]), parseInt(scope.precision), parseFloat(scope.step), parseFloat(scope.floor));
                }
              }
              handleHalfWidth = halfWidth(minPtr);
              barWidth = width(bar);
              minOffset = 0;
              maxOffset = barWidth - width(minPtr);
              minValue = parseFloat(scope.floor);
              maxValue = parseFloat(scope.ceiling);
              valueRange = maxValue - minValue;
              return offsetRange = maxOffset - minOffset;
            };
            updateDOM = function() {
              var bind, percentOffset, percentValue, pixelsToOffset, setBindings, setPointers;
              dimensions();
              percentOffset = function(offset) {
                return contain(((offset - minOffset) / offsetRange) * 100);
              };
              percentValue = function(value) {
                return contain(((value - minValue) / valueRange) * 100);
              };
              pixelsToOffset = function(percent) {
                return pixelize(percent * offsetRange / 100);
              };
              setPointers = function() {
                var newHighValue, newLowValue;
                offset(ceilBub, pixelize(barWidth - width(ceilBub)));
                newLowValue = percentValue(scope.local[low]);
                offset(minPtr, pixelsToOffset(newLowValue));
                offset(lowBub, pixelize(offsetLeft(minPtr) - (halfWidth(lowBub)) + handleHalfWidth));
                offset(selection, pixelize(offsetLeft(minPtr) + handleHalfWidth));
                switch (true) {
                  case range:
                    newHighValue = percentValue(scope.local[high]);
                    offset(maxPtr, pixelsToOffset(newHighValue));
                    offset(highBub, pixelize(offsetLeft(maxPtr) - (halfWidth(highBub)) + handleHalfWidth));
                    return selection.css({
                      width: pixelsToOffset(newHighValue - newLowValue)
                    });
                  case attributes.highlight === 'right':
                    return selection.css({
                      width: pixelsToOffset(110 - newLowValue)
                    });
                  case attributes.highlight === 'left':
                    selection.css({
                      width: pixelsToOffset(newLowValue)
                    });
                    return offset(selection, 0);
                }
              };
              bind = function(handle, bubble, ref, events) {
                var changed, currentRef, onEnd, onMove, onStart;
                currentRef = ref;
                changed = false;
                onEnd = function() {
                  bubble.removeClass('active');
                  handle.removeClass('active');
                  ngDocument.unbind(events.move);
                  ngDocument.unbind(events.end);
                  if (scope.dragstop) {
                    scope[high] = scope.local[high];
                    scope[low] = scope.local[low];
                  }
                  currentRef = ref;
                  scope.$apply();
                  if (changed) {
                    return scope.$eval(scope.change);
                  }
                };
                onMove = function(event) {
                  var eventX, newOffset, newPercent, newValue, _ref2, _ref3, _ref4;
                  eventX = event.clientX || ((_ref2 = event.touches) != null ? _ref2[0].clientX : void 0) || ((_ref3 = event.originalEvent) != null ? (_ref4 = _ref3.changedTouches) != null ? _ref4[0].clientX : void 0 : void 0) || 0;
                  newOffset = eventX - element[0].getBoundingClientRect().left - handleHalfWidth;
                  newOffset = Math.max(Math.min(newOffset, maxOffset), minOffset);
                  newPercent = percentOffset(newOffset);
                  newValue = minValue + (valueRange * newPercent / 100.0);
                  if (range) {
                    switch (currentRef) {
                      case low:
                        if (newValue > scope.local[high]) {
                          currentRef = high;
                          minPtr.removeClass('active');
                          lowBub.removeClass('active');
                          maxPtr.addClass('active');
                          highBub.addClass('active');
                          setPointers();
                        } else if (scope.buffer > 0) {
                          newValue = Math.min(newValue, scope.local[high] - scope.buffer);
                        }
                        break;
                      case high:
                        if (newValue < scope.local[low]) {
                          currentRef = low;
                          maxPtr.removeClass('active');
                          highBub.removeClass('active');
                          minPtr.addClass('active');
                          lowBub.addClass('active');
                          setPointers();
                        } else if (scope.buffer > 0) {
                          newValue = Math.max(newValue, parseInt(scope.local[low]) + parseInt(scope.buffer));
                        }
                    }
                  }
                  newValue = roundStep(newValue, parseInt(scope.precision), parseFloat(scope.step), parseFloat(scope.floor));
                  changed = scope.dragstop && changed || scope.local[currentRef] !== newValue;
                  scope.local[currentRef] = newValue;
                  scope.$apply();
                  setPointers();
                  if (!scope.dragstop) {
                    scope[currentRef] = newValue;
                    scope.$apply();
                    if (changed) {
                      return scope.$eval(scope.change);
                    }
                  }
                };
                onStart = function(event) {
                  dimensions();
                  bubble.addClass('active');
                  handle.addClass('active');
                  setPointers();
                  event.stopPropagation();
                  event.preventDefault();
                  ngDocument.bind(events.move, onMove);
                  return ngDocument.bind(events.end, onEnd);
                };
                return handle.bind(events.start, onStart);
              };
              setBindings = function() {
                var method, _j, _len1, _ref2;
                _ref2 = ['touch', 'mouse'];
                for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                  method = _ref2[_j];
                  bind(minPtr, lowBub, low, events[method]);
                  bind(maxPtr, highBub, high, events[method]);
                }
                return bound = true;
              };
              if (!bound) {
                setBindings();
              }
              return setPointers();
            };
            $timeout(updateDOM);
            for (_j = 0, _len1 = watchables.length; _j < _len1; _j++) {
              w = watchables[_j];
              scope.$watch(w, updateDOM, true);
            }
            return window.addEventListener('resize', updateDOM);
          }
        };
      }
    };
  };

  qualifiedDirectiveDefinition = ['$timeout', sliderDirective];

  module = function(window, angular) {
    return angular.module(MODULE_NAME, []).directive(SLIDER_TAG, qualifiedDirectiveDefinition);
  };

  module(window, window.angular);

}).call(this);

angular.module('ionic.wizard', [])
    .directive('ionWizardContent', ['ionContentDirective', function(ionContentDirective) {
      return angular.extend({}, ionContentDirective[0], { scope: false });
    }])
    .directive('ionWizard', ['$rootScope', '$ionicSlideBoxDelegate', function($rootScope, $ionicSlideBoxDelegate) {
        return{
            restrict: 'EA',
            controller: [function() {
                var conditions = [];

                this.addCondition = function(condition) {
                    conditions.push(condition);
                };

                this.getCondition = function(index) {
                    return conditions[index];
                };

                this.checkNextCondition = function(index) {
                    return index > (conditions.length - 1)
                        ? false
                        : conditions[index].next();
                };

                this.checkPreviousCondition = function(index) {
                    return index > (conditions.length - 1)
                        ? false
                        : conditions[index].prev();
                };

            }],
            link: function (scope, element, attrs, controller) {
                var currentIndex = 0;

                $ionicSlideBoxDelegate.enableSlide(false);

                element.css('height', '100%');

                scope.$on("wizard:Previous", function() {
                    $ionicSlideBoxDelegate.previous();
                });
                scope.$on("wizard:Next", function() {
                    $ionicSlideBoxDelegate.next();
                });

                // watch the current index's condition for changes and broadcast the new condition state on change
                scope.$watch(function() {
                    return controller.checkNextCondition(currentIndex) && controller.checkPreviousCondition(currentIndex);
                }, function() {
                    $rootScope.$broadcast("wizard:NextCondition", controller.checkNextCondition(currentIndex));
                    $rootScope.$broadcast("wizard:PreviousCondition", controller.checkPreviousCondition(currentIndex));                    
                });

                scope.$on("slideBox.slideChanged", function(e, index) {
                    currentIndex = index;
                });
            }
        }

    }])
    .directive('ionWizardStep', ['$q', function($q) {
        return {
            restrict: 'EA',
            scope: {
                nextConditionFn: '&nextCondition',
                prevConditionFn: "&prevCondition"
            },
            require: '^^ionWizard',
            link: function(scope, element, attrs, controller) {
                var nextFn = function() {
                    // if there's no condition, just set the condition to true, otherwise evaluate
                    return angular.isUndefined(attrs.nextCondition)
                        ? true
                        : scope.nextConditionFn();
                };

                var prevFn = function() {
                    return angular.isUndefined(attrs.prevCondition)
                        ? true
                        : scope.prevConditionFn();
                };

                var conditions = {
                    next: nextFn,
                    prev: prevFn
                };

                controller.addCondition(conditions);
            }
        }
    }])
    .directive('ionWizardPrevious', ['$rootScope', '$ionicSlideBoxDelegate', function($rootScope, $ionicSlideBoxDelegate) {
        return{
            restrict: 'EA',
            scope: {},
            link: function(scope, element, attrs, controller) {

                if ($ionicSlideBoxDelegate.currentIndex() == 0){
                    element.addClass('ng-hide');
                }

                element.on('click', function() {
                    $rootScope.$broadcast("wizard:Previous");
                });

                scope.$on("slideBox.slideChanged", function(e, index) {
                    element.toggleClass('ng-hide', index == 0);
                });
                
                scope.$on("wizard:PreviousCondition", function(e, condition) {
                    element.attr("disabled", !condition);
                });
            }
        }
    }])
    .directive('ionWizardNext', ['$rootScope', '$ionicSlideBoxDelegate', function($rootScope, $ionicSlideBoxDelegate) {
        return{
            restrict: 'EA',
            scope: {},
            link: function(scope, element, attrs, controller) {
                if ($ionicSlideBoxDelegate.currentIndex() == $ionicSlideBoxDelegate.slidesCount() - 1){
                    element.addClass('ng-hide');
                }
                element.on('click', function() {
                    $rootScope.$broadcast("wizard:Next");
                });

                scope.$on("slideBox.slideChanged", function(e, index) {
                    element.toggleClass('ng-hide', index == $ionicSlideBoxDelegate.slidesCount() - 1);
                });

                scope.$on("wizard:NextCondition", function(e, condition) {
                    element.attr("disabled", !condition); 
                });
            }
        }
    }])
    .directive('ionWizardStart', ['$ionicSlideBoxDelegate', function($ionicSlideBoxDelegate) {
        return{
            restrict: 'EA',
            scope: {
                startFn: '&ionWizardStart',
                startCondition: '&condition'
            },
            link: function(scope, element, attrs) {
                element.addClass('ng-hide');
                if ($ionicSlideBoxDelegate.currentIndex() == $ionicSlideBoxDelegate.slidesCount() - 1){
                    element.removeClass('ng-hide');
                }

                function checkCondition() {
                    return (angular.isUndefined(attrs.condition)) ? true : scope.startCondition();
                }

                element.on('click', function() {
                    scope.startFn();
                });

                scope.$watch(function() {
                    return checkCondition()
                }, function(result) {
                    element.attr('disabled', !result);
                });

                scope.$on("slideBox.slideChanged", function(e, index) {
                    element.toggleClass('ng-hide', index < $ionicSlideBoxDelegate.slidesCount() - 1);
                });
            }
        }
    }]);
