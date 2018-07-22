// pages/index/history/history.js
var app = getApp();
import  util from '../../../utils/totalUtil'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test_img_hsq:app.test_img_hsq,
      bg_img:app.globalData.edit,
      Data:"",
      filePath:app.filePath
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let img_id=options.img_id;//背景图片id
      let id=options.id;//list_sort_id
      this.setData({
          bg_img:app.globalData.edit,
          filePath:app.filePath,
          id:id
      })
      util.promiseSync(util.url.url.petBannerList,{bg_id:img_id}).then(json=>{
          if(json.status==1){
            this.setData({
                Data:json.data,
            })
          }
      })
  },
    // 点赞
    addLike(){
        util.promiseSync(util.url.url.like,{user_id:app.user.id,list_sort_id:this.data.id}).then(json=>{
            if(json.status==1){
                wx.showToast({
                  title: '点赞成功',
                    icon:'none'
                })
            }
        })
    },
    save(){
        var imgSrc = this.data.filePath+this.data.bg_img
        wx.downloadFile({
            url: imgSrc,
            success: function (res) {
                console.log(res);
                //图片保存到本地
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function (data) {
                        wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000
                        })
                    },
                    fail: function (err) {
                        console.log(err);
                        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                            console.log("当初用户拒绝，再次发起授权")
                            wx.openSetting({
                                success(settingdata) {
                                    console.log(settingdata)
                                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                        console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                                    } else {
                                        console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                                    }
                                }
                            })
                        }
                    },
                    complete(res){
                        console.log(res);
                    }
                })
            }
        })

    },
    share(){
        wx.navigateTo({
          url: '../intHot/intHot?id='+this.data.id+'&img_id='+this.data.img_id
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