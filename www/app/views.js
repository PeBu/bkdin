angular.module('app.view').run(['$templateCache', function($templateCache) {
  $templateCache.put("home.html",
    "<ion-view view-title=\"{{::vm.getResStr('title')}}\" cache-view=true hide-back-button=false hide-nav-bar=false><ion-content delegate-handle=home padding=false scroll=false><div show-when=sm+md+lg><ng-include src=\"::vm.getResStr('content_all_template', true)\"></ng-include></div></ion-content></ion-view>");
  $templateCache.put("home_tpl.html",
    "<tab-slide-box tab><div class=tsb-icons><div class=\"tsb-ic-wrp tsb-text\"><a ng-repeat=\"slides in vm.service.getSlides()\" href=javascript:; ng-click=vm.service.gotoSlide($index) class={{slides.icon}}>{{slides.name}}</a></div></div><ion-slide-box delegate-handle=slide_home show-pager=false ng-style=\"{'height' : vm.service.data.getFullHeight() + 'px'}\" on-slide-changed=slideHasChanged($index)><ion-slide ng-repeat=\"slides in vm.service.getSlides()\"><ng-include src=\"slides.name +'.html'\"></ng-include></ion-slide></ion-slide-box></tab-slide-box>");
  $templateCache.put("ionic-datepicker-modal.html",
    "<ion-modal-view class=ionic-select-modal style=\"max-width: 340px; max-height: 460px\" ng-class=::ui.modalClass ng-style=\"{{ ::ui.modalStyle }}\"><ion-header-bar ng-class=::ui.headerFooterClass><button style=padding-left:0px btn-style=clear btn-color=\"{{ ui.btnClass}}\" btn-icon-left=ion-ios-close-outline ng-click=closeModal()></button><h1 class=title>{{::ui.modalTitle}}</h1></ion-header-bar><ion-content scroll=false locking=true padding=false><div><div class=\"row mobc-text-center\"><div class=\"col margin-top-125 padding-0\"><p class=\"mobc-text-center mobc-text-info\">{{selectedDateFull | date:dateFormat}}</p><i ng-if=\"value && !ui.disableReset\" class=\"icon ion-backspace-outline\" style=\"position: absolute; \n" +
    "              top: 0.70em; \n" +
    "              right: 2.25em; \n" +
    "              font-size: 2.10em; \n" +
    "              padding:0\" ng-class=\"::ui.btnClass && ' placeholder-icon'\" ng-click=setEmpty()></i></div></div><div class=row style=\"margin:0; padding:0\"><div class=\"col col-55\" on-swipe-left=setPrevMonth() on-swipe-right=setNextMonth()><div class=row style=\"margin:0; padding:0\"><button class=\"col col-20\" ng-disabled=prevMonthDisable btn-style=clear btn-color=\"{{ ui.btnClassNav}}\" btn-icon-left=chevron-left ng-click=setPrevMonth()></button><p class=\"col margin-top-075\" style=\"text-align: center; \n" +
    "                font-size: 1.1em; \n" +
    "                white-space: nowrap; \n" +
    "                overflow:hidden; \n" +
    "                text-overflow: ellipsis\">{{currentMonth}}</p><button class=\"col col-20\" ng-disabled=nextMonthDisable btn-style=clear btn-color=\"{{ ui.btnClassNav}}\" btn-icon-right=chevron-right ng-click=setNextMonth()></button></div></div><div class=\"col col-offset-5 col-40 row\" on-swipe-left=setPrevYear() on-swipe-right=setNextYear()><div class=\"row margin-0 padding-0\" styl1e=\"margin:0; padding:0;\"><button class=\"col col-20\" ng-disabled=prevYearDisable btn-style=clear btn-color=\"{{ ui.btnClassNav}}\" btn-icon-left=chevron-left ng-click=setPrevYear()></button><p class=\"col margin-top-075\" style=\"text-align: center; \n" +
    "                font-size: 1.1em; \n" +
    "                white-space: nowrap; \n" +
    "                overflow:hidden; \n" +
    "                text-overflow: ellipsis\">{{currentYear}}</p><button class=\"col col-20\" style1=\"padding-right : 0px\" ng-disabled=nextYearDisable btn-style=clear btn-color=\"{{ ui.btnClassNav}}\" btn-icon-right=chevron-right ng-click=setNextYear()></button></div></div></div><div on-swipe-left=setPrevMonth() on-swipe-right=setNextMonth()><div class=row><div class=col style=\"font-weight: bold; text-align: center\" ng-repeat=\"weekName in weekNames track by $index\" ng-bind=weekName></div></div><ion-scroll looking=true has-bouncing=true delegate-handle=datepicker-days ng-style=\"\n" +
    "            isMediaCb( { mediaQuery: 'sm-portrait'} ) && {\n" +
    "						  'height': '100%'\n" +
    "	   				} ||\n" +
    "            isMediaCb( { mediaQuery: 'sm-landscape'} ) && {\n" +
    "              'height': '100px'\n" +
    "            }\n" +
    "          \"><div class=row style=\"text-align: center\" ng-repeat=\"row in dayRows track by $index\"><div class=\"col margin-vertical-050 margin-bottom-025\" ng-style=\"{\n" +
    "                'border-radius': '75%', \n" +
    "                'border': dayList[row + $index].dateString === todayDateString ? '1px solid ' + ui.colorToday : '',\n" +
    "                'background-color': (dayList[row + $index].dateString === selectedDateString && dayList[row + $index].day !== undefined) ? ui.colorSelected : ''  \n" +
    "              }\" ng-repeat=\"col in dayCols track by $index\"><div style=\"font-size: 1.1em\" ng-click=\"dateSelected( dayList[row + $index] )\" ng-style=\"{\n" +
    "                  'color': dayList[row + $index].dateDisabled ? ui.colorDisabled : '', \n" +
    "                  'pointer-events': dayList[row + $index].dateDisabled ? 'none' : ''\n" +
    "                }\">{{ dayList[row + $index].date }}</div></div></div></ion-scroll></div></div></ion-content><ion-footer-bar ng-class=::ui.headerFooterClass><div class=button-bar><button style=\"border-width: 1px\" class=col-30 btn-style=\"{{::(ui.btnStyleCancel || ui.btnStyle) }}\" btn-color=\"{{ ui.btnClass}}\" btn-icon-left1=ion-ios-close-outline ng-click=closeModal()>{{::ui.cancelButton}}</button><div class=col-5></div><button style=\"border-width: 1px\" class=col-30 ng-disabled=\"disableToday || ui.disableToday\" btn-style=\"{{::(ui.btnStyleToday || ui.btnStyle) }}\" btn-color=\"{{ ui.btnClass}}\" btn-icon-left1=ion-ios-close-outline ng-click=setToday()>{{::ui.todayButton}}</button><div class=col-5></div><button style=\"border-width: 1px\" class=col-30 btn-style=\"{{::(ui.btnStyleSelect || ui.btnStyle) }}\" btn-color=\"{{ ui.btnClass}}\" btn-icon-left1=ion-ios-close-outline ng-click=selectDate()>{{::ui.selectButton}}</button></div></ion-footer-bar></ion-modal-view>");
  $templateCache.put("main.html",
    "<ion-view view-title=\"{{::vm.getResStr('title')}}\" cache-view=true hide-back-button=true hide-nav-bar=true><ion-content ng-class=\"{ \n" +
    "			  	'has-footer': vm.isMedia('sm-portrait+md+lg') \n" +
    "		    }\" delegate-handle=main padding=false scroll=false><div show-when=sm+md+lg><ng-include src=\"::vm.getResStr('content_all_template', true)\"></ng-include></div></ion-content><ion-footer-bar show-when=sm-portrait+md+lg ng-class=\"::vm.getResStr('footerbar_classname', true)\" style=\"{{::vm.getResStr('footerbar_style', true) }}\"><div ng-hide=vm.service.ionic.sideMenu.aside ng-switch=\"::vm.getResStr('footer_type', true)\"><a ng-switch-when=text-link href=\"{{::vm.getResStr('footer_link', true)}}\" target=_blank><p ng-class=\"::vm.getResStr('footer_classname', true)\" style=\"{{::vm.getResStr('footer_style', true)}}\">{{::vm.getResStr('footer_content')}}</p></a><p ng-switch-when=text ng-class=\"::vm.getResStr('footer_classname', true)\" style=\"{{::vm.getResStr('footer_style', true)}}\">{{::vm.getResStr('footer_content')}}</p><a ng-switch-when=logo-link href=\"{{::vm.getResStr('footer_link', true)}}\" target=_blank><img ng-src=\"{{::vm.getResStr('footer_content', true)}}\" ng-class=\"::vm.getResStr('footer_classname', true)\" style=\"{{::vm.getResStr('footer_style', true)}}\" alt=\"mobC\"></a> <img ng-switch-when=logo ng-src=\"{{::vm.getResStr('footer_content', true)}}\" ng-class=\"::vm.getResStr('footer_classname', true)\" style=\"{{::vm.getResStr('footer_style', true)}}\" alt=\"mobC\"></div></ion-footer-bar></ion-view>");
  $templateCache.put("main_tpl.html",
    "<tab-slide-box tab><div class=tsb-icons><div class=tsb-ic-wrp><a href=javascript:; class=\"{{::vm.getResStr('slide_1_icon', true) || 'ion-home' }}\"></a> <a href=javascript:; class=\"{{::vm.getResStr('slide_2_icon', true) || 'ion-home' }}\"></a> <a href=javascript:; class=\"{{::vm.getResStr('slide_3_icon', true) || 'ion-home' }}\"></a> <a href=javascript:; class=\"{{::vm.getResStr('slide_4_icon', true) || 'ion-home' }}\"></a></div></div><ion-slide-box delegate-handle=main_tpl show-pager=false ng-style=\"{'height': vm.service.data.getFullHeight() + '50px'}\" on-slide-changed=slideHasChanged($index)><ion-slide ng-repeat=\"slide in ['main_tpl_1.html','main_tpl_2.html','main_tpl_3.html','main_tpl_4.html']\"><div ng-include src=slide></div></ion-slide></ion-slide-box></tab-slide-box>");
  $templateCache.put("main_tpl_1.html",
    "<div ng-style1=\"{ 'height': vm.maxHeight(95) }\"><div class=mobc-center ng-class=\"{ \n" +
    "			  	'row-10': vm.isMedia('sm-portrait'),\n" +
    "				'row-15': vm.isMedia('sm-landscape'),\n" +
    "			    'row-25': vm.isMedia('lg-landscape+md-landscape'),\n" +
    "				'row-20': vm.isMedia('lg-portrait+md-portrait')\n" +
    "		    }\"><img ng-src=\"{{::vm.getResStr('slide_1_bg_img', true)}}\" ng-style=\"\n" +
    "				vm.isMedia('sm') && { 'height': '50px'} || \n" +
    "				vm.isMedia('md') && { 'height': '80px'} || \n" +
    "				vm.isMedia('lg') && { 'height': '120px'}\"></div><div class=\"mobc-text-left padding-top-050\" ng-class=\"{ \n" +
    "			  	'col-offset-5 col-90': vm.isMedia('sm'),\n" +
    "				'row-70 margin-top-050': vm.isMedia('sm-portrait'),\n" +
    "				'row-45': vm.isMedia('sm-landscape'),\n" +
    "				'row-60': vm.isMedia('lg+md'),\n" +
    "		        'col-offset-25 col-50': vm.isMedia('lg-landscape+md-landscape'),\n" +
    "				'col-offset-20 col-60': vm.isMedia('lg-portrait+md-portrait')\n" +
    "		    }\"><p>{{::vm.getResStr('slide_1_txt_welcome', true)}}</p><p class=mobc-text-info-md>{{::vm.getResStr('slide_1_txt_note', false)}}</p><p>{{::vm.getResStr('slide_1_txt_note_1', false)}}</p><p>{{::vm.getResStr('slide_1_txt_note_2', false)}}</p></div><div class=row style=\"position: fixed; \n" +
    "			height: 60px; \n" +
    "			left: 10px;\n" +
    "			width: auto;\n" +
    "			right: 10px\" ng-style=\"\n" +
    "			vm.isMedia('sm-landscape') && { 'top': 'calc(100vh - 120px)'} ||\n" +
    "			vm.isMedia('sm-portrait') && { 'top': 'calc(100vh - 180px)'} ||\n" +
    "			vm.isMedia('md+lg') && { 'top': 'calc(100vh - 210px)'}\n" +
    "		\"><div class=col ng-class=\"{ \n" +
    "				'col-offset-10 col-80 ': vm.isMedia('sm-portrait'),\n" +
    "				'col-offset-33 col-40 ': vm.isMedia('sm-landscape'),  \n" +
    "				'col-offset-35 col-30 ': vm.isMedia('lg+md')\n" +
    "			}\"><button class=\"button-block mobc-text-center\" style=\"margin-top: 0\" btn-icon=\"{{::vm.getResStr('send_btn_icon', true)}}\" btn-color=dark btn-style=outline ng-click=vm.service.gotoSlide(1)>{{::vm.getResStr('slide_1_next_btn_text')}}</button></div></div></div>");
  $templateCache.put("main_tpl_2.html",
    "<div style=\"margin-top: 10px\" class=mobc-border-top ng-class=\"{ \n" +
    "		'col-offset-5 col-90': vm.isMedia('sm'),\n" +
    "		'col-offset-30 col-40': vm.isMedia('lg-landscape+md-landscape'),\n" +
    "		'col-offset-20 col-60': vm.isMedia('lg-portrait+md-portrait')\n" +
    "	}\"><div class=list style=\"margin-bottom: 0px\"><div class=\"item item-input item-stacked-label\" style=\"margin-top: 0; padding-left: 0; padding-top: 5px; border: 0\" ng-class=\"{'has-error': !vm.service.person.type.txt}\"><i class=\"icon ion-asterisk error\"></i> <span class=input-label style=\"padding: 0px; margin: 0px 0px 5px 5px\">{{::vm.getResStr('inp_type_label')}}</span><div class=\"item item-input\" style=\"padding-left: 5px; margin-left: 0px\" ng-model=vm.service.person.type modal-select is-media-cb=vm.isMedia(mediaQuery) modal-template=modal-select-list modal-animation=fade-in-scale options=\"::vm.getResStr('inp_type_options')\" selected-class=\"\" selected-style=\"'background-color': '#ccc'\" modal-class=ion-nifty-modal modal-style=\"\n" +
    "				\n" +
    "					isMediaCb( { mediaQuery: 'sm-portrait'} ) && {\n" +
    "						'width': '100%',\n" +
    "						'left': '0%', \n" +
    "						'right': '0%',\n" +
    "						\n" +
    "						'height': '350px',\n" +
    "						'top': '60px', \n" +
    "						'bottom': '10px' \n" +
    "						\n" +
    "					} ||\n" +
    "					\n" +
    "					isMediaCb( { mediaQuery: 'sm-landscape'} ) && {\n" +
    "						'width': '90%',\n" +
    "						'left': '5%', \n" +
    "						'right': '5%',\n" +
    "						\n" +
    "						'height': '250px',\n" +
    "						'top': '30px', \n" +
    "						'bottom': '10px' \n" +
    "						\n" +
    "					} ||\n" +
    "					\n" +
    "					isMediaCb( { mediaQuery: 'md-portrait'} ) && {\n" +
    "						'width': '70%', \n" +
    "						'left': '15%', \n" +
    "						'right': '15%',\n" +
    "						\n" +
    "						'height': '350px',\n" +
    "						'top': '15%',\n" +
    "						'bottom': '30%'\n" +
    "					} || \n" +
    "					\n" +
    "					isMediaCb( { mediaQuery: 'md-landscape'} ) && {\n" +
    "						'width': '50%',\n" +
    "						'left': '25%', \n" +
    "						'right': '20%',\n" +
    "						\n" +
    "						'height': '350px',\n" +
    "						'top': '15%',\n" +
    "						'bottom': '30%' \n" +
    "					} \n" +
    "				\" modal-title=\"{{ ::vm.getResStr('inp_type_title') }}\" cancel-button=\"{{ ::vm.getResStr('inp_type_cancel') }}\" reset-button=\"{{ ::vm.getResStr('inp_type_reset') }}\" disable-reset=true use-collection-repeat=false is-cached=true is-preload=true><i class=\"icon ion-arrow-down-b placeholder-icon select\"></i><p>{{vm.service.person.type.txt || vm.getResStr('inp_type_empty') }}</p><div class=option><h3>{{option.txt}}</h3></div></div><p style=\"height: 10px\" class=mobc-border-bottom></p></div><div class=\"item item-input item-stacked-label\" style=\"margin-top: 0; padding-top: 5px; padding-left: 0; border: 0\" ng-class=\"{'has-error': !vm.service.person.lastName}\"><i class=\"icon ion-asterisk error\"></i> <span class=input-label style=\"padding: 0px; margin: 0px 0px 5px 5px\">{{::vm.getResStr('inp_lastName_label')}}</span> <input style=\"padding-left: 5px\" ng-model=vm.service.person.lastName type=\"{{'text'}}\" placeholder=\"{{::vm.getResStr('inp_lastName_empty')}}\"><p style=\"height: 10px\" class=mobc-border-bottom></p></div><div class=\"item item-input item-stacked-label\" style=\"margin-top: 0; padding-top: 5px; padding-left: 0; border: 0\" ng-class=\"{'has-error': !vm.service.person.firstName}\"><i class=\"icon ion-asterisk error\"></i> <span class=input-label style=\"padding: 0px; margin: 0px 0px 5px 5px\">{{::vm.getResStr('inp_firstName_label')}}</span> <input style=\"padding-left: 5px\" ng-model=vm.service.person.firstName type=\"{{'text'}}\" placeholder=\"{{::vm.getResStr('inp_firstName_empty')}}\"><p style=\"height: 10px\" class=mobc-border-bottom></p></div><div class=\"item item-input item-stacked-label\" style=\"margin-top: 0; padding-top: 5px; padding-left: 0; border: 0\" ng-class=\"{'has-error': vm.service.person.type.id !== 1 && !vm.service.person.senderName}\"><i class=\"icon ion-asterisk error\"></i> <span class=input-label style=\"padding: 0px; margin: 0px 0px 5px 5px\">{{::vm.getResStr('inp_senderName_label')}}</span> <input ng-if=\"vm.service.person.type.id !== 1\" style=\"padding-left: 5px\" ng-model=vm.service.person.senderName type=\"{{'text'}}\" placeholder=\"{{::vm.getResStr('inp_senderName_empty')}}\"> <input ng-if=\"vm.service.person.type.id === 1\" class=\"item item-input\" style=\"padding-left: 5px; background-color: white\" ng-value=\"vm.service.person.firstName + ' ' + vm.service.person.lastName\" disabled type=\"{{'text'}}\" placeholder=\"{{::vm.getResStr('inp_senderName_empty')}}\"><p style=\"height: 10px\" class=mobc-border-bottom></p></div><div class=\"item item-input item-stacked-label\" style=\"margin-top: 0; padding-top: 5px; padding-left: 0; border: 0\" ng-class=\"{'has-error': !vm.service.person.senderMail}\"><i class=\"icon ion-asterisk error\"></i> <span class=input-label style=\"padding: 0px; margin: 0px 0px 5px 5px\">{{::vm.getResStr('inp_senderMail_label')}}</span> <input style=\"padding-left: 5px\" ng-model=vm.service.person.senderMail type=\"{{ 'email' }}\" placeholder=\"{{::vm.getResStr('inp_senderMail_empty')}}\"><p style=\"height: 10px\" class=mobc-border-bottom></p></div></div><div class=row style=\"position: fixed; \n" +
    "			height: 60px; \n" +
    "			left: 10px;\n" +
    "			width: auto;\n" +
    "			right: 10px\" ng-style=\"\n" +
    "			vm.isMedia('sm-landscape') && { 'top': 'calc(100vh - 120px)'} ||\n" +
    "			vm.isMedia('sm-portrait') && { 'top': 'calc(100vh - 180px)'} ||\n" +
    "			vm.isMedia('md+lg') && { 'top': 'calc(100vh - 210px)'}\n" +
    "		\"><div class=col ng-class=\"{ \n" +
    "				'col-offset-10 col-80 ': vm.isMedia('sm-portrait'),\n" +
    "				'col-offset-33 col-40 ': vm.isMedia('sm-landscape'),  \n" +
    "				'col-offset-35 col-30 ': vm.isMedia('lg+md')\n" +
    "			}\"><button class=\"button-block mobc-text-center\" style=\"margin-top: 0\" btn-icon=\"{{::vm.getResStr('send_btn_icon', true)}}\" btn-color=dark btn-style=outline ng-click=vm.service.gotoSlide(2)>{{::vm.getResStr('slide_2_next_btn_text')}}</button></div></div></div>");
  $templateCache.put("main_tpl_3.html",
    "<div style=\"margin-top: 10px\" class=mobc-border-top ng-class=\"{ \n" +
    "		'col-offset-5 col-90': vm.isMedia('sm'),\n" +
    "		'col-offset-30 col-40': vm.isMedia('lg+md')\n" +
    "	}\"><div style=\"margin-bottom: 0px\" class=list><div class=\"item item-input item-stacked-label\" style=\"margin-top: 0; padding-left: 0; padding-top: 5px; border: 0\" ng-class=\"{ 'has-error': !vm.service.person.sickness }\"><i class=\"icon ion-asterisk error\"></i> <span class=input-label style=\"padding: 0px; margin: 0px 0px 5px 5px\">{{::vm.getResStr('inp_sickness_label')}}</span><div style=\"padding-left: 5px; margin-left: 0px\" class=\"item item-input\" ng-model=vm.service.person.sickness modal-select is-media-cb=vm.isMedia(mediaQuery) ng-click=\"\" modal-template=modal-select-list modal-animation=fade-in-scale options=\"::vm.getResStr('inp_sickness_options')\" modal-class=ion-nifty-modal modal-style=\"\n" +
    "					isMediaCb( { mediaQuery: 'sm-portrait'} ) && {\n" +
    "						'width': '100%',\n" +
    "						'left': '0%',\n" +
    "						'right': '0%',\n" +
    "						'height': '250px',\n" +
    "						'top': '60px',\n" +
    "						'bottom': '0%'\n" +
    "					} ||\n" +
    "					isMediaCb( { mediaQuery: 'sm-landscape'} ) && {\n" +
    "						'width': '80%',\n" +
    "						'left': '10%',\n" +
    "						'right': '10%',\n" +
    "						'height': '250px',\n" +
    "						'top': '30px',\n" +
    "						'bottom': '0%'\n" +
    "					} ||\n" +
    "					isMediaCb( { mediaQuery: 'md'} ) && {\n" +
    "						'width': '90%',\n" +
    "						'left': '5%',\n" +
    "						'right': '5%',\n" +
    "						'height': '90%',\n" +
    "						'top': '5%',\n" +
    "						'bottom': '5%'\n" +
    "					} ||\n" +
    "					isMediaCb( { mediaQuery: 'lg'} ) && {\n" +
    "						'width': '80%',\n" +
    "						'left': '10%',\n" +
    "						'right': '10%',\n" +
    "						'height': '80%',\n" +
    "						'top': '10%',\n" +
    "						'bottom': '10%'\n" +
    "					}\n" +
    "				\" selected-class=\"\" selected-style=\"'background-color': '#ccc'\" modal-title=\"{{::vm.getResStr('inp_sickness_title')}}\" cancel-button=\"{{::vm.getResStr('inp_sickness_cancel')}}\" reset-button=\"{{::vm.getResStr('inp_sickness_reset')}}\" disable-reset=true use-collection-repeat=false is-cached=true is-preload=true><i class=\"icon ion-arrow-down-b placeholder-icon select\"></i><p>{{ vm.service.person.sickness.txt || vm.getResStr('inp_sickness_empty') }}</p><div class=option><h3>{{ option.txt }}</h3></div></div><p style=\"height: 10px\" class=mobc-border-bottom></p></div><div class=\"row mobc-border-bottom padding-vertical-0 padding-top-0\"><div class=\"col padding-0\"><div class=\"item item-input item-stacked-label\" style=\"margin-top: 0; padding-left: 0; padding-top: 5px; border: 0\" ng-class=\"{ 'has-error': !vm.service.person.sicknessFrom }\"><i class=\"icon ion-asterisk error\"></i> <span class=input-label style=\"padding: 0px; margin: 0px 0px 5px 5px\">{{::vm.getResStr('inp_sicknessFrom_label')}}</span><div style=\"padding-left: 5px; margin-left: 0px\" class=\"item item-input\" ng-model=vm.service.person.sicknessFrom modal-date is-media-cb=vm.isMedia(mediaQuery) ng-click=\"\" modal-class=ion-nifty-modal modal-animation=fade-in-scale is-cached=true is-preload=true is-close-backdrop=true is-close-on-select=false modal-title=\"{{ ::vm.getResStr('inp_sicknessFrom_title', true) }}\" week-names=\"{{ ::vm.getResStr('date_days_short', true) }}\" month-names=\"{{ ::vm.getResStr('date_months_long', true) }}\" date-format=\"{{ ::vm.getResStr('date_format_short', true) }}\" monday-first=\"{{ ::vm.getResStr('date_monday_first', true) }}\" cancel-button=\"{{ ::vm.getResStr('btn_cancel', true) }}\" today-button=\"{{ ::vm.getResStr('btn_today', true) }}\" select-button=\"{{ ::vm.getResStr('btn_select', true) }}\" min-date=now max-date=\"now and 6 weeks\" start-date=now exclude-weekday=0,6 exclude-date=\"{{ vm.service.holiday }}\" disable-reset=true on-date-changed1=\"vm.service.test2(day, month, year)\"><i class=\"icon ion-android-calendar placeholder-icon select\"></i><p>{{ vm.service.person.sicknessFrom || vm.getResStr('inp_sicknessFrom_empty') }}</p></div></div></div><div class=\"col col-5\"></div><div class=\"col padding-0\"><div class=\"item item-input item-stacked-label\" style=\"margin-top: 0; padding-left: 0; padding-top: 5px; border: 0\" ng-class=\"{ 'has-error': !vm.service.person.sicknessTo }\"><i class=\"icon ion-asterisk error\"></i> <span class=input-label style=\"padding: 0px; margin: 0px 0px 5px 5px\">{{::vm.getResStr('inp_sicknessTo_label')}}</span><div style=\"padding-left: 5px; margin-left: 0px\" class=\"item item-input\" ng-model=vm.service.person.sicknessTo modal-date is-media-cb=vm.isMedia(mediaQuery) ng-click=\"\" modal-class=ion-nifty-modal modal-animation=fade-in-scale is-cached=true is-preload=true is-close-backdrop=true is-close-on-select=false modal-title=\"{{ ::vm.getResStr('inp_sicknessTo_title', true) }}\" week-names=\"{{ ::vm.getResStr('date_days_short', true) }}\" month-names=\"{{ ::vm.getResStr('date_months_long', true) }}\" date-format=\"{{ ::vm.getResStr('date_format_short', true) }}\" monday-first=\"{{ ::vm.getResStr('date_monday_first', true) }}\" cancel-button=\"{{ ::vm.getResStr('btn_cancel', true) }}\" today-button=\"{{ ::vm.getResStr('btn_today', true) }}\" select-button=\"{{ ::vm.getResStr('btn_select', true) }}\" min-date=\"{{vm.service.person.sicknessFrom || now }}\" max-date=\"now and 6 weeks\" start-date=\"{{vm.service.person.sicknessFrom || now }}\" exclude-weekday=0,6 exclude-date=\"{{ vm.service.holiday }}\" disable-reset=true><i class=\"icon ion-android-calendar placeholder-icon select\"></i><p>{{ vm.service.person.sicknessTo || vm.getResStr('inp_sicknessTo_empty') }}</p></div></div></div><p style=\"height: 10px\" class=mobc-border-bottom></p></div><div class=\"item item-input item-stacked-label\" style=\"margin-top: 0; padding-left: 0; padding-top: 5px; border: 0\" ng-class=\"{'has-error': !vm.service.person.teacher.course}\"><i class=\"icon ion-asterisk error\"></i> <span class=input-label style=\"padding: 0px; margin: 0px 0px 5px 5px\">{{::vm.getResStr('inp_teacher_label')}}</span><div class=\"item item-input\" style=\"padding-left: 5px; margin-left: 0px\" ng-model=vm.service.person.teacher modal-select is-media-cb=vm.isMedia(mediaQuery) ng-click=\"\" modal-template=modal-select-list modal-animation=fade-in-scale options=\"::vm.getResStr('inp_teacher_options')\" modal-class=ion-nifty-modal modal-style=\"\n" +
    "					isMediaCb( { mediaQuery: 'sm'} ) && {\n" +
    "						'width': '100%',\n" +
    "						'left': '0%',\n" +
    "						'right': '0%',\n" +
    "						'height': '90%',\n" +
    "						'top': '5%',\n" +
    "						'bottom': '5%'\n" +
    "					} ||\n" +
    "					isMediaCb( { mediaQuery: 'md'} ) && {\n" +
    "						'width': '90%',\n" +
    "						'left': '5%',\n" +
    "						'right': '5%',\n" +
    "						'height': '90%',\n" +
    "						'top': '5%',\n" +
    "						'bottom': '5%'\n" +
    "					} ||\n" +
    "					isMediaCb( { mediaQuery: 'lg'} ) && {\n" +
    "						'width': '80%',\n" +
    "						'left': '10%',\n" +
    "						'right': '10%',\n" +
    "						'height': '80%',\n" +
    "						'top': '10%',\n" +
    "						'bottom': '10%'\n" +
    "					}\n" +
    "				\" selected-class=\"\" selected-style=\"'background-color': '#ccc'\" modal-title=\"{{ ::vm.getResStr('inp_teacher_title') }}\" cancel-button=\"{{ ::vm.getResStr('inp_teacher_cancel') }}\" reset-button=\"{{ ::vm.getResStr('inp_teacher_reset') }}\" disable-reset=false use-collection-repeat=false is-cached=true is-preload=true><i class=\"icon ion-arrow-down-b placeholder-icon select\"></i><p>{{ vm.service.person.teacher.course ? vm.service.person.teacher.course + ' | ' + vm.service.person.teacher.id + ' | ' + vm.service.person.teacher.lastName : vm.getResStr('inp_teacher_empty')}}</p><div class=option><h3>{{option.course}} | {{option.id}}</h3><h2>Lehrer: {{option.lastName}}</h2></div></div><p style=\"height: 10px\" class=mobc-border-bottom></p></div></div><div class=row style=\"position: fixed; \n" +
    "			height: 60px; \n" +
    "			left: 10px;\n" +
    "			width: auto;\n" +
    "			right: 10px\" ng-style=\"\n" +
    "			vm.isMedia('sm-landscape') && { 'top': 'calc(100vh - 120px)'} ||\n" +
    "			vm.isMedia('sm-portrait') && { 'top': 'calc(100vh - 180px)'} ||\n" +
    "			vm.isMedia('md+lg') && { 'top': 'calc(100vh - 210px)'}\n" +
    "		\"><div class=col ng-class=\"{ \n" +
    "				'col-offset-10 col-80 ': vm.isMedia('sm-portrait'),\n" +
    "				'col-offset-33 col-40 ': vm.isMedia('sm-landscape'),  \n" +
    "				'col-offset-35 col-30 ': vm.isMedia('lg+md')\n" +
    "			}\"><button class=\"button-block mobc-text-center\" style=\"margin-top: 0\" btn-icon=\"{{::vm.getResStr('send_btn_icon', true)}}\" btn-color=dark btn-style=outline ng-click=vm.service.gotoSlide(3)>{{::vm.getResStr('slide_3_next_btn_text')}}</button></div></div></div>");
  $templateCache.put("main_tpl_4.html",
    "<div style=\"margin-top: 10px\" class=mobc-border-top ng-class=\"{ \n" +
    "		'col-offset-5 col-90': vm.isMedia('sm'),\n" +
    "		'col-offset-30 col-40': vm.isMedia('lg-landscape+md-landscape'),\n" +
    "		'col-offset-20 col-60': vm.isMedia('lg-portrait+md-portrait')\n" +
    "	}\"><div style=\"font-size: 1.10em; \n" +
    "			line-height: 1.50em\"><span>Hiermit teilen Sie,</span> <span ng-if=\"vm.service.person.type.id === 1\"><b>{{vm.service.person.firstName}} {{vm.service.person.lastName}}</b>,<br>ihrem/ihrer Klassenlehrer/in Herrn/Frau <b>{{vm.service.person.teacher.lastName}}</b> mit, dass Sie in ihrer Klasse der</span> <span ng-if=\"vm.service.person.type.id !== 1\"><b>{{vm.service.person.senderName}},</b> dem/der Klassenlehrer/in</span> <span ng-if=\"vm.service.person.type.id === 2\">ihrer Tochter Herrn/Frau <b>{{vm.service.person.teacher.lastName}}</b> mit, dass ihre Tochter - <b>{{vm.service.person.firstName}} {{vm.service.person.lastName}}</b> - in ihrer Klasse der</span> <span ng-if=\"vm.service.person.type.id === 3\">ihres Sohnes Herrn/Frau <b>{{vm.service.person.teacher.lastName}}</b> mit, dass ihr Sohn - <b>{{vm.service.person.firstName}} {{vm.service.person.lastName}}</b> - in seiner Klasse der</span> <span ng-if=\"vm.service.person.type.id === 4\">ihrer Auszubildende Herrn/Frau <b>{{vm.service.person.teacher.lastName}}</b> mit, dass ihre Auszubildende - <b>{{vm.service.person.firstName}} {{vm.service.person.lastName}}</b> - in ihrer Klasse der</span> <span ng-if=\"vm.service.person.type.id === 5\">ihres Auszubildenden Herrn/Frau <b>{{vm.service.person.teacher.lastName}}</b> mit, dass ihr Auszubildender - <b>{{vm.service.person.firstName}} {{vm.service.person.lastName}}</b> - in seiner Klasse der</span> <span><b>{{vm.service.person.teacher.course}}</b></span> <span ng-if=\"vm.service.person.sicknessFrom !== vm.service.person.sicknessTo \">vom <b>{{vm.service.person.sicknessFrom}}</b> bis einschließlich zum <b>{{vm.service.person.sicknessTo}}</b> nicht am Unterricht teilnehmen</span> <span ng-if=\"vm.service.person.sicknessFrom === vm.service.person.sicknessTo \">am <b>{{vm.service.person.sicknessFrom}}</b> nicht am Unterricht teilnehmen</span> <span ng-if=\"vm.service.person.type.id === 1\">werden.<br>Sie endschuldigen sich für diesen Zeitraum mit</span> <span ng-if=\"vm.service.person.type.id === 2\">wird.<br>Sie endschuldigen ihre Tochter für diesen Zeitraum mit</span> <span ng-if=\"vm.service.person.type.id === 3\">wird.<br>Sie endschuldigen ihren Sohn für diesen Zeitraum mit</span> <span ng-if=\"vm.service.person.type.id === 4\">wird.<br>Sie endschuldigen ihre Auszubildende für diesen Zeitraum mit</span> <span ng-if=\"vm.service.person.type.id === 5\">wird.<br>Sie endschuldigen ihren Auszubildenden für diesen Zeitraum mit</span> <span ng-if=\"vm.service.person.sickness.id !== 3\">einer <b>{{vm.service.person.sickness.txt}}</b>.</span> <span ng-if=\"vm.service.person.sickness.id === 3\">einem <b>{{vm.service.person.sickness.txt}}</b>.</span></div><div class=row style=\"position: fixed; \n" +
    "			height: 60px; \n" +
    "			left: 10px;\n" +
    "			width: auto;\n" +
    "			right: 10px\" ng-style=\"\n" +
    "			vm.isMedia('sm-landscape') && { 'top': 'calc(100vh - 120px)'} ||\n" +
    "			vm.isMedia('sm-portrait') && { 'top': 'calc(100vh - 180px)'} ||\n" +
    "			vm.isMedia('md+lg') && { 'top': 'calc(100vh - 210px)'}\n" +
    "		\"><div class=col ng-class=\"{ \n" +
    "				'col-offset-10 col-80 ': vm.isMedia('sm-portrait'),\n" +
    "				'col-offset-33 col-40 ': vm.isMedia('sm-landscape'),  \n" +
    "				'col-offset-35 col-30 ': vm.isMedia('lg+md')\n" +
    "			}\"><button class=\"button-block mobc-text-center\" style=\"margin-top: 0\" btn-icon=\"{{::vm.getResStr('send_btn_icon', true)}}\" btn-color=dark btn-style=outline ng-click=vm.service.gotoSlide(1)>{{::vm.getResStr('slide_1_next_btn_text')}}</button></div></div></div>");
  $templateCache.put("sickness.html",
    "<ion-view view-title=\"{{::vm.getResStr('title')}}\" cache-view=true hide-back-button=false hide-nav-bar=true><ion-content delegate-handle=sickness padding=false scroll=false><div show-when=sm+md+lg><ng-include src=\"::vm.getResStr('content_all_template', true)\"></ng-include></div></ion-content></ion-view>");
  $templateCache.put("sickness2.html",
    "<ion-view view-title=\"{{::vm.getResStr('title')}}\" cache-view=true hide-back-button=false hide-nav-bar=false><ion-content class=has-footer delegate-handle=sickness2 padding=true scroll=true direction=y overflow-scroll=false locking=true has-bouncing=true scroll-event-interval=50 scrollbar-x=true scrollbar-y=true start-x=0 start-y=0 on-scroll=vm.onScroll() on-scroll-complete=vm.onScrollComplete()><div show-when=sm+md+lg><ng-include src=\"::vm.getResStr('content_all_template', true)\"></ng-include></div></ion-content><ion-footer-bar show-when=sm+md+lg ng-class=\"::vm.getResStr('footerbar_classname', true)\" style=\"{{::vm.getResStr('footerbar_style', true) }}\"><div ng-hide=vm.service.ionic.sideMenu.aside ng-switch=\"::vm.getResStr('footer_type', true)\"><a ng-switch-when=text-link href=\"{{::vm.getResStr('footer_link', true)}}\" target=_blank><p ng-class=\"::vm.getResStr('footer_classname', true)\" style=\"{{::vm.getResStr('footer_style', true)}}\">{{::vm.getResStr('footer_content')}}</p></a><p ng-switch-when=text ng-class=\"::vm.getResStr('footer_classname', true)\" style=\"{{::vm.getResStr('footer_style', true)}}\">{{::vm.getResStr('footer_content')}}</p><a ng-switch-when=logo-link href=\"{{::vm.getResStr('footer_link', true)}}\" target=_blank><img ng-src=\"{{::vm.getResStr('footer_content', true)}}\" ng-class=\"::vm.getResStr('footer_classname', true)\" style=\"{{::vm.getResStr('footer_style', true)}}\" alt=\"mobC\"></a> <img ng-switch-when=logo ng-src=\"{{::vm.getResStr('footer_content', true)}}\" ng-class=\"::vm.getResStr('footer_classname', true)\" style=\"{{::vm.getResStr('footer_style', true)}}\" alt=\"mobC\"></div></ion-footer-bar></ion-view>");
  $templateCache.put("sickness2_tpl.html",
    "<div>Content here ....</div>");
  $templateCache.put("sickness3.html",
    "<ion-view view-title=\"{{::vm.getResStr('title')}}\" cache-view=true hide-back-button=false hide-nav-bar=false><ion-content class=has-footer delegate-handle=sickness3 padding=true scroll=true direction=y overflow-scroll=false locking=true has-bouncing=true scroll-event-interval=50 scrollbar-x=true scrollbar-y=true start-x=0 start-y=0 on-scroll=vm.onScroll() on-scroll-complete=vm.onScrollComplete()><div show-when=sm+md+lg><ng-include src=\"::vm.getResStr('content_all_template', true)\"></ng-include></div></ion-content><ion-footer-bar show-when=sm+md+lg ng-class=\"::vm.getResStr('footerbar_classname', true)\" style=\"{{::vm.getResStr('footerbar_style', true) }}\"><div ng-hide=vm.service.ionic.sideMenu.aside ng-switch=\"::vm.getResStr('footer_type', true)\"><a ng-switch-when=text-link href=\"{{::vm.getResStr('footer_link', true)}}\" target=_blank><p ng-class=\"::vm.getResStr('footer_classname', true)\" style=\"{{::vm.getResStr('footer_style', true)}}\">{{::vm.getResStr('footer_content')}}</p></a><p ng-switch-when=text ng-class=\"::vm.getResStr('footer_classname', true)\" style=\"{{::vm.getResStr('footer_style', true)}}\">{{::vm.getResStr('footer_content')}}</p><a ng-switch-when=logo-link href=\"{{::vm.getResStr('footer_link', true)}}\" target=_blank><img ng-src=\"{{::vm.getResStr('footer_content', true)}}\" ng-class=\"::vm.getResStr('footer_classname', true)\" style=\"{{::vm.getResStr('footer_style', true)}}\" alt=\"mobC\"></a> <img ng-switch-when=logo ng-src=\"{{::vm.getResStr('footer_content', true)}}\" ng-class=\"::vm.getResStr('footer_classname', true)\" style=\"{{::vm.getResStr('footer_style', true)}}\" alt=\"mobC\"></div></ion-footer-bar></ion-view>");
  $templateCache.put("sickness3_tpl.html",
    "<div>Content here ....</div>");
  $templateCache.put("sickness_tpl.html",
    "<ion-slide-box ion-wizard show-pager=true><ion-slide ion-wizard-step class=has-header1 style1=\"height: {{ vm.service.data.getFullHeight() -100 }}px;\" ng-style=\"{'height' : vm.service.data.getFullHeight() -000 + 'px'}\"><ion-scroll has-bouncing=true ng-style=\"{'height' : vm.service.data.getFullHeight() -50 + 'px'}\"><form name=login novalidate><div class=card style=\"margin-bottom: 10px\"><div class=\"item item-divider item-text-wrap\">{{::vm.getResStr('login_desc_text')}}</div><div class=item><div contenteditable=true ng-disabled=true>Text</div><label class=\"item item-input item-stacked-label label-border\" data-ng-class=\"{'has-error': !login.user.$valid}\"><span class=input-label>{{::vm.getResStr('name_inp_1')}}</span> <input ng-virtual-keyboard=\"{\n" +
    "                          kt: 'US International', \n" +
    "                          forcePosition: 'bottom', \n" +
    "                          showInMobile: true, \n" +
    "                          numberPad: false, \n" +
    "                          showVersion: false, \n" +
    "                          size: 1,  \n" +
    "                          relative: false,  \n" +
    "                          sizeAdj: false\n" +
    "                        }\" readonly ng-model=data.test1 enter-is-tab2=1> <i class=\"icon ion-alert-circled error\"></i></label></div><div class=item><label class=\"item item-input item-stacked-label label-border\" data-ng-class=\"{'has-error': !login.pw.$valid}\"><span class=input-label>{{::vm.getResStr('name_inp_2')}}</span> <input ng-virtual-keyboard=\"{kt: 'US International', forcePosition: 'bottom', showInMobile: true, numberPad: false, showVersion: false, size: 1,  relative: false,  sizeAdj: false}\" readonly2=true type=textarea ng-model=data.test2 enter-is-tab2=2> <i class=\"icon ion-alert-circled error\"></i></label></div><div class=item><label class=\"item item-input item-stacked-label label-border\" data-ng-class=\"{'has-error': !login.pw.$valid}\"><span class=input-label>{{::vm.getResStr('name_inp_3')}}</span> <input ng-virtual-keyboard=\"{kt: 'US International', forcePosition: 'bottom', showInMobile: true, numberPad: false, showVersion: false, size: 1,  relative: false,  sizeAdj: false}\" readonly3 show-inmobile=true ng-model=data.test3 enter-is-tab=3> <i class=\"icon ion-alert-circled error\"></i></label></div><div class=item><label class=\"item item-input item-stacked-label label-border\" data-ng-class=\"{'has-error': !login.pw.$valid}\"><span class=input-label>{{::vm.getResStr('name_inp_4')}}</span> <input ng-virtual-keyboard=\"{kt: 'US International', forcePosition: 'top', showInMobile: true, numberPad: false, showVersion: false, size: 1,  relative: false,  sizeAdj: false}\" readonly ng-model=data.test4 enter-is-tab=4> <i class=\"icon ion-alert-circled error\"></i></label></div><div class=item><label class=\"item item-input item-stacked-label label-border\" data-ng-class=\"{'has-error': !login.pw.$valid}\"><span class=input-label>{{::vm.getResStr('pw_inp_text')}}</span> <input ng-virtual-keyboard=\"{kt: 'US International', forcePosition: 'top', showInMobile: true, numberPad: false, showVersion: false, size: 1,  relative: false,  sizeAdj: false}\" readonly ng-model=data.test5 enter-is-tab=5> <i class=\"icon ion-alert-circled error\"></i></label></div><div class=item><label class=\"item item-input item-stacked-label label-border\" data-ng-class=\"{'has-error': !login.pw.$valid}\"><span class=input-label>{{::vm.getResStr('pw_inp_text')}}</span> <input ng-virtual-keyboard=\"{kt: 'US International', forcePosition: 'top', showInMobile: true, numberPad: false, showVersion: false, size: 1,  relative: false,  sizeAdj: false}\" readonly ng-model=data.test6 enter-is-tab=6> <i class=\"icon ion-alert-circled error\"></i></label></div><div class=item><label class=\"item item-input item-stacked-label label-border\" data-ng-class=\"{'has-error': !login.pw.$valid}\"><span class=input-label>{{::vm.getResStr('pw_inp_text')}}</span> <input ng-virtual-keyboard=\"{kt: 'US International', forcePosition: 'top', showInMobile: true, numberPad: false, showVersion: false, size: 1,  relative: false,  sizeAdj: false}\" readonly ng-model=data.test7> <i class=\"icon ion-alert-circled error\"></i></label></div></div></form></ion-scroll></ion-slide><ion-slide ion-wizard-step condition=step2.name class=has-header1 style1=\"height: {{ vm.service.data.getFullHeight() -100 }}px;\" ng-style=\"{'height' : vm.service.data.getFullHeight() -000 + 'px'}\"><ion-scroll ng-style1=\"{'height' : '100%'}\" ng-style=\"{'height' : vm.service.data.getFullHeight() +000 + 'px'}\"><div class=\"list list-inset\"><label class=\"item item-input\"><i class=\"icon ion-search placeholder-icon\"></i> <input ng-model=searchAllInput placeholder=Search1></label></div><div class=\"list list-inset\"><label class=\"item item-input\"><i class=\"icon ion-search placeholder-icon\"></i> <input ng-model=searchAllInput ng-keyup=searchAll(searchAllInput) placeholder=Search2></label></div><div class=\"list list-inset\"><label class=\"item item-input\"><i class=\"icon ion-search placeholder-icon\"></i> <input ng-model=searchAllInput ng-keyup=searchAll(searchAllInput) placeholder=Search3></label></div><div class=\"list list-inset\"><label class=\"item item-input\"><i class=\"icon ion-search placeholder-icon\"></i> <input ng-model=searchAllInput ng-keyup=searchAll(searchAllInput) placeholder=Search4></label></div><div class=\"list list-inset\"><label class=\"item item-input\"><i class=\"icon ion-search placeholder-icon\"></i> <input ng-model=searchAllInput ng-keyup=searchAll(searchAllInput) placeholder=Search5></label></div></ion-scroll></ion-slide><ion-slide ion-wizard-step class=has-header><div class=row><div class=\"col col-center\"><h3 class=positive>Thanks for completing the wizard!</h3><p>You can start using the app</p></div></div></ion-slide></ion-slide-box>");
  $templateCache.put("start.html",
    "<div ng-controller=controllerStart data-start={{vm.gotoHome()}}>start</div>");
  $templateCache.put("welcome.html",
    "<ion-view view-title=\"{{::vm.getResStr('title')}}\" cache-view=true hide-back-button=false hide-nav-bar=false><ion-content class=has-footer delegate-handle=welcome padding=true scroll=true direction=y overflow-scroll=false locking=true has-bouncing=true scroll-event-interval=50 scrollbar-x=true scrollbar-y=true start-x=0 start-y=0 on-scroll=vm.onScroll() on-scroll-complete=vm.onScrollComplete()><div show-when=sm+md+lg><ng-include src=\"::vm.getResStr('content_all_template', true)\"></ng-include></div></ion-content><ion-footer-bar show-when=sm+md+lg ng-class=\"::vm.getResStr('footerbar_classname', true)\" style=\"{{::vm.getResStr('footerbar_style', true) }}\"><div ng-hide=vm.service.ionic.sideMenu.aside ng-switch=\"::vm.getResStr('footer_type', true)\"><a ng-switch-when=text-link href=\"{{::vm.getResStr('footer_link', true)}}\" target=_blank><p ng-class=\"::vm.getResStr('footer_classname', true)\" style=\"{{::vm.getResStr('footer_style', true)}}\">{{::vm.getResStr('footer_content')}}</p></a><p ng-switch-when=text ng-class=\"::vm.getResStr('footer_classname', true)\" style=\"{{::vm.getResStr('footer_style', true)}}\">{{::vm.getResStr('footer_content')}}</p><a ng-switch-when=logo-link href=\"{{::vm.getResStr('footer_link', true)}}\" target=_blank><img ng-src=\"{{::vm.getResStr('footer_content', true)}}\" ng-class=\"::vm.getResStr('footer_classname', true)\" style=\"{{::vm.getResStr('footer_style', true)}}\" alt=\"mobC\"></a> <img ng-switch-when=logo ng-src=\"{{::vm.getResStr('footer_content', true)}}\" ng-class=\"::vm.getResStr('footer_classname', true)\" style=\"{{::vm.getResStr('footer_style', true)}}\" alt=\"mobC\"></div></ion-footer-bar></ion-view>");
  $templateCache.put("welcome_tpl.html",
    "<div>Content here ....</div>");
}]);
