// pages/activity/activity-content/activity-content.js
var app=getApp();
import  utils from '../../../utils/totalUtil'
import wxParse from '../../../utils/wxParse/wxParse'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Data:"",
        star_time: "2018-08-02",
        end_time: "2018-08-05",
        isSignIN:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getDetail(options.id)
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    // 获取详情
    getDetail(id){
        utils.promiseSync(utils.url.url.activeDetail,{activity_id:id}).then(json=>{
            if(json.status==1){
                wxParse.wxParse('content','html',json.data.details,this,5)
                let time=new Date().getTime();
                let end_time=json.data.end_time.replace(/-/g,'/');
                let start_time=json.data.start_time.replace(/-/g,'/');
                console.log(json.data.end_time);
                let endTime= Date.parse(new Date(json.data.end_time))||Date.parse(new Date(end_time))||0;
                let startTime= Date.parse(new Date(json.data.start_time))||Date.parse(new Date(start_time))||0;
                console.log(time);
                console.log(endTime, startTime);
                if(time<endTime){
                    this.setData({
                        isSignIN:true
                    })
                }else{
                    this.setData({
                        isSignIN:false
                    })
                }
                if(time<startTime){
                    this.setData({
                        isSignIN:false
                    })
                }
                this.setData({
                    Data:json.data
                })
            }
        })
    },
    //扫码
    Scan(){
        wx.scanCode({
            success: (res) => {
                console.log(res)
                if(res.errMsg=='scanCode:ok'){
                    let abc='12l3j12l?id=sladfj'
                    // let data=res.path.slice(res.path.indexOf('='))
                    let data=abc.slice(abc.indexOf('='))
                    wx.navigateTo({
                      url: '../clock/clock?Scene='+data
                    })
                }
            }
        })
    },
    href(){
        wx.setStorageSync('active_id', this.data.Data.id);
        wx.navigateTo({
            url: '../clock/clock'
        })
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