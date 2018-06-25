// pages/activity/index/index.js
var app = getApp()
import  utils from  '../../../utils/totalUtil'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      more_text:'查看更多',
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
      this.setData({
          filePath:app.filePath
      })
      utils.promiseSync(utils.url.url.activeList,{}).then(json=>{
        if(json.status==1){
          let time=new Date().getTime()/1000
            json.data.forEach((item)=>{
              item.a_url='../activity-content/activity-content'
                item.start_time=item.start_time.substring(0,10)
                item.end_time=item.end_time.substring(0,10);
                if(item.end_time_str<time){
                  item.activity_new=false
                }else{
                    item.activity_new=true
                }
            })
            this.setData({
              data:json.data
            })
        }
      })
  },
    goShop(){
      wx.navigateTo({
        url: '../../store/goodsList/goodsList'
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