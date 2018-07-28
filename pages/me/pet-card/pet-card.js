// pages/me/pet-card/pet-card.js
import util from "../../../utils/totalUtil";
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      petList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          imageFile:app.filePath
      })
  },
    getPetList(){
        console.log("执行我的页面");

        let user=util.storage("userInfo");
        util.promiseSync(util.url.url.userPetList,{user_id:user.id}).then(json=>{
            if(json.status==1){
                let date=Date.parse(new Date())
                json.data.forEach(function (item,index) {
                    item.numDay=Math.floor(Math.abs((new Date(item.buy_time.replace(/-/g, '/')).getTime()-Date.parse(new Date())))/86400000)
                    console.log(item.numDay);
                })
                this.setData({
                    petList:json.data
                })
            }
        })
    },
    href(){
        wx.navigateTo({
          url: '../pet-card-add/pet-card-add'
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
      this.getPetList()
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