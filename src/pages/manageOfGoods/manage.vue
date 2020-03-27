<template>
    <div class="manage">
      <scroll-view scroll-y="true" :style="{height:height+'px'}">
        <div v-if="items.length>0">
        <img-item v-for="item in items" :key="item.id" :data="item" :bg="true"></img-item>
        </div>
        <div class="none" v-else>
          <img src="../../assets/images/blank.png"/>
          <span>空空如也</span>
        </div>
      </scroll-view>
      <i-toast id="toast" />
    </div>
</template>

<script>
  import imgItem from '@/components/imgItem';
  const { $Toast } = require('../../../static/dist/base/index');
  export default {
    name: "manage",
    components:{
      imgItem
    },
    data(){
      return{
        items:[],
        height:wx.getSystemInfoSync().windowHeight,
      }
    },
    mounted(){
      let self = this;
      this.api.getBussiness().then(res=>{
        self.$data.items = res.data;
      }).catch(err=>{
        console.log('err',err);
        $Toast({
          content:err.error,
          type:'warning'
        })
      })
    }
  };
</script>

<style lang="scss">
  .manage{
    background-color: #f7f7f7;
  }
</style>
