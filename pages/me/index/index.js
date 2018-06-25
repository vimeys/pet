// pages/me/index/index.js
import util from "../../../utils/totalUtil"
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test_img_url:app.test_img_url,
      isRead:false,
      petList:[] //宠物列表
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
      console.log(app.globalData);
      this.setData({
          imageFile:app.filePath
      })
  },
    //获取宠物列表
  getPetList(){
      console.log("执行我的页面");

      let user=util.storage("userInfo");
      //TODO 死数据
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
      console.log(123);
      console.log(app);
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})