class login{

  constructor(){}

  //是否需要登陆
  wxLogin(){
    let token =  wx.getStorageSync('token');
    let url = '';
    if(token === null || token === '' || token === undefined){
          url = '../pages/login/main'
    }else{
          url = '../pages/home/main'
    }
    wx.redirectTo({url:url});
  }

  //获取相机授权
  getPhotoScope(){
    let that = this;
    let promise = new Promise((resolve,reject)=>{
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.camera']) {
            wx.authorize({
              scope: 'scope.camera',
              success() {
                resolve('success')
              },
              fail:function(){
                wx.showModal({
                  title:'相机授权',
                  content:'授权相机是为了转单功能的使用',
                  showCancel:false,
                  success:function(res){
                    console.log(res);
                    wx.openSetting({
                      success(res) {
                        console.log(res.authSetting)
                        if(!res.authSetting['scope.camera']){
                          that.getPhotoScope();
                        }else{
                          resolve('success');
                        }
                      }
                    })
                  }
                })
              }
            })
          }else{
            resolve('success');
          }
        }
      })
    })
    return promise;
  }
}
export {login}
