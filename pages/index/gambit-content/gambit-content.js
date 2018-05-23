// pages/index/gambit-content/gambit-content.js
const totalUtil = require("../../../utils/totalUtil.js");
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test_img_url: app.test_img_url,
    test_img_hsq: app.test_img_hsq,
    test_img_hsq1: app.test_img_hsq1,
    img_url:[
      '/images/test/hsq.jpeg',
      '/images/test/hsq1.jpg',
      '/images/test/hsq.jpeg',
      '/images/test/hsq1.jpg',
    ]
  },

  bind_input_val:function(e){
    this.setData({
      comment_val:e.detail.value
    })
  },
  form_submit:function(){
    var that=this
    totalUtil.promiseSync(totalUtil.url.url.add_comment, {
      user_id: that.data.userInfo.id,
      parent_id: 0,
      to_user_id: 1,//暂无，死数据 
      content: that.data.comment_val,
      list_sort_id: 26,//暂无，死数据 
    }).then((json) => {
      console.log('提交成功')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: res.data
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