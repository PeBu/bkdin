
'use strict';
var app;
(function (app) {
    var models;
    (function (models) {
        var User = (function () {
            function User(field) {
                this.isLogin = (field && typeof field.isLogin !== "undefined") ? field.isLogin : false;
                this.type = field && field.type || 0;
                this.name = field && field.name || "";
                this.pw = field && field.pw || "";
            }
            return User;
        })();
        models.User = User;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

'use strict';
var app;
(function (app) {
    var models_wrapper;
    (function (models_wrapper) {
        var model;
        (function (model) {
            model.User = app.models.User;
        })(model = models_wrapper.model || (models_wrapper.model = {}));
        function getModelByName(name) {
            switch (name.toLowerCase()) {
                case 'user':
                    return model.User;
                    break;
                default:
                    return null;
                    break;
            }
        }
        models_wrapper.getModelByName = getModelByName;
    })(models_wrapper = app.models_wrapper || (app.models_wrapper = {}));
})(app || (app = {}));
