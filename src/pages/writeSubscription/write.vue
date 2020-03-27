<template>
    <div class="home" >
      <div v-if='bat'>
        <header>
          <div class="h_item">
            <span class="h_i_title">收货地址</span>
            <span :style="{paddingRight:'48rpx'}">{{info.village_name}} {{info.door_number}}</span>
          </div>
          <div class="h_item" @click="toContact">
            <span class="h_i_title">联系人</span>
            <span>{{info.link_name}} {{info.link_mobile}}</span>
            <img class="h_img" :src="'../../assets/images/iconfontjiantou5.png'" v-if="types!=1"/>
          </div>
       </header>
    <div class="line"></div>

<!-- payorder = 'payorder' 显示交付-->
  <div v-if="payOrder=='payorder'">
       <div class=" payContent">
          <img :src="content.projectInfoDTO.img_url" alt="">
          <div class="rightContent">
            <p>{{content.project_name}}</p>
            <p>第{{content.turn_sort}}次转单</p>
            <p><span>{{content.deducation_fee?'订金抵扣：￥'+content.deducation_fee:'无抵扣订金'}}</span></p>
            <p>转单价格：{{content.prod_price}}元</p> 
          </div>
       </div>
    <!--tab 切换-->
      <div class="leadPayMoney">
          <div>订金实际金额：</div>
          <radio-group   @change="radioChange" class="radioGroup" >
            <radio class="radio" v-for="(item,index) in radio" :key='index' :value="item.id" :checked="item.checked">
                <text>{{item.name}}</text>
            </radio>
        </radio-group>
      </div>
<!--切换的内容-->
           <div class="tabRadioCentent">
<!---订单实际金额-->
              <div class="tabFlex"  v-if="typeVal==1">
                  <span>订单实际金额：</span>
                  <input type="text" v-model="realityMoney"  placeholder="请输入订单实际金额">
              </div>

              <div class="tabFlex"  v-if="typeVal==1">
                <span>金额变动原因：</span>
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入金额变动原因" v-model="realityTextArea"></textarea>
              </div>

              <div class="c_photo"  v-if="typeVal==1">
                  <span class="c_p_txt">合同/单据</span>
                  <div class="c_img">
                    <up-pic :url="baseUrl+'file/upload.json'" @myevent="upImgData"  notli class='up-pic'/>
                  </div>
                  <div class="placeClass fontSizeAgren">* 拍照上传纸质销售合同、收据，可上传多张</div>
              </div>
              <!--转单价格一致-->
              <div class="c_photo typeValTwo"  v-if="typeVal==2">
                  <span class="c_p_txt">合同/单据</span>
                  <div class="c_img">
                     <img :src="arrs" v-for="(arrs,index) in info.prod_img" alt=""  @click="lookImg(index,info.prod_img)">
                  </div>
              </div>

          </div>
      </div>
<!--交付end-->

<!-- payOrder!='payorder' 显示转单-->
      <div class="content"  v-if="payOrder!='payorder'">
        <img-item :bg="true" :data="info.projectinfo" :item="item.soInfo" :types="types"></img-item>

<!--转单，再次转单-->
        <div class="orderList" v-if="newinfo.length<=0">
            <p>首次转单</p>
            <div class="c_total">
              <span class="order000">订单金额</span>
              <input v-model="price" type="digit" class="c_t_input" placeholder="填写数字" placeholder-class="placeClass"/>
              <span  class="colors6a">元(填写包含{{total_price}}元订金在内的总金额)</span>
            </div>
            <div class="tagsIcon">* 本次为首次转单，需抵扣订金{{total_price}}元</div>
            <div class="c_photo">
              <span class="c_p_txt">合同/单据</span>
              <div class="c_img">
                <up-pic :url="baseUrl+'file/upload.json'" @myevent="upImgData" notli  class='up-pic'/>
              </div>
              <div class="placeClass fontSizeAgren">* 拍照上传纸质销售合同、收据，可上传多张</div>
            </div>
        </div>
