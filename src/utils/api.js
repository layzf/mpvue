import {util} from "./util";

class api extends util{

  constructor(){
    super();
  }

  //获取验证码
  getCode(phone){
    let params = {
      url:'json/getCode.json',
      data:{
        mobile:phone,
        codeType:1
      }
    }
    return this.request(params);
  }

  //获取订金单列表
  getSubscription(user_id,mobile,days,status,page,pagesize){
    let params = {
      url:'soinfo/list.json',
      data:{
        user_id:user_id,
        mobile:mobile,
        days:days,
        status:status,
        page:page,
        pagesize:pagesize
      }
    }
    return this.request(params);
  }
  // //获取转单数据
  // getOrderData(id,callback){
  //   let params = {
  //     url:'soinfo/view.json',
  //     data:{
  //      id:id
  //     },
  //     callback:function(res){
  //       callback && callback(res)
  //     }
  //   }
  //   return this.request(params)
  // }
  //获取订金单详情
  getSubDesc(user_id){
    let params = {
      url:'soinfo/add.json',
      data:{
        user_id:user_id
      }
    }
    return this.request(params);
  }
  //提交定金单
  submitData(user_id,user_receive_id,user_link_id,project_id,village_id){
    let params = {
      url:'soinfo/doadd.json',
      data:{
        user_id:user_id,
        user_receive_id:user_receive_id,
        user_link_id:user_link_id,
        project_id:project_id,
        village_id:village_id
      }
    }
    return this.request(params);
  }

  getSubData(data){
    let params = {
      url:'soinfo/list.json',
      data:data,
      useToken:true,
      useLoading:true
    }
    return this.request(params);
  }

  //获取订单数据
  getOrderData(data){
    let params = {
      // url:'soitem/list.json',
      url:'soitem/newList.json',
      data:data,
      useToken:true,
      useLoading:true
    }
    return this.request(params);
  }
//获取子订单数据
    getOrderDataChildren(data){
      let params = {
        url:'soitem/newList.json',
        data:data,
        useToken:true,
        useLoading:false
      }
      return this.request(params);
    }
//查询订金单的转单
  listBySoId(data){
    let params = {
      url:'soitem/listBySoId.json',
      data:{
        so_id:data
      },
      useToken:true,
      useLoading:true
    }
    return this.request(params);
  }

  //获取 转单详情 订单数据
  soitemList(data){
    let params = {
      url:'soitem/view.json',
      data:{
        id:data
      },
      useToken:true,
      useLoading:false
    }
    return this.request(params);
  }

  
  //获取订单数据
  listGroupBySoId(data){
    let params = {
      url:'soitem/listGroupBySoId.json',
      data:data,
      useToken:true,
      useLoading:true
    }
    return this.request(params);
  }


  //交付订单
  pay(id){
    let params = {
      url:'soitem/doupdate.json',
      data:{
        id:id
      },
      useToken:true
    }
    return this.request(params);
  }

  //获取订金单详情数据
  getSubDetail(id){
    let params = {
      url:'soinfo/view.json',
      data:{
        id:id
      },
      useToken:true
    }
    return this.request(params);
  }

  //登陆
  login(mobile,code){
      let params = {
        url:'businessuser/loginByCode.json',
        data:{
          anycode:'soask_duorang',
          mobile:mobile,
          code:code
        }
      }
      return this.request(params);
  }
  //添加订单
  getSoInfo(id){
    let params = {
      url:'soitem/add.json',
      data:{
        id:id
      },
      useToken:true
    }
    return this.request(params);
  }

  //提交转单
  submitOrderS(data){
    let params = {
      url:'soitem/doadd.json',
      data:data,
      useToken:true,
      useLoading:true
    }
    return this.request(params);
  }
  //担保交易提交订单
  addSecuredSoItem(data){
    let params = {
      url:'soitem/addSecuredSoItem.json',
      data:data,
      useToken:true,
      useLoading:true
    }
    return this.request(params);
  }
  //担保交易 支付按钮
  deliverSecuredSoItem(data){
    let params = {
      url:'soitem/deliverSecuredSoItem.json',
      data:data,
      useToken:true,
      useLoading:true
    }
    return this.request(params);
  }
  
  

  //首页获取用户信息
  getBusinessShop(){
    let id = wx.getStorageSync('tokenId');
    let params = {
      url:'businessuser/view.json',
      data:{
        id:id
      },
      useToken:true
    }
    return this.request(params);
  }
  //获取门店列表
  getBussiness(){
    let params = {
      url:'businessshop/list.json',
      data:{
        page:1,
        pagesize:10
      },
      useToken:true
    }
    return this.request(params);
  }

  //交付订单
  submitOrder(id){
    let params = {
      url:'soitem/doupdate.json',
      data:{
        id:id
      },
      useToken:true,
      useLoading:true
    }
    return this.request(params);
  }

  //获取订金单列表
  getSubscriptionList(data){
    let params = {
      url:'soinfo/list.json',
      data:data,
      useToken:true
    }
    return this.request(params);
  }
  //扫码
  scanCode(code){
    let params = {
      url:'soinfo/listByusercode.json',
      data:{
        usercode:code
      },
      useToken:true,
      useLoading:true
    }
    return this.request(params);
  }

