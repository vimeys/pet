// pages/me/index/index.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test_img_url:app.test_img_url,
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

  },
    //获取宠物列表
  getPetList(){
    //TODO 死数据
      util.promiseSync(util.url.petList,{user_id:1}).then(json=>{
        if(json.status==1){
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