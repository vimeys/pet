// pages/test-canvas/test-canvas.js
const ctx = wx.createCanvasContext('myCanvas')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },

  // 调用相册，选择图片
  chooseImageFun() { //选择图片
    var _this = this
    wx.chooseImage({
      success: function (res) {
        console.log(res)
        _this.setData({
          imageUrl: res.tempFilePaths[0]
        })
       
        // 获取图片地址，然后绘图到画布上
        ctx.drawImage(res.tempFilePaths[0], 0, 0,400, 200)
        ctx.drawImage("/images/test/hsq.jpeg", 275, 150, 100, 100)
        ctx.draw()
      }
    })
  },
  
  Okgenerate() { //生成图片方法
    var _this = this
    this.setData({
      showst: false
    })

    // API参考https://developers.weixin.qq.com/miniprogram/dev/api/canvas/temp-file.html    
    wx.canvasToTempFilePath({ //生成图片
      x: 0,//画布x轴起点（默认0）
      y: 0,//画布y轴起点（默认0）
      width: 200,//画布宽度（默认为canvas宽度-x）
      height: 310,//	画布高度（默认为canvas高度-y）
      destWidth: 189,//输出图片宽度（默认为 width * 屏幕像素密度）
      destHeight: 310,//输出图片高度（默认为 height * 屏幕像素密度）
      quality: 1,//图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理
      canvasId: 'myCanvas',//	画布标识，传入 <canvas/> 的 canvas-id
      success: function (res) {
        var canvas_img=res.tempFilePath
        wx.saveImageToPhotosAlbum({  //保存生成的图片到手机相册里
          filePath: canvas_img,
          success(res) {
            // 显示消息提示框
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              mask:'ture',
              duration: 2000
            })
            // 将地址赋值给预览图片的src
            _this.setData({
              // showst: true,
              canvas_img: canvas_img
            })
          }
        })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // 授权
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.writePhotosAlbum" 这个 scope  
    // API参考 https://developers.weixin.qq.com/miniprogram/dev/api/authorize.html
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              // 用户已经同意小程序使用保存到相册，后续调用 scope.writePhotosAlbum 接口不会弹窗询问
              wx.saveImageToPhotosAlbum()
            }
          })
        }
      }
    })

  
    // 初始化  提前绘制一张图片，类比 V
    ctx.drawImage("/images/test/hsq.jpeg", 275, 150, 100, 100)
    ctx.draw()
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