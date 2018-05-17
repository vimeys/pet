// pages/index/index.js
const util = require("../../../utils/totalUtil.js");
var app = getApp();
Page({
  data: {
      filePath:'',//图片前缀,
      petData:[],//宠物动态列表
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
  // bind_news: util.bind_news,
  bind_news(e){
      console.log(e);
      let index=e.currentTarget.dataset.index
    let index2=e.currentTarget.dataset.indext
      console.log(index, index2);
      let petData=this.data.petData
      petData[index].index=index2
      this.setData({
          petData
      })
  },
  // 跳转
  nav_up_pet:function(){
    wx.navigateTo({
      url: "../upload/upload"
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(app.filePath);
      let userInfo=util.storage('userInfo');
      this.setData({
        filePath:app.filePath
    })
    var that = this
    // 初始化加载写真集
    that.setData({
      news_img: that.data.news[0],
      news_chartlet: that.data.news_chartlet_list[0]
    })


      this.banner();
      this.hotTalk();
      this.petList(userInfo.id)
  },

    // 轮播
    banner(){
      util.promiseSync(util.url.url.indexBanner,{}).then((json)=>{
          this.setData({
              imgUrls:json.data
          })
      })
    },
    // 获取话题
    hotTalk(){
      util.promiseSync(util.url.url.hotTalk,{}).then((json)=>{
          this.setData({

          })
      })
    },
    petList(id){
      util.promiseSync(util.url.url.petList,{user_id:id}).then((json)=>{
          json.data.forEach(function (item) {
              item.index=0
          })
          console.log(json.data);
          this.setData({
              petData:json.data
          })
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