// pages/store/goods-content/goods-content.js
const util = require("../../../utils/util.js");
import  utils from '../../../utils/totalUtil';
import wxParse from "../../../utils/wxParse/wxParse";
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      hideShopPopup:true,
      buyNumber:1,
      store_num:1,
    swiper_img: app.text_img_list,
      cover:'../../../images/1.png',
        detail:'',//商品详细
      Data:{
          goodsName:'这个狗粮可以换哦喜不喜欢拉时间段法拉盛',
          shop_price:'123',
          spec_goods_price:{'规格':['大份','中份','小份']}
      },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          filePath:app.filePath
      })
    // console.log(this.data.swiper_img)
      this.id=options.id;
      //TODO 死数据
      utils.promiseSync(utils.url.url.goodsDetail,{goods_id:this.id}).then(json=>{
          console.log(json);
          if(json.status==1){
              wxParse.wxParse('content','html',json.data.details,this,5)
              if(json.data.more!=null){
                  this.setData({
                      swiper_img:json.data.more.photos
                  })
              }
              this.setData({
                  detail:json.data
              })
          }
      })
  },

    confirm(){

      //TODO 加大了数据
      let money=app.user.money+2222;
        // console.log(this.id);
        if(money<this.data.detail.price){
            wx.showToast({
              title: '爪币不足',
                icon:"none"
            })
      }else{
            wx.setStorageSync('goodsDetail', {
                goodsImage:`${this.data.filePath}${this.data.detail.goods_img.url}`,
                name:this.data.detail.name,
                price:this.data.detail.price
            });
          wx.navigateTo({
            url: '../order-sure/order-sure?id='+this.id
          })
      }
    },

    // showPop(){
    //     this.setData({
    //         hideShopPopup:!this.data.hideShopPopup
    //     })
    // },
    // // 关闭规格选择
    // close(){
    //   this.setData({
    //       hideShopPopup:!this.data.hideShopPopup
    //   })
    // },
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