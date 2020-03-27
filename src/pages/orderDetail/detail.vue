<template>
    <div class="home" >
      <div class="content">
        <div class="c_title" v-if="data.so_type!=3 && data.so_type!=4">
          {{(distinguishOrder==='false'?'订金单编号:':'订单号:')+data.so_number}}
        </div>
        <div class="c_title" v-if="(data.so_type==3 || data.so_type==4) && (data.refund_number || data.item_number)">
          {{data.so_type==3?'补款单号:'+data.item_number:'退款单号:'+data.refund_number}}
        </div>


        <div class="c_content">
          <div class="c_row">
            <span class="c_r_txt">联系人:</span>
            <div class="c_r_content">{{data.link_name}} {{data.link_mobile}}</div>
          </div>
          <div class="c_row">
            <span class="c_r_txt">地址:</span>
            <div  class="c_r_content">{{data.village_name}} {{data.door_number}}</div>
          </div>
          <div class="c_row">
            <span class="c_r_txt">项目名称:</span>
            <div  class="c_r_content">{{data.project_name}}</div>
          </div>

          <div class="c_row activeColor" v-if="data.so_type==4||data.so_type==3">
            <span class="c_r_txt">{{data.so_type==4?'部分退款金额:':data.so_type==3?'补款金额:':''}}</span>
            <div  class="c_r_content">￥{{data.pay_price}}</div>
          </div>

          <div>
             
          </div>


          <div class="c_row" v-if="distinguishOrder==='false'">
            <span class="c_r_txt">项目订金:</span>
            <div  class="c_r_content goldColor">￥{{data.pay_price || 0}}  <span v-if='data.end_at'>(有效期:{{data.end_at}})</span>  </div>
          </div>

          <div class="c_row" v-if="distinguishOrder==='true' && data.so_type!=4 && data.so_type!=3">
            <span class="c_r_txt">转单次数:</span>
            <div  class="c_r_content">{{'第'+data.turn_sort+'次转单'}}</div>
          </div>

          <div class="c_row" v-if="distinguishOrder==='true' && data.secured_trans==2  && data.so_type!=4 && data.so_type!=3">
            <span class="c_r_txt">订单金额:</span>
            <div  class="c_r_content goldColor">￥{{data.AllparentTatolRealMoney?data.AllparentTatolRealMoney:'0'}}（包含退补款金额）</div>
          </div>

          <div class="c_row" v-if="distinguishOrder==='true' && data.so_type!=4 && data.so_type!=3">
            <span class="c_r_txt">转单金额:</span>
            <div  class="c_r_content goldColor">￥{{data.secured_trans==2 ?data.pay_price : data.prod_price}} ({{data.deducation_fee?'订金抵扣:￥'+data.deducation_fee+'':'无抵扣订金'}}) </div>
          </div>

          <div class="c_row" v-if="distinguishOrder==='true'  " id="imgStyle"> 
            <span class="c_r_txt">合同/单据:</span>
            <div  class="c_r_content">
              <img :src="arr"  v-for="(arr,index) in data.prod_img " :key='index' alt="" :style="{'margin-right':index==2?0:''}" @click="lookImg(index,data.prod_img)">
            </div>
          </div>

          <div class="c_row" v-if="distinguishOrder==='true' && (data.so_type!=4 && data.so_type!=3) ">
            <span class="c_r_txt">订单状态:</span>
            <div  class="c_r_content" v-if="data.apiOrderStatus==-1 && data.pay_status==0">已取消</div>

            <div class="c_r_content" v-if='data.deliver_status==3'>提现中</div>

            <div class="c_r_content" v-if='data.deliver_status==4'>已提现</div>

            <div  class="c_r_content" v-if="data.pay_status==0 && data.apiOrderStatus==0 && (data.so_type!=3 && data.so_type!=4)">待付款</div>
            <div  class="c_r_content" v-if="data.pay_status==1 && data.apiOrderStatus==0 && (data.so_type!=3 && data.so_type!=4)">已付款</div>
<!-- 非担保交易 订单状态-->
            <div  class="c_r_content" v-if="data.pay_status==1 && data.apiOrderStatus==1 && (data.secured_trans ==1 || !data.secured_trans) && (data.so_type!=3 && data.so_type!=4)">待验收</div>
            <div  class="c_r_content" v-if="data.pay_status==1 && data.apiOrderStatus==2 && (data.secured_trans ==1 || !data.secured_trans) && (data.so_type!=3 && data.so_type!=4)">已验收</div>
