require("../../common/manifest.js")
require("../../common/vendor.js")
require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([1],{

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__order__ = __webpack_require__(171);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__order__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_order_vue__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_2080fc0a_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_order_vue__ = __webpack_require__(178);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(172)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_order_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_2080fc0a_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_order_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\transferOrder\\order.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] order.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2080fc0a", Component.options)
  } else {
    hotAPI.reload("data-v-2080fc0a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 172:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_order_item__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_modalMenu__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_order__ = __webpack_require__(42);

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





var _require = __webpack_require__(12),
    $Toast = _require.$Toast;

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "order",
  data: function data() {
    return {
      //列表数据
      data: [],
      //屏幕高度
      height: wx.getSystemInfoSync().windowHeight,
      //筛选数据
      filterData: null,
      loadData: true,
      isLoad: false,
      show: false,
      page: 1 //当前默认页数
    };
  },

  components: {
    orderItem: __WEBPACK_IMPORTED_MODULE_1__components_order_item__["a" /* default */],
    modalMenu: __WEBPACK_IMPORTED_MODULE_2__components_modalMenu__["a" /* default */]
  },
  methods: {
    //展示菜单
    showModal: function showModal() {
      console.log(__WEBPACK_IMPORTED_MODULE_3__store_order__["a" /* default */].state.isShowModal);
      if (__WEBPACK_IMPORTED_MODULE_3__store_order__["a" /* default */].state.isShowModal) {
        __WEBPACK_IMPORTED_MODULE_3__store_order__["a" /* default */].commit('hideState');
      } else {
        __WEBPACK_IMPORTED_MODULE_3__store_order__["a" /* default */].commit('changeState');
      }
      console.log(__WEBPACK_IMPORTED_MODULE_3__store_order__["a" /* default */].state.isShowModal);
    },

    //筛选
    filter: function filter(val) {
      console.log('filter', val);
    },
    loadMore: function loadMore() {
      q;
    },

    //搜索
    searchData: function searchData() {
      wx.navigateTo({ url: '../search/main' });
    }
  },
  computed: {
    //筛选菜单
    prohibited: function prohibited() {
      return __WEBPACK_IMPORTED_MODULE_3__store_order__["a" /* default */].state.isShowModal;
    }
  },
  mounted: function mounted() {
    var _this = this;

    var self = this;
    this.api.getOrderList('', 1, 10).then(function (res) {
      var data = res.data;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(data), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var o = _step.value;

          o.status = _this.api.filterStatus(o.status);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (data.length < 10 && data.length > 0) {
        self.loadData = false;
        self.show = true;
        self.isLoad = false;
      } else if (data.length >= 10) {
        self.loadData = true;
        self.show = true;
        self.isLoad = true;
      } else {
        self.show = false;
      }
      self.data = data;
    }).catch(function (err) {
      console.log('err', err);
      $Toast({
        content: err.error,
        type: 'warning'
      });
    });
  }
});

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_order_item_vue__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_1cac80be_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_order_item_vue__ = __webpack_require__(177);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(175)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_order_item_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_1cac80be_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_order_item_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\order-item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] order-item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1cac80be", Component.options)
  } else {
    hotAPI.reload("data-v-1cac80be", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 175:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 176:
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

/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['data'],
  watch: {
    data: function data(val) {
      console.log('val', val);
      this.data = val;
    }
  },
  methods: {
    //提交订单
    submitOrder: function submitOrder() {
      var self = this;
      wx.showModal({
        title: '温馨提示',
        content: '您确认要交付订单吗',
        success: function success(res) {
          if (res.confirm) {
            self.api.submitOrder(self.data.id).then(function (res) {
              wx.showToast({
                title: '交付成功'
              });
            }).catch(function (err) {
              wx.showToast({
                title: err.error
              });
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
  }
});

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.data) ? _c('div', {
    staticClass: "order-item"
  }, [_c('div', {
    staticClass: "o-i-head"
  }, [_c('div', {
    staticClass: "i_h_contact"
  }, [_c('span', [_vm._v(_vm._s(_vm.data.link_name))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.data.link_mobile))])]), _vm._v(" "), _c('div', {
    staticClass: "i_h_status"
  }, [_vm._v(_vm._s(_vm.data.status))])]), _vm._v(" "), _c('div', {
    staticClass: "i_content"
  }, [_c('span', {
    staticClass: "i_c_title"
  }, [_vm._v(_vm._s(_vm.data.village_name) + " " + _vm._s(_vm.data.door_number))]), _vm._v(" "), _c('div', {
    staticClass: "i_c_content"
  }, [_vm._v(_vm._s(_vm.data.shop_name))]), _vm._v(" "), _c('div', {
    staticClass: "i_c_total"
  }, [_c('span', [_vm._v("订金 ￥" + _vm._s(_vm.data.pay_price))])])]), _vm._v(" "), _c('div', {
    staticClass: "i_foot"
  }, [_c('div', {
    staticClass: "i_btn",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.submitOrder
    }
  }, [_vm._v("交付订单")])]), _vm._v(" "), _c('div', {
    staticClass: "step"
  })]) : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1cac80be", esExports)
  }
}

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home",
    class: _vm.prohibited ? 'hide' : ''
  }, [_c('scroll-view', {
    staticClass: "content",
    style: ('height:' + _vm.height + 'px'),
    attrs: {
      "scroll-y": "true",
      "eventid": '0'
    },
    on: {
      "scrolltolower": _vm.loadMore
    }
  }, [(_vm.data.length > 0) ? _c('div', _vm._l((_vm.data), function(item, index) {
    return _c('order-item', {
      key: item.id,
      attrs: {
        "data": item,
        "mpcomid": '0-' + index
      }
    })
  })) : _c('div', {
    staticClass: "none"
  }, [_c('img', {
    attrs: {
      "src": "../../assets/images/blank.png"
    }
  }), _vm._v(" "), _c('span', [_vm._v("空空如也")])]), _vm._v(" "), (_vm.isLoad && _vm.show) ? _c('i-load-more', {
    attrs: {
      "tip": '正在加载',
      "loading": true,
      "mpcomid": '1'
    }
  }) : _vm._e(), _vm._v(" "), (!_vm.isLoad && _vm.show) ? _c('i-load-more', {
    attrs: {
      "tip": _vm.loadData ? '下拉加载更多' : '没有更多了',
      "loading": false,
      "mpcomid": '2'
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('modal-menu', {
    attrs: {
      "eventid": '1',
      "mpcomid": '3'
    },
    on: {
      "filter": _vm.filter
    }
  }), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '4'
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2080fc0a", esExports)
  }
}

/***/ })

},[170]);
//# sourceMappingURL=main.js.map