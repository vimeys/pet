// pages/index/plus/plus.js
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
  
  },
  chooseImage(){
      wx.chooseImage({
          count:6,
        success: res => {
          console.log(res.tempFilePaths)
        }
      });
  }

})