<!-- 非担保交易 订单状态 end-->
            <div  class="c_r_content" v-if="data.deliver_status == 1 && data.secured_trans==2">待结账</div>
            <div  class="c_r_content" v-if="data.deliver_status == 2 && data.secured_trans==2">待提现</div>
            <div  class="c_r_content" v-if="data.so_type!=4 && data.so_type!=3 &&(data.apiOrderStatus== -2 || data.pay_status== -1)">
              <div  v-if="data.refund_verify_status == 2">已退款</div>
              <div  v-if="data.refund_verify_status == nul || data.refund_verify_status == 0">待退款</div>
            </div>
          </div>
<!--退补单状态-->
          <div  class="c_row" v-if="data.secured_trans==2 && (data.so_type==4 || data.so_type==3)">
              <span class="c_r_txt">{{data.so_type==3?'补款状态：':'退款状态：'}}</span>
 <!--退补款类型-->
            <div class="c_r_content"  v-if="data.pay_status==-1 &&(data.so_type==4 || data.so_type==3)">已退款</div>
            <div  class="c_r_content" v-if="data.pay_status==1  && (data.so_type==3 || data.so_type==4)">已补款</div>
            <div  class="c_r_content" v-if="data.pay_status==0  && (data.so_type==3 || data.so_type==4) && data.apiOrderStatus==-1">已取消</div>
