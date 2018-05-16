const util = require("../../../utils/util.js");
var app = getApp();
Page({
  data: {

    // 动态
    news: [
      '/images/test/index-banner.png',
      '/images/test/img.png',
      '/images/test/index-banner.png',
      '/images/test/img.png',
      '/images/test/index-banner.png',
      '/images/test/img.png',
    ],
    news_active: 0,
    // 点赞
    love: false,
    news_chartlet_list: app.news_chartlet_list,
    test_img_url: app.test_img_url
  },


  // 点赞
  bind_love: util.bind_love,

  // 动态
  bind_news: util.bind_news,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(this.data)
    // 初始化加载写真集
    that.setData({
      news_img: that.data.news[0],
      news_chartlet: that.data.news_chartlet_list[0]
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