// pages/me/address-list/address-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    footer: "show",
    address_list: [
      { label_active: "" },
      { label_active: "" },
      { label_active: "" },
      { label_active: "" }]
  },
  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e)
  },
  bind_label: function (e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      label_active: e.currentTarget.dataset.index
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