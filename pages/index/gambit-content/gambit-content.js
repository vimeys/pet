// pages/index/gambit-content/gambit-content.js
const util = require("../../../utils/totalUtil.js");
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        test_img_url: app.test_img_url,
        test_img_hsq: app.test_img_hsq,
        test_img_hsq1: app.test_img_hsq1,
        img_url: [
        ],
        commentData: []
    },

    bind_input_val: function (e) {
        console.log(e.detail.value)
        this.setData({
            comment_val: e.detail.value
        })
    },
    form_submit: function () {
        var that = this
        util.promiseSync(util.url.url.add_comment, {
            user_id: that.data.userInfo.id,
            parent_id: 0,
            to_user_id: 10,//暂无，死数据
            content: that.data.comment_val,
            list_sort_id: this.data.Data.list_sort.id,//暂无，死数据
        }).then((json) => {
            if (json.status == 1) {
                this.setData({
                    comment_val:''
                })
                wx.showToast({
                  title: '评论成功',
                    icon:'none'
                })
                this.page=1
                util.promiseSync(util.url.url.topicComment, {list_sort_id: this.data.Data.list_sort_id,page:this.page,pageSize:10}).then(json => {
                    if (json.status == 1) {
                        this.setData({
                            commmentData: json.data
                        })
                    }
                })
            }else{
                wx.showToast({
                  title: '评论失败',
                    icon:'none'
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            filePath: app.filePath
        })
        this.page=1
        var that = this
        this.id = options.id
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                that.setData({
                    userInfo: res.data
                })
            }
        })
        this.getData(options.id)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    // 获取详情及评论
    getData(id) {
        util.promiseSync(util.url.url.topicDetail, {topic_id: id}).then(json => {
            if (json.status == 1) {
                let image_url = this.data.img_url;
                console.log(json.data.more.photos);
                image_url = [...image_url, ...json.data.more.photos],
                    this.setData({
                        image_url: image_url,
                        Data: json.data
                    })
                util.promiseSync(util.url.url.topicComment, {list_sort_id: json.data.list_sort_id,page:this.page,pageSize:10}).then(json => {
                    if (json.status == 1) {
                        this.setData({
                            commmentData: json.data
                        })
                    }
                })
            }
        })
        //TODO
        // 死数据
    },

    // 跳转话题回复详情
    hrefComment(e){
        let comment_id=e.currentTarget.dataset.id;
        wx.navigateTo({
          url: '../comment/comment?id='+comment_id
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
        this.page++;
        util.promiseSync(util.url.url.topicComment, {list_sort_id: this.data.Data.list_sort_id,page:this.page,pageSize:10}).then(json => {
            if (json.status == 1) {
                if(json.data.length==0){
                    wx.showToast({
                        title:'没有更多数据',
                        icon:'none'
                    })
                }else{
                    let list =this.data.commmentData;
                    list=[...list,...json.data]
                    console.log(list);
                    this.setData({
                        commmentData: list
                    })
                }

            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})