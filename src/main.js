import Vue from 'vue'
import App from './App'
import {api} from './utils/api'
import {util} from './utils/util'


Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.api = new api();


Vue.prototype.util = new util();



const app = new Vue(App)
app.$mount()