<!--补款类型-->
            <div  class="c_r_content" v-if="data.pay_status==0  && data.apiOrderStatus==0 && (data.so_type==3 || data.so_type==4)">待补款</div>
            <div  class="c_r_content" v-if="data.pay_status==-2  && (data.apiOrderStatus==-2 || data.apiOrderStatus==0) && (data.so_type==3 || data.so_type==4)">退款中</div>
          </div>

          <div class="c_row" v-if="distinguishOrder==='true' && (data.so_type!=4 && data.so_type!=3) ">
            <span class="c_r_txt">交付状态:</span>
            <div  class="c_r_content">{{data.deliver_status==0?'待交付':'已交付'}}</div>
          </div>

          <div class="c_row" v-if="distinguishOrder==='true' && (data.so_type!=4 && data.so_type!=3)">
            <span class="c_r_txt">转单时间:</span>
            <div  class="c_r_content">{{data.create_at}}</div>
          </div>

          <div class="c_row" v-if="data.deliver_time && (data.so_type!=4 && data.so_type!=3)">
            <span class="c_r_txt">交付时间:</span>
            <div  class="c_r_content">{{data.deliver_time}}</div>
          </div>

          <div class="c_row" v-if="data.deliver_price && data.secured_trans!=2">
            <span class="c_r_txt">交付更新:</span>
            <div  class="c_r_content">{{'订单金额由￥'+data.prod_price+'更新为￥'+data.deliver_price}}</div>
          </div>

          <div class="c_row" v-if="data.deliver_content && data.secured_trans!=2">
            <span class="c_r_txt">更新理由:</span>
            <div  class="c_r_content">{{data.deliver_content}}</div>
          </div>

          <div class="c_row" v-if="data.deliver_img && data.deliver_price!=data.prod_price && data.secured_trans!=2" id="imgStyle"> 
            <span class="c_r_txt">合同/单据:</span>
            <div  class="c_r_content">
              <img :src="arr"  v-for="(arr,index) in data.deliver_img " :key='index' alt="" :style="{'margin-right':index==2?0:''}" @click="lookImg(index,data.deliver_img)">
            </div>
          </div>


          <div class="c_row" v-if="distinguishOrder==='false'">
            <span class="c_r_txt">订金状态:</span>
            <div  class="c_r_content">{{data.status}}</div>
          </div>
          
          <div class="c_row" v-if="distinguishOrder==='false'">
            <span class="c_r_txt">下单时间:</span>
            <div  class="c_r_content">{{data. create_at}}</div>
          </div>

          <div class="c_row" v-if="data.pay_at">
            <span class="c_r_txt">支付时间:</span>
            <div  class="c_r_content">{{data.pay_at==null?'暂未支付':data.pay_at}}</div>
          </div>

          <div class="c_row" v-if="data.transaction_id && data.deliver_status==1 &&  data.secured_trans==2 && (data.so_type!=4 && data.so_type!=3)">
            <span class="c_r_txt">支付单号:</span>
            <div  class="c_r_content">{{data.transaction_id}}</div>
          </div>

          <div class="c_row" v-if="data.pay_at && data.secured_trans==2 && data.so_type==3">
            <span class="c_r_txt">补款时间:</span>
            <div  class="c_r_content">{{data.pay_at}}</div>
          </div>
          
          <div class="c_row" v-if="data.refund_time && data.secured_trans==2">
            <span class="c_r_txt">退款时间:</span>
            <div  class="c_r_content">{{data.refund_time}}</div>
          </div>

          <div class="c_row"  v-if="distinguishOrder==='false'">
            <span class="c_r_txt">支付方式:</span>
            <div  class="c_r_content">{{data.a}}</div>
          </div>

          <div  v-if="distinguishOrder==='false'" >
             <div v-for="(items,index) in orderlist" class="c_row listArrs" :key='index'>
                <span class="c_r_txt">{{'第'+(index+1)+'次转单时间:'}}</span>
                <div  class="c_r_content">{{items.create_at}}</div>
             </div>
          </div>


          
          <!--查看子订单-->
          <div v-if="(data.so_type!=4 && data.so_type!=3) && data.secured_trans==2" id="childIds">
              <div v-for="(arr,index) in childrenList" :key="index" >

                <div class="childrFlex">
                  <span>{{arr.so_type==4?'退款金额：':'补款金额：'}} {{arr.pay_price}}元</span>

                  <div class="upList" @click="downClick(index)">
                    {{!arr.hiddens?"展开":"收回"}}
                    <img :style="{transform:!arr.hiddens? 'rotate(90deg)':'rotate(-90deg)'}" class="h_img" :src="'../../assets/images/iconfontjiantou5.png'"/>
                  </div>
                </div>


              <div class="contents" v-if="arr.hiddens">
                <div class="firstFlex">
                    <div>
                        <span>{{arr.so_type==3?'补款金额：':'退款金额：'}}</span>
                        <span>{{arr.pay_price}}元</span>
                    </div>
  <!--退补款类型-->
                    <div>
                      <div class="c_r_content"  v-if="arr.pay_status==-1 && (arr.so_type==3 || arr.so_type==4)">已退款</div>
                      <div class="c_r_content"  v-if="arr.pay_status==0  && (arr.so_type==3 || arr.so_type==4) && arr.status==-1">已取消</div>
                      <div  class="c_r_content" v-if="arr.pay_status==1  && (arr.so_type==3 || arr.so_type==4)">已补款</div>
                      <div  class="c_r_content" v-if="arr.pay_status==0  && arr.status==0 && (arr.so_type==3 || arr.so_type==4)">待补款</div>
                      <div  class="c_r_content" v-if="arr.pay_status==-2 && (arr.status==-2 || arr.status==0) && (arr.so_type==3 || arr.so_type==4)">退款中</div>
                    </div>
                </div>

                <div>
                    <span>{{arr.so_type==3 && arr.pay_at?'补款时间：': arr.so_type==4 && arr.refund_time ?'部分退款时间：':'创建时间：'}}</span>
                    <span>{{arr.so_type==3 && arr.pay_at ? arr.pay_at:arr.so_type==4 && arr.refund_time?arr.refund_time:arr.create_at}}</span>
                </div>
                <div>
                    <span>{{arr.so_type==3?'补款单号：':'部分退款单号：'}}</span>
                    <span>{{arr.so_type==3?arr.item_number:arr.refund_number}}</span>
                </div>
                <div class="lastDiv"> 
                    <p class="margin-r" v-if=" (arr.pay_status==1 && arr.pay_status!=-2) && (arr.status==0 || arr.status==1) && (arr.so_type==3 || arr.so_type==4) && arr.deliver_status<2" @click="refundMoneyChildren(1,arr)">退款</p>

                    <p class="margin-r" v-if="(arr.pay_status==1 && arr.pay_status!=-2)  && arr.status==-2 && (arr.so_type==3 || arr.so_type==4)" @click="refundMoneyChildren(2,arr)">同意退款</p>
                    <p class="margin-r" v-if="(arr.pay_status==1 && arr.pay_status!=-2)  && arr.status==-2 && (arr.so_type==3 || arr.so_type==4)" @click="refundMoneyChildren(3,arr)">拒绝退款</p>
                    
                    <p @click="lookChildren(arr)">查看详情</p>
                </div>
              </div>
              </div>
          </div>

        </div>
      </div>
      <i-spin :size="'large'" fix v-if="isShowLoading"></i-spin>
      

<!--显示 已转单|| 待转单 按钮-->
      <div class="styleFooterBtns">
<!--订金————待转单 按钮-->
        <div v-if="data.apiStatus==1 " class="goChangeOrder" @click="t_diago=true">立即转单</div>
<!--订金————再次转单 按钮-->
        <div v-if="data.apiStatus==2" class="SecondChangeOrderFlex">
          <div class="lookChangeOrder" @click="lookChangeOrder">查看转单</div>
          <div class="secondChangeOrder" @click="nextOrder">再次转单</div>
        </div>
