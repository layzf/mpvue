require("../../common/manifest.js")
require("../../common/vendor.js")
require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([2],{

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home__ = __webpack_require__(125);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__home__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_home_vue__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_7a303537_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_home_vue__ = __webpack_require__(132);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(126)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_home_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_7a303537_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_home_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\home\\home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] home.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a303537", Component.options)
  } else {
    hotAPI.reload("data-v-7a303537", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 126:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_mine__ = __webpack_require__(128);
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


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      height: null,
      showMenu: false,
      info: wx.getSystemInfoSync(),
      //用户信息
      user: null
    };
  },

  methods: {
    //扫描二维码
    scanCode: function scanCode() {
      var self = this;
      wx.scanCode({
        success: function success(res) {
          var code = res.result;
          self.api.scanCode(code).then(function (res) {
            console.log('res', res);
            wx.navigateTo({
              url: '../writeSubscription/main?id=' + res.data.so_id
            });
          }).catch(function (err) {
            $Toast({
              content: err.data.error,
              duration: 1000
            });
          });
        }
      });
    },

    //展示我的菜单
    mine: function mine() {
      this.$data.showMenu = true;
    },

    //隐藏菜单
    hideMenu: function hideMenu() {
      console.log('已经隐藏');
      this.$data.showMenu = false;
    },

    //导航
    naviTo: function naviTo(e) {
      var id = e.currentTarget.id;
      var url = '';
      switch (id) {
        case 'store':
          url = '../manageOfGoods/main';
          break;
        case 'subscription':
          url = '../subscription/main';
          break;
        case 'order':
          url = '../transferOrder/main';
          break;
      }
      wx.navigateTo({ url: url });
    },


    //注销
    logout: function logout() {
      this.api.logout();
    }
  },
  components: {
    mine: __WEBPACK_IMPORTED_MODULE_0__components_mine__["a" /* default */]
  },
  mounted: function mounted() {
    this.$data.height = wx.getSystemInfoSync().windowHeight;
    var self = this;
    this.api.getBusinessShop().then(function (res) {
      self.$data.user = res.data.businessUser.businessInfoDTO;
    }).catch(function (err) {
      console.log('首页初始化调用', self.$data.user);
      $Toast({
        content: err.error,
        duration: 1000
      });
    });
  }
});

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_mine_vue__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_1aac0542_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_mine_vue__ = __webpack_require__(131);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(129)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_mine_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_1aac0542_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_mine_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\mine.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mine.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1aac0542", Component.options)
  } else {
    hotAPI.reload("data-v-1aac0542", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 129:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "mine",
  props: ['data'],
  data: function data() {
    return {
      info: wx.getSystemInfoSync()
    };
  },

  watch: {
    data: function data(val) {
      this.data = val;
    }
  },
  methods: {
    logout: function logout() {
      this.api.logout();
    }
  }
});

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.data) ? _c('div', {
    staticClass: "home",
    style: ({
      height: (_vm.info.windowHeight) + 'px',
      width: (_vm.info.screenWidth * 0.8) + 'px'
    })
  }, [_c('header', [_c('div', {
    staticClass: "avar"
  }, [_vm._v("店长")]), _vm._v(" "), _c('div', {
    staticClass: "h_daturn"
  }, [_c('div', {
    staticClass: "h_identity"
  }, [_c('span', [_vm._v(_vm._s(_vm.data.user_name))]), _vm._v(" "), _c('div', {
    staticClass: "icon"
  }, [_vm._v("店长")])]), _vm._v(" "), _c('span', {
    staticClass: "h_phone"
  }, [_vm._v(_vm._s(_vm.data.mobile))])])]), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('div', {
    staticClass: "c_item"
  }, [_c('span', {
    staticClass: "c_i_title"
  }, [_vm._v("商户名称:")]), _vm._v(" "), _c('span', {
    staticClass: "c_i_content"
  }, [_vm._v(_vm._s(_vm.data.brands))])]), _vm._v(" "), _c('div', {
    staticClass: "c_item"
  }, [_c('span', {
    staticClass: "c_i_title"
  }, [_vm._v("经营产品:")]), _vm._v(" "), _c('span', {
    staticClass: "c_i_content"
  }, [_vm._v(_vm._s(_vm.data.business_name))])]), _vm._v(" "), _vm._m(0), _vm._v(" "), _vm._m(1)]), _vm._v(" "), _c('div', {
    staticClass: "foot",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.logout
    }
  }, [_vm._v("\n    退出登录\n  ")])]) : _vm._e()
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "c_icon"
  }, [_c('div', {
    staticClass: "icon"
  }, [_vm._v("商家")]), _vm._v(" "), _c('div', {
    staticClass: "icon"
  }, [_vm._v("导购")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "c_icon"
  }, [_c('div', {
    staticClass: "avar"
  }, [_vm._v("商家")]), _vm._v(" "), _c('div', {
    staticClass: "avar"
  }, [_vm._v("导购")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1aac0542", esExports)
  }
}

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "index",
    style: ({
      height: _vm.height + 'px'
    })
  }, [_c('header', [_c('div', {
    staticClass: "i_head"
  }, [_c('img', {
    staticClass: "i_h_img",
    attrs: {
      "src": "../../assets/images/scan.png",
      "eventid": '0'
    },
    on: {
      "click": _vm.scanCode
    }
  }), _vm._v(" "), _c('span', [_vm._v("转单")])])]), _vm._v(" "), _c('div', {
    staticClass: "i_content"
  }, [_c('div', {
    staticClass: "i_c_notice"
  }, [_c('i-notice-bar', {
    attrs: {
      "icon": "systemprompt",
      "background-color": '#ffffff',
      "loop": "",
      "mpcomid": '0'
    }
  }, [_vm._v("\n          2018年世界杯,将于6月14日至7月15日举行;2018年世界杯,将于6月14日至7月15日举行;\n        ")])], 1), _vm._v(" "), _c('div', {
    staticClass: "i_c_func"
  }, [_c('div', {
    staticClass: "i_c_item",
    attrs: {
      "id": "store",
      "eventid": '1'
    },
    on: {
      "click": _vm.naviTo
    }
  }, [_c('img', {
    attrs: {
      "src": "../../assets/images/store.png"
    }
  }), _vm._v(" "), _c('span', [_vm._v("门店管理")])]), _vm._v(" "), _c('div', {
    staticClass: "i_c_item",
    attrs: {
      "id": "subscription",
      "eventid": '2'
    },
    on: {
      "click": _vm.naviTo
    }
  }, [_c('img', {
    attrs: {
      "src": "../../assets/images/subscription.png"
    }
  }), _vm._v(" "), _c('span', [_vm._v("订金管理")])]), _vm._v(" "), _c('div', {
    staticClass: "i_c_item",
    attrs: {
      "id": "order",
      "eventid": '3'
    },
    on: {
      "click": _vm.naviTo
    }
  }, [_c('img', {
    attrs: {
      "src": "../../assets/images/order.png"
    }
  }), _vm._v(" "), _c('span', [_vm._v("订单管理")])])])]), _vm._v(" "), _c('div', {
    staticClass: "f_btn"
  }, [_c('div', {
    staticClass: "confirm",
    attrs: {
      "eventid": '4'
    },
    on: {
      "click": _vm.mine
    }
  }, [_vm._v("我的")]), _vm._v(" "), _c('div', {
    staticClass: "cancel",
    attrs: {
      "eventid": '5'
    },
    on: {
      "click": _vm.logout
    }
  }, [_vm._v("注销")])]), _vm._v(" "), _c('i-drawer', {
    attrs: {
      "mode": "left",
      "visible": _vm.showMenu,
      "eventid": '6',
      "mpcomid": '2'
    },
    on: {
      "close": _vm.hideMenu
    }
  }, [_c('mine', {
    attrs: {
      "data": _vm.user,
      "mpcomid": '1'
    }
  })], 1), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '3'
    }
  })], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7a303537", esExports)
  }
}

/***/ })

},[124]);
//# sourceMappingURL=main.js.map