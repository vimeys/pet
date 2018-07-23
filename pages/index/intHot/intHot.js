// pages/index/intHot/intHot.js
var app=getApp();
import  util from '../../../utils/totalUtil'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeImage:'',
      pet:{
          "id": 17,
          "user_id": 10,
          "cat_id": 1,
          "name": "冯川",
          "pet_img": "default/20180623/e69b44ead501377a22780976639ae2aa.jpg",
          "birthday": "2017-06-23",
          "sex": 0,
          "weight": 60,
          "is_sterilization": 1,
          "describe": "帅气的发型,牛逼",
          "total_like": 0,
          "total_comment": 0,
          "total_edit": 0,
          "total_forward": 0,
          "sort": null,
          "status": 1,
          "create_time": 1529765838,
          "update_time": 1529765838,
          "is_hot": 0,
          "is_recommend": 0,
          "add_like": 0,
          "add_comment": 0,
          "buy_time": "2018-04-22",
          "code_img": null,
          "code_poster": null
      },
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let pet=util.storage('petData')
    this.getCodeImage();

    this.getPetData(pet.pet_id)
  },

    // 获取二维码
    //TOdo
    getCodeImage(){
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

    //获取宠物信息
    getPetData(petId){
      let petData=util.storage('petData');
      util.promiseSync(util.url.url.petData,{pet_id:petData.pet_id}).then(json=>{
          if(json.status==1){
              this.setData({
                  pet:json.data
              })
          }
          this.draw()
      })
    },

  //绘制网红卡
  draw(){
      const windowWidth = wx.getSystemInfoSync().windowWidth;
      // const windowHeight =wx.getSystemInfoSync().windowHeight;
      const cts=wx.createCanvasContext('myCanvas')
      cts.drawImage(app.filePath+app.globalData.edit,0 ,0,windowWidth-15,windowWidth-15);
      cts.setFillStyle('white');
      cts.fillRect(0, windowWidth-15, 1000, 1000)
      cts.drawImage('/images/test/seal.png',windowWidth-160,windowWidth-120,118,116)//绘制王洪章
      // cts.drawImage('/images/test/seal.png',22,windowWidth+25,110,110);//绘制二维码
      cts.drawImage(this.data.codeImgae,22,windowWidth+25,110,110);//绘制二维码
      cts.drawImage('/images/icon/me-index-petinfo-sex1.png',windowWidth-185,windowWidth,12,12)//绘制性别
      // cts.drawImage('/images/icon/me-index-petinfo-money.png',windowWidth-155,windowWidth+35,12,12)//绘制身价
      cts.drawImage('/images/icon/me-index-petinfo-birthday.png',windowWidth-155,windowWidth+35,12,12)//绘制生日
      cts.drawImage('/images/icon/me-index-petinfo-weight.png',windowWidth-155,windowWidth+60,12,12)//绘制体重
      cts.drawImage('/images/icon/me-index-petinfo-sterilization2.png',windowWidth-155,windowWidth+85,12,12)//绘制是否已绝育
      cts.setFillStyle('black');
      cts.setFontSize(20)
      cts.fillText(this.data.pet.name, windowWidth-245, windowWidth+15)
      cts.setFontSize(12)
      cts.fillText(`生日：${this.data.pet.birthday}`,windowWidth-140,windowWidth+45)
      cts.fillText(`体重：${this.data.pet.weight}kg`,windowWidth-140,windowWidth+70)
      cts.fillText(`已绝育`,windowWidth-140,windowWidth+95)
      cts.fillText('这是一段话不能太长哦',windowWidth-240,windowWidth+120)
      cts.setFillStyle("#FF0101")
      cts.setFontSize(18)
      cts.fillText(`身价：600爪币`,windowWidth-160,windowWidth+15)

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