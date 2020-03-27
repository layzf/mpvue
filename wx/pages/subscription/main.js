require("../../common/manifest.js")
require("../../common/vendor.js")
require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([4],{

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__subscription__ = __webpack_require__(162);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__subscription__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_subscription_vue__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_2da0d9f7_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_subscription_vue__ = __webpack_require__(169);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(163)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_subscription_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_2da0d9f7_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_subscription_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\subscription\\subscription.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] subscription.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2da0d9f7", Component.options)
  } else {
    hotAPI.reload("data-v-2da0d9f7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 163:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_item__ = __webpack_require__(63);
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
//
//
//



var _require = __webpack_require__(12),
    $Toast = _require.$Toast;



/* harmony default export */ __webpack_exports__["a"] = ({
  name: "subscription",
  data: function data() {
    return {
      res: [],
      height: wx.getSystemInfoSync().windowHeight,
      loadData: true,
      isLoad: false,
      show: false,
      page: 1 //当前默认页数
    };
  },

  components: {
    item: __WEBPACK_IMPORTED_MODULE_1__components_item__["a" /* default */],
    modalMenu: __WEBPACK_IMPORTED_MODULE_2__components_modalMenu__["a" /* default */]
  },
  methods: {
    showModal: function showModal() {
      if (__WEBPACK_IMPORTED_MODULE_3__store_order__["a" /* default */].state.isShowModal) {
        __WEBPACK_IMPORTED_MODULE_3__store_order__["a" /* default */].commit('hideState');
      } else {
        __WEBPACK_IMPORTED_MODULE_3__store_order__["a" /* default */].commit('changeState');
      }
    },

    //上拉加载
    loadMore: function loadMore(type) {
      var _this = this;

      if (!this.loadData) {
        return false;
      }
      this.isLoad = true;
      var page = this.page;
      var rdata = this.res;
      var self = this;
      var obj = {
        status: '',
        page: page + 1,
        pagesize: 10
      };
      if (type.time) {
        obj.status = type.classification;
        obj.days = type.time;
      }
      this.api.getSubscriptionList(obj).then(function (res) {
        self.isLoad = false;
        var data = res.data;
        if (data.length < 10) self.loadData = false;
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

        if (type.time) {
          self.res = data;
        } else {
          self.res = rdata.concat(data);
        }
        self.page = page + 1;
      }).catch(function (err) {
        self.isLoad = false;
        $Toast({
          content: err.error,
          type: 'warning'
        });
      });
    },

    //过滤数据
    filter: function filter(val) {
      //重置
      this.page = 0;
      this.loadData = true;
      this.loadMore(val);
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
    var _this2 = this;

    var self = this;
    this.api.getSubscriptionList({ status: '', page: 1, pagesize: 10 }).then(function (res) {
      var data = res.data;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(data), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var o = _step2.value;

          o.status = _this2.api.filterStatus(o.status);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
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
      self.res = data;
    }).catch(function (err) {
      $Toast({
        content: err.error,
        type: 'warning'
      });
    });
  }
});

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home",
    class: _vm.prohibited ? 'hide' : '',
    style: ('height:' + _vm.height + 'px')
  }, [_c('div', {
    staticClass: "h_title",
    style: ({
      height: (_vm.height * 0.08) + 'px'
    })
  }, [_c('div', {
    staticClass: "h_left"
  }, [_c('img', {
    staticClass: "h_l_img",
    attrs: {
      "src": "../../assets/images/icon_search.png",
      "eventid": '0'
    },
    on: {
      "click": _vm.searchData
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "h_right",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": function($event) {
        _vm.showModal()
      }
    }
  }, [_c('img', {
    staticClass: "h_img",
    attrs: {
      "src": "../../assets/images/filter.png"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "h_txt"
  }, [_vm._v("筛选")])])]), _vm._v(" "), _c('scroll-view', {
    staticClass: "content",
    style: ({
      height: (_vm.height * 0.92) + 'px'
    }),
    attrs: {
      "scroll-y": "true",
      "eventid": '2'
    },
    on: {
      "scrolltolower": _vm.loadMore
    }
  }, [(_vm.res.length > 0) ? _c('div', _vm._l((_vm.res), function(item, index) {
    return _c('item', {
      key: item.id,
      attrs: {
        "data": item,
        "order": false,
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
  }) : _vm._e()], 1), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '3'
    }
  }), _vm._v(" "), _c('modal-menu', {
    attrs: {
      "eventid": '3',
      "mpcomid": '4'
    },
    on: {
      "filter": _vm.filter
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2da0d9f7", esExports)
  }
}

/***/ })

},[161]);
//# sourceMappingURL=main.js.map