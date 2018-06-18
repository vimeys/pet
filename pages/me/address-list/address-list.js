// pages/me/address-list/address-list.js
const totalUtil = require("../../../utils/totalUtil.js");
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    footer: "show",
    address_list: []
  },
  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e)
  },
  bind_label: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var data_address = that.data.address_list[index]
    console.log(data_address.id);

    totalUtil.promiseSync(totalUtil.url.url.edit_address_list, { address_id: data_address.id, selected: 1, user_id:app.user.id}).then((json) => {
      console.log(json.data)
      if (json.status == 1) {
        console.log('提交成功')
        that.address_list_show(that, that.data.userInfo.id)
      } else if (json.status == 2) {
      }
    })
    
  },

  // 跳转页面并将被点击的对象存入缓存
  bind_go: function (e) {
    console.log(e)
    var that = this
    var index = e.currentTarget.dataset.index
    var data_address = that.data.address_list[index]

    wx.setStorage({
      key: "address",
      data: data_address,
      success() {
        wx.navigateTo({
          url: '/pages/me/address-add/address-add',
        })
        console.log("成功")
      }
    })
  },

  // 删除
  bind_delete: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var data_address = that.data.address_list[index]
    totalUtil.promiseSync(totalUtil.url.url.delete_address_list, { address_id: data_address.id }).then((json) => {
      console.log(json)
      if (json.status == 1) {
        console.log('提交成功')
        that.address_list_show(that, that.data.userInfo.id)
      } else if (json.status == 3) {
        totalUtil.showModel('删除失败', '默认地址无法删除')
      }
    })
  },

  // 添加地址
  bind_add:function(){
    wx.navigateTo({
      url: '/pages/me/address-add/address-add'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  // 加载页面
  address_list_show: function (that,user_id) {
    totalUtil.promiseSync(totalUtil.url.url.get_address_list, { user_id: user_id }).then((json) => {
      console.log(json.data)
      console.log(json.data)
      that.setData({
        address_list: json.data,
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    // that.setData({
    //   userInfo: wx.getStorageSync('userInfo')
    // })
    // that.address_list_show(that,that.data.userInfo.id)
      let user=totalUtil.storage('userInfo');
    that.address_list_show(that,user.id)
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