<!--渲染-->
        <div class="orderList"   v-else>
          <div v-for="(items,index) in newinfo" style="margin-bottom: 8rpx">
            <div class="deglist">
                <div class="flexs">{{index==0?'首':'第'+(index+1)}}次转单
                  <div :style="{marginLeft:index==0?52+'rpx':38+'rpx'}" class="flexsOrder" v-if="!items.hiddens">订单金额 <div>{{items.prod_price}}元</div></div>
                </div>
                <div class="upList" @click="downClick(index)">
                   {{!items.hiddens?"展开":"收回"}}
                  <img :style="{transform:!items.hiddens? 'rotate(90deg)':'rotate(-90deg)'}" class="h_img" :src="'../../assets/images/iconfontjiantou5.png'"/>
                </div>
            </div>

             <div class="downInformation" v-if="items.hiddens">
               <div v-if="item.soInfo.deducation_fee==0" class="dikou"> 
                  <div>抵扣金额：￥{{total_price}}元</div>
               </div>
               <div class="downOrdermoney ">
                  <div>订单金额：<div class="activeOrderColor">{{items.prod_price}}元</div></div>
                  <div class="activeOrderColor">{{items.deliver_status==0?'待交付':'已交付'}}</div>
               </div>
               <div class="dikou"> 
                  <div>转单时间：{{items.create_at}}</div>
               </div>
               <div class="upImgs">
                 <span class="c_p_txt">合同/单据</span>
                 <div>
                   <img :src="itemImg" v-for="(itemImg,indexs) in items.prod_img" @click="lookImg(indexs,items.prod_img)">
                 </div>
               </div>
               <div class="lookDetalFooter">
                 <div class="lookDetal" @click="lookDetal(items.id,items.deliver_price?true:false)">查看详情</div>
               </div>
             </div>

          </div>
<!--填表-->
          <div v-if="types!=1" class="listput">
            <p>第{{newinfo.length+1}}次转单</p>
            <div class="c_total">
              <span class="order000">订单金额</span>
              <input v-model="price" type="digit" class="c_t_input" placeholder="填写数字" placeholder-class="placeClass"/>
              <span class="colors6a">元({{deducation_fee?'抵扣订金:'+deducation_fee+'元':'无抵扣订金'}} )</span>
            </div>
            <div class="c_photo" style="margin-top: 0;">
              <span class="c_p_txt">合同/单据</span>
              <div class="c_img">
                <up-pic :url="baseUrl+'file/upload.json'" @myevent="upImgData" notli class='up-pic'/>
              </div>
              <div class="placeClass fontSizeAgren">* 拍照上传纸质销售合同、收据，可上传多张</div>
            </div>
          </div>

        </div>
       <div class="c_remark">
         <span class="c_r_txt">备注</span>
         <textarea class="textarea" placeholder="备注一下" v-model="remark"></textarea>
        </div>
      </div>
<!--内容 end-->      
    <div v-if="newinfo.length>0 && payOrder!='payorder'" class="footerCreat">
      <div>订单编号：{{soNumber}}</div>
      <div v-for="(item,index) in newinfo">
        {{index==0?"首":"第"+(index+1)}}次转单时间：{{item.create_at}}
      </div>
    </div>
    
    <div class="f_btn" @click="submitData" v-if="types!=1 && payOrder!='payorder'">提交订单</div>

    <div class="f_btn" @click="deliver"    v-if="payOrder=='payorder'">立即交付</div>
      <i-toast id="toast"/>
    </div>
    <!--转单码已失效-->
   <div v-else class="cathText">{{batCathInforMation}}</div>
  </div>
</template>

