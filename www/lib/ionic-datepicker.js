
(function () {
    'use strict';

    angular.module('ionic-datepicker', ['ionic']);

    angular.module('ionic-datepicker')
        .directive('modalDate', IonicDatepicker);

    IonicDatepicker.$inject = ['$ionicModal', '$filter'];

    function IonicDatepicker($ionicModal, $filter, IonicDatepickerService) {
        return {

            restrict: 'A',

            require: 'ngModel',

            scope: {
                onDateSelect: "&",
                
                onDateChanged: "&",

                isMediaCb: "&"
            },

            link: function (scope, iElement, iAttrs, iModel) {

                var onDateSelect = iAttrs.onDateSelect;
                var onDateChanged = iAttrs.onDateChanged;

                var isCached = iAttrs.isCached === 'true' ? true : false;
                var isPreload = iAttrs.isPreload === 'true' ? true : false;
                var isCloseBackdrop = iAttrs.isCloseBackdrop === 'true' ? true : false;
                var isCloseOnSelect = iAttrs.isCloseOnSelect === 'true' ? true : false;
                var isTimestamp = iAttrs.isTimestamp === 'true' ? true : false;
                
                //var template = iAttrs.modalTemplate || 'modal-select-date';
                var template = iAttrs.modalTemplate || 'ionic-datepicker-modal';
                var animation = iAttrs.modalAnimation || 'slide-in-up';
                
                var mondayFirst = iAttrs.mondayFirst === "true" ? true : false;
                var excludeWeekday = iAttrs.excludeWeekday ? iAttrs.excludeWeekday.split(',') : [];

                var currentDate;
                var lastDate;
                
                // observed
                var minDate;
                var maxDate;
                var startDate; 
                var excludeDate;
                
                
                // scope vars
                scope.value = null;
                scope.currentMonth = '';
                scope.currentYear  = '';

                //                
                scope.dayList = [];
                scope.dayRows = [0, 7, 14, 21, 28, 35];
                scope.dayCols = [0, 1, 2, 3, 4, 5, 6];
                scope.disabledDates = [];
                scope.disableToday = false;
                
                //
                scope.weekNames = iAttrs.weekNames ? iAttrs.weekNames.split(',') : ['So', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
                scope.monthNames = iAttrs.monthNames ? iAttrs.monthNames.split(',') : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                scope.dateFormat = iAttrs.dateFormat || 'MM/dd/yyyy';
                
                // for ui -> text, styles and classes
                scope.ui = {
                    modalTitle: iAttrs.modalTitle || 'Select a Date',
                    
                    selectButton: iAttrs.selectButton || 'Set',
                    cancelButton: iAttrs.cancelButton || 'Cancel',
                    todayButton: iAttrs.todayButton || 'Today',

                    btnStyle: iAttrs.btnStyle || 'clear',
                    
                    btnStyleCancel: iAttrs.btnStyleCancel,
                    btnStyleToday: iAttrs.btnStyleToday,
                    btnStyleSelect: iAttrs.btnStyleSelect,
                    
                    btnClass: iAttrs.btnClass || 'dark',
                    btnClassNav: iAttrs.btnClassNav || '',

                    headerFooterClass: iAttrs.headerFooterClass || 'stable',

                    disableReset: iAttrs.disableReset !== "true" ? false : true,
                    disableToday: iAttrs.disableToday !== "true" ? false : true,

                    modalClass: iAttrs.modalClass || '',
                    modalStyle: iAttrs.modalStyle || '',
                    
                    colorSelected: iAttrs.colorSelected || '#AAAAAA',
                    colorDisabled: iAttrs.colorDisabled || '#AAAAAA',
                    colorToday: iAttrs.colorToday || '#AAAAAA',

                };
                
                if (!scope.ui.btnClassNav) {
                    scope.ui.btnClassNav = scope.ui.headerFooterClass;
                };
                
                scope.ui.headerFooterClass = 'bar-' + scope.ui.headerFooterClass; 
                
                // set media-query style
                if (scope.isMediaCb && !scope.ui.modalStyle) {
                    scope.ui.modalStyle = 
                        "isMediaCb( { mediaQuery: 'sm-portrait'} ) && {" +
                            "'width': '100%', " +
                            "'left': '0%'," +
                            "'right': '0%'," +
                            "'height': '450px'," +
                            "'top': '60px'," +
                            "'bottom': '5%'" +
                        "} || " +
                        "isMediaCb( { mediaQuery: 'sm-landscape' } ) &&  {" +
                            "'width': 'auto'," +
                            "'left': '20%'," +
                            "'right': '20%'," +
                            "'height': '100%'," +
                            "'top': '0%'," +
                            "'bottom': '0%'" +
                        "} || " +
                        "isMediaCb( { mediaQuery: 'md-landscape+lg-landscape' } ) && {" +
                            "'width': 'auto'," +
                            "'left': '35%'," +
                            "'right': '35%'," +
                            "'height': 'auto'," +
                            "'top': '10%'," +
                            "'bottom': '10%'" +
                        "} || " +
                        "isMediaCb( { mediaQuery: 'md-portrait+lg-portrait' } ) && { " +
                            "'width': 'auto'," +
                            "'left': '28%'," +
                            "'right': '28%'," +
                            "'height': '50%'," +
                            "'top': '20%'," +
                            "'bottom': '30%'" +
                        "}"
                };
                
                // cache for mindate
                scope.enableDatesMin = {
                    epoch: 0,
                    year: 0,
                    isSet: false
                };
                
                // cache for maxdate
                scope.enableDatesMax = {
                    epoch: 0,
                    year: 0,
                    isSet: false
                };
                
                // observer for 'startDate'
                var startDateObserve = function(value) {
                    startDate = value;
                };
                
                // observer for 'maxDate'
                var maxDateObserve = function(value) {
                    
                    // get date
                    maxDate = getNewDateFromString(value);
                    
                    // if valid
                    if (maxDate) {
                        
                        // check if minDate > maxDate  
                        if (minDate && minDate > maxDate) {
                            setMaxDate(minDate);
                            setMinDate(maxDate);
                        }
                        
                        // assign
                        else {
                            setMaxDate(maxDate);    
                        };
                    };
                };
                
                // observer vor 'minDate'
                var minDateObserve = function(value) {
                       
                    // get date
                    minDate = getNewDateFromString(value);
                    
                    // if valid
                    if (minDate) {
                        
                        // check if maxDate < minDate
                        if (maxDate && maxDate < minDate) {
                            setMaxDate(minDate);
                            setMinDate(maxDate);
                        }
                        
                        // assign
                        else {
                            setMinDate(minDate);    
                        };
                    };
                };
                
                // observer for 'excludeDate'
                var excludeDateObserve = function(value) {
                    
                    // empty
                    scope.disabledDates = [];
                   
                    // set to array  
                    excludeDate = value ? value.split(',') : [];
                    
                    // assign to list
                    setExludeDays();
                    
                    // reset last day
                    lastDate = null;
                    
                    // render new 
                    renderDateList(currentDate);
                    
                    // if not day can set
                    if (checkDateIsDisabled(currentDate)) {
                        setFirstValidDate()
                    }; 
                };
                
                // observer
                iAttrs.$observe('startDate', startDateObserve); 
                iAttrs.$observe('maxDate', maxDateObserve);
                iAttrs.$observe('minDate', minDateObserve);
                iAttrs.$observe('excludeDate', excludeDateObserve);
                
                // render ng-model
                iModel.$render = function () {
                    scope.value = iModel.$viewValue;
                };
                
                // set date to ng-model
                var setDate = function(doReset) {
                    var oldVal = iModel.$viewValue;
                    var newVal;
                    
                    if (!doReset) {
                        
                        // if timestamp or string 
                        if (isTimestamp) {
                            newVal = scope.selectedDateFull.getTime();
                        }
                        else {
                            newVal = $filter('date')(scope.selectedDateFull, scope.dateFormat);
                        }
                    }
                    else {
                        newVal = null;
                    };
                    
                    // set model
                    iModel.$setViewValue(newVal);    
                    iModel.$render();
                    
                    // we are ready
                    scope.closeModal();
                    
                    // if callback and value is new
                    if (onDateSelect && newVal !== oldVal) {
                        scope.onDateSelect( { newVal: newVal, oldVal: oldVal } );
                    }
                }
                
                // helper set time-values to 0 from date
                var cleanDate = function(aDate) {
                    var result = aDate || new Date();
                    
                    // set to 0
                    result.setHours(0);
                    result.setMinutes(0);
                    result.setSeconds(0);
                    result.setMilliseconds(0);
                    
                    return result;
                    
                };
                
                // helper converts string to date with current scope.dateFormat
                var stringToDate = function (dateStr) {
                    var formatLowerCase = scope.dateFormat.toLowerCase();
                    var formatItems = formatLowerCase.split(formatLowerCase[2]);
                    var dateItems = dateStr.split(dateStr[2]);
                    var monthIndex = formatItems.indexOf("mm");
                    var dayIndex = formatItems.indexOf("dd");
                    var yearIndex = formatItems.indexOf("yyyy");
                    var month = parseInt(dateItems[monthIndex]);
                    
                    //
                    var formatedDate = new Date(dateItems[yearIndex], month -1, dateItems[dayIndex]);

                    return cleanDate(formatedDate);
                };
                
                 // helper getDate from spec. "date" string 
                var getNewDateFromString = function(dateStr) {
                    
                    var newDate;
                    
                    // is empty 
                    if (!dateStr) {
                        return newDate;
                    };
                    
                    // remove whitespace and lowercase
                    dateStr = dateStr.replace(/\s/g, '').toLowerCase();
                     
                     
                    // helper : calc newDate
                    function calcDate() {
                        
                        // decrement val
                        if (!isInc) {
                            val = val * -1    
                        };
                        
                        //
                        switch (type) {
                            
                            // day
                            case 'day':
                                newDate.setDate(newDate.getDate() + val);
                                break;
                                
                            // week
                            case 'week':
                                newDate.setDate(newDate.getDate() + val * 7);
                                break;
                                
                            // month
                            case 'month':
                                newDate.setMonth(newDate.getMonth() + val)
                                break;
                                
                            // year
                            case 'year':
                                newDate.setYear(newDate.getFullYear() + val);
                                break;
                        };
                        
                    };
                    
                    // 
                    var theDate;
                    var val;
                    var type;
                    var isInc;
                    
                    //  helper : parse date string
                    function parseDateStr(splitType) {
                        
                        var startPos = -1;
                        var endPos = -1;
                        
                        // type (string)
                        type = splitType
                        
                        // increment or decrement (boolean)
                        if ( dateStr.indexOf(splitType + '-') > 0 || dateStr.indexOf(splitType + 's-') > 0 ) {
                            isInc = false    
                        }
                        else {
                            isInc = true
                        };
                        
                        // get positions
                        startPos = dateStr.indexOf('and');
                        endPos = dateStr.indexOf(splitType);
                        
                        // only if exists                        
                        if (startPos > -1 && endPos > -1) {
                            
                            // get val (number integer)
                            val = parseInt(dateStr.substring(startPos+3, endPos +1));
                            
                            // get theDate (string)
                            theDate = dateStr.substring(0, startPos);
                        };
                    };
                    
                    // get theDate
                    if (dateStr.indexOf('day') > 0) {
                        parseDateStr('day');
                    }
                    else if (dateStr.indexOf('week') > 0) {
                        parseDateStr('week');
                    }
                    else if (dateStr.indexOf('month') > 0) {
                        parseDateStr('month');
                    }
                    else if (dateStr.indexOf('year') > 0) {
                        parseDateStr('year');
                    }
                    else {
                      theDate = dateStr;      
                    }
                    
                    // check if is timestamp
                    var timestamp = parseInt(theDate);
                    
                    // is unix format 
                    if (timestamp !== NaN && timestamp > 10000) {
                        newDate = cleanDate(new Date(timestamp));
                    }
                    // set from string
                    else  {
                        
                        switch (theDate ) {
                            
                            // set current date
                            case 'now':
                                newDate = cleanDate();
                                break;
                                
                            // set current date with first day of month
                            case 'now-first':
                                newDate = cleanDate();
                                newDate.setDate(1);
                                break;             
                            
                            // set current date with last day of month    
                            case 'now-last':
                                newDate = cleanDate();
                                newDate.setMonth(newDate.getMonth() + 1);
                                newDate.setDate(0);
                                break;
                                
                            // set current date previous month with first day 
                            case 'now-prev':
                                newDate = cleanDate();
                                newDate.setMonth(newDate.getMonth() - 1);
                                newDate.setDate(1);
                                break;
                                                           
                            // set current date next month with last day 
                            case 'now-next':
                                newDate = cleanDate();
                                newDate.setMonth(newDate.getMonth() + 2);
                                newDate.setDate(0);
                                break;
                                
                            // is eg. "31.12.1988" -> depends on dateFormat
                            default:
                                newDate = stringToDate(dateStr)
                                break;
                        };
                    };
                    
                    // check if is a valid date
                    if (newDate != 'Invalid Date') {
                        
                        // if something to calc
                        if (type + val) {
                            calcDate();
                        };
                        
                        return newDate;
                    }
                    else {
                        return undefined;
                    };
                    
                };
                
                
                // set current date to now
                currentDate = cleanDate();
                lastDate = angular.copy(currentDate);

                // set date and date-strings
                scope.selectedDateFull = currentDate;
                scope.selectedDateString = currentDate.toString();
                
                scope.todayDate = angular.copy(currentDate);
                scope.todayDateString = currentDate.toString();
                
                // check if monday first
                if (mondayFirst) {
                    var lastWeekDay = scope.weekNames.shift();
                    scope.weekNames.push(lastWeekDay);
                };
                

                // set all exclude dates                
                var setExludeDays = function() {
                    
                    // Setting the disabled dates list.
                    if (excludeDate && excludeDate.length > 0) {
                        
                        var newDate;
                        
                        // for each
                        angular.forEach(excludeDate, function (val, idx) {
                            
                            // if number
                            if (typeof val === 'number') {
                                val = val.toString();
                            }
                            
                            // get date
                            newDate = getNewDateFromString(val)
                            
                            // if valid
                            if (newDate) {
                                scope.disabledDates.push(newDate.getTime());
                            };
                            
                        });
                    };
                };
                
                // set min date
                var setMinDate = function (aDate) {
                    
                    scope.enableDatesMin.isSet = true;
                    scope.enableDatesMin.epoch = aDate.getTime();
                    
                    // 
                    scope.enableDatesMin.year = angular.copy(aDate);
                    scope.enableDatesMin.year.setYear(aDate.getFullYear() + 1)
                    
                    // disable today
                    if (scope.todayDate < aDate) {
                        scope.disableToday = true;
                    };
                };
                
                // set max date
                var setMaxDate = function (aDate) {
                    
                    scope.enableDatesMax.isSet = true;
                    scope.enableDatesMax.epoch = aDate.getTime();
                    
                    // 
                    scope.enableDatesMax.year = angular.copy(aDate);
                    scope.enableDatesMax.year.setYear(aDate.getFullYear() - 1)
                    
                    // disable today
                    if (scope.todayDate > aDate) {
                        scope.disableToday = true;
                    };
                };
                
                // setting the min and max dates
                var setMinMaxDates = function () {
                    
                    // min/max not set
                    if (!minDate && !maxDate) {
                        return
                    }
                    
                    // unset disabled 
                    scope.prevMonthDisable = false;
                    scope.nextMonthDisable = false;
                    scope.prevYearDisable = false;
                    scope.nextYearDisable = false;
                    
                    // check min date
                    if (minDate) {
                        
                        // prev month
                        if (scope.enableDatesMin.epoch >= scope.currentMonthFirstDayEpoch) {
                            scope.prevMonthDisable = true;
                        };
                        
                        // prev year
                        if (scope.enableDatesMin.year > scope.selectedDateFull) {
                            scope.prevYearDisable = true;
                        };
                        
                    };
                    
                    // check max date
                    if (maxDate) {
                       
                        // next month
                        if (scope.enableDatesMax.epoch <= scope.currentMonthLastDayEpoch) {
                            scope.nextMonthDisable = true;
                        };
                        
                        // next year
                        if (scope.enableDatesMax.year < scope.selectedDateFull) {
                            scope.nextYearDisable = true;
                        };
                    };
                };
                
                // main check if date is disabled 
                var checkDateIsDisabled = function (date) {
                    var epochLocal = date.getTime();
                    var isExclude = false;
                    
                    // check exclude weekdays
                    if (excludeWeekday && excludeWeekday.length > 0) {
                        isExclude = excludeWeekday.indexOf(date.getDay().toString()) > -1 
                    }; 
                    
                    return (
                        (isExclude) ||
                        (scope.disabledDates.indexOf(epochLocal) > -1) || 
                        (scope.enableDatesMin.isSet && scope.enableDatesMin.epoch > epochLocal) || 
                        (scope.enableDatesMax.isSet && scope.enableDatesMax.epoch < epochLocal)
                    );
                };
                
                // main render calendar
                var renderDateList = function (current_date) {
                    
                    // convert if is string
                    if (typeof current_date === 'string') {
                        current_date = stringToDate(current_date)
                    }
                    
                    // set time to 0
                    cleanDate(current_date)
                    
                    var currDate = current_date.getDate()
                    scope.selectedDateString = (new Date(current_date)).toString();
                    currentDate = angular.copy(current_date);

                    // get first and last day
                    var firstDay = new Date(current_date.getFullYear(), current_date.getMonth(), 1).getDate();
                    var lastDay = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0).getDate();
                    
                    // set
                    scope.currentMonthFirstDayEpoch = new Date(current_date.getFullYear(), current_date.getMonth(), firstDay).getTime();
                    scope.currentMonthLastDayEpoch = new Date(current_date.getFullYear(), current_date.getMonth(), lastDay).getTime();

                    // set all days in month
                    scope.dayList = [];

                    for (var i = firstDay; i <= lastDay; i++) {

                        var tempDate = cleanDate(new Date(current_date.getFullYear(), current_date.getMonth(), i));
                        var dateDisabled = checkDateIsDisabled(tempDate);

                        scope.dayList.push({
                            date: tempDate.getDate(),
                            month: tempDate.getMonth(),
                            year: tempDate.getFullYear(),
                            day: tempDate.getDay(),
                            dateString: tempDate.toString(),
                            dateDisabled: dateDisabled
                        });
                        
                        // set selected
                        if (tempDate.getDate() === currDate) {
                            selectDate(scope.dayList[scope.dayList.length - 1])
                        };
                    };
                    
                    //
                    setMinMaxDates();
                   
                    // To set Monday as the first day of the week.
                    var firstDayMonday = scope.dayList[0].day - +mondayFirst;
                    
                    firstDayMonday = (firstDayMonday < 0) ? 6 : firstDayMonday;

                    for (var j = 0; j < firstDayMonday; j++) {
                        scope.dayList.unshift({});
                    }
                   
                    // set month and year
                    scope.currentMonth = scope.monthNames[current_date.getMonth()];
                    scope.currentYear = current_date.getFullYear();
                };
                
                // set first valid date (nearest)           
                var setFirstValidDate = function() {
                    
                    var nearest = -1;
                    var day = scope.selectedDateFull.getDate();

                    // check all                  
                    for (var i = 0; scope.dayList.length > i; i++) {
                        
                        if (scope.dayList[i].date && !scope.dayList[i].dateDisabled) { 
                            
                            // set first
                            if (nearest === -1) {
                                nearest = i;
                            };
                            
                            // set nearest
                            if ( Math.abs(day - scope.dayList[i].date) < Math.abs(day - scope.dayList[nearest].date) ) {
                                nearest = i;
                            };
                            
                        };
                    };
                   
                    // set day to date
                    if (nearest > -1) {
                        currentDate.setDate(scope.dayList[nearest].date);
                        scope.selectedDateString = currentDate.toString();
                        scope.selectedDateFull = new Date(currentDate.toString());
                    }
                };
                
                // date is selected
                var selectDate = function(date) {
                    
                    if (!date || Object.keys(date).length === 0) {
                        return;
                    };
                    
                    // is new
                    if (date.dateString  !== (lastDate && lastDate.toString()) ) {
                        
                        // set 
                        scope.selectedDateString = date.dateString;
                        scope.selectedDateFull = new Date(date.dateString);
                        lastDate = angular.copy(scope.selectedDateFull);
                        
                        // if callback
                        if (onDateChanged) {
                            scope.onDateChanged( { day: scope.selectedDateFull.getDate(), month: scope.selectedDateFull.getMonth() +1, year: scope.selectedDateFull.getFullYear() } );
                        }
                    };
                    
                };
                
                // set prev year (from template) 
                scope.setPrevYear = function () {
                    
                    // if allowed
                    if (!scope.prevYearDisable) {
                        
                        // set date
                        currentDate.setDate(scope.selectedDateFull.getDate());
                        currentDate.setYear(currentDate.getFullYear() - 1);
                        
                        //
                        renderDateList(currentDate);
                        
                        // if not day can set
                        if (checkDateIsDisabled(currentDate)) {
                            setFirstValidDate()
                        };
                    };
                };
                
                // set next year (from template)
                scope.setNextYear = function () {
                    
                    // if allowed
                    if (!scope.nextYearDisable) {
                        currentDate.setDate(scope.selectedDateFull.getDate());
                        currentDate.setYear(currentDate.getFullYear() + 1);
                        
                        //
                        renderDateList(currentDate);
                        
                        // if not day can set
                        if (checkDateIsDisabled(currentDate)) {
                            setFirstValidDate()
                        };
                    };
                };

                // set prev month (from template)
                scope.setPrevMonth = function () {
                    
                    // if allowed
                    if (!scope.prevMonthDisable) {
                        
                        // set date
                        currentDate.setDate(scope.selectedDateFull.getDate());
                        currentDate.setMonth(currentDate.getMonth() - 1);
                        
                        //
                        renderDateList(currentDate);
                        
                        // if not day can set
                        if (checkDateIsDisabled(currentDate)) {
                            setFirstValidDate()
                        };
                    };
                };
                
                // set next month (from template)
                scope.setNextMonth = function () {
                    
                    // if allowed
                    if (!scope.nextMonthDisable) {
                        
                        // set date
                        currentDate.setDate(scope.selectedDateFull.getDate());
                        currentDate.setMonth(currentDate.getMonth() + 1);
                        
                        //
                        renderDateList(currentDate);
                        
                        // if not day can set
                        if (checkDateIsDisabled(currentDate)) {
                            setFirstValidDate()
                        };
                    };
                };
                
                // date is selected (from template)
                scope.dateSelected = function (date) {
                    selectDate(date);
                    
                    // if closeOnSelect
                    if (isCloseOnSelect) {
                        setDate();    
                    };
                };
                
                // set current date (from template)
                scope.setToday = function () {
                    
                    if (scope.todayDateString !== scope.selectedDateString) {
                        currentDate = cleanDate();
                        renderDateList(currentDate);
                    };
                };
                
                // selectDate date (from template)
                scope.selectDate = function () {
                    setDate()
                };
                
                // empty date (from template)
                scope.setEmpty = function () {
                    setDate(true)
                };
                
                // hide or remove modal
                scope.closeModal = function () {

                    if (!scope.modal) {
                        return
                    };

                    if (isCached) {
                        scope.modal.hide().then(function () {
                        });
                    }
                    else {
                        scope.modal.remove().then(function () {
                            scope.modal = null;
                        })
                    };
                };
                
                // show modal
                scope.showModal = function () {

                    if (!scope.modal) {
                        return
                    };

                    scope.modal.show();
                };
                
                // show modal (main)
                var showModal = function () {
                    
                    // not loaded
                    if (!scope.modal) {

                        $ionicModal.fromTemplateUrl(template + '.html',
                            {
                                scope: scope,
                                backdropClickToClose: isCloseBackdrop,
                                hardwareBackButtonClose: false,
                                animation: animation

                            }).then(function (modal) {
                                scope.modal = modal;
                                scope.showModal();
                            });
                    }
                    
                    // allready loaded 
                    else {
                        scope.showModal()
                    };
                };
                
                // preload 
                if (isPreload) {

                    $ionicModal.fromTemplateUrl(template + '.html',
                        {
                            scope: scope,
                            backdropClickToClose: isCloseBackdrop,
                            hardwareBackButtonClose: false,
                            animation: animation

                        }).then(function (modal) {
                            scope.modal = modal;
                        });
                };
                
                // remove on destroy 
                scope.$on('$destroy', function () {

                    if (scope.modal) {
                        scope.modal.remove();
                        scope.modal = null;
                    };
                });
                
                // invoke the datepicker
                iElement.on("click", function () {
                    
                    var dateStr;
                    
                    // set timestamp or string
                    if (typeof scope.value !== 'undefined') {
                        if (typeof scope.value === 'number') {
                            isTimestamp = true;
                        }
                        // is string (see dateFormat)
                        else {
                            isTimestamp = false;
                        };
                    };
                    
                    // set scope value 
                    if (scope.value) {
                        
                        if (isTimestamp) {
                            dateStr = scope.value.toString()
                        }
                        else {
                            dateStr = scope.value;
                        };
                    }
                    
                    // or set start date
                    else {
                        dateStr = startDate;
                    };
                    
                    // set date
                    var newDate = getNewDateFromString(dateStr);
                    
                    // if valid 
                    if (newDate) {
                        renderDateList(newDate);
                        
                        // if not day can set
                        if (checkDateIsDisabled(currentDate)) {
                            setFirstValidDate();
                        };
                    }
                    else {
                        renderDateList(cleanDate());
                    }
                
                    // finally show dialog
                    showModal();

                });
                
                // render model
                //iModel.$render();
            }
        };
    };

})();