   // 商户扫用户的会员码
   scanSubscrip(data) {

    let params = {
      url:'userinfo/view.json',
      data:{
        usercode:data
      },
      useToken:true,
      useLoading:true
    }
    return this.request(params);
  }


  //获取用户联系人
  getContact(data){
    let params = {
      url:'userlink/list.json',
      data:data,
      useToken:true
    }
    return this.request(params);
  }

  //修改联系人
  modify(data){
    let params = {
      url:'userlink/doupdate.json',
      data:data,
      useToken:true,
      useLoading:true
    }
    return this.request(params);
  }

  //新增联系人
  addContact(data){
    let params = {
      url:'userlink/doadd.json',
      data:data,
      useToken:true,
      useLoading:true
    }
    return this.request(params);
  }

  //注销
  logout(){
    wx.setStorageSync('token', null);
    wx.setStorageSync('tokenId', null);
    wx.reLaunch({
      url:'../login/main'
    })
  }

  //记录返现
  reCordMoney(data){
    let params = {
      url:'soitem/returnMoney.json',
      data:data,
      useToken:true,
      useLoading:true
    }
    return this.request(params);
  }

  //手机号查询
  searchPhone(data){
    let params = {
      url:'soinfo/turnByCode.json',
      data:data,
      useToken:true,
      useLoading:true
    }
    return this.request(params);
  }

  selectRzApointRecordList(data){
    let params = {
      url:'rzEnrollRecord/selectRzApointRecordList.json',
      data:{
        searchKey:data.searchKey,
        statusStr:data.status,
        nearDays:data.nearDays,
        page:data.page,
        pageSize:data.pageSize
      },
      useToken:true
    }
    return this.request(params);
  }

  updateApointRecord(data){
    let params = {
      url:'rzEnrollRecord/updateApointRecord.json',
      data:{
        id:data.id,
        status:data.status,
      },
      useToken:true
    }
    return this.request(params);
  }

  //立即交付
  deliver(data){
    let params = {
      url:'soitem/deliver.json',
      data:data,
      useToken:true
    }
    return this.request(params);
  }

  //到店列表
  userVisitShopRecord(key){
    var data = {}
    if(key){
      data.key = key
    }
    let id = wx.getStorageSync('tokenId');
    let params = {
      url:'userinfo/userVisitShopRecord.json',
      data:data,
      useToken:true
    }
    return this.request(params);
  } 
  //根据用户id查询用户到店的信息
  viewByUserId(id){
    let params = {
      url:'userinfo/viewByUserId.json',
      data:{
        user_id:id
      },
      useToken:true
    }
    return this.request(params);
  } 
  //担保交易 结账
  accountSecuredSoItem(id){
    let params = {
      url:'soitem/accountSecuredSoItem.json',
      data:{
        id:id
      },
      useToken:true
    }
    return this.request(params);
  } 
//担保交易 部分退款
addReturnChildSecuredSoItem(data){
      let params = {
        url:'soitem/addReturnChildSecuredSoItem.json',
        data:data,
        useToken:true
      }
      return this.request(params);
    } 
//担保交易 补单
addChildSecuredSoItem(data){
  let params = {
    url:'soitem/addChildSecuredSoItem.json',
    data:data,
    useToken:true
  }
  return this.request(params);
}   
   //担保交易 同意退款
   securedSoItemBtn(data){
    var url= ''
    if(data.type=='agree'){
      url='soitem/agreeRefundSecuredSoItem.json'
    }else if(data.type=='refund'){
      url='soitem/refundChildAllSecuredSoItem.json'
    }else{
      url='soitem/rejectRefundSecuredSoItem.json'
    }
    let params = {
      url:url,
      data:{
        id:data.id
      },
      useToken:true
    }
    return this.request(params);
   }


   //担保交易————提现情况查询
   appIndexCashSituationQuery(data){
    let params = {
      url:'index/appIndexCashSituationQuery.json',
      data:data,
      useToken:true
    }
    return this.request(params);
  } 
   //担保交易————提现详情
   waitCashout(){
    let params = {
      url:'cashoutApply/waitCashout.json',
      useToken:true
    }
    return this.request(params);
  } 
   //担保交易————业务情况
   appIndexInCome(){
    let params = {
      url:'index/appIndexBusinessSituationQuery.json',
      useToken:true
    }
    return this.request(params);
  } 
   //担保交易————业务增长情况
   recordItemList(days){
    let params = {
      url:'index/appIndexGrowthSituationQuery.json',
      data:{
        days:days
      },
      useToken:true
    }
    return this.request(params);
  } 

//提现历史数据查询
  cashoutApplyHisList(){
    let params = {
      url:'cashoutApply/cashoutApplyHisList.json',
      useToken:true
    }
    return this.request(params);
  } 
//收入明细
  appIndexInComeDetailList(data){
    let params = {
      url:'index/appIndexInComeDetailList.json',
      data:data,
      useToken:true
    }
    return this.request(params);
  } 
  //提现详情
  cashoutApplyHisSoItemDetail(data){
    let params = {
      url:'cashoutApply/cashoutApplyHisSoItemDetail.json',
      data:data,
      useToken:true
    }
    return this.request(params);
  } 
  //申请提现
  cashoutApply(id){
    let params = {
      url:'cashoutApply/apply.json',
      data:{
        projectIds:id
      },
      useToken:true
    }
    return this.request(params);
  } 

  
  
  


  
  


  

  
   

}
export {api}