<script>
  import imgItem from '@/components/imgItem'
  const {$Toast} = require('../../../static/dist/base/index');
  const throttles = require('../../utils/throttle.js')

  export default {
    name: "write",
    data() {
      return {
        id:'',
        realityMoney:'',//变动价格
        realityTextArea:'',//变动原因
        typeVal:1,//1:更新价格  2：与转单价格一致
        radio:[
          {name:'更新价格',checked:true,id:1},
          {name:'与转单价格一致',checked:false,id:2},
        ],
        content:{},//立即交付显示内容
        payOrder:'',//是否显示交付视图 
        batCathInforMation:'',//过期信息
        bat:false,
        item: {},
        info: {village_name: '所在地区', door_number: '门牌号', link_name: '联系人', link_mobile: ''},
        imgUrl: '../../assets/images/photo.png',
        uploadImg: '',
        arrs:[],
        delArr:[],
        remark: '',
        soid: null,
        user_id: null,
        showImg: null,
        height: wx.getSystemInfoSync().screenHeight,
        receive: {},
        price: '',
        baseUrl:this.util.baseUrl,
        isChoose: false,//是否上传
        newinfo:{},
        soNumber:'',
        types:'',//订单管理进入
        total_price:'',//订金抵扣
        deducation_fee:'',//
      }
    },
    components: {
      imgItem
    },
    methods: {
      //tab切换
      radioChange:function(e){
        console.log(e)
        var typeVal = e.mp.detail.value; this.typeVal = typeVal;

        this.realityMoney='' ;//变动价格
        this.realityTextArea='';//变动原因
       
      },
      //点击放大图片
      lookImg:function(index,item){
        console.log(item,"item")
        wx.previewImage({
          current: item[index],
          urls:item
        })
      },
      //去订金单详情页面
      lookDetal:function(e,type){
         wx.navigateTo({url:'../orderDetail/main?id='+e+'&types='+type+'&distinguishOrder='+true+''})
        // soitemList
      },
      //收回 展开
      downClick:function(index){
         if(this.newinfo[index].hiddens==true){
           this.$set(this.newinfo[index],'hiddens',false);
         }else{
           this.$set(this.newinfo[index],'hiddens',true);
         }
      },
  //上传图片返回 图片路径
      upImgData(e) {
        console.log(e,"s")
        if(e.mp.detail.del){
          console.log("删除")
          this.delArr = [];
          var delArr = this.delArr;
          for(var i of e.mp.detail.del){
            console.log(i.path_server,"99")
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
      //立即支付
      deliver:function(){
        if(this.typeVal == 1){
          if(this.realityMoney==''){
            $Toast({
              content: '请填写订单金额',
              type: 'warning'
            })
            return;
          }

          if(this.realityTextArea==''){
            $Toast({
              content: '请填写价格变动原因',
              type: 'warning'
            })
            return;
          }
        
          if (this.uploadImg ==='') {
            $Toast({
              content: '请上传合同单照',
              type: 'warning'
            })
            return;
          }
        }
        var data = {
            id:this.id,
            deliver_price: this.typeVal == 1 ? this.realityMoney : this.content.prod_price , // 价格
            deliver_img:   this.typeVal == 1 ?  this.uploadImg : this.info.prod_img.join(','), // 图片
            deliver_content: this.realityTextArea,  // 内容
        }
      
        this.api.deliver(data).then(res=>{
       console.log(res,"")
          if(res.resultCode===1000){
             $Toast({
              content: '提交成功',
              type: 'success',
              duration: 1000
            })
            setTimeout(()=>{
              wx.navigateBack({//返回
                delta: 1
              })
            },1000)
          }
        })
      },
  //提交订单引导用户转单弹框
  showModal(data){
  wx.showModal({
            title: data.title,
            content: data.content,
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#FF5D22',
              success: (res) =>{
                if (res.confirm==true){
                     wx.reLaunch({ url: '../success/main'})
                  }
              }
        })
  },

      //提交订单
 submitData:throttles.throttle(function(){
        let self = this;
        let uploadImg = this.uploadImg;
        if (this.$data.price === '') {
          $Toast({
            content: '请填写订单总额',
            type: 'warning'
          })
          return;
        }
        console.log('图片:',uploadImg)
        if (uploadImg ==='') {
          $Toast({
            content: '请上传合同单照',
            type: 'warning'
          })
          return;
        }

  let item = this.$data.item;
/****
 * 
 * @param   secured_trans == 1 非担保交易   secured_trans==2 担保交易
 */
    if(item.t.secured_trans==2){
      var itmes = {
            so_id:this.$data.soid,//订金ID
            prod_price:this.$data.price,// 商品金额
            village_id:item.soInfo.village_id,// 小区ID
            user_receive_id:item.t.user_receive_id,//收件人ID
            user_link_id:item.t.user_link_id,// 联系人ID
            commission_rate:item.t.commission_rate,// 佣金率
            village_user_id:item.soInfo.village_user_id,
            project_id:item.soInfo.project_id,// 项目ID
            pay_price:this.$data.price,// 支付金额
            prod_img: uploadImg,
            prod_content: this.$data.remark
      }
      
      if(item.t.account_date){
         itmes.account_date = item.t.account_date// 账期
      }

      this.api.addSecuredSoItem(itmes).then(res => {
        if(res.resultCode === 1000){
            self.init();
            var model={
              title:'平台担保交易订单',
              content:'请引导会员通过『多让用户端小程序』查看待支付订单并完成在线支付'
            }
            this.showModal(model)
        }
      }).catch(err => {
          $Toast({
            content: err.error,
            type: 'warning'
          })
        })
    }else{
        let data = {
          user_id: item.t.user_id,
          user_link_id: item.t.user_link_id,
          user_receive_id: item.t.user_receive_id,
          so_id: this.$data.soid,
          village_id: item.soInfo.village_id,
          prod_price: this.$data.price,
          prod_img: uploadImg,
          prod_content: this.$data.remark
        }
    
        this.api.submitOrderS(data).then(res => {
          self.init();
            var model={
              title:'线下收款订单',
              content:'请直接向会员收取货款【非卖场商户且非担保交易项目】请引导会员至商场收银台完成付款【非担保交易项目的卖场商户】'
            }
            this.showModal(model)

        }).catch(err => {
          $Toast({
            content: err.error,
            type: 'warning'
          })
        })
    }
  
      },1500),

      formatDate(date) {
        let temp = date.split(' ')
        return temp[0];
      },
      //去修改联系人
      toContact() {
        //不是从订单进去，跳转修改联系人页面
          if(this.types!=1){
             let info = this.user_id;
             wx.navigateTo({
                url: '../choosecontact/main?id=' + info
            })
          }
      },
      init() {
        this.$data.info = {};
        this.$data.price = '';
        this.$data.imgUrl = '../../assets/images/photo.png';
        this.$data.uploadImg = null;
        this.$data.remark = '';
      }
    },
    onShow() {
      let info = this.$data.info;
      let self = this;
      wx.getStorage({
        key: 'contact',
        success: res => {
          console.log('info', res.data);
          info.link_name = res.data.name
          info.link_mobile = res.data.mobile
          self.$data.info = info
        }
      })
    },
    mounted() {
      Object.assign(this.$data, this.$options.data())

      let self = this;
      let query = this.$root.$mp.query;

       this.$data.price='';
       this.arrs = [];
       console.log('query123', query);

      if(query.types){
        this.types = query.types;
        wx.setNavigationBarTitle({
          title: '订单详情'
        })
      }
//订单交付
      if(query.payorder){
         this.payOrder = query.payorder;
         this.id = query.id;
         wx.setNavigationBarTitle({
          title: '订单交付'
        })
        this.api.soitemList(query.id).then(res=>{
          console.log(res,"哈哈哈")
          var resp = res.data
          self.$data.bat = true
          var info = {
              village_name:resp.village_name,
              door_number:resp.door_number,
              link_mobile:resp.link_mobile,
              link_name:resp.link_name,
              prod_img:resp.prod_img.split(';')
          }

          
          self.$data.info = info
          self.$data.user_id = resp.user_id
          self.$data.content = resp

        })
      }else{
         this.api.getSoInfo(query.id).then(res => {
         
          self.$data.bat = true
          let data = res.data;
          let t = data.t;

          if(data.soInfo.end_at){
            data.soInfo.end_at = this.formatDate(data.soInfo.end_at);
          }
          
          data.soInfo.status = this.api.filterStatus(data.soInfo.status);

  
          data.t.soItemList.forEach((val,index)=>{
            if(val.prod_img){
               var newimg = val.prod_img.split(';');
              val.prod_img = newimg;
            }
            val.hiddens = false
          })

          self.$data.total_price = data.soInfo.total_price
          self.$data.deducation_fee = data.soInfo.deducation_fee
          self.$data.info = t;
        
          self.$data.newinfo = data.t.soItemList;
          self.$data.item = data;
          self.$data.soid = query.id;
          self.$data.user_id = query.user_id;
          self.$data.soNumber = data.t.soItemList[0].so_number;

        }).catch(res=>{
          if(res.resultCode==1001){
            self.$data.batCathInforMation = '转单码已失效'
            self.$data.bat = false
          }

        })
      }
   
    }
  };
</script>

<style lang="scss">
  @import "../../assets/sass/write";
  page{
    padding-bottom: 120rpx;
  }
  /**
  立即交付
  **/
  .payContent{
    display: flex;
    align-items: flex-start;
    font-size: 28rpx;
    padding: 20rpx 30rpx;
    border-bottom: 1px solid #ccc;

    img{
      width: 200rpx;
      height: 200rpx;
    }

    .rightContent{
      padding-left: 20rpx;
      p{
        margin-bottom: 20rpx;
        span{
          color: #FF6600;
        }
      }
      p:last-of-type{
        margin-bottom:0;
      }
    }
  }
  .leadPayMoney{
    display: flex;
    align-items: center;
    font-size: 28rpx;
    padding: 20rpx 30rpx;

    .radioGroup{
        display: flex;
        align-items: center;
        flex: 1;
      >.radio{
        font-size: 28rpx;
        width: auto;
        transform: scale(0.7);
        text{
          font-size: 34rpx;
        }

      }
    }

  }

  .tabRadioCentent{
    padding: 20rpx 30rpx;
    font-size: 28rpx;
    .c_img{
      margin-top: 20rpx;
    }
    .tabFlex{
      display: flex;
      align-items: flex-start;
      margin-bottom: 30rpx;
      span{
        font-size: 28rpx;
      }
      input{
        border:1px solid #cccccc;
        font-size: 24rpx;
        padding-left: 10rpx;
        flex:1;
      }
      textarea{
        flex: 1;
        border:1px solid #cccccc;
        font-size: 24rpx;
        padding-left: 10rpx;
        height: 120rpx;
      }
    }
  }

  /**立即交付end* */
  .lookDetalFooter{
    display: flex;
    justify-content: flex-end;
    margin-right: 30rpx;
    margin-top: 20rpx;
  }
  .lookDetal{
    background: #FF6600;
    color: #FFF;
    padding: 15rpx 30rpx;
    text-align: center;
    border-radius: 10rpx;
  }
  .footerCreat{
    padding-left: 33rpx;
    font-size: 28rpx;
    margin-top: 40rpx;
    >div{
      margin-bottom: 20rpx;
    }
  }

  .line {
    background-color: #f7f7f7;
    height: 10px;
  }
  .dikou{
    padding: 20rpx 30rpx;
    justify-content: space-between;
  }
  .h_img {
    width: 48rpx;
    height: 42rpx;
  }
  .tagsIcon{
    width: 90%;
    margin: 0 auto;
    font-size: 24rpx;
    color: #DBDBDB;
  }
  .orderList>p,.orderList>div>p,.deglist,.listput>p{
    padding-left: 33rpx;
    height: 84rpx;
    line-height: 84rpx;
    background: #f7f7f7;
  }
  .flexs,.deglist,.flexsOrder,.downOrdermoney,.dikou{
    display: flex;
    align-items: center;
  }
  .downOrdermoney{
    justify-content: space-between;
  }
  .flexsOrder{
    margin-left: 38rpx;
    >div{
      color: #E94816;
      margin-left:20rpx;
    }
  }
  .deglist{
    justify-content: space-between;
  }
  .upList{
    padding-right: 33rpx;
    display: flex;
    align-items: center;
    img{
      transform: rotate(-90deg);
    }
  }

  .downInformation{
    padding-bottom: 30rpx;
    .upImgs{
      padding:0 33rpx;
      margin-top: 20rpx;
      border-bottom: 1px solid #ccc;
      padding-bottom: 20rpx;
      >div{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        img{
          margin-top: 20rpx;
          width: 220rpx;
          height: 210rpx;
          margin-right:10rpx;
        }
        img:nth-of-type(3n+3){
          margin-right: 0;
        }

      }
    }
    .activeOrderColor{
      color: #E94816;
    }
    .downOrdermoney{
      padding: 20rpx 33rpx;
      border-bottom: 1px solid #f7f7f7;
      >div{
        display: flex;
        align-items: center;
      }
    }
  }
  .colors6a{
    color: #666666;
  }
  .order000{
    color: #000000;
  }
  .placeClass{
    color: #DBDBDB;
  }
  .fontSizeAgren{
    font-size:24rpx;

    margin-top: 15rpx;
  }
  .cathText{
    text-align: center;
    margin-top: 44rpx;
    color: #666;
    font-size: 30rpx;
  }
  .typeValTwo image{
    width: 160rpx;
    height: 160rpx;
    margin-right: 1%;
    margin-bottom: 1%;
  }

</style>