<!--订单————立即交付-->
        <div  class="SecondChangeOrderFlex" v-if="(data.deliver_status==0) && (data.apiOrderStatus>=0) && (data.pay_status==1) && (data.so_type!=4 && data.so_type!=3) ">
          <div class="lookChangeOrder" @click="refundMoneyBtn" v-if="data.secured_trans==2">操作退补款</div>
          <div class="secondChangeOrder" @click="gopayOrder">立即交付</div>
        </div>
<!--订单————结账-->
        <div  class="SecondChangeOrderFlex" v-if="data.deliver_status == 1 && (data.so_type!=4 && data.so_type!=3 && data.so_type!=0) && data.secured_trans==2">
          <div class="lookChangeOrder" @click="refundMoneyBtn">操作退补款</div>
          <div class="secondChangeOrder" @click="SecuredSoItemMoneyBtn">申请结账</div>
        </div>
<!--订单————同意/拒绝退款-->
        <div  class="SecondChangeOrderFlex" v-if="(data.apiOrderStatus== -2 || data.pay_status== -1) && data.refund_verify_status==0 && data.so_type!=4 && data.so_type!=3 && data.secured_trans==2">
          <div class="lookChangeOrder" @click="securedSoItemBtn(true,data.pid)">退款</div>
          <div class="secondChangeOrder" @click="securedSoItemBtn(false,data.pid)">拒绝退款</div>
        </div>
<!--订单———— 查看原订单-->
        <!-- <div v-if="data.so_type==4 || data.so_type==3" class="goChangeOrder" @click="lookParentDetail">查看原订单</div> -->

      </div>

  <!--转单弹框-->
    <t-diago :hiddens="t_diago" @getTrue="getTrue" @getfalse="getfalse"></t-diago>
  <!--部分退款，补单弹框-->    
      <div class="models" v-if="modelShow">
          <div class="modelShow" @click="hideModel"></div>
          <div class="content">
             <h3>订单退补款</h3>
             <div>
                <div class="tabList">
                  <p  :class="{'active':typeVal==index+1}" v-for="(item,index) in radio" :key='index' @click="radioChange(item.id)">{{item.name}}</p>
                </div>
              
                <div class="modelList">
                   <span>退补款金额：</span>
                   <input type="digit" v-model="refundMoney" @input="refundMoeyInt">
                </div>
                <p>退补款后订单金额：{{newdeliver_price}}元</p>
                <p v-if="typeVal==1 && data.deliver_price">(退款金额不得超过{{data.deliver_price}})</p>
                <p v-if="typeVal==1 && !data.deliver_price">(暂无可用退款金额)</p>
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
      </div>
      <i-toast id="toast" />
    </div>
</template>

<script>
import tDiago from '@/components/diago';

import order from '../../store/order';

