
(function(){

angular.module('ionic-modal-select', [])

.directive('compile', ['$compile', function ($compile) {
    
    return function(scope, iElement, iAttrs) {
        
        var x = scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(iAttrs.compile);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                iElement.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(iElement.contents())(scope);
                
                //deactivate watch if "compile-once" is set to "true"
                if(iAttrs.compileOnce === 'true'){
                    x();
                }
            }
        );
    };
}])

.directive('modalSelect', ['$ionicModal','$timeout', function ($ionicModal, $timeout) {
    
    return {
        
        restrict: 'A',
        
        require : 'ngModel',
                
        scope: { 
            options:"=",
             
            optionGetter:"&",
            
            isMediaCb: "&"
        },
        
        
        link: function (scope, iElement, iAttrs, ngModelController, transclude) {
            
            var shortList;
            
            var shortListBreak = iAttrs.shortListBreak ? parseInt(iAttrs.shortListBreak) : 30;
            
            var setFromProperty= iAttrs.optionProperty;
            
            var onOptionSelect = iAttrs.optionGetter;
            
            var isCached = iAttrs.isCached === 'true' ? true : false;
            
            var isPreload = iAttrs.isPreload === 'false' ? false : true;
            
            var template = iAttrs.modalTemplate || 'modal-select-list';
            
            var animation = iAttrs.modalAnimation || 'slide-in-up';
            
            // check
            var multiple = iAttrs.multiple === 'true'  ? true : false;
            
            if(multiple){
                scope.checkedItems = [];
            }
            
            scope.ui = {
                value  : null,
                
                modalTitle : iAttrs.modalTitle || 'Select an option',
                resetButton : iAttrs.resetButton || 'Reset',
                cancelButton : iAttrs.cancelButton || 'Cancel',
                
                loadListMessage : iAttrs.loadListMessage || 'Loading',
                
                disableReset : iAttrs.disableReset  !== "true" ? false : true,
                
                modalClass : iAttrs.modalClass || '',
                modalStyle: iAttrs.modalStyle || '',
                
                headerFooterClass : iAttrs.headerFooterClass || 'bar-stable',
                
                selectedClass : iAttrs.selectedClass || '',
                selectedStyle : iAttrs.selectedStyle || '',
                
            };

            
            // getting options template
            var opt = iElement[0].querySelector('.option');
            
            if(!opt){
                var name = 'modalSelectError:noOptionTemplate';
                var msg = 'When using modalSelect directive you must include an element with class "option" to provide a template for your select options.';
                
                throw new Error(name + ' ' + msg)
            }
            
            // set html and remove element option (class)
            scope.inner = angular.element(opt).html();
            opt.remove();
            
            //shortList controls wether using ng-repeat instead of collection-repeat
            if(iAttrs.useCollectionRepeat === "true") {
                shortList = false;
            }
             
            else if(iAttrs.useCollectionRepeat === "false") {
                shortList = true;
            }
             
            else {
                shortList = scope.options.length < shortListBreak;
            };
            
            // set shortlist
            scope.ui.shortList = shortList;
            
            // render
            ngModelController.$render = function() {
                scope.ui.value = ngModelController.$viewValue;
            };
            
            //
            var getSelectedValue = scope.getSelectedValue = function(option) {
                
                var val = option;
                    
                if (onOptionSelect) {
                    val = scope.optionGetter( { option:option } );
                }
                
                else if (setFromProperty) {
                    val = option[setFromProperty];
                };
              
                return val;
            };

            //
            scope.setOption = function(option) {
                var oldValue = ngModelController.$viewValue;
                var val = getSelectedValue(option);
                
                ngModelController.$setViewValue(val);    
                ngModelController.$render();
                
                scope.closeModal();
                
                if(scope.onSelect){
                    scope.onSelect( { newValue: val, oldValue: oldValue } );
                };
            };

            // remove last value and close
            scope.unsetValue = function() {
                
                $timeout(function() {
                    ngModelController.$setViewValue("");
                    ngModelController.$render();
                    
                    scope.closeModal();
                });
            };

            // hide or remove modal
            scope.closeModal = function() {
                
                if (!scope.modal) {
                    return
                }
                
                if (isCached) {
                    scope.modal.hide().then(function(){
                        scope.showList = false;  
                    });
                }
                else {
                   scope.modal.remove().then( function() {
                       scope.showList = false;
                       scope.modal = null;
                   }) 
                }
            };
            
            // show modal
            scope.showModal = function() {
                
                if (!scope.modal) {
                    return
                }
                
                if(shortList){
                    scope.showList = true;    
                    scope.modal.show();
                    
                } else {
                    scope.modal.show()
                    .then(function(){
                        scope.showList = true;    
                    });    
                }
            };
            
            // 
            var showModal = function () {
                
                // not loaded
                if (!scope.modal) {
                    
                    $ionicModal.fromTemplateUrl(template + '.html',
                        {
                            scope: scope,
                            backdropClickToClose: false,
                            hardwareBackButtonClose: false,
                            animation: animation
                            
                        }).then( function(modal) {
                            scope.modal = modal;
                            scope.showModal();
                    });
                }
                
                // allready loaded 
                else {
                    scope.showModal()
                }
            }
            
            // preload 
            if (isPreload) {
                    
                $ionicModal.fromTemplateUrl(template + '.html',
                    {
                        scope: scope,
                        backdropClickToClose: false,
                        hardwareBackButtonClose: false,
                        animation: animation
                        
                    }).then( function(modal) {
                        scope.modal = modal;
                });
            };
            
            // remove on destroy 
            scope.$on('$destroy', function(){
                
                 if (scope.modal) {
                    scope.modal.remove();
                    scope.modal = null;
                 }  
            });
            
            
            // on click -> show modal 
            iElement.on('click', function(evt) {
                showModal();
            });

            ngModelController.$render();

        }
    };
}]);

})();

