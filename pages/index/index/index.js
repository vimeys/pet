// pages/index/index.js
const util = require("../../../utils/util.js");
var app = getApp();
Page({
  data: {
    // 轮播
    imgUrls: [
      '/images/test/index-banner.png',
      '/images/test/img.png',
      '/images/test/index-banner.png',
      '/images/test/hsq-320.jpg',
    ],
    // 是否显示面板指示点
    indicatorDots: false,
    // 是否自动轮播
    autoplay: true,
    // 间隔时长
    interval: 3000,
    // 滚动时间
    duration: 500,
    // 是否采用衔接滑动
    circular: true,
    // 分页器初始化index
    swiperCurrent: 0,
    scroll: [{
      title: '这里是名字',
      url: '/images/test/index-banner.png'
    }, {
      title: '这里是名字这里是名字',
      url: '/images/test/img.png'
    }, {
      title: '这里是名字',
      url: '/images/test/index-banner.png'
    }, {
      title: '这里是名字',
      url: '/images/test/index-banner.png'
    }, {
      title: '这里是名字',
      url: '/images/test/index-banner.png'
    }, {
      title: '这里是名字',
      url: '/images/test/index-banner.png'
    }],

    // 关键词
    word: [
      '我曹',
      '狗狗好动',
      '狗狗特好动',
      '中华田园犬',
      '哎哟卧槽，这年轻人',
      '我曹这年轻人',
    ],
    // 动态
    news: [
      '/images/test/news-img.png',
      '/images/test/hsq300.jpg',
      '/images/test/hsq-header_300.jpg',
      '/images/test/news-img.png',
      '/images/test/hsq300.jpg',
      '/images/test/hsq-header_300.jpg',
    ],
    news_active: 0,
    // 点赞
    love: false,

    news_chartlet_list: app.news_chartlet_list,


    test_img_url: app.test_img_url
  },

  // 轮播分页器
  bind_current: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
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