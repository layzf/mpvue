<template>
    <div class="search">
      <header>
        <div class="head">
          <img class="h_img" src="../../assets/images/icon_ss@3x.png" />
          <input class="h_phone" v-model="phone" @change="searchData" type="text" placeholder="输入手机号进行搜索"/>
        </div>
        <div class="cancel">取消</div>
      </header>
      <div class="content">
        <div class="result">搜索结果 共{{data.length}}条</div>
        <scroll-view :style="{height:(height*0.8)+'px'}" scroll-y="true" class="c_list">
            <div v-if="data.length>0">
              <item v-for="item in data"
                    :data="item"
                    :order="false"
                    :key="item.id"></item>
            </div>
            <div class="empty" v-else>
                <img src="../../assets/images/blank.png"/>
                <span>空空如也</span>
            </div>
        </scroll-view>
      </div>
      <i-toast id="toast" />
    </div>
</template>

<script>
  import item from '@/components/item'
  const { $Toast } = require('../../../static/dist/base/index');
  export default {
    name: "search",
    data(){
      return{
        //列表数据
        data:[],
        height:wx.getSystemInfoSync().windowHeight,
        phone:null,//手机号
      }
    },
    components:{
      item
    },
    methods:{
      searchData(){
        let self = this;
        let data = {
            mobile:this.$data.phone,
            status:'',
            page:1,
            pagesize:10
        }
        this.api.getSubscriptionList(data).then(res=>{
          let data = res.data;
          for(let o of data){
            o.status = this.api.filterStatus(o.status);
          }
           self.data = data;
        }).catch(err=>{
          $Toast({
            content:err.error,
            type:'warning'
          })
        })
      }
    }
  };
</script>

<style lang="scss">
  @import "../../assets/sass/search";
</style>
