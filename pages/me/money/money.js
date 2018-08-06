// pages/me/money/money.js
import  util from '../../../utils/totalUtil'
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tab: 0,
      Data: [],
      more:true
  },
// 选项卡
  bind_tab:function(e){
    console.log(e)
    this.setData({
      tab: e.currentTarget.dataset.tab
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoldList();
    this.page=1
    this.setData({
        user:app.user
    })
  },
    // 去商城
    goShop(){
      wx.navigateTo({
        url: '../../store/goodsList/goodsList'
      })
    },
    // 流水列表
   getGoldList(page=1,pageSize=10){
       util.promiseSync(util.url.url.goldList,{user_id:app.user.id,page:page,pageSize:pageSize}).then((json)=>{
          if(json.status==1){
              if(json.data.length==pageSize){
                  json.data.forEach((item)=>{
                      item.time=util.formatTime2(item.create_time)
                  })
                  this.setData({
                      Data:[...this.data.Data,...json.data]
                  })
              }else{
                  this.setData({
                      more:false,
                      Data:[...this.data.Data,...json.data]
                  })
              }

          }else{
              console.log(json.data);
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
      this.page++
      if(this.data.more){
          this.getGoldList(this.page,10)
      }else{
          wx.showToast({
            title: '没有啦',
              icon:'none'

          })
      }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})