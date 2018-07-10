// pages/index/intHot/intHot.js
var app=getApp();
import  util from '../../../utils/totalUtil'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeImage:'',
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getCodeImgae()

  },

    // 获取二维码
    //TOdo
    getCodeImgae(){
      util.promiseSync(util.url.url.getCode,{graffiti_id:1,push_id:2}).then(json=>{
          console.log(json);
          if(json.status==1){
              this.setData({
                  codeImgae:json.data.url
              })
              this.draw()
          }
      })
    },
    //获取从无信息
    getPet(){
      util.promiseSync()
    },

  //绘制网红卡
  draw(){
      const windowWidth = wx.getSystemInfoSync().windowWidth;
      // const windowHeight =wx.getSystemInfoSync().windowHeight;
      const cts=wx.createCanvasContext('myCanvas')
      cts.drawImage('/images/test/hsq.jpeg',0 ,0,windowWidth-15,windowWidth-15);
      cts.setFillStyle('white');
      cts.fillRect(0, windowWidth-15, 1000, 1000)
      cts.drawImage('/images/test/seal.png',windowWidth-160,windowWidth-120,118,116)//绘制王洪章
      // cts.drawImage('/images/test/seal.png',22,windowWidth+25,110,110);//绘制二维码
      cts.drawImage(this.data.codeImgae,22,windowWidth+25,110,110);//绘制二维码
      cts.drawImage('/images/icon/me-index-petinfo-sex1.png',windowWidth-185,windowWidth,12,12)//绘制性别
      cts.drawImage('/images/icon/me-index-petinfo-money.png',windowWidth-155,windowWidth+35,12,12)//绘制身价
      cts.drawImage('/images/icon/me-index-petinfo-birthday.png',windowWidth-155,windowWidth+60,12,12)//绘制生日
      cts.drawImage('/images/icon/me-index-petinfo-weight.png',windowWidth-155,windowWidth+85,12,12)//绘制体重
      cts.drawImage('/images/icon/me-index-petinfo-sterilization2.png',windowWidth-155,windowWidth+110,12,12)//绘制是否已绝育
      cts.setFillStyle('black');
      cts.setFontSize(20)
      cts.fillText('土耳其', windowWidth-255, windowWidth+15)
      cts.setFontSize(12)
      cts.fillText(`生日：2018-4-21`,windowWidth-140,windowWidth+70)
      cts.fillText(`体重：0.5kg`,windowWidth-140,windowWidth+95)
      cts.fillText(`已绝育`,windowWidth-140,windowWidth+120)
      cts.setFillStyle("#FF0101")
      cts.fillText(`身价：600爪币`,windowWidth-140,windowWidth+45)
      cts.draw()
  },
    save(){
      let windowWidth=wx.getSystemInfoSync().windowWidth;
        wx.canvasToTempFilePath({
            // x: 690,
            // y: 0,
            // height: 300,
            // width: 300,
            fileType:'png',
            quality:1,
            canvasId: 'myCanvas',
            success: (res) => {
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: (res) => {
                        wx.navigateBack({delta:'1'})
                        console.log("success:" + res);
                    }, fail(e) {
                        console.log("err:" + e);
                    }
                })
            }
        });


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