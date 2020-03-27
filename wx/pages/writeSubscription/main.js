require("../../common/manifest.js")
require("../../common/vendor.js")
require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([3],{

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__write__ = __webpack_require__(180);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__write__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_write_vue__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_b4abb558_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_write_vue__ = __webpack_require__(183);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(181)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_write_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_b4abb558_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_write_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\writeSubscription\\write.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] write.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b4abb558", Component.options)
  } else {
    hotAPI.reload("data-v-b4abb558", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 181:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_imgItem__ = __webpack_require__(40);
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
  name: "write",
  data: function data() {
    return {
      item: {},
      info: { village_name: '所在地区', door_number: '门牌号', link_name: '联系人' },
      imgUrl: '../../assets/images/add.png',
      uploadImg: null,
      remark: '',
      soid: null
    };
  },

  components: {
    imgItem: __WEBPACK_IMPORTED_MODULE_0__components_imgItem__["a" /* default */]
  },
  methods: {
    //提交订单
    submitData: function submitData() {
      var uploadImg = this.uploadImg;
      console.log('uploadImg', uploadImg);
      if (uploadImg === null) {
        $Toast({
          content: '请上传合同单照',
          type: 'warning'
        });
        return;
      }
      var item = this.$data.item;
      var data = {
        user_id: item.t.user_id,
        user_link_id: item.t.user_link_id,
        user_receive_id: item.t.user_receive_id,
        so_id: this.$data.soid,
        village_id: item.soInfo.village_id,
        prod_price: item.soInfo.total_price,
        prod_img: uploadImg,
        prod_content: this.$data.remark
      };
      console.log('data', data);
      this.api.submitOrderS(data).then(function (res) {
        $Toast({
          content: '上传成功',
          type: 'success',
          duration: 1000
        });
        setTimeout(function () {
          wx.redirectTo({
            url: '../home/main'
          });
        }, 1000);
      }).catch(function (err) {
        $Toast({
          content: '上传失败',
          type: 'warning'
        });
      });
    },

    //上传图片
    upIMG: function upIMG() {
      console.log('选择照片');
      var self = this;
      wx.chooseImage({
        sizeType: ['compressed'], //original 原图，compressed 压缩图，默认二者都
        success: function success(res) {
          var tempFilePaths = res.tempFilePaths;
          self.$data.imgUrl = tempFilePaths[0];
          wx.showLoading({ title: '上传中' });
          self.api.uploadFile(tempFilePaths, function (res) {
            wx.hideLoading();
            self.uploadImg = JSON.parse(res).data;
            console.log('img', self.uploadImg);
          });
        }
      });
    }
  },
  mounted: function mounted() {
    var self = this;
    var query = this.$root.$mp.query;
    this.api.getSoInfo(query.id).then(function (res) {
      var data = res.data;
      self.$data.info = data.t;
      self.$data.item = data;
      self.$data.soid = query.id;
    }).catch(function (err) {
      $Toast({
        content: err.error,
        duration: 1000
      });
    });
  }
});

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home"
  }, [_c('header', [_c('div', {
    staticClass: "h_item"
  }, [_c('span', {
    staticClass: "h_i_title"
  }, [_vm._v("收货地址")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.info.village_name) + " " + _vm._s(_vm.info.door_number))])]), _vm._v(" "), _c('div', {
    staticClass: "h_item"
  }, [_c('span', {
    staticClass: "h_i_title"
  }, [_vm._v("联系人")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.info.link_name))])])]), _vm._v(" "), _c('div', {
    staticClass: "line"
  }), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('img-item', {
    attrs: {
      "bg": true,
      "data": _vm.info.projectinfo,
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "c_total"
  }, [_c('span', [_vm._v("订单总额:")]), _vm._v(" "), _c('input', {
    staticClass: "c_t_input",
    attrs: {
      "value": _vm.item.total_price,
      "disabled": "true"
    }
  }), _vm._v(" "), _c('span', [_vm._v("元")])]), _vm._v(" "), _c('div', {
    staticClass: "c_photo"
  }, [_c('span', {
    staticClass: "c_p_txt"
  }, [_vm._v("合同/单据")]), _vm._v(" "), _c('div', {
    staticClass: "c_img"
  }, [_c('image', {
    staticClass: "img",
    attrs: {
      "mode": "aspectFit",
      "src": _vm.imgUrl,
      "eventid": '0'
    },
    on: {
      "click": _vm.upIMG
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "c_remark"
  }, [_c('span', {
    staticClass: "c_r_txt"
  }, [_vm._v("备注")]), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.remark),
      expression: "remark"
    }],
    staticClass: "textarea",
    attrs: {
      "placeholder": "备注一下",
      "eventid": '1'
    },
    domProps: {
      "value": (_vm.remark)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.remark = $event.target.value
      }
    }
  })])], 1), _vm._v(" "), _c('div', {
    staticClass: "f_btn",
    attrs: {
      "eventid": '2'
    },
    on: {
      "click": _vm.submitData
    }
  }, [_vm._v("提交订单")]), _vm._v(" "), _c('i-toast', {
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-b4abb558", esExports)
  }
}

/***/ })

},[179]);
//# sourceMappingURL=main.js.map