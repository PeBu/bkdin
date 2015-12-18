
'use strict';
var app;
(function (_app) {
    var datas;
    (function (datas) {
        datas.app = {
            "global": {
                "name": "global",
                "pages": {
                    "menu": "",
                    "start": "main",
                    "home": "main",
                    "welcome": "test",
                    "login": "",
                    "logout": "logout",
                    "register": "",
                    "forgotten": ""
                },
                "views": {
                    "logout": {
                        "type": "virtual",
                        "authenticate": 0,
                        "container": [
                            ""
                        ]
                    },
                    "welcome": {
                        "type": "view",
                        "authenticate": 0,
                        "container": [
                            ""
                        ]
                    },
                    "sickness": {
                        "type": "view",
                        "authenticate": 0,
                        "container": [
                            ""
                        ]
                    },
                    "sickness2": {
                        "type": "view",
                        "authenticate": 0,
                        "container": [
                            ""
                        ]
                    },
                    "sickness3": {
                        "type": "view",
                        "authenticate": 0,
                        "container": [
                            ""
                        ]
                    },
                    "home": {
                        "type": "view",
                        "authenticate": 0,
                        "container": [
                            ""
                        ]
                    },
                    "main": {
                        "type": "view",
                        "authenticate": 0,
                        "container": [
                            ""
                        ]
                    }
                }
            },
            "provider": {
                "name": "provider",
                "http": {
                    "withCredentials": false
                },
                "ionic": {
                    "views": {
                        "transition": "platform",
                        "maxCache": 10,
                        "forwardCache": false
                    },
                    "templates": {
                        "maxPrefetch": 30
                    },
                    "backButton": {
                        "icon": "ion-arrow-left-c",
                        "text": "zurück",
                        "previousTitleText": true
                    },
                    "navBar": {
                        "alignTitle": "center",
                        "positionPrimaryButtons": "left",
                        "positionSecondaryButtons": "right"
                    },
                    "tabs": {
                        "style": "standard",
                        "position": "bottom"
                    }
                },
                "mobc": {
                    "name": "bkdin",
                    "version": "0.0.1",
                    "title": "Bkdin",
                    "desc": "Ionic Project bkdin",
                    "id": "AF6AD8ED-9729-44AA-B0A8-9440FE13175D"
                },
                "appLoader": {
                    "serverRoot": "http://www.mobc.de",
                    "dataPath": "bkdin",
                    "serverPath": "bkdin"
                }
            }
        };
    })(datas = _app.datas || (_app.datas = {}));
})(app || (app = {}));

