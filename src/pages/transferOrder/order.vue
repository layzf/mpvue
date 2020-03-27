<template>
    <div class="home" :class="prohibited?'hide':''">
<!-- data-paystatus="{{item.paystatus?item.paystatus:0}}" data-status="{{item.status}}" data-current="{{idx}}" -->
  <div class="flex-row-around tabs-box">
<!--导航-->
    <scroll-view scroll-x class="nav" :scrollLeft="navScrollLeft" >
      <block v-for="(item,index) in tabsData.tabs" :key="item.typeStatus">
        <div class='tabs-item' :class="item.typeStatus == tabsData.currentSelectTab?'active':''" @click="onTabsItemTap(item,index)" >
            <text>{{item.title}}</text>
          </div>
      </block>
    </scroll-view>
  </div>

<!--手机号搜索，筛选-->
      <div style="background: #FFF;" class="topFlexs">
        <div class="h_left widths" >
          <img @click="searchData" class="h_l_img" src="../../assets/images/icon_search.png"/>
          <input class="h_input" placeholder="手机号搜索" @input="searchData">
        </div>

        <div class="h_title" :style="{height:'48px'}">
          <div class="h_right" @click="showModal()">
            <img class="h_img" src="../../assets/images/filter.png" />
            <span class="h_txt">筛选</span>
          </div>
        </div>
      </div>

      <scroll-view :style="{height:(height*0.85)+'px'}"
                   class="content"
                   scroll-y="true"
                   :scroll-top='newScroll'
                   @scroll='bindscrolls'
                   @scrolltolower="loadMore">
        <div v-if="data.length>0">
          <order-item :dataArr="data" 
                      @refundCEmit='refundCEmit' 
                      @securedSoItem='securedSoItem' 
                      @detailClick="detailClick"></order-item>
        </div>
        <div class="none" v-else>
          <img src="../../assets/images/blank.png"/>
          <span>空空如也</span>
        </div>
        <i-load-more v-if="isLoad && show" :tip="'正在加载'" :loading="true"/>
        <i-load-more v-if="!isLoad && show" :tip="loadData?'下拉加载更多':'没有更多了'" :loading="false"/>
      </scroll-view>
      <!--筛选菜单-->
      <modal-menu :type="'order'" @filter="filter"></modal-menu>
      <i-toast id="toast" />
  <!--部分退款，补单弹框-->    
      <!-- <div class="models" v-if="modelShow">
          <div class="modelShow" @click="hideModel"></div>
          <div class="content">
             <h3>订单退补款</h3>
             <div>
                <div class="tabList" >
                  <p  :class="{'active':typeVal==index+1}" v-for="(item,index) in radio" :key='index' @click="radioChange(item.id)">{{item.name}}</p>
                </div>
              
                <div class="modelList">
                   <span>退补款金额：</span>
                   <input type="digit" v-model="refundMoney" @input="refundMoeyInt">
                </div>
                <p>退补款后订单金额：{{emitOrderItem.deliver_price}}元</p>
                <div class="contract">
                  <span>上传新单据</span>
                  <div>
                     <scroll-view style="height:260rpx" scroll-y>
                       <up-pic :url="baseUrl+'file/upload.json'" @myevent="upImgData" notli class='up-pic'/>
                     </scroll-view>
                  </div>
                </div>
                <div class="modelBtns">
                    <div @click="hideModel">取消</div>
                    <div @click="trueBtns">{{typeVal==1?'确认退款':'生成补款单'}}</div>
                </div>
             </div>
          </div>
      </div> -->
    </div>
</template>

