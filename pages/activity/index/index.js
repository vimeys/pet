// pages/activity/index/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: [{
      a_url: "",
      img_url: "/images/test/hsq.jpeg",
      title: "购买狗狗需要注意什么问题所以我希望能所以我希望能所以我希望能",
      activity_new:true,
      star_time:"2018-05-02",
      end_time: "2018-05-04"
    }, {
      a_url: "",
      img_url: "/images/test/hsq-320.jpg",
      title: "购买狗狗需要注意什么问题所以我希望能所以我希望能所以我希望能",
      activity_new: true,
      star_time: "2018-05-02",
      end_time: "2018-05-04"
      }, {
        a_url: "",
        img_url: "/images/test/img.png",
        title: "购买狗狗需要注意什么问题所以我希望能所以我希望能所以我希望能",
        activity_new: false,
        star_time: "2018-05-02",
        end_time: "2018-05-04"
      }
    ],
    test_img_url: app.test_img_url,
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