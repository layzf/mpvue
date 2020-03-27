<template>
    <div class="home" :class="prohibited?'hide':''" :style="'height:'+height+'px'">

      <div style="background: #FFF;">
        <div class="h_left widths" >
          <img @click="searchData" class="h_l_img" src="../../assets/images/icon_search.png"/>
          <input class="h_input" placeholder="手机号搜索" @input="searchData" :value="isSearch">
        </div>

        <div class="h_title" :style="{height:(height*0.08)+'px'}">
          <div class="h_left" >
            订金单列表({{records}})
          </div>
          <div class="h_right" @click="showModal()">
            <img class="h_img" src="../../assets/images/filter.png" />
            <span class="h_txt">筛选</span>
          </div>
        </div>
      </div>
        <scroll-view class="content"
                     :style="{height:(height*0.85)+'px'}"
                     scroll-y="true"
                     @scrolltolower="loadMore">
          <div  v-if="res.length>0">
     
            <item 
                :data="res"
                :mobile="mobile"
                :isSearch="isSearch"
                :order="false"
                ></item>
      
          </div>
          <div class="none" v-else>
            <img src="../../assets/images/icon_empty_order@2x.png"/>
            <span>空空如也</span>
          </div>

          <i-load-more v-if="isLoad && show" :tip="'正在加载'" :loading="true"/>
          <i-load-more v-if="!isLoad && show" :tip="loadData?'下拉加载更多':'没有更多了'" :loading="false"/>

        </scroll-view>

        <i-toast id="toast" />
      <!--筛选菜单-->
      <modal-menu @filter="filter" id="models"></modal-menu>
  </div>
</template>

<script>
  import item from '@/components/item';
  const { $Toast } = require('../../../static/dist/base/index');
  import modalMenu from '@/components/modalMenu';
  import state from '@/store/order';
  export default {
    name: "subscription",
    data(){
      return {
        res:[],
        height:wx.getSystemInfoSync().windowHeight,
        loadData:true,
        isLoad:false,
        show:false,
        page:1,//当前默认页数
        isSearch: null,
        statusStr:'',
        time:'',
        records:'',
        listId:'',//首页跳转过来，显示对应的类型
      }
    },
    components:{
      item,
      modalMenu
    },
    methods:{
      showModal(){
        if(state.state.isShowModal){
          state.commit('hideState');
        }else{
          state.commit('changeState');
        }
      },
      //上拉加载
      loadMore(type,filters){
        console.log(type,"typetypetype")
        if(!this.loadData){
          return false;
        }
        this.isLoad = true;

        let page = this.page;
        let rdata = this.res;
        let self = this;
        let obj = {
          status:'',
          page:page+1,
          pagesize:10,
          days:this.$data.time || ''
        }
        if(filters=='filters'){   //筛选后 先清空在赋值
          self.res = [];
        }else{
          if(this.listId){
            obj.statusStr = this.listId
          }
        }
        
        if(this.$data.statusStr!=''){
          obj.statusStr=this.$data.statusStr
        }


        if(this.isSearch){
            obj.mobile = this.isSearch;
        }
        console.log('传给接口的obj：',obj)

        this.api.getSubscriptionList(obj).then(res=>{
          self.isLoad = false;
            let data = res.data;
            if(data==""){
              self.loadData = false;
            }
            for(let o of data){
              o.status = this.api.filterStatus(o.status);
            }
            if(type.time || type.time==""){
              self.res = data;
              console.log('data:',data)
            }else{
              var newres =  rdata.concat(data)
              self.res = newres;
              console.log('newres:',newres)
            }
            self.page = page+1;
            self.records = res.records;

        }).catch(err=>{
          self.isLoad = false;
          $Toast({
            content:err.error,
            type: 'warning'
          })
        })

      },
      //过滤数据
      filter(val){
        //重置
        this.page = 0;
        this.loadData = true;

        this.$data.statusStr = val.classification
        this.$data.time = val.time
        this.loadMore(val,'filters');

      },
      //搜索
      searchData(e){
        let val = e.target.value;
        console.log('手机号输出')
        if(val.length === 11){
          if(!(/^1[34578]\d{9}$/.test(val))){
            $Toast({
              content:'手机号不正确',
              type: 'warning'
            })
          }else{
            console.log('phone',val);
            let data = {
              status:'',
              page:1,
              pagesize:10,
              mobile:val
            }
            if(this.listId){
              data.statusStr = this.listId
            }
            if(this.$data.statusStr!=''){
              obj.statusStr=this.$data.statusStr
            }
             this.res = []
            this.api.getSubscriptionList(data).then(res=>{
         
              let data = res.data;

               this.isSearch = val;
              

              this.records = res.records;

              for(let o of data){
                o.status = this.api.filterStatus(o.status);
              }
              if(data.length<10 && data.length>0){
                this.loadData = false;
                this.show = true;
                this.isLoad = false;
              }else if(data.length>=10){
                this.loadData = true;
                this.show = true;
                this.isLoad = true;
              }else{
                this.show = false;
              }

               setTimeout(()=>{
                 this.res = data;
               },10)
           
            })
          }
        }else if(val == ''){
          console.log('初始化数据了？')
          this.init();
        }
      },
      //初始化
      init(){
        let self = this;
        this.page = 1;
         self.res = [];
        let obj = {
          status:'',
          page:1,
          pagesize:10,
          days:''
        }
        if(this.listId){
          obj.statusStr = this.listId
        }

        if(this.$data.statusStr!=''){
          obj.statusStr=this.$data.statusStr
        }

        this.api.getSubscriptionList(obj).then(res=>{
          let data = res.data;
         
          for(let o of data){
            o.status = this.api.filterStatus(o.status);
          }
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
          self.isSearch = '';
          self.res = data
          console.log(self.res,"初始化数据")
          self.records = res.records;
        }).catch(err=>{
          $Toast({
            content:err.error,
            type:'warning'
          })
        })
      }
    },
    computed:{
      //筛选菜单
      prohibited:()=>{
        return state.state.isShowModal
      }
    },
    onLoad(){
      Object.assign(this.$data, this.$options.data())
    },
    onShow(){
      let query = this.$root.$mp.query;
      console.log(query,"ss")
      if(query.id){
        this.listId = query.id
      }
      this.init();
    },

    beforeDestroy(){
      console.log('destory');
    }
  };
</script>

<style lange="scss">
    @import "../../assets/sass/order.css";
    .hide{
      overflow: hidden;
    }
  .h_left{
    display: flex;
    align-items: center
  }
  .h_left img{
      width: 28rpx;
      height: 28rpx;
      margin-right: 6rpx;
  }
  .widths{
    margin: 20rpx 30rpx;
    background: #f7f7f7f7;
    border-radius: 100rpx;
    padding: 12rpx 0;
    padding-left: 30rpx;
  }
    .home .h_title{
      background: #f7f7f7;
    }
</style>
