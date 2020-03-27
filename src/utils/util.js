let Fly=require("flyio/dist/npm/wx");
let fly = new Fly();
class util{

  constructor(){
      this.baseUrl = 'http://api-test.duorang.com/app/';
      // this.baseUrl = 'https://app.duorang.com/app/';
      // this.baseUrl = 'http://172.16.203.163:8082/';  

      this.hashTable = [];
  }
  //请求封装(promise)
  request(res){
    let token =  wx.getStorageSync('token');
    let token_id =  wx.getStorageSync('tokenId');
    let head = { 'content-type':res.method==='POST'?'application/x-www-form-urlencoded/':'application/json'};
    if(res.useToken){
      head = {
        'content-type':res.method==='POST'?'application/x-www-form-urlencoded/':'application/json',
        'token':token,
        'tokenid':token_id
      }
    }
    if(res.useLoading) wx.showLoading({ title:'加载中' });
    return new Promise(
      (resolve, reject) =>{
          wx.request({
          url: this.baseUrl+res.url,
          method:res.method?res.method:'GET',
          data:res.data,
          header: head,
          success:function(result){
            wx.hideLoading();
            if(result.data.resultCode === 1000){
                resolve(result.data);
            }else if(result.data.resultCode === 1001){
                reject(result.data);
            }else{
              if(res.useToken){
                wx.showToast({
                  title:result.data.error,
                  duration:1000,
                  success:function(){
                    wx.setStorageSync('token', null);
                    wx.setStorageSync('tokenId',null);
                    setTimeout(()=>{
                      wx.reLaunch({
                        url: '../login/main'
                      })
                    },1000)
                  }
                })
              }
            }
          },
          fail:function(err){
            wx.hideLoading();
            wx.showToast({
              title: '网络请求失败',
              duration:1000
            })
          }
        })
      }
    )
  }

  //fly请求
  requestFly(res){
    let token =  wx.getStorageSync('token');
    let token_id =  wx.getStorageSync('tokenId');

    //配置请求基地址
    fly.config.baseURL = this.baseUrl;
    //添加拦截器
    fly.interceptors.request.use((config,promise)=>{
      //给所有请求添加自定义header
      config.headers["content-type"] = res.method==='POST'?'application/x-www-form-urlencoded/':'application/json';
      if(res.useToken){
        config.headers['token'] = token;
        config.headers['tokenid'] = token_id;
      }
      return config;
    })

    //发起请求
    fly.request(res.url,res.data,{method:res.method?res.method:"GET",timeout:res.timeout?res.timeout:5000}).then(data=>{
      res.success(data);
    }).catch(err=>{
      res.fail(err);
    })
  }

  hash(key){
    return key % this.hashTable.length;
  }

  insertHash(item){
    let hashKey = this.hash(item.key);
    while(this.hashTable[hashKey] !== undefined){
      hashKey = this.hash(++item.key);
    }
    this.hashTable[hashKey] = item;
  }

  searchHash(item){
    let hashKey = this.hash(item.key);
    while(this.hashTable[hashKey].val !== item.val){
      hashKey = this.hash(++item.key);
      if(this.hashTable[hashKey] === undefined){
        return -1;
      }
    }
    return hashKey;
  }

  //上传文件
  uploadFile(files,callback){
    let token =  wx.getStorageSync('token');
    let token_id =  wx.getStorageSync('tokenId');
    wx.uploadFile({
      url:this.baseUrl+'file/upload.json', // 仅为示例，非真实的接口地址
      filePath: files[0],
      name: 'file',
      formData: {
        'token':token,
        'tokenid':token_id
      },
      success(res) {
        const data = res.data
        callback(data);
      }
    })
  }

  filterStatus(value,type){
    let txt = null;
    switch (value) {
      case -3:
        txt = '退款中';
        break;
      case -2:
        txt = '已退款';
        break;
      case -1:
        txt = '已取消';
        break;
      case 0:
        txt = '待支付';
        if(type) txt = '待交付';
        break;
      case 1:
        txt = '待转单';
        if(type) txt = '待验收';
        break;
      case 2:
        txt = '已转单';
        if(type) txt = '待评价';
        break;
      default:
        txt = '已评价';
        if(type) txt = '已完成';
    }
    return txt;
  }
}
export {util}
