// pages/me/index/index.js
import util from "../../../utils/totalUtil"
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      user:"",
      test:[1,1,3,3],
    test_img_url:app.test_img_url,
      isRead:false,
      petList:[{
          sex:1,
          name:'快去添加',
          numDay:0,
          birthday:'2018-6-6',
          describe:'还没有宠物了,快去添加一个吧',
          is_sterilization:1,
          weight:10
      }], //宠物列表
      issus:[],//动态列表
      more:true//是否还有更多

  },

    //去订单详情页面
    hrefOrder(){
      wx.navigateTo({
        url: '../order-list/order-list'
      })
    },
    //去地址列表页面
    hrefAddressList(){
        wx.navigateTo({
            url: '../address-list/address-list'
        })
    },
    //去宠物列表
    petList(){
      wx.navigateTo({
        url: '../'
      })
    },
    // 宠物添加列表
    hrefAddPet(){
        wx.navigateTo({
          // url: '../pet-card-add/pet-card-add '
          url: '../pet-card-add/pet-card-add'
        })
    },
    // 去消息列表
    hrefMessage(e){
      wx.navigateTo({
        url: '../message/message'
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.page=1;
      this.setData({
          imageFile:app.filePath,
          user:app.userInfo
      })
  },
    goPetCard(){
      wx.navigateTo({
        url: '../pet-card/pet-card'
      })
    },
    //获取宠物列表
  getPetList(){
      console.log("执行我的页面");

      let user=util.storage("userInfo");
      util.promiseSync(util.url.url.userPetList,{user_id:user.id}).then(json=>{
        if(json.status==1){
          let date=Date.parse(new Date())
          json.data.forEach(function (item,index) {
              item.numDay=Math.floor(Math.abs((new Date(item.buy_time.replace(/-/g, '/')).getTime()-Date.parse(new Date())))/86400000)
              console.log(item.numDay);
          })
            this.setData({
                petList:json.data
            })
        }
      })
  },

    // 获取发布列表
    getissusList(){
            this.issusList()
    },

    issusList(page=1,page_size=4){
        console.log(app.user);
        util.promiseSync(util.url.url.stateManage,{user_id:app.user.id,page:page,pageSize:page_size}).then(json=>{

            let issus=this.data.issus
            if(this.data.more){
                json.data.forEach((item)=>{
                    issus.push(item)
                })
                if(json.data.length<page_size){
                    this.setData({
                        more:false
                    })
                }
                this.setData({
                    issus
                })
            }else{
                wx.showToast({
                  title: '没有更多数据',
                })
            }

        })
    },



    //删除按钮
    del(e){
        let id=e.currentTarget.dataset.id;
        let index =e.currentTarget.dataset.index
        util.promiseSync(util.url.url.delissus,{list_sort_id:id}).then(json=>{
            if(json.status==1){
                wx.showToast({
                  title: '删除成功'
                })
                let issus=this.data.issus
                issus.splice(index,1)
                this.setData({
                    issus:issus
                })
            }else{
                wx.showToast({
                    title:'删除失败'
                })
            }
        })
    },
    // 是否可以编辑
    isEdit(e){
          let id=e.currentTarget.dataset.id;
        console.log(e.detail.value);
        let is_edit=e.detail.value
        if(is_edit){
            var is_editNum=1
        }else{
            var is_editNum=0
        }
        util.promiseSync(util.url.url.changeissus,{list_sort_id:id,is_edit:is_editNum}).then(json=>{
            console.log(json);
        })
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      this.getPetList()
      util.promiseSync(util.url.url.isHasMes,{user_id:app.user.id}).then(json=>{
          if(json.data==0){
              this.setData({
                  isRead:false
              })
          }else{
              this.setData({
                  isRead:true
              })
          }
      })
      this.getissusList()
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
        this.page++
      this.issusList(this.page,2)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})