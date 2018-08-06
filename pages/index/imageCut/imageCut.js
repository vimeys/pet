// pages/index/imageCut/imageCut.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          imageSrc:options.imageSrc
      })
  },
    // 保存修改图片
    saveImg(e){
        console.log(app.globalData);
        app.globalData.bgPic[app.globalData.imageId]=e.detail;
        wx.navigateTo({
            url: `../imageEditor/imageEditor?imageSrc=${e.detail}`
        })
    },



})