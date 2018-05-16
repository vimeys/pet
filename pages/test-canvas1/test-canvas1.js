const app = getApp()
const ctx = wx.createCanvasContext('myCanvas')
Page({
  data: {
    text_x: 20, //x轴
    text_y: 20, //y轴
    imageUrl: '',  // 生成的图片路径
    showst: false, //是否完成图片和文字的填入
    sytext: '', //文本
  },
  chooseImageFun() { //选择图片
    var _this = this
    wx.chooseImage({
      success: function (res) {
        console.log(res)
        _this.setData({
          imageUrl: res.tempFilePaths[0]
        })
        ctx.drawImage("/images/test/hsq.jpeg", 0, 0, 100, 100)
        ctx.drawImage(res.tempFilePaths[0], 150, 150, 189, 310)

        ctx.draw()
      }
    })
  },
  InputFuns(e) { //文字
    this.setData({
      sytext: e.detail.value
    })
    ctx.setFontSize(14)
    ctx.fillText(this.data.sytext, this.data.text_x, this.data.text_y)
    ctx.draw(true)
    this.setData({
      showst: true
    })
  },
  start(e) { // 手指开始接触移动
    console.log(e)
    this.setData({
      text_x: e.touches[0].x,
      text_y: e.touches[0].y
    })
    ctx.clearRect(0, 0, 100, 110)
    ctx.draw()
    ctx.drawImage(this.data.imageUrl, 6, 0, 189, 310) //重新画上
    ctx.setFontSize(14)//重新画上字体大小
    ctx.fillText(this.data.sytext, this.data.text_x, this.data.text_y)//重新画上
    ctx.draw(true) //重新画上
  },
  move(e) { // 手指在移动
    console.log(e)
    this.setData({
      text_x: e.touches[0].x,
      text_y: e.touches[0].y
    })
    ctx.clearRect(0, 0, 200, 310)  //清除画布上的内容
    ctx.draw()
    ctx.drawImage(this.data.imageUrl, 6, 0, 189, 310) //重新画上
    ctx.setFontSize(14)  //重新画上字体大小
    ctx.fillText(this.data.sytext, this.data.text_x, this.data.text_y)//重新画上
    ctx.draw(true)//重新画上
  },


  Okgenerate() { //生成图片方法
    var _this = this
    this.setData({
      showst: false
    })
    wx.canvasToTempFilePath({ //生成图片
      x: 0,
      y: 0,
      width: 200,
      height: 310,
      destWidth: 189,
      destHeight: 310,
      quality: 1,
      canvasId: 'myCanvas',
      success: function (res) {
        wx.saveImageToPhotosAlbum({  //保存生成的图片到手机相册里
          filePath: res.tempFilePath,
          success(res) {
            app.showToasts('保存成功')
            _this.setData({
              showst: true
            })
          }
        })
      }
    })
  },

  onLoad: function (options) {
    ctx.drawImage("/images/test/hsq.jpeg", 0, 0, 100, 100)
    ctx.draw()
  },
})

