// pages/activity/conversion/conversion.js
var app=getApp();
import  util from  '../../../utils/totalUtil'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      app_user_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let code=options.Scene
      this.setData({
          code:code
      })
      util.promiseSync(util.url.url.dui,{app_user_id:app.user.id,unique_code:code}).then(json=>{
        this.setData({

        })
      })
  },
    confirm(){
      util.promiseSync(util.url.url.confirmDui,{app_user_id:app.user.id,unique_code:this.data.code}).then(json=>{
          if(json.status==1){
            wx.showModal({
              title: '提示',
              content: '兑换成功',
              success: res=>{
                if (res.confirm) {

                }
              }
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