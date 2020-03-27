require("./common/manifest.js")
require("./common/vendor.js")
require("./common/manifest.js")
require("./common/vendor.js")
global.webpackJsonpMpvue([9],{

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_api__ = __webpack_require__(44);




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */].mpType = 'app';
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.api = new __WEBPACK_IMPORTED_MODULE_2__utils_api__["a" /* api */]();

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(69);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(68)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a28a2498", Component.options)
  } else {
    hotAPI.reload("data-v-a28a2498", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 68:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_login__ = __webpack_require__(70);


var util = new __WEBPACK_IMPORTED_MODULE_0__utils_login__["a" /* login */]();
/* harmony default export */ __webpack_exports__["a"] = ({
  created: function created() {
    util.wxLogin();
    util.getPhotoScope();
  },
  getSysInfo: function getSysInfo() {
    return wx.getSystemInfoSync();
  }
});

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);



var login = function () {
  function login() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, login);
  }

  //是否需要登陆


  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(login, [{
    key: 'wxLogin',
    value: function wxLogin() {
      var token = wx.getStorageSync('token');
      var url = '';
      if (token === null || token === '' || token === undefined) {
        url = '../pages/login/main';
      } else {
        url = '../pages/home/main';
      }
      wx.redirectTo({ url: url });
    }

    //获取相机授权

  }, {
    key: 'getPhotoScope',
    value: function getPhotoScope() {
      var that = this;
      wx.getSetting({
        success: function success(res) {
          if (!res.authSetting['scope.camera']) {
            wx.authorize({
              scope: 'scope.camera',
              success: function success() {
                console.log('同意授权');
              },

              fail: function fail() {
                wx.showModal({
                  title: '相机授权',
                  content: '授权相机是为了后续重要功能的使用',
                  showCancel: false,
                  success: function success(res) {
                    console.log(res);
                    wx.openSetting({
                      success: function success(res) {
                        console.log(res.authSetting);
                        if (!res.authSetting['scope.camera']) {
                          that.getPhotoScope();
                        } else {
                          console.log('用户已授权');
                        }
                      }
                    });
                  }
                });
              }
            });
          }
        }
      });
    }
  }]);

  return login;
}();



/***/ })

},[65]);
//# sourceMappingURL=app.js.map