angular.module('ionic-modal-select').run(['$templateCache', function($templateCache) {
  $templateCache.put("modal-select-list.html",
    "<ion-modal-view class=ionic-select-modal ng-class=::ui.modalClass ng-style=\"{{ ::ui.modalStyle }}\"><ion-header-bar ng-class=::ui.headerFooterClass><button style=padding-left:0px btn-style=clear btn-icon-left=ion-ios-close-outline ng-click=closeModal()></button><h1 class=title>{{::ui.modalTitle}}</h1></ion-header-bar><ion-content has-bouncing=true class=margin-050><div ng-if=!ui.shortList><div ng-if=!showList class=text-center style=padding-top:40px><h4 class=muted>{{::ui.loadListMessage}}</h4><p><ion-spinner></ion-spinner></p></div><div ng-if=showList class=\"list animate-if\"><div class=\"item item-text-wrap\" collection-repeat=\"option in options track by $index \" ng-click=setOption(option) ng-class=\"{'{{::ui.selectedClass}}': getSelectedValue(option) == ui.value}\" ng-style=\"getSelectedValue(option) === ui.value && { {{::ui.selectedStyle}} }\"><div compile=inner compile-once=true></div></div></div></div><div ng-if=ui.shortList><div class=list><div class=\"item item-text-wrap\" ng-repeat=\"option in options track by $index\" ng-click=setOption(option) ng-class=\"{ '{{::ui.selectedClass}}': getSelectedValue(option) == ui.value }\" ng-style=\"getSelectedValue(option) === ui.value && { {{::ui.selectedStyle}} }\"><div compile=inner compile-once=true></div></div></div></div></ion-content><ion-footer-bar ng-class=::ui.headerFooterClass><div class=button-bar><div class=col></div><button style=\"border-width: 1px\" class=col-30 btn-style=outline btn-icon-left1=ion-ios-close-outline ng-click=closeModal()>{{ui.cancelButton}}</button><div class=col-5></div><button style=\"border-width: 1px\" class=col-30 ng-disabled=::ui.disableReset btn-style=outline ng-click=unsetValue()>{{ui.resetButton}}</button><div class=col></div></div></ion-footer-bar></ion-modal-view>");
}]);
