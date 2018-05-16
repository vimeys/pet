// pages/me/pet-card-add/pet-card-add.js
const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
// 选择生日
  bind_birthday:function(e){
    this.setData({
      birthday_date: e.detail.value
    })
  },
  // 选择回家日期
  bind_gohome: function (e) {
    this.setData({
      gohome_date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var date=new Date()
    var date_new = util.formatTime(date,'date')
    console.log(date_new)
    var that=this
    that.setData({
      header_img: "/images/test/hsq-header_300.jpg",
      end_date: date_new,
      birthday_date:date_new,
      gohome_date:date_new
    })
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