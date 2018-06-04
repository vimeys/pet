// pages/index/gambit-content/gambit-content.js
const util = require("../../../utils/totalUtil.js");
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test_img_url: app.test_img_url,
    test_img_hsq: app.test_img_hsq,
    test_img_hsq1: app.test_img_hsq1,
    img_url:[
      '/images/test/hsq.jpeg',
      '/images/test/hsq1.jpg',
      '/images/test/hsq.jpeg',
      '/images/test/hsq1.jpg',
    ],
      commentData:[]
  },

  bind_input_val:function(e){
    console.log(e.detail.value)
    this.setData({
      comment_val:e.detail.value
    })
  },
  form_submit:function(){
    var that=this
      util.promiseSync(util.url.url.add_comment, {
      user_id: that.data.userInfo.id,
      parent_id: 0,
      to_user_id: 1,//暂无，死数据 
      content: that.data.comment_val,
      list_sort_id: this.data.Data.list_sort_id,//暂无，死数据
    }).then((json) => {
      if(json.status==1){
          this.getData(this.id)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
      this.id=options.id
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: res.data
        })
      }
    })
      this.getData(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  getData(id){
      util.promiseSync(util.url.url.topicDetail,{topic_id:id}).then(json=>{
          if(json.status==1){
              let image_url=this.data.img_url;
              image_url=[...image_url,...json.data.more],
                  this.setData({
                      image_url:image_url,
                      Data:json.data
                  })
          }
      })
      //TODO
      // 死数据
      util.promiseSync(util.url.url.topicComment,{topic_id:6}).then(json=>{
        if(json.status==1){
            this.setData({
                commmentData:json.data
            })
        }
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