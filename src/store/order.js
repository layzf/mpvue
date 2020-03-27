import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//筛选
const order = new Vuex.Store({
    state:{
      //是否展示删选
      isShowModal:false,
      //菜单动画
      isShow:false,
      //确定筛选数据
      filterData:null,
      //
      pid:'',
      checkedChange:{},
    },
    mutations:{
       //订金单详情返回列表页面，保留当前选项
       checkedBtn:(state,data)=>{

        state.checkedChange = data
      },
      prevPage:(state,data)=>{
        state.pid = data
      },
      //筛选菜单
      changeState:(state)=>{
        state.isShowModal = true;
        setTimeout(()=>{
          state.isShow = true;
        },100)
      },
      //隐藏筛选
      hideState:(state)=>{
        state.isShow = false;
        setTimeout(()=>{
          state.isShowModal = false;
        },200)
      },
      //确定筛选
      // submitData:(state,data)=>{
      //   console.log('state',state,'data',data);
      //   state.filterData = data;
      // }
    }
})
export default order
