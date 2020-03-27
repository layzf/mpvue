<template>
    <div class="modify">
      <div class="item">
        <div class="c_item">
          <span class="name">姓名</span>
          <input v-model="name" placeholder="请填写姓名"/>
        </div>
        <div class="c_item" :style="{marginTop:'30px'}">
          <span class="name">手机号</span>
          <input v-model="phone" placeholder="请填写手机号"/>
        </div>
      </div>
      <div class="btn" @click="back">{{type?'修改':'提交'}}</div>
      <i-toast id="toast" />
    </div>
</template>

<script>
  const { $Toast } = require('../../../static/dist/base/index');
  export default {
    name: "motify",
    data(){
      return {
        name:'',
        phone:'',
        type:null,
        id:null,
        user_id:null
      }
    },
    methods:{
      back(){
        let type = this.type;
        let name = this.name;
        let phone = this.phone;
        let obj = {
          link_name:name,
          link_mobile:phone,
          id:this.id,
          user_id:this.user_id
        }
        console.log(obj);
        if(type){
          this.api.modify(obj).then(res=>{
            $Toast({
              content:'修改成功',
              type:'success'
            })
            setTimeout(()=>{
              wx.redirectTo({
                url:'../choosecontact/main'
              })
            },1000)
          }).catch(err=>{
            $Toast({
              content:err.error,
              type:'warning'
            })
          })
        }else{
          this.api.addContact({link_name:name,link_mobile:phone,user_id:this.user_id}).then(res=>{
            $Toast({
              content:'新增成功',
              type:'success'
            })
            setTimeout(()=>{
              wx.redirectTo({
                url:'../choosecontact/main'
              })
            },1000)
          }).catch(err=>{
            $Toast({
              content:err.error,
              type:'warning'
            })
          })
        }

      }
    },
    mounted(){
      let query = this.$root.$mp.query;
      if (query.type){
        let data = JSON.parse(query.data);
        console.log('initData',data);
        this.name = data.link_name;
        this.phone = data.link_mobile;
        this.type = query.type;
        this.id = data.id;
        this.user_id = data.user_id;
        wx.setNavigationBarTitle({
          title: '修改联系人'
        })
      }else{
        this.user_id = query.id;
        this.type = null;
        this.name = '';
        this.phone = '';
        wx.setNavigationBarTitle({
          title: '新增联系人'
        })
      }
    },
  };
</script>

<style lang="scss">
.modify{
  .item{
    background-color: #f7f7f7;
    padding-top: 20px;
    padding-bottom: 20px;
    .c_item{
      display: flex;
      align-items: center;
      font-size: 14px;
      .name{
        width: 20%;
        text-align: center;
      }
      input{
        background-color: #ffffff;
        width: 50%;
      }
    }
  }
  .btn{
    margin: 40px auto 0 auto;
    width: 90%;
    background-color: #FF5D22;
    color: #ffffff;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 6px;
  }
}
</style>
