// pages/me/money/money.js
import  util from '../../../utils/totalUtil'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  tab:0,
      Data:''
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
    this.getGoldList()
  },

//TODO  死数据
   getGoldList(){
       util.promiseSync(util.url.url.goldList,{user_id:1}).then((json)=>{
          if(json.status==1){
            json.data.forEach((item)=>{
                item.time=util.formatTime2(item.create_time)
            })
             this.setData({
                 Data:json.data
             })
          }else{

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