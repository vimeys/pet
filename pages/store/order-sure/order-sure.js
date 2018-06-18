// pages/store/order-sure/order-sure.js
var app=getApp();
import  utils from '../../../utils/totalUtil'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address_list: [{}],
        value:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.id = options.id
        this.add=[]
        utils.promiseSync(utils.url.url.get_address_list,{user_id:app.user.id}).then(json=>{
            if(json.data.length>=1){
                json.data.forEach( (item)=> {
                    console.log(item);
                    if(item.selected==1){
                        this.add[0]=item
                    }
                })
                this.setData({
                    address_list:this.add,
                    showList:true
                })
                this.confirm=true
            }
        })
    },

    input(e){
        let value=e.detail.value;
        console.log(value);
        this.setData({
            value:value
        })
    },
    pay(){
      utils.promiseSync(utils.url.url.goodsConfirm,{user_id:app.user.id,goods_id:this.id,num:1,remake:this.data.value}).then(json=>{
          console.log(json);
      })
    },
    addAddress(){
        wx.navigateTo({
          url: '../../me/address-add/address-add'
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