'use strict';
var app;
(function (app) {
    var datas;
    (function (datas) {
        datas.languages = {
            "app-global": {
                "name": "app-global",
                "de": {
                    "version": "0.0.1",
                    "title": "Bkdin",
                    "desc": "Ionic Project bkdin",
                    "id": "AF6AD8ED-9729-44AA-B0A8-9440FE13175D",
                    "headerbar_style": "",
                    "headerbar_classname": "bar-mobc",
                    "header_type": "none",
                    "header_content": "",
                    "header_classname": "",
                    "header_style": "",
                    "header_link": "",
                    "navbar_style": "",
                    "navbar_classname": "bar-mobc",
                    "nav_type": "none",
                    "nav_content": "",
                    "nav_classname": "",
                    "nav_style": "",
                    "nav_link": "",
                    "footerbar_style": "",
                    "footerbar_classname": "bar-mobc",
                    "footer_type": "logo",
                    "footer_content": "img/logo.png",
                    "footer_classname": "",
                    "footer_style": "width: 160px; height:35px; right: 15px; position:absolute;",
                    "footer_link": "",
                    "date_months_short": "Jan, Feb, Mrz, Apr, Mai, Jun, Jul, Aug, Sep, Okt, Novr, Dez",
                    "date_months_long": "Januar, Februar, März, April, Mai, Juni, July, August, September, Oktober, November, Dezember",
                    "date_days_short": "So, Mo, Di, Mi, Do, Fr, Sa",
                    "date_days_long": "Sontag, Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag",
                    "date_monday_first": true,
                    "date_format_short": "dd.MM.yyyy",
                    "date_format_long": "dd.MM.yyyy",
                    "btn_cancel": "Abbruch",
                    "btn_today": "Heute",
                    "btn_reset": "Leeren",
                    "btn_select": "Wählen"
                },
                "en": {}
            },
            "home": {
                "name": "home",
                "de": {
                    "title": "home",
                    "menu_title": "home",
                    "headerbar_style": "",
                    "headerbar_classname": "",
                    "header_html": "",
                    "header_template": "",
                    "footerbar_style": "",
                    "footerbar_classname": "",
                    "footer_html": "",
                    "footer_template": "",
                    "content_style": "",
                    "content_classname": "",
                    "content_all_html": "Ihr Inhalt hier ...",
                    "content_all_template": "home_tpl.html",
                    "background_img": "img/BKDIN_logo.png",
                    "background_style": "width:320px; height:52px;z-index: 1000",
                    "person_desc_text": "Persönliche Angaben",
                    "name_inp_text": "Name",
                    "name_inp_placeholder": "Name",
                    "name_inp_type": "text",
                    "name_inp_minlength": 0,
                    "name_inp_maxlength": 0,
                    "pw_inp_text": "Passwort",
                    "pw_inp_placeholder": "Ihr Passwort",
                    "pw_inp_type": "password",
                    "pw_inp_minlength": 5,
                    "pw_inp_maxlength": 0,
                    "slides": [
                        {
                            "name": "home_tpl_1",
                            "icon": "ion-home"
                        },
                        {
                            "name": "home_tpl_2",
                            "icon": "ion-person"
                        },
                        {
                            "name": "home_tpl_3",
                            "icon": "ion-email"
                        },
                        {
                            "name": "home_tpl_4",
                            "icon": "ion-model-s"
                        },
                        {
                            "name": "home_tpl_5",
                            "icon": "ion-ios-game-controller-b"
                        }
                    ]
                }
            },
            "main": {
                "name": "main",
                "de": {
                    "title": "main",
                    "menu_title": "main",
                    "headerbar_style": "",
                    "headerbar_classname": "",
                    "header_html": "",
                    "header_template": "",
                    "footerbar_style": "",
                    "footerbar_classname": "",
                    "footer_html": "",
                    "footer_template": "",
                    "content_style": "",
                    "content_classname": "",
                    "content_all_html": "Ihr Inhalt hier ...",
                    "content_all_template": "main_tpl.html",
                    "inp_type_label": "hiermit melde ich ...",
                    "inp_type_empty": "bitte auswählen ...",
                    "inp_type_title": "hiermit melde ich ...",
                    "inp_type_cancel": "Abbruch",
                    "inp_type_reset": "Leeren",
                    "inp_type_options": [
                        {
                            "id": 1,
                            "txt": "mich als Volljähriger selbst"
                        },
                        {
                            "id": 2,
                            "txt": "meine Tochter"
                        },
                        {
                            "id": 3,
                            "txt": "meinen Sohn"
                        },
                        {
                            "id": 4,
                            "txt": "meine Auszubildende"
                        },
                        {
                            "id": 5,
                            "txt": "meinen Auszubildenden"
                        }
                    ],
                    "inp_teacher_label": "Klasse / Lehrer",
                    "inp_teacher_empty": "bitte Kurs und Lehrer auswählen ...",
                    "inp_teacher_title": "Lehrer auswählen",
                    "inp_teacher_cancel": "Abbruch",
                    "inp_teacher_reset": "Leeren",
                    "inp_teacher_options": [
                        {
                            "course": "EBFE1",
                            "id": "NOW",
                            "lastName": "Nobis-Wonner"
                        },
                        {
                            "course": "EBFT1",
                            "id": "GK",
                            "lastName": "Gappa"
                        },
                        {
                            "course": "EBSO1",
                            "id": "REI",
                            "lastName": "Alders-Reinhart"
                        },
                        {
                            "course": "EBSU1",
                            "id": "WEY",
                            "lastName": "Weyland"
                        },
                        {
                            "course": "SFEM1",
                            "id": "LI",
                            "lastName": "Lindemann"
                        },
                        {
                            "course": "SFEU1",
                            "id": "HM",
                            "lastName": "Holl"
                        },
                        {
                            "course": "SFHUT",
                            "id": "WES",
                            "lastName": "Wesky-Behmenburg"
                        },
                        {
                            "course": "SFOB1",
                            "id": "VOE",
                            "lastName": "van Oepen"
                        },
                        {
                            "course": "SFOO1",
                            "id": "FS",
                            "lastName": "Feldhaus"
                        },
                        {
                            "course": "SFOO2",
                            "id": "TK",
                            "lastName": "Thein-Kruppa"
                        },
                        {
                            "course": "SFOO4",
                            "id": "VOE",
                            "lastName": "van Oepen"
                        },
                        {
                            "course": "SFOU1",
                            "id": "HC",
                            "lastName": "Heinz"
                        },
                        {
                            "course": "SFOU3",
                            "id": "HH",
                            "lastName": "Hermesmeier"
                        },
                        {
                            "course": "SFOU4",
                            "id": "ES",
                            "lastName": "Eichholz"
                        },
                        {
                            "course": "SFOU5",
                            "id": "WM",
                            "lastName": "Wolf"
                        },
                        {
                            "course": "SGEM1",
                            "id": "ALU",
                            "lastName": "Altmann"
                        },
                        {
                            "course": "SGEU1",
                            "id": "KLA",
                            "lastName": "Klasen"
                        },
                        {
                            "course": "SGGU1",
                            "id": "HM",
                            "lastName": "Holl"
                        },
                        {
                            "course": "SHBU1",
                            "id": "DU",
                            "lastName": "Dopmeyer"
                        },
                        {
                            "course": "SHBU2",
                            "id": "WG",
                            "lastName": "Wingenfeld"
                        },
                        {
                            "course": "SKIO1",
                            "id": "JO",
                            "lastName": "Jostes"
                        },
                        {
                            "course": "SKITM",
                            "id": "JO",
                            "lastName": "Jostes"
                        },
                        {
                            "course": "SKIU1",
                            "id": "KIL",
                            "lastName": "Kilbinger"
                        },
                        {
                            "course": "TAMA1",
                            "id": "AJ",
                            "lastName": "Ahlmann"
                        },
                        {
                            "course": "TAMA2",
                            "id": "AJ",
                            "lastName": "Ahlmann"
                        },
                        {
                            "course": "TAMO1",
                            "id": "AJ",
                            "lastName": "Ahlmann"
                        },
                        {
                            "course": "TAMO2",
                            "id": "AJ",
                            "lastName": "Ahlmann"
                        },
                        {
                            "course": "TAMU1",
                            "id": "AJ",
                            "lastName": "Ahlmann"
                        },
                        {
                            "course": "TAMU2",
                            "id": "AJ",
                            "lastName": "Ahlmann"
                        },
                        {
                            "course": "TBGF1",
                            "id": "KM",
                            "lastName": "Kluitmann"
                        },
                        {
                            "course": "TFAA1",
                            "id": "KM",
                            "lastName": "Kluitmann"
                        },
                        {
                            "course": "TFAM1",
                            "id": "KM",
                            "lastName": "Kluitmann"
                        },
                        {
                            "course": "TFAO1",
                            "id": "KM",
                            "lastName": "Kluitmann"
                        },
                        {
                            "course": "TFAU1",
                            "id": "KM",
                            "lastName": "Kluitmann"
                        },
                        {
                            "course": "TFOB1",
                            "id": "LEH",
                            "lastName": "Dr.Lehmann"
                        },
                        {
                            "course": "TFOO1",
                            "id": "LEH",
                            "lastName": "Dr.Lehmann"
                        },
                        {
                            "course": "TFOU1",
                            "id": "LEH",
                            "lastName": "Dr.Lehmann"
                        },
                        {
                            "course": "TFOU1",
                            "id": "WITT",
                            "lastName": "Witte"
                        },
                        {
                            "course": "TFOU2",
                            "id": "LEH",
                            "lastName": "Dr.Lehmann"
                        },
                        {
                            "course": "TFOU2",
                            "id": "WITT",
                            "lastName": "Witte"
                        },
                        {
                            "course": "THBO1",
                            "id": "AE",
                            "lastName": "Atlas"
                        },
                        {
                            "course": "THBO1",
                            "id": "KW",
                            "lastName": "Kock-Wingenfeld"
                        },
                        {
                            "course": "THBU1",
                            "id": "FEN",
                            "lastName": "Fengels"
                        },
                        {
                            "course": "THBU2",
                            "id": "BY",
                            "lastName": "Beyer"
                        },
                        {
                            "course": "WBKM1",
                            "id": "FH",
                            "lastName": "Fielenbach"
                        },
                        {
                            "course": "WBKM2",
                            "id": "ROE",
                            "lastName": "Roeper"
                        },
                        {
                            "course": "WBKU1",
                            "id": "FH",
                            "lastName": "Fielenbach"
                        },
                        {
                            "course": "WBKU2",
                            "id": "TA",
                            "lastName": "Tamse-Möller"
                        },
                        {
                            "course": "WEKM2",
                            "id": "GB",
                            "lastName": "Grube"
                        },
                        {
                            "course": "WEKO1",
                            "id": "ROE",
                            "lastName": "Roeper"
                        },
                        {
                            "course": "WEKU3",
                            "id": "GB",
                            "lastName": "Grube"
                        },
                        {
                            "course": "WFAM1",
                            "id": "WA",
                            "lastName": "Wasen"
                        },
                        {
                            "course": "WFAO1",
                            "id": "SOT",
                            "lastName": "Scholten"
                        },
                        {
                            "course": "WFAU1",
                            "id": "SD",
                            "lastName": "Sauerwald"
                        },
                        {
                            "course": "WFAU1",
                            "id": "TRS",
                            "lastName": "Dr. Torres Galarza"
                        },
                        {
                            "course": "WGWM1",
                            "id": "STRA",
                            "lastName": "Straßburger"
                        },
                        {
                            "course": "WGWM2",
                            "id": "OT",
                            "lastName": "Otte"
                        },
                        {
                            "course": "WHHO1",
                            "id": "RUE",
                            "lastName": "Rüdel"
                        },
                        {
                            "course": "WHHO2",
                            "id": "WB",
                            "lastName": "Weber"
                        },
                        {
                            "course": "WHHO3",
                            "id": "PF",
                            "lastName": "Piegsa"
                        },
                        {
                            "course": "WHHU1",
                            "id": "RUE",
                            "lastName": "Rüdel"
                        },
                        {
                            "course": "WHHU2",
                            "id": "WE",
                            "lastName": "Dr.Weiß"
                        },
                        {
                            "course": "WHHU3",
                            "id": "KAST",
                            "lastName": "Kastner"
                        },
                        {
                            "course": "WHHU4",
                            "id": "STEN",
                            "lastName": "Stenger"
                        },
                        {
                            "course": "WHHU5",
                            "id": "BK",
                            "lastName": "Beck"
                        },
                        {
                            "course": "WHHU6",
                            "id": "PF",
                            "lastName": "Piegsa"
                        }
                    ],
                    "inp_sickness_label": "Art der Entschuldigung",
                    "inp_sickness_empty": "bitte Entschuldigungsart auswählen ...",
                    "inp_sickness_title": "Entschuldigsungart wählen",
                    "inp_sickness_cancel": "Abbruch",
                    "inp_sickness_reset": "Leeren",
                    "inp_sickness_options": [
                        {
                            "id": 1,
                            "txt": "Entschuldigung"
                        },
                        {
                            "id": 2,
                            "txt": "Arbeitsunfähigkeitsbescheinigung"
                        },
                        {
                            "id": 3,
                            "txt": "Attest"
                        }
                    ],
                    "inp_sicknessFrom_title": "Krank vom",
                    "inp_sicknessFrom_label": "Krank vom",
                    "inp_sicknessFrom_empty": "Krank vom ...",
                    "inp_sicknessTo_title": "Krank bis zum",
                    "inp_sicknessTo_label": "Krank bis",
                    "inp_sicknessTo_empty": "Krank bis ...",
                    "inp_lastName_label": "Name",
                    "inp_lastName_empty": "bitte Namen eingeben",
                    "inp_firstName_label": "Vorname",
                    "inp_firstName_empty": "bitte Vornamen eingeben",
                    "inp_senderName_label": "Name des/der Krankmeldenden",
                    "inp_senderName_empty": "Name des/der Krankmeldenden",
                    "inp_senderMail_label": "Email Adresse",
                    "inp_senderMail_empty": "Ihre Email Adresse",
                    "slide_1_title": "Online Krankmeldung",
                    "slide_1_icon": "ion-home",
                    "slide_1_next_btn_text": "Einverstanden & weiter",
                    "slide_1_bg_img": "img/logo2.png",
                    "slide_1_bg_style": "",
                    "slide_1_txt_welcome": "Willkommen zur mobilen Version der Krankmeldung des Berufskolleg Dinslaken",
                    "slide_1_txt_note": "Hinweise zur Online-Krankmeldung:",
                    "slide_1_txt_note_1": "Diese Online-Krankmeldung ersetzt keine schriftliche Entschuldigung. Sie ersetzt nur den Anruf im Schulbüro.",
                    "slide_1_txt_note_2": "Mit dem \"Absenden\" der Daten erklären Sie sich einverstanden, dass Ihre Eingaben elektronisch verarbeitet und als E-Mail an den Klassenlehrer versandt werden.",
                    "slide_2_title": "main_2",
                    "slide_2_icon": "ion-person",
                    "slide_2_next_btn_text": "weiter ...",
                    "slide_3_title": "main_3",
                    "slide_3_icon": "ion-compose",
                    "slide_3_next_btn_text": "weiter ...",
                    "slide_4_title": "main_4",
                    "slide_4_icon": "ion-share",
                    "slide_4_next_btn_text": "weiter ..."
                }
            },
            "sickness": {
                "name": "sickness",
                "de": {
                    "title": "sickness",
                    "menu_title": "sickness",
                    "headerbar_style": "",
                    "headerbar_classname": "",
                    "header_html": "",
                    "header_template": "",
                    "footerbar_style": "",
                    "footerbar_classname": "",
                    "footer_html": "",
                    "footer_template": "",
                    "content_style": "",
                    "content_classname": "",
                    "content_all_html": "Ihr Inhalt hier ...",
                    "content_all_template": "sickness_tpl.html"
                }
            },
            "sickness2": {
                "name": "sickness2",
                "de": {
                    "title": "sickness2",
                    "menu_title": "sickness2",
                    "headerbar_style": "",
                    "headerbar_classname": "",
                    "header_html": "",
                    "header_template": "",
                    "footerbar_style": "",
                    "footerbar_classname": "",
                    "footer_html": "",
                    "footer_template": "",
                    "content_style": "",
                    "content_classname": "",
                    "content_all_html": "Ihr Inhalt hier ...",
                    "content_all_template": "sickness2_tpl.html"
                }
            },
            "sickness3": {
                "name": "sickness3",
                "de": {
                    "title": "sickness3",
                    "menu_title": "sickness3",
                    "headerbar_style": "",
                    "headerbar_classname": "",
                    "header_html": "",
                    "header_template": "",
                    "footerbar_style": "",
                    "footerbar_classname": "",
                    "footer_html": "",
                    "footer_template": "",
                    "content_style": "",
                    "content_classname": "",
                    "content_all_html": "Ihr Inhalt hier ...",
                    "content_all_template": "sickness3_tpl.html"
                }
            },
            "welcome": {
                "name": "welcome",
                "de": {
                    "title": "welcome",
                    "menu_title": "welcome",
                    "headerbar_style": "",
                    "headerbar_classname": "",
                    "header_html": "",
                    "header_template": "",
                    "footerbar_style": "",
                    "footerbar_classname": "",
                    "footer_html": "",
                    "footer_template": "",
                    "content_style": "",
                    "content_classname": "",
                    "content_all_html": "Ihr Inhalt hier ...",
                    "content_all_template": "welcome_tpl.html"
                }
            }
        };
    })(datas = app.datas || (app.datas = {}));
})(app || (app = {}));

'use strict';
var app;
(function (app) {
    var datas;
    (function (datas) {
        datas.menus = {
            "app-modals": {
                "name": "app-modals",
                "visibility": 0,
                "showWhen": "",
                "accordion": true,
                "icon": "ion-ionic",
                "items": {
                    "list": []
                }
            },
            "app-views": {
                "name": "app-views",
                "visibility": 0,
                "showWhen": "",
                "accordion": true,
                "icon": "ion-ionic",
                "items": {
                    "list": []
                }
            }
        };
    })(datas = app.datas || (app.datas = {}));
})(app || (app = {}));
