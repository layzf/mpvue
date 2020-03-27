require("../../common/manifest.js")
require("../../common/vendor.js")
require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([6],{

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__detail__ = __webpack_require__(147);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__detail__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_detail_vue__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_2e600dae_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_detail_vue__ = __webpack_require__(150);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(148)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_detail_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_2e600dae_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_detail_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\orderDetail\\detail.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] detail.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2e600dae", Component.options)
  } else {
    hotAPI.reload("data-v-2e600dae", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 148:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 149:
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
  name: "detail",
  data: function data() {
    return {
      data: {
        name: '测试',
        address: '麓谷小镇 四栋',
        proName: '红星没看龙厨艺柜',
        proPrice: 300,
        time: '2019,1,1',
        orderType: '到点支付',
        payTime: '2019.1.1',
        payType: '微信支付',
        number: 1280145455225
      },
      isShowLoading: true,
      //高度
      height: wx.getSystemInfoSync().windowHeight
    };
  },
  mounted: function mounted() {
    var self = this;
    var query = this.$root.$mp.query;
    this.isShowLoading = true;
    this.api.getSubDetail(query.id).then(function (res) {
      self.isShowLoading = false;
      self.$data.data = res.data;
    }).catch(function (err) {
      self.isShowLoading = false;
      $Toast({
        content: err.error,
        type: 'warning'
      });
    });
  }
});

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home",
    style: ({
      height: _vm.height + 'px'
    })
  }, [_c('div', {
    staticClass: "content"
  }, [_c('div', {
    staticClass: "c_title"
  }, [_vm._v("订金单编号: " + _vm._s(_vm.data.So_number))]), _vm._v(" "), _c('div', {
    staticClass: "c_content"
  }, [_c('div', {
    staticClass: "c_row"
  }, [_c('span', {
    staticClass: "c_r_txt"
  }, [_vm._v("联系人:")]), _vm._v(" "), _c('div', {
    staticClass: "c_r_content"
  }, [_vm._v(_vm._s(_vm.data.link_name))])]), _vm._v(" "), _c('div', {
    staticClass: "c_row"
  }, [_c('span', {
    staticClass: "c_r_txt"
  }, [_vm._v("地址:")]), _vm._v(" "), _c('div', {
    staticClass: "c_r_content"
  }, [_vm._v(_vm._s(_vm.data.village_name) + " " + _vm._s(_vm.data.door_number))])]), _vm._v(" "), _c('div', {
    staticClass: "c_row"
  }, [_c('span', {
    staticClass: "c_r_txt"
  }, [_vm._v("项目名:")]), _vm._v(" "), _c('div', {
    staticClass: "c_r_content"
  }, [_vm._v(_vm._s(_vm.data.Project_name))])]), _vm._v(" "), _c('div', {
    staticClass: "c_row"
  }, [_c('span', {
    staticClass: "c_r_txt"
  }, [_vm._v("项目定金:")]), _vm._v(" "), _c('div', {
    staticClass: "c_r_content"
  }, [_vm._v(_vm._s(_vm.data.Pay_price))])]), _vm._v(" "), _c('div', {
    staticClass: "c_row"
  }, [_c('span', {
    staticClass: "c_r_txt"
  }, [_vm._v("下单时间:")]), _vm._v(" "), _c('div', {
    staticClass: "c_r_content"
  }, [_vm._v(_vm._s(_vm.data.Create_at))])]), _vm._v(" "), _c('div', {
    staticClass: "c_row"
  }, [_c('span', {
    staticClass: "c_r_txt"
  }, [_vm._v("下单方式:")]), _vm._v(" "), _c('div', {
    staticClass: "c_r_content"
  }, [_vm._v(_vm._s(_vm.data.b))])]), _vm._v(" "), _c('div', {
    staticClass: "c_row"
  }, [_c('span', {
    staticClass: "c_r_txt"
  }, [_vm._v("支付时间:")]), _vm._v(" "), _c('div', {
    staticClass: "c_r_content"
  }, [_vm._v(_vm._s(_vm.data.pay_at == null ? '暂未支付' : _vm.data.pay_at))])]), _vm._v(" "), _c('div', {
    staticClass: "c_row"
  }, [_c('span', {
    staticClass: "c_r_txt"
  }, [_vm._v("支付方式:")]), _vm._v(" "), _c('div', {
    staticClass: "c_r_content"
  }, [_vm._v(_vm._s(_vm.data.a))])])])]), _vm._v(" "), (_vm.isShowLoading) ? _c('i-spin', {
    attrs: {
      "size": 'large',
      "fix": "",
      "mpcomid": '0'
    }
  }) : _vm._e(), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '1'
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2e600dae", esExports)
  }
}

/***/ })

},[146]);
//# sourceMappingURL=main.js.map