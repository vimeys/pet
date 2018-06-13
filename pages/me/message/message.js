// pages/me/message/message.js
const app=getApp();
import  util from '../../../utils/totalUtil'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test_img_hsq1: app.test_img_hsq1,
      Data:""
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
    getList(){
      util.promiseSync(url.url.getMessageList,{user_id:1}).then(json=>{
        if(json.status==1){}
          this.setData({
              Data:json.data
          })
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