<template>
    <div class="contact"
         :style="{height:height+'px'}">
      <scroll-view
        :style="{height:(height*0.8)+'px'}"
        scroll-y="true"
        @scrolltolower="loadMore">
        <div class="c_item" v-for="(item,index) in items" :key="item.id">
          <div class="choose" v-show="check===index">
            <img class="chooseImg" src="../../assets/images/yixuanze.png"/>
          </div>
          <div class="c_contact" @click="chooseBack(index)">
            <span class="c_name">{{item.link_name===''?'未命名':item.link_name}}</span>
            <span class="c_phone">{{item.link_mobile}}</span>
          </div>
          <div class="c_img" @click="modify(index)">
            <img class="img" src="../../assets/images/bianji.png"/>
          </div>
        </div>
        <div class="none" v-if="items.length===0">
          <img src="../../assets/images/blank.png"/>
          <span>空空如也</span>
        </div>
        <i-load-more v-if="isLoad && show" :tip="'正在加载'" :loading="true"/>
        <i-load-more v-if="!isLoad && show" :tip="loadData?'下拉加载更多':'没有更多了'" :loading="false"/>
      </scroll-view>
      <div v-if="items.length>0" class="foot" @click="addContact">添加联系人</div>
      <i-spin :size="'large'" fix v-if="isShowLoading"></i-spin>
      <i-toast id="toast" />
    </div>
</template>

<script>
  const { $Toast } = require('../../../static/dist/base/index');
  export default {
    name: "contact",
    data(){
      return{
        height:wx.getSystemInfoSync().windowHeight,
        items:[],
        loadData:true,
        isLoad:false,
        show:false,
        page:1,//当前默认页数
        user_id:null,
        isShowLoading:true,
        check:false
      }
    },
    methods:{
      loadMore(){
        if(!this.loadData){
          return false;
        }
        this.isLoad = true;
        let page = this.page;
        let rdata = this.items;
        let self = this;
        let obj = {
          page:page+1,
          pagesize:10
        }
        this.api.getContact(obj).then(res=>{
          self.isLoad = false;
          let data = res.data;
          if(data.length<10) self.loadData = false;
          self.items = rdata.concat(data);
          self.page = page+1;
        }).catch(err=>{
          self.isLoad = false;
          $Toast({
            content:err.error,
            type:'warning'
          })
        })
      },
      chooseBack(index){
        let data = this.items[index];
        console.log('link',data);
        this.check = index;
        wx.setStorage({
          key: "contact",
          data: {name:data.link_name, mobile:data.link_mobile},
          success: function () {
            setTimeout(()=>{
              wx.navigateBack();   //返回上一个页面
            },500)
          }
        })
      },
      modify(index){
        let data = this.items[index];
        wx.navigateTo({
          url:'../modifyContact/main?data='+JSON.stringify(data)+'&type=modify'
        })
      },
      addContact(){
        let id = this.user_id;
        wx.navigateTo({
          url:'../modifyContact/main?id='+id
        })
      }
    },
    mounted(){
      let self = this;
      let query = this.$root.$mp.query;
      this.api.getContact({page:1,pagesize: 10,user_id:query.id}).then(res=>{
        self.isShowLoading = false;
        let data = res.data;
        if(data.length<10 && data.length>0){
          self.loadData = false;
          self.show = true;
          self.isLoad = false;
        }else if(data.length>=10){
          self.loadData = true;
          self.show = true;
          self.isLoad = true;
        }else{
          self.show = false;
        }
        self.user_id = query.id;
        self.items = data;
      }).catch(err=>{
        self.isShowLoading = false;
        $Toast({
          content:err.error,
          type:'warning'
        })
      })
    }
  };
</script>

<style lang="scss">
  .contact{
    display: flex;
    background-color: #f7f7f7;
    flex-direction: column;
    .c_item{
      display: flex;
      align-items: center;
      height: 60px;
      line-height: 60px;
      margin-top: 10px;
      .choose{
        background-color: #1296db;
        width: 60px;
        height: 60px;
        text-align: center;
        animation: show .1s ease 0ms;
        .chooseImg{
          width: 35px;
          height: 25px;
        }
      }
      .c_contact{
        font-size: 14px;
        flex: 6;
        background-color: #ffffff;
        .c_name{
          padding-left: 10px;
          padding-right: 10px;
        }
      }
      .c_img{
        width: 46px;
        background-color: #eeeeee;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        .img{
          width: 30px;
          height: 30px;
        }
      }
    }
    .foot{
      background-color: #FF5D22;
      height: 60px;
      line-height: 60px;
      text-align: center;
      width: 90%;
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
      margin: 30px auto 0 auto;
      color: #ffffff;
    }
  }
  @keyframes show {
    from{
      width: 0;
    }
    to{
      width: 60px;
    }
  }
</style>