const { $Toast } = require('../../../static/dist/base/index');
  export default {
    name: "detail",
    components:{
      tDiago,
    },
    data(){
      return{
        query:'',
        baseUrl:this.util.baseUrl,
        modelShow:false,
        radio:[
          {name:'部分退款',id:1},
          {name:'补收款',id:2},
        ],
        typeVal:1,//退补单弹框的值
        delArr:[],
        arrs:[],
        uploadImg:'',//上传图片
        refundMoney:'',//退补款金额

        orderlist:[],//多少次转单数组
        t_diago:false,
        distinguishOrder:'',  //true：订单详情  false：订金单详情
        id:'',
        data:{
          types:Boolean,// true：已交付  false：未交付,
          apiStatus:'',//订金状态
          apiOrderStatus:'',//订单状态
        },
        isShowLoading:true,
        //高度
        height:wx.getSystemInfoSync().windowHeight,
        childrenList:'',//查看子订单
        reush:true,
        chiObj:{ //补款单 退款开关
          chiOff:false
        },
        hiddensObj:{
          scrollow:'',
          hiddensArrId:[],//缓存当前id
        },
        newdeliver_price:'0',//订单总金额 - 输入金额
        parentTatolRealMoney:'',//订单总金额（不包含订金）
        AllparentTatolRealMoney:'' //订单总金额（包含订金）
      }
    },

    onLoad(){
       order.commit('prevPage','');
       Object.assign(this.$data, this.$options.data());
    },
    onPageScroll:function(e){ // 获取滚动条当前位置

    if(e.scrollTop){
      wx.setStorageSync('scrollTop',e.scrollTop);
    }
        
    },
    onShow(){
        let query = this.$root.$mp.query;

        this.id = query.id;

        if(order.state.pid){
          query.id = query.pid
        }
        this.query = query

        if(!this.query.pid){
           wx.setStorageSync('hiddenId');
           wx.setStorageSync('scrollTop');
        }
        //query.distinguishOrder  true：订单详情  false：订金单详情

        //query.types  true：已交付  false：未交付

        this.types = query.types  
        this.distinguishOrder = query.distinguishOrder

        this.itemApi(query)
    },

    methods:{
      //收回 展开
      downClick:function(index){
        var hiddensArrId = this.hiddensObj.hiddensArrId;
        if(wx.getStorageSync('hiddenId')){
          hiddensArrId = wx.getStorageSync('hiddenId')
        }

         if(this.childrenList[index].hiddens==true){
           this.$set(this.childrenList[index],'hiddens',false);

           hiddensArrId.splice(hiddensArrId.indexOf(this.childrenList[index].id),1)
         }else{
           this.$set(this.childrenList[index],'hiddens',true);

            hiddensArrId.push(this.childrenList[index].id)

         }
          wx.setStorageSync('hiddenId',hiddensArrId)
      },
//查看子订单
    lookChildren(e){
        wx.navigateTo({url:'../orderDetail/main?id='+e.id+'&distinguishOrder='+true+'&pid='+e.parent_id+''})
    },
//已补款退全款操作
    refundMoneyChildren(status,item){
   // 1：直接退款 2：同意退款 3：拒绝退款
      var hiddensObj = this.hiddensObj;

        var obj = {
          chiOff:true,
          chiPayPrice:item.pay_price
        }
        this.chiObj = obj

        if(status==1){
            this.securedSoItemBtn('refund',item.id)
        }else if(status==2){
            this.securedSoItemBtn(true,item.id)
        }else{
          this.securedSoItemBtn(false,item.id)
        }
          
    },
  //父订单同意/拒绝 退款
      securedSoItemBtn(type,id){
// refund：直接退款  agree：同意退款  false：拒绝退款
        var types = type=='refund'?'refund': type?'agree':'';

        var data={
          type:types,
          id:id
        }

        var str = ''
        var type = Boolean;
        var childrenList = this.childrenList;
        var isPay_status =  childrenList.every(item => item.pay_status!=1)

        if(!types){
            wx.showModal({
                  title:'退款情况',
                  content: "拒绝用户退款请求请及时联系用户确认情况",
                  showCancel: true,
                  cancelText: '取消',
                  cancelColor: '#999999',
                  confirmText: '确定',
                  confirmColor: '#FF5D22',
                  success: (res) => {
                    this.chiObj.chiOff = false
                    if (res.confirm==true){
                      this.securApi(data)
                    }
                  }
                })
        }else{
          
          if(this.chiObj.chiOff){
            str = `补款金额：${this.chiObj.chiPayPrice}元原路返还给用户`;
            type = false
          }else{
              //如果补款都没有选择同意退款则提示商家确认退款操作
              if(!isPay_status){
                str = '请先确认已补款单的退款情况再进行确认退款操作！'
                type = true
              }else{
                type = false
                str = `订单金额：${this.data.deliver_price || this.data.pay_price}元原路返还给用户`;
                var strs = `退回订金：${this.data.deducation_fee}元；\r\n`;
                str = strs.concat(str)
              }
          }

          wx.showModal({
              title:'退款情况',
              content: str,
              showCancel: true,
              cancelText: '取消',
              cancelColor: '#999999',
              confirmText: '确定',
              confirmColor: '#FF5D22',
              success: (res) => {
                console.log(res);
                this.chiObj.chiOff = false
                if (res.confirm==true){
                  //如果补款都没有选择同意退款则终止退款
                  if(type) return  
                   this.securApi(data)
                }
              }
            })
        }

        
      },
      //同意/拒绝退款API
      securApi(data){
        this.api.securedSoItemBtn(data).then(res=>{
          if(res.resultCode ==1000){
              wx.showModal({
                content:'操作成功',
                showCancel: false,
                confirmText: '确定',
                confirmColor: '#FF5D22',
                success: (res) => {
                  console.log(res);
                  if (res.confirm==true){
                   this.itemApi(this.query)
                  }
                }
              })
          }
        }).catch(res=>{ 
              wx.showModal({
                content: res.error,
                confirmText: '确定',
                showCancel: false,
                confirmColor: '#FF5D22',
              })
            })
      },
  //显示弹框
      refundMoneyBtn(){
        this.modelShow = true;
      },
  //关闭弹框
    hideModel(){
        this.modelShow = false;
        var radio=[
          {name:'部分退款',checked:true,id:1},
          {name:'补收款',checked:false,id:2},
        ]
        this.radio=radio;
        this.refundMoney = '';
        this.prod_img = ''
      },
         //上传图片返回 图片路径
      upImgData(e) {
        console.log(e,"哈哈哈")
        if(e.mp.detail.del){
          this.delArr = [];
          var delArr = this.delArr;
          for(var i of e.mp.detail.del){
            delArr.push(i.path_server)
          }
          var del_s = delArr.join(";")
          this.uploadImg = del_s;
          this.arrs = delArr;
        }else{
          var img  = e.mp.detail;
          let arrs = this.arrs;
          arrs.push(img);
          var b = arrs.join(";")
          this.uploadImg = b;
        }
      },
      radioChange:function(e){
          this.typeVal = e;
          this.refundMoney = '';
          this.newdeliver_price =  this.data.AllparentTatolRealMoney;
      },
      //退补款确定按钮
      trueBtns(e){
        var that = this;
        if(this.refundMoney ==''){
          $Toast({
            content: '请填写退补款金额',
            type: 'warning'
          })
          return;
        }
        console.log(this.uploadIm,"this.uploadIm")
        if(this.uploadImg ==''){
          $Toast({
            content: '请上传单据',
            type: 'warning'
          })
           return;
        }
         var data={};
     
         if(this.typeVal ==1) {
           //部分退款操作
            data={
                id: this.data.id,// 订单id
                refund_price:this.refundMoney,//退款金额 单位元
                prod_img:this.uploadImg// 合同图片地址
            }
           this.api.addReturnChildSecuredSoItem(data).then(res=>{
               setTimeout(()=>{
                 that.itemApi(that.query)
               },600)
               that.hideModel()
          }).catch(res=>{ 
              wx.showModal({
                content: res.error,
                confirmText: '确定',
                showCancel: false,
                confirmColor: '#FF5D22',
              })
            })
         }else{
           //补单操作
           data={
                user_receive_id:this.data.user_receive_id,// 接受人ID,
                user_link_id:this.data.user_link_id,//联系人id
                id:this.data.id,// 订单ID
                prod_content:'',
                prod_price:this.refundMoney,// 商品价格
                prod_img:this.uploadImg// 合同图片地址
            }
           this.api.addChildSecuredSoItem(data).then(res=>{
             
               setTimeout(()=>{
                 that.itemApi(that.query)
               },600)
              that.hideModel()
            }).catch(res=>{ 
              wx.showModal({
                content: res.error,
                confirmText: '确定',
                showCancel: false,
                confirmColor: '#FF5D22'
              })
            })
         }
      },
      //部分退款输入事件
      refundMoeyInt(e){
         var val = e.mp.detail.value;
         var parentTatolRealMoney = this.data.AllparentTatolRealMoney;

         if(this.typeVal==1){
           if(val>this.data.deliver_prices){
             this.refundMoney = 0;
             this.newdeliver_price = parentTatolRealMoney 
             return
           }
           this.newdeliver_price =  (Number(parentTatolRealMoney) - Number(val)).toFixed(2)
         }else{
           this.newdeliver_price =  (Number(parentTatolRealMoney) + Number(val)).toFixed(2)
         }
      },
    //结账
      SecuredSoItemMoneyBtn(){
        var that = this;
        wx.showModal({
        content: "结账后无法进行退补款确认订单金额无误申请结账?",
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#999999',
        confirmText: '确定',
        confirmColor: '#FF5D22',
        success: (res) => {
          console.log(res);
          if (res.confirm==true){
            this.api.accountSecuredSoItem(this.data.id).then(res=>{
               that.itemApi(that.query)
            }).catch(res=>{ 
              wx.showModal({
                content: res.error,
                confirmText: '确定',
                showCancel: false,
                confirmColor: '#FF5D22',
              })
            })
          }
        }
      })
      },

      gopayOrder:function(){
        var objs = this.data;
//担保交易交付成功 跳到列表页面        
        if(objs.so_type==2 || objs.so_type==3){
            var data ={
              id:objs.id,// 订单ID
              deliver_img:objs.prod_img,// 合同地址
              deliver_content:objs.prod_content,// 交付内容
            }
            wx.showModal({
                  content: "货物已经完全交付给用户！",
                  showCancel: true,
                  cancelText: '取消',
                  cancelColor: '#999999',
                  confirmText: '确定',
                  confirmColor: '#FF5D22' ,
                  success:  (res) =>{
                      if (res.confirm) {
                          this.api.deliverSecuredSoItem(data).then(res=>{
                            console.log(res,"1")
                            if(res.resultCode === 1000){
                                this.itemApi(this.query)
                              }
                          }).catch( resp =>{
                            console.log(resp,"2")
                            wx.showModal({
                              content: resp.error,
                              confirmText: '确定',
                              showCancel: false,
                              confirmColor: '#FF5D22',
                              success:(relove)=>{
                                if(relove.confirm){
                                  this.itemApi(this.query)
                                }
                              }
                            })
                          })
                      } else if (res.cancel) {
                          console.log('用户点击取消')
                      }
                  },
                  fail:function (res) {
                      console.log('取消')
                  }
              })
            return
        }  
//非担保 跳到详情页面
        wx.navigateTo({
          url:'../writeSubscription/main?id='+this.data.id+'&user_id='+this.data.user_id+'&payorder=payorder'
        })
      },
  
      //查看转单列表
      lookChangeOrder:function(){
        wx.navigateTo({url:'../changeOrderList/main?id='+this.id})
      },
//再次转单
    nextOrder:function(){
      let param = {
          userCode:this.data.code,
          mobile:this.data.mobile
      }

      this.FnOrderTrue(param) 
    },
   //转单码弹框确认按钮
      getTrue:function(e){
        if(e != 4 && e !== this.data.code){
          wx.showToast({
            title: '转单码不正确',
            type:'warning'
          })
          return false;
        }

        this.t_diago = false

        let param = {
          userCode:e,
          mobile:this.data.mobile
        }

        this.FnOrderTrue(param)      

      },
//转单验证接口
      FnOrderTrue:function(param){
       this.api.searchPhone(param).then(res=>{
            console.log('sss',res);
            wx.navigateTo({
              url:'../writeSubscription/main?id='+res.data.so_id+'&user_id='+res.data.user_id
            })
        }).catch(err=>{
          wx.showToast({
             title: err.error,
             icon:'none'
          })
        });
      },
      //关闭弹框
      getfalse:function(e){
        this.t_diago =  false
      },
       //点击放大图片
      lookImg:function(index,item){
        console.log(item,"item")
        wx.previewImage({
          current: item[index],
          urls:item
        })
      },

      itemApi(query){
         let self = this;
         self.isShowLoading = true;

      if(query.distinguishOrder==='true'){
        var scrollTop =  wx.getStorageSync('scrollTop')
  //订单详情状态
        this.api.soitemList(query.id).then(res=>{
            
            self.arrs = []

             let data = res.data;

             data.apiOrderStatus = typeof(data.apiOrderStatus)=='number'? data.apiOrderStatus : data.status;

             data.status = this.api.filterStatus(data.status);
//分割图片
            if(data.deliver_img){
                data.deliver_img = data.deliver_img.split(';')
            }

            if(data.prod_img){  
              data.prod_img = data.prod_img.split(';')
            }
             
             data.deliver_prices = data.deliver_price
             data.AllparentTatolRealMoney =  (Number(data.parentTatolRealMoney) + Number(data.deducation_fee)).toFixed(2) //订单总金额（包含订金）

             data.pay_price =  (Number(data.pay_price) + Number(data.deducation_fee)).toFixed(2) //转单金额（使用了订金则加订金，没使用不加订金）
             self.newdeliver_price =  (Number(data.parentTatolRealMoney) + Number(data.deducation_fee)).toFixed(2)  //退补款显示的订单总金额(包含订金)
             data.pid = data.id //用于父订单的同意/拒绝操作退款
             self.data = data;
            
 //解决上传图片后 会自动调用onshow周期。为防止填写金额重置，在此加入以下代码                 
          if(self.typeVal==1){
            self.newdeliver_price =  (Number(this.data.AllparentTatolRealMoney) - Number(this.refundMoney)).toFixed(2)
          }else{
            self.newdeliver_price =  (Number(this.data.AllparentTatolRealMoney) + Number(this.refundMoney)).toFixed(2)
          }

//查询子订单
              var item ={
                  parent_id: data.id
              }
              //从子订单返回 读取展开项
              var hiddensArrId =  wx.getStorageSync('hiddenId')

              self.api.getOrderDataChildren(item).then(res=>{
                var op = res.data;

                op.forEach((val,i)=>{
                  val.hiddens = false;
        //如果有数据，则显示展开项
                  if(hiddensArrId){
                    hiddensArrId.forEach( (e)=> {
                      if(e == val.id){
                        val.hiddens = true
                      }
                   })
                  }
                })
                self.childrenList = op
                
                if(!op.length){
                  self.isShowLoading = false;
                }
                if(scrollTop){
                    setTimeout( ()=>{
                      self.isShowLoading = false;
                     wx.pageScrollTo({
                      scrollTop: scrollTop, //滚动到页面的目标位置（单位px）,
                      duration: 0 //滚动动画的时长，默认300ms，单位 ms,
                    });
                  },600)
                }else{
                  self.isShowLoading = false;
                }
              })
              

          }).catch(err=>{
            console.log(err,'err')
            self.isShowLoading = false;
            wx.showToast({
              title: '信息错误',
              icon:'none'
            })
        })
    }else{
 //订金详情状态  
        this.api.listBySoId(query.id).then(resp=>{

          this.orderlist = resp.data

        }).catch(err=>{
          wx.showToast({
             title: err.error,
             icon:'warning'
          })
        })

        this.api.getSubDetail(query.id).then(res=>{

        self.isShowLoading = false;

        let data = res.data;

        data.code = query.code  //订金单页面传过来的code

        data.apiStatus = data.status;

        data.status = this.api.filterStatus(data.status);
        
        self.data = data;


      }).catch(err=>{
          self.isShowLoading = false;
          wx.showToast({
             title: '请求失败',
             icon:'none'
          })
        })
      }
      },
    
  //查看原订单
  lookParentDetail(){
    var childrenId = order.state.childrenId;
    var parent_id = this.data.parent_id;
    console.log(parent_id,"parent_id")
    wx.navigateTo({url:'../orderDetail/main?id='+parent_id+'&distinguishOrder='+true+'&childrenId='+childrenId+''})
  }
},

    onUnload(){
      console.log(this.query.pid,"this.query.pid")
      order.commit('prevPage',this.query.pid)
    }



  };
