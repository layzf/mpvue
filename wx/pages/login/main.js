require("../../common/manifest.js")
require("../../common/vendor.js")
require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([8],{

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login__ = __webpack_require__(134);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__login__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_login_vue__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_8233372a_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_login_vue__ = __webpack_require__(137);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(135)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_login_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_8233372a_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_login_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\login\\login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8233372a", Component.options)
  } else {
    hotAPI.reload("data-v-8233372a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 135:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_api__ = __webpack_require__(44);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _require = __webpack_require__(12),
    $Toast = _require.$Toast;


var util = new __WEBPACK_IMPORTED_MODULE_0__utils_api__["a" /* api */]();
/* harmony default export */ __webpack_exports__["a"] = ({
  name: "login",
  data: function data() {
    return {
      //二维码
      code: {
        txt: '获取验证码',
        time: 60,
        canUse: true
      },
      //输入数据
      inputData: {
        phone: '',
        code: ''
      },
      height: wx.getSystemInfoSync().windowHeight
    };
  },

  methods: {
    //获取验证码
    getCode: function getCode() {
      var _this = this;

      var self = this;
      var code = this.$data.code;
      var data = this.$data.inputData;
      //验证手机号
      if (!/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(data.phone)) {
        $Toast({
          content: '请填写正确的手机号',
          type: 'warning'
        });
        return false;
      } else {
        util.getCode(data.phone).then(function (res) {
          $Toast({
            content: '获取验证码成功',
            type: 'success'
          });
        }).catch(function (err) {
          $Toast({
            content: '获取验证码失败',
            type: 'warning'
          });
        });
      }
      if (code.canUse) {
        var t = setInterval(function () {
          if (code.time > 0) {
            code.time -= 1;
            code.txt = '\u5269\u4F59' + code.time + '\u79D2';
            code.canUse = false;
            _this.$data.code = code;
          } else {
            code.txt = "获取验证码";
            code.time = 60;
            code.canUse = true;
            _this.$data.code = code;
            clearInterval(t);
          }
        }, 1000);
      }
    },

    //登陆
    loginToHome: function loginToHome() {
      var input = this.$data.inputData;
      var temp = null;
      if (!input.phone) {
        temp = '请填写手机号码';
      } else if (!input.code) {
        temp = '请填写验证码';
      }
      if (temp) {
        $Toast({
          content: temp,
          type: 'warning'
        });
        return false;
      }
      util.login(input.phone, input.code).then(function (res) {
        wx.setStorageSync('token', res.data.token);
        wx.setStorageSync('tokenId', res.data.tokenid);
        $Toast({
          content: '登录成功',
          duration: 1000,
          type: 'success'
        });
        setTimeout(function () {
          wx.redirectTo({
            url: '../home/main'
          });
        }, 1000);
      }).catch(function (err) {
        console.log('err', err);
        $Toast({
          content: err.error,
          duration: 1000,
          type: 'warning'
        });
      });
    }
  }
});

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login",
    style: ({
      height: _vm.height + 'px'
    })
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "l_content"
  }, [_c('div', {
    staticClass: "l_c_item"
  }, [_c('img', {
    staticClass: "l_img",
    attrs: {
      "src": "../../assets/images/phone.png"
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.inputData.phone),
      expression: "inputData.phone"
    }],
    attrs: {
      "type": "number",
      "placeholder": "请输入您的手机号",
      "eventid": '0'
    },
    domProps: {
      "value": (_vm.inputData.phone)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.inputData.phone = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "l_c_item"
  }, [_c('img', {
    staticClass: "l_img",
    attrs: {
      "src": "../../assets/images/code.png"
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.inputData.code),
      expression: "inputData.code"
    }],
    attrs: {
      "type": "number",
      "placeholder": "请输入收到的验证码",
      "eventid": '1'
    },
    domProps: {
      "value": (_vm.inputData.code)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.inputData.code = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "code",
    attrs: {
      "eventid": '2'
    },
    on: {
      "click": _vm.getCode
    }
  }, [_vm._v(_vm._s(_vm.code.txt))])])]), _vm._v(" "), _c('i-button', {
    attrs: {
      "i-class": "l_btn",
      "type": "ghost",
      "eventid": '3',
      "mpcomid": '0'
    },
    on: {
      "click": _vm.loginToHome
    }
  }, [_vm._v("登录")]), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '1'
    }
  })], 1)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', [_c('div', {
    staticClass: "l_head"
  }, [_c('img', {
    staticClass: "l_h_icon",
    attrs: {
      "src": "../../assets/images/logo@2x.png"
    }
  }), _vm._v(" "), _c('span', [_vm._v("商户端")])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-8233372a", esExports)
  }
}

/***/ })

},[133]);
//# sourceMappingURL=main.js.map
