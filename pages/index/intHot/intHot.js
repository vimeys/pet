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
      bg_id:''
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let pet=util.storage('petData')
      this.setData({
          bg_id:options.img_id
      })
      wx.showLoading({
          title:'网红卡生成中',
          icon:'none'
      })
    this.getCodeImage(options.img_id);

    // this.getPetData(pet.bg.id)
  },

    // 获取二维码
    getCodeImage(petId){
      util.promiseSync(util.url.url.getCode,{bg_id:petId,push_id:app.user.id}).then(json=>{
          console.log(json);
          if(json.status==1){
              this.setData({
                  codeImage:json.data.url
              })
              // this.draw()
              let that=this;
              wx.getImageInfo({
                  src:json.data.url,    //请求的网络图片路径
                  success: function (res) {
                      //请求成功后将会生成一个本地路径即res.path,然后将该路径缓存到storageKeyUrl关键字中
                      wx.setStorage({
                          key: 'storageKeyUrl1',
                          data: res.path,
                      });
                      that.setData({
                          codeImage:res.path
                      })
                      let pet=util.storage('petData')
                      that.getPetData(pet.bg.id)
                  }
              })

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
              let that=this;
              wx.getImageInfo({
                  src:app.filePath+app.globalData.edit,    //请求的网络图片路径
                  success: function (res) {
                      //请求成功后将会生成一个本地路径即res.path,然后将该路径缓存到storageKeyUrl关键字中
                      wx.setStorage({
                          key: 'storageKeyUr2l',
                          data: res.path,
                      });
                      that.setData({
                          src:res.path
                      })
                      // this.getPetData(pet.bg.id)
                      that.draw()
                  }
              })
          }

      })
    },

  //绘制网红卡
  draw(){
        wx.hideLoading()
          const windowWidth = wx.getSystemInfoSync().windowWidth;
      // const windowHeight =wx.getSystemInfoSync().windowHeight;
      const cts=wx.createCanvasContext('myCanvas')
      console.log(app.filePath + app.globalData.edit);
      console.log(this.data.codeImage);
      cts.drawImage(this.data.src,0 ,0,windowWidth-15,windowWidth-15);
      cts.setFillStyle('white');
      cts.fillRect(0, windowWidth-15, 1000, 1000)
      cts.drawImage('/images/test/seal.png',windowWidth-160,windowWidth-120,118,116)//绘制王洪章
      cts.drawImage(this.data.codeImage,22,windowWidth+25,110,110);//绘制二维码
      cts.drawImage('/images/icon/me-index-petinfo-sex1.png',windowWidth-185,windowWidth,12,12)//绘制性别
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