<script>
  import orderItem from '@/components/order-item';
  import modalMenu from '@/components/modalMenu';
  import state from '@/store/order'
  const { $Toast } = require('../../../static/dist/base/index');
  export default {
    name: "order",
    data(){
      return {
        baseUrl:this.util.baseUrl,
        delArr:[],
        arrs:[],
     
        navScrollLeft:0,
        radio:[
          {name:'部分退款',id:1},
          {name:'增收补款',id:2},
        ],
        tabsData: {
          tabs: [
            {
              typeStatus: '',
              title: '全部'
            },
            {
                typeStatus: 1,
                title: '待付款'
            },
            {
              typeStatus: 2,
              title: '待交付'
            },
            {
              typeStatus: 3,
              title: '待结账'
            },

            {
              typeStatus: 4,
              title: '退款单'
            },
            {
              typeStatus: 5,
              title: '退补款单'
            }

          ],
          currentSelectTab: ""
        },

        //列表数据
        data:[],
        //屏幕高度
        height: wx.getSystemInfoSync().windowHeight,
        //筛选数据
        filterData:null,
        loadData:true,
        isLoad:false,
        show:false,
        page:1,//当前默认页数
        pageSize:10,
        l_time:'',
        records:'',
        tellVal:'',
        indexListId:'',//首页业务情况传入的id
        scrolls:'',
        newScroll:'',


        modelShow:false,
        uploadImg:'',//上传图片
        refundMoney:'',//退补款金额
        emitOrderItem:{}, //订单信息对象
        typeVal:1,//退补单弹框的值
      }
    },
    components:{
      orderItem,
      modalMenu
    },
    methods:{
      // refundMoeyInt(e){
      //   var val = e.mp.detail.value;
      //    if(this.typeVal==1){
      //      if(val>this.emitOrderItem.deliver_prices){
      //        this.refundMoney = 0;
      //        this.emitOrderItem.deliver_price = this.emitOrderItem.deliver_prices
      //        return
      //      }

      //      this.emitOrderItem.deliver_price =  (Number(this.emitOrderItem.deliver_prices) - Number(val)).toFixed(2)
      //    }else{
      //      this.emitOrderItem.deliver_price =  (Number(this.emitOrderItem.deliver_prices) + Number(val)).toFixed(2)
      //    }

      // },
      //订单信息
      // refundCEmit(e,p){
      //   this.modelShow = true;
      //   this.emitOrderItem.listId = e.id;
      //   this.emitOrderItem.user_receive_id = e.user_receive_id;
      //   this.emitOrderItem.user_link_id = e.user_link_id;
      //   this.emitOrderItem.deliver_price = e.deliver_price;
      //   this.emitOrderItem.deliver_prices = e.deliver_price;
      // },
      // trueBtns(e){
      //   if(this.refundMoney ==''){
      //     $Toast({
      //       content: '请填写退补款金额',
      //       type: 'warning'
      //     })
      //     return;
      //   }
      //   if(this.uploadImg ==''){
      //     $Toast({
      //       content: '请上传单据',
      //       type: 'warning'
      //     })
      //      return;
      //   }
      //    var data={};
     
      //    if(this.typeVal ==1) {
      //      //部分退款操作
      //       data={
      //           id: this.emitOrderItem.listId,// 订单id
      //           refund_price:this.refundMoney,//退款金额 单位元
      //           prod_img:this.uploadImg// 合同图片地址
      //       }
      //      this.api.addReturnChildSecuredSoItem(data).then(res=>{
      //         if(res.resultCode ==1000){
      //           this.page = 1;
      //           this.hideModel()
      //           // this.inits(this.tabsData.currentSelectTab);
      //         }
      //     }).catch(res=>{ 
      //         wx.showModal({
      //           content: res.error,
      //           confirmText: '确定',
      //           showCancel: false,
      //           confirmColor: '#FF5D22',
      //         })
      //       })
      //    }else{
      //      //补单操作
      //      data={
      //           user_receive_id:this.emitOrderItem.user_receive_id,// 接受人ID,
      //           user_link_id:this.emitOrderItem.user_link_id,//联系人id
      //           id:this.emitOrderItem.listId,// 订单ID
      //           prod_content:'',
      //           prod_price:this.refundMoney,// 商品价格
      //           prod_img:this.uploadImg// 合同图片地址
      //       }
      //      this.api.addChildSecuredSoItem(data).then(res=>{
      //         if(res.resultCode ==1000){
      //           this.page = 1;
      //           this.hideModel()
      //           // this.inits(this.tabsData.currentSelectTab);
      //         }
      //       }).catch(res=>{ 
      //         wx.showModal({
      //           content: res.error,
      //           confirmText: '确定',
      //           showCancel: false,
      //           confirmColor: '#FF5D22',
      //         })
      //       })
      //    }
      // },
      // hideModel(){
      //   this.modelShow = false;
      //   var radio=[
      //     {name:'部分退款',checked:true,id:1},
      //     {name:'增收补款',checked:false,id:2},
      //   ]
      //   this.radio=radio;
      //   this.refundMoney = '';
      //   this.prod_img = ''
      // },
   //上传图片返回 图片路径
      // upImgData(e) {
      //   if(e.mp.detail.del){
      //     this.delArr = [];
      //     var delArr = this.delArr;
      //     for(var i of e.mp.detail.del){
      //       delArr.push(i.path_server)
      //     }
      //     var del_s = delArr.join(";")
      //     this.uploadImg = del_s;
      //     this.arrs = delArr;
      //   }else{
      //     var img  = e.mp.detail;
      //     let arrs = this.arrs;
      //     arrs.push(img);
      //     var b = arrs.join(";")
      //     this.uploadImg = b;
      //   }
      // },
      // radioChange:function(e){
      //     this.typeVal = e;
      //     this.refundMoney = '';
      //     this.emitOrderItem.deliver_price = this.emitOrderItem.deliver_prices;
      // },
      bindscrolls(e){
        this.scrolls = e.target.scrollTop
      },
      //详情
      detailClick(e){
      let oldOrderList = wx.getStorageSync('oldOrderList');
      if(oldOrderList){
        oldOrderList.scroll = this.scrolls
      }
   
//缓存当前数据
        wx.setStorageSync('oldOrderList',oldOrderList) 

         wx.navigateTo({url:'../orderDetail/main?id='+e+'&distinguishOrder='+true+''})
      },
      //交付成功 刷新页面
      securedSoItem(){
        this.page = 1;
        this.inits(this.tabsData.currentSelectTab);
      },
      switchNav(index) {
        var singleNavWidth = wx.getSystemInfoSync().windowWidth/ 5;
            this.navScrollLeft = (index - 2) * singleNavWidth
      },
      //切换任务类型
      onTabsItemTap(e,index){
    
        this.switchNav(index)
        this.tabsData.currentSelectTab = e.typeStatus
        let data = {
              page:1,
              pagesize:10,
              typeStatus:e.typeStatus
            } 
            if(this.tellVal){
              data.k=this.tellVal;
            }
            if(this.l_time){
              data.days=this.l_time;
            }
          wx.setStorageSync('oldOrderList')//清空当前缓存
          this.init(data)
      },
      //展示菜单
      showModal(){
        console.log(state.state.isShowModal);
        if(state.state.isShowModal){
          state.commit('hideState');
        }else{
          state.commit('changeState');
        }
        console.log(state.state.isShowModal);
      },
      //筛选
      filter(val){
        console.log('val',val);
        //重置
        this.page = 1;
        this.loadData = true;
        this.l_time = val.time;
        this.loadMore(val,'filters');
      },
      loadMore(type,filters){
        var oldOrderList = wx.getStorageSync('oldOrderList') 
        if(!this.loadData){
          return false;
        }
        this.isLoad = true;
        let page = oldOrderList.page ? oldOrderList.page: this.page;
        this.page = page+1

        let rdata = this.data;
        let self = this;
        let obj = {
          page: page+1,
          pagesize: oldOrderList.page?10:this.pageSize,
          k:this.tellVal,
          typeStatus:this.tabsData.currentSelectTab
        }


        if(filters=='filters'){
          self.data = []
        }
       if(this.l_time){
         obj.days = this.l_time;
       }
        
// listGroupBySoId
        this.api.getOrderData(obj).then(res=>{

          self.isLoad = false;
          let data = res.data;
          if(data.length<10) self.loadData = false;
          for(let o of data){
            o.apistatus = o.status
            o.status = this.api.filterStatus(o.status,'order');
          }
          if(type.time || type.time==""){
            self.data = data;
          }else{
            self.data = rdata.concat(data);
          }

          // self.page = page+1;
          this.records = res.records;
        
        if(oldOrderList){
          oldOrderList.page = obj.page
        }
//缓存当前数据
        wx.setStorageSync('oldOrderList',oldOrderList) 

        }).catch(err=>{
          self.isLoad = false;
          $Toast({
            content:err.error,
            type: 'warning'
          })
        })
      },
      //搜索
      searchData(e){
        wx.setStorageSync('oldOrderList')//清空当前缓存
        
        let val = e.target.value;
   
        if(val.length === 11){
          if(!(/^1[34578]\d{9}$/.test(val))){
            $Toast({
              content:'手机号不正确',
              type: 'warning'
            })
          } else{
            this.data = [];
            this.tellVal = val;
            let data = {
              page:1,
              pagesize:10,
              k:val,
              typeStatus:this.tabsData.currentSelectTab
            } 
             this.init(data)
          }
        }else if(val == ''){
          this.page = 1;
          this.tellVal = '';
          this.inits(this.tabsData.currentSelectTab);
        }
      },
      inits(typeStatus,cal){
       
          var obj = {
            page: this.page,
            pagesize:this.pageSize || 10,
            typeStatus:typeStatus,
          }
          //返回列表页，保留搜索数据
          if(this.tellVal){
            obj.k = this.tellVal
          }

          this.init(obj,res=>{
            (cal && typeof(cal) === "function") && cal();
          })
      },
      init(obj,callback){
        let oldOrderList = wx.getStorageSync('oldOrderList');

        let self = this;
        this.page = 1;
        this.data = []
        this.api.getOrderData(obj).then(res=>{

        let data = res.data;

        var item ={
          page:this.page,
          scroll:this.scrolls || 0,
          tabs:this.tabsData.currentSelectTab,
          tellVal:this.tellVal
        }
        if(oldOrderList){
          item.page =  oldOrderList.page
        }
//缓存当前数据
        wx.setStorageSync('oldOrderList',item) 

          for(let o of data){
            o.apistatus = o.status
            o.status = this.api.filterStatus(o.status,'order');
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
       
          this.data = data;
          this.records = res.records;
          (callback && typeof(callback) === "function") && callback();

        }).catch(err=>{
          console.log('err',err);
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
      this.newScroll  = 0
      var oldOrderList  = wx.getStorageSync('oldOrderList');

      var query = this.$root.$mp.query;
      var shopId = query.shopid;
      var indexListId = query.id;
      this.shopId =shopId;

      var ids = query.id || oldOrderList.tabs
      
       if(ids){
          this.indexListId = query.id;
          this.tabsData.currentSelectTab = ids
      }
  //详情页面返回，列表保留当前位置
        if(oldOrderList){
            this.page =  1
            this.pageSize = oldOrderList.page * 10
            this.tellVal = oldOrderList.tellVal
        }

        this.inits(this.tabsData.currentSelectTab,res=>{
            this.newScroll = oldOrderList?oldOrderList.scroll : 0;
        });
      


    }
  };
</script>

<style lang="scss">
  @import "../../assets/sass/order";
  /***退补款 */
  .models{
    .modelShow{
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
    }
    .content{
      background: #FFF;
      position: fixed;
      top: 20%;
      width: 90vw;
      padding-bottom: 30px;
      left: 50%;
      margin-left: -45vw;
      z-index: 9999;
      h3{
        font-weight: normal;
        text-align: center;
        color: blue;
        font-size: 16px;
        padding-top: 20px;
      }
      >div{
        margin-top:20px;
        margin-left: 25px;
        
        .tabList{
            display: flex;
            align-items: center;
            justify-content: space-around;
          p{
             font-size: 14px;
             position: relative;
             &::before{
                position: absolute;
                left: -40rpx;
                top: 5rpx;
                border-radius: 100%;
                width: 32rpx;
                height: 32rpx;
                content: '';
                background: #ccc;
             }
            }
          }
          .active::after{
              position: absolute;
              left: -32rpx;
              top: 15rpx;
              border-radius: 100%;
              width: 12rpx;
              height: 12rpx;
              content: '';
              background: #000;
        }
        .modelList{
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-top: 20px;
          span{
             color: blue;
          }
          input{
             border: 1px solid #ccc;
             padding-left: 10px;  
          }
        }

        >p{
          color: red;
          margin-top: 20px;
          font-size: 14px;
        }

        .contract{
          margin-top: 20px;
          display: flex;
          font-size: 14px;
          div{
            flex: 3;
          }
          span{
            margin-right: 10px;
            flex: 1;
          }
        }

        .modelBtns{
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-top: 20px; 
          margin-left: -25px;
          >div{
            background: #ccc;
            color: #ffffff;
            font-size: 14px;
            border-radius: 6px;
            width: 160rpx;
            text-align: center;
            padding: 12rpx 0;
            &:last-of-type{
              background: #FF5D22;
            }
          }
        }
      }
    }
  }
  
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

.topFlexs{
  display: flex;
  align-items: center;
  margin-top: 55px;
  .widths{
    flex: 1;
  }
}
.tabs-item  text{
   border-bottom: 4px solid transparent;
   padding-bottom: 12px;
}
.tabs-item.active text{
  border-color:#FF5D22;
}
.tabs-box{
  height:55px;
  background-color: #fff;
  border-bottom: 1px solid #E9E9E9;
  align-items: center;
  box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
}

.tabs-item{
  width: 20%;
  display: inline-block;
  text-align: center;
  font-size: 15px;
}
.nav {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    height:55px;
    line-height:55px;
    white-space: nowrap;
}


</style>
