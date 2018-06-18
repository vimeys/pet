// pages/index/upload/upload.js
var app = getApp();
import util from '../../../utils/totalUtil'

Page({

    /**
     * 页面的初始数据
     */
    data: {

        pet: [
            '猪',
            '狗',
            '猫',
            '牛'
        ],
        test_img_hsq: app.test_img_hsq,
        test_img_hsq1: app.test_img_hsq1,
        files_news: [],
        nav: 0,
        index: 0,//宠物列表的下标
        is_edit: true,//是否允许编辑
        hotTalkImage: [],
        obj:{}
    },
    // 获取上午列表
    //TODO
    //死数据
    getPetList() {
        let user = util.storage('userInfo')
        util.promiseSync(util.url.url.petNameList, {user_id: app.user.id}).then(json => {
            this.setData({
                pet: json.data
            })
        })
    },

    // 选择种类
    bindPickerChange: function (e) {
        var that = this
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var index = e.detail.value
        that.setData({
            index: index
        })
    },
    // 是否允许编辑
    switchChange(e) {
        this.setData({
            is_edit: e.detail.value
        })
    },

    // 上传图片
    chooseImage_news: function (e) {
        var that = this;
        let user = util.storage('user')
        wx.showActionSheet({
            itemList: ['图片上传', '视频上传'],
            success: function (res) {
                // console.log(res.tapIndex)
                var upload_type = res.tapIndex
                if (upload_type == 0) {
                    wx.chooseImage({
                        count: 6,
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                            app.globalData.bgPic = res.tempFilePaths;//设置全局值
                            // app.globalData.petId = that.data.pet[that.data.index].cat_id;//c宠物id
                            app.globalData.is_edit = that.data.is_edit ? '1' : '0';//是否可以编辑
                            wx.navigateTo({
                                url: '../imageEditor/imageEditor',
                            })
                            // that.setData({
                            //   files_news: that.data.files_news.concat(res.tempFilePaths)
                            // });
                        }
                    })
                }
                if (upload_type == 1) {
                    wx.chooseVideo({
                        success: (res) => {
                            console.log(res);
                            wx.uploadFile({
                                url: util.url.url.upfile,
                                filePath: res.tempFilePath,
                                name: 'file',
                                formData: {
                                    user_id: user.uid,
                                    app: 'petapi',
                                    filetype: 'video'
                                },
                                success: res => {

                                }
                            })
                        }
                    })

                }
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    },
    // previewImage: function (e) {
    //   wx.previewImage({
    //     current: e.currentTarget.id, // 当前显示图片的http链接
    //     urls: this.data.files // 需要预览的图片http链接列表
    //   })
    // },
    // 选项卡
    bind_nav: function (e) {
        var that = this;
        console.log(e.target.dataset.nav)
        that.setData({
            nav: e.target.dataset.nav
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(util.url);
        console.log(util.storage('user'));
        this.getPetList()
        this.filePath=[]
    },

    // 获取话题内容
    getText(e) {
        let value = e.detail.value;
        this.value = value;

    },
    // 选择图片
    chooseUpload(){
        wx.chooseImage({
            count: 6,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'],
          success: res => {
                this.setData({
                    hotTalkImage:res.tempFilePaths,
                })
          }
        });
    },
    // 上传视频
    uploadPic() {

    },
    // 上传话题图片
    uploadHot() {

        if (this.value) {
            util.showLoading('上传中...')
            this.upfile(this.data.hotTalkImage,this.data.obj)
        } else {
            console.log("请输入文字");
        }


    }
    ,
    // 上传图片
    upfile(arr,obj){
        let that=this
        let user=util.storage('userInfo')
        let length=arr.length
        let filePath=[]
        let i=obj.i=obj.i||0,
            succ=obj.success=obj.success||0,
            fail=obj.fail=obj.fail||0
        wx.uploadFile({
            url: util.url.url.upfile,
            filePath: this.data.hotTalkImage[i],
            name: 'file',
            formData:{
              user:  user.id,
                app:'petapi',
                filetype:'image'
            },
            success:res=>{
                // i++
                succ++
                let obj={}
                obj.url=JSON.parse(res.data).data.img_url
                obj.name=JSON.parse(res.data).data.name
                this.filePath.push(obj)

            },
            fail:res=>{
                fail++
            },
            complete:res=>{
                i++
                if(i==length){
                    that.up()
                }else{
                    obj.i=i;
                    obj.success=succ;
                    obj.fail=fail;
                    that.upfile(arr,obj)
                }
            }
        })
    },
    // 上传话题接口
   up(){
        console.log(this);
        let user=util.storage('userInfo')
        util.promiseSync(util.url.url.upHotTalk,{user_id:user.id,title:'',content:this.value,img:this.filePath}).then((json)=>{
            if(json.status==1){
                wx.hideLoading();
                util.success('上传成功')
            }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var that = this
        that.setData({
            pet_kind: that.data.pet[0].cat_name
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