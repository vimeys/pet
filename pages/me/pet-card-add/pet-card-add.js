// pages/me/pet-card-add/pet-card-add.js
const util = require("../../../utils/util.js");
const totalUtil = require("../../../utils/totalUtil.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pet_classify: [],
        index: 0,
        test_header_img: "/images/test/hsq-header_300.jpg",
        userInfo: [],
        imageUrl:'http://chuantu.biz/t6/348/1532585591x-1566688485.jpg',
        header_img:'/images/define.jpg'
    },
    // 选择分类
    bind_pet_classify: function (e) {
        this.setData({
            index: e.detail.value
        })
    },
    // 选择生日
    bind_birthday: function (e) {
        this.setData({
            birthday_date: e.detail.value
        })
    },
    // 选择回家日期
    bind_gohome: function (e) {
        this.setData({
            gohome_date: e.detail.value
        })
    },
    // 上传图片
    chooseImage_header: function (e) {
        var that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    header_img: res.tempFilePaths
                });
                // console.log(res.tempFilePaths);
                wx.uploadFile({
                    url: totalUtil.url.url.upfile,
                    filePath: res.tempFilePaths[0],
                    formData:{
                        user_id:that.data.userInfo.id,
                        app:123,
                        filetype:'image'
                    },
                    name: 'file',
                    success:res=>{
                        console.log(res);
                        that.setData({
                            imageUrl:JSON.parse(res.data).data.img_url
                        })

                    }
                })
            }
        })
    },
    // 获取宠物分类
    pet_classify() {
        totalUtil.promiseSync(totalUtil.url.url.pet_classify, {}).then((json) => {
            this.setData({
                pet_classify: json.data
            })
        })
    },
    empty: function (str) {
        return typeof str === 'undefined' || str === null || str === '';
    },
    // 添加宠物卡
    add_pet_card: function (e) {
        var that = this
        var form_data = e.detail.value
        var form_submit = true

        form_data.birthday = that.data.birthday_date
        form_data.buy_time = that.data.gohome_date
        // console.log(form_data)
        for (var i in form_data) {
            // console.log(that.empty(form_data[i]))
            if (!that.empty(form_data[i]) == false) {
                form_submit = false
            }
        }
        // console.log(that.data.userInfo.id)
        if (form_submit == true) {
            totalUtil.promiseSync(totalUtil.url.url.addPetId, {
                user_id: that.data.userInfo.id,
                cat_id: form_data.cat_id,
                name: form_data.name,
                pet_img: that.data.imageUrl,
                birthday: form_data.birthday,
                sex: form_data.sex,
                weight: form_data.weight,
                is_sterilization: form_data.is_sterilization,
                describe: form_data.describe,
                buy_time: form_data.buy_time
            }).then((json) => {
                if (json.status == 1) {
                    console.log('宠物卡添加提交成功')
                    wx.showToast({
                        title: '添加成功',
                        icon: 'success',
                        success(){
                            setTimeout(function () {
                                wx.navigateBack({delta:'1'})
                            },1000)
                        }
                    })
                }

            })
        }else{
            wx.showToast({
                icon:'none',
              title: '请完成填写内容'
            })
        }


    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let year=new Date().getFullYear();
        let m=new Date().getMonth()+1
        let day=new Date().getDate()
        this.setData({
            birthday_date:`${year}-${m}-${day}`,
            gohome_date:`${year}-${m}-${day}`
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var that = this
        var date = new Date()
        var date_new = util.formatTime(date, 'date')
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                that.setData({
                    userInfo: res.data
                })
            }
        })
        that.setData({
            // header_img: that.data.test_header_img,
            end_date: date_new,
            birthday_date: date_new,
            gohome_date: date_new
        })

        that.pet_classify()
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