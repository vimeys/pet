// pages/activity/clock/clock.js
var app=getApp();
import  util from '../../../utils/totalUtil'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      arr:[{has:false},{has:false},{has:true}],
      isLucky:true,
      animate:false,
      move:false,
      card:{
          cardName:'猛犬卡',
          image:'/images/me-pat-card.png'
      }
  },


  //点击抽奖
    lucky(){
    //todo 模拟数据
      util.promiseSync(util.url.url.activeCardLucky,{activity_id:10,user_id:app.user.id,unique_code:123}).then(json=>{
        if(json.status==1){

        }
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getCardList()
  },

    //获取卡片
    getCardList(id){
        //todo 模拟数据
      util.promiseSync(util.url.url.activeCardList,{activity_id:18,user_id:app.user.id}).then(json=>{
          console.log(json);
      })
    },
    //合成卡片
    mergeCard(){
        //todo 模拟数据
      util.promiseSync(util.url.url.activeCardMerge,{activity_id:22,user_id:app.user_id}).then(json=>{
          console.log(json);
          if(json.status==1){
                this.setData({
                    move:true
                })
              let card=this.data.card
              card.cardName='超级狗';
                card.image='/images/close.png';
              setTimeout(()=>{
                    this.setData({
                        card,
                        animate:true
                    })
              },1500)
              setTimeout(()=>{
                    this.setData({
                        move:false,
                        animate:true
                    })
              },3100)
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