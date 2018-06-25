// pages/me/order-lsit/order-lsit.js
var app=getApp()
import  util from  '../../../utils/totalUtil'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test_img_hsq: app.test_img_hsq,
    active:0,
      page:1,
      orderList:[],
      text_more:'查看更多'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.page=1
    this.getOrder(0)

  },
  // 获取订单列表
    click(e){
      let id=e.currentTarget.dataset.id;
      switch (id){
          case '0':
          this.setData({
              active:0,
              page:1,
              orderList:[]
          });
          this.getOrder(0)
          break;
          case '1':
            this.setData({
                active:1,
                page:1,
                orderList:[]
            });
            this.getOrder(1)
            break;
          case '2':
            this.setData({
                active:2,
                page:1,
                orderList:[]
            })
              this.getOrder(2)
              break
          case '3':
            this.setData({
                active:3,
                page:1,
                orderList:[]
            })
              this.getOrder(3)
              break
      }
    },

    getOrder(id){
      let user_id=app.user.id
      let obj={
          user_id:user_id,
          status:id,
          page:this.data.page,
          pageSize:5
      }
      wx.showLoading({
        title: '加载中'
      })
      util.promiseSync(util.url.url.orderList,obj).then(json=>{
          if(json.status==1){
              json.data.forEach((item)=>{
                  item.goods={
                      goodsImage:app.filePath+item.goods_img,
                      name:item.goods_name,
                      price:item.price
                  }
              })
              let list=[...this.data.orderList,...json.data]
            this.setData({
                orderList:list
            })
              wx.hideLoading()
          }
      })
    },
    orderConfirm(e){
      let id=e.currentTarget.dataset.id;
      let user_id=app.user.id;

      util.promiseSync(util.url.url.orderConfirm,{user_id:user_id,order_sn:id}).then(json=>{
        if(json.status==1){
            this.setData({
                orderList:[]
            })
            this.getOrder(this.data.active)
        }
      })

    },
    // 点击查看更多
    getMore(e){
        let id=this.data.active
        this.setData({
            page:this.data.page++
        })
        this.getOrder(id)

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