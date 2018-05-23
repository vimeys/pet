// pages/index/gambit/gambit.js
const util = require("../../../utils/totalUtil.js");
const utils = require("../../../utils/util.js");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test_img_hsq_320: app.test_img_hsq_320,
    filePath: '',//图片前缀,
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
  },
  // method: {
  //   listenFocus: util.listenFocus,
  //   listenBlur: util.listenBlur,
  // },
  listenFocus: function () {
    utils.listenFocus(this)
  },
  listenBlur: function () {
    utils.listenBlur(this)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotTalkList(1)
    // this.listenFocus = util.listenFocus(this);
    // this.listenBlur = util.listenBlur(this);
    // console.log(app.filePath);
    // let userInfo = util.storage('userInfo');
    // this.setData({
    //   filePath: app.filePath
    // })
  },



    getHotTalkList(size){
      util.promiseSync(util.url.url.hotTalk,{page:size}).then(json=>{
        if(json.status==1){

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