</script>

<style lang="scss">
  page{
    padding-bottom: 60px;
  }

  #childIds{
    >div{
      .childrFlex{
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          margin-bottom: 30rpx;
          background: #efefef;
          padding: 20rpx 24rpx;
        span{
          color: red;
        }
        .upList{
          display: flex;
          align-items: center;
          .h_img {
              width: 48rpx;
              height: 42rpx;
            }
        }
      }
      .contents{
        font-size: 14px;
        padding: 0 24rpx 30rpx 24rpx;
        >div{
          margin-bottom: 10px;
        }
        .lastDiv{
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-bottom: 0;
          margin-top: 15px;
          p{
            background: #FF5D22;
            color: #FFF;
            border-radius: 10rpx;
            padding: 8rpx 10px;
          }
          .margin-r{
             margin-right: 8px;
          }
        }
        .firstFlex{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .c_r_content{
            color: red;
          }
        }
      }
    }
    
  }


    /***退补款 */
  .models{
    .modelShow{
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 8;
    }
    .content{
      background: #FFF;
      position: fixed;
      top: 20%;
      width: 90vw;
      padding-bottom: 30px;
      left: 50%;
      margin-left: -45vw;
       z-index: 9;
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

  .goldColor{
    color: #FF6600 !important;
  }
  .listArrs{
    margin-bottom: 15rpx;

    span{
      flex: 1.4 !important;
    }

  }
/**
  底部按钮布局
* */
.styleFooterBtns{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  line-height: 100rpx;

  .goChangeOrder{
    width: 100%;
    height: 100%;
    background: #FF6600;
    color: #FFF;
    text-align: center;
    font-size: 28rpx;
  }

  .SecondChangeOrderFlex{
    display: flex;
    align-items: center;
    text-align: center;

    div{
      flex: 1;
      background: #999999;
      color: #FFF;
      font-size: 28rpx;
    }
  
    .secondChangeOrder{
       background: #FF6600;
    }
  }
}
    .home{
      .content{
        background-color: #ffffff;
        .c_title{
          color: #999999;
          font-size: 14px;
          padding-top:15px;
          padding-bottom:15px;
          width: 90%;
          border-bottom: 0.5px solid rgba(180,180,180,0.2);
          margin: 0 auto;
        }
        .c_content{
          .c_row{
            display: flex;
            align-items: center;
            width: 90%;
            margin: 0 auto;
            font-size: 13px;
            padding-top: 10px;
            padding-bottom: 10px;
            .c_r_txt{
              color: #999999;
              flex: 1;
            }
            .c_r_content{
              flex: 3;
              color: #333333;
            }
          }
          .activeColor{
            font-weight: bold;
            .c_r_txt{
              color: red;
            }
            .c_r_content{
              color:red;
            }
          }
        }
      }
    }


  #imgStyle{
    align-items: flex-start;

    img{
      width: 160rpx;
      height: 160rpx;
      margin-right: 6rpx;
      margin-bottom: 6rpx;
    }
  }
  #childrenClass{ 
    .c_r_content{
      flex: 2;
    }
    p{
      flex: 1;
      color: blue;
    }
  }
</style>
