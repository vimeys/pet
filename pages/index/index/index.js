// pages/index/index.js
const util = require("../../../utils/totalUtil.js");
var app = getApp();
Page({
    data: {
        filePath: '',//图片前缀,
        petData: [],//宠物动态列表
        index: 0,
        indextt: 0,
        more_text:'查看更多',
        more_text2:'查看更多',
        more_text3:'查看更多',
        // 轮播
        imgUrls: [
            '/images/test/index-banner.png',
            '/images/test/img.png',
            '/images/test/index-banner.png',
            '/images/test/hsq-320.jpg',
        ],

        active:1,//选中导航
        images_arr:'',//热门图片数据
        indicatorDots: false,// 是否显示面板指示点

        autoplay: true,// 是否自动轮播

        interval: 3000,// 间隔时长

        duration: 500, // 滚动时间

        circular: true,// 是否采用衔接滑动

        swiperCurrent: 0,// 分页器初始化index
        scroll: [{
            title: '这里是名字',
            url: '/images/test/index-banner.png'
        }, {
            title: '这里是名字这里是名字',
            url: '/images/test/img.png'
        }, {
            title: '这里是名字',
            url: '/images/test/index-banner.png'
        }, {
            title: '这里是名字',
            url: '/images/test/index-banner.png'
        }, {
            title: '这里是名字',
            url: '/images/test/index-banner.png'
        }, {
            title: '这里是名字',
            url: '/images/test/index-banner.png'
        }],

        // 关键词
        word: [
            '我曹',
            '狗狗好动',
            '狗狗特好动',
            '中华田园犬',
            '哎哟卧槽，这年轻人',
            '我曹这年轻人',
        ],
        // 动态
        news: [
            '/images/test/news-img.png',
            '/images/test/hsq300.jpg',
            '/images/test/hsq-header_300.jpg',
            '/images/test/news-img.png',
            '/images/test/hsq300.jpg',
            '/images/test/hsq-header_300.jpg',
        ],
        news_active: 0,
        // 点赞
        love: false,

        UserInfo: [],
        news_chartlet_list: app.news_chartlet_list,
        test_img_url: app.test_img_url,
        page: 1
    },

    // 轮播分页器
    bind_current: function (e) {
        this.setData({
            swiperCurrent: e.detail.current
        })
    },
    // 选择导航
    chooseNav(e){
      let id=e.currentTarget.dataset.id;
      switch (id){
          case '1':
              this.setData({
                  active:1
              })
              break
          case '2':
              this.setData({
                  active:2
              })
              break
          case '3':
              this.setData({
                  active:3
              })
              break
      }
    },
    // 动态点赞
    bind_love(e) {
        // this.setData({
        //     love:!this.data.love
        // })
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        let petData = this.data.petData
        util.promiseSync(util.url.url.follow, {user_id: app.userInfo.id, list_sort_id: id}).then(json => {
            if (petData[index].like == 1) {
                petData[index].like = 0
                petData[index].likes--
                this.setData({
                    petData
                })
            } else {
                petData[index].like = 1
                petData[index].likes++
                this.setData({
                    petData
                })
            }
        })
    },

    // 动态
    // bind_news: util.bind_news,
    //   选择底图
    bind_news(e) {
        console.log(e);
        let index = e.currentTarget.dataset.index;
        let index2 = e.currentTarget.dataset.indext;
        console.log(index, index2);
        let petData = this.data.petData
        petData[index].index = index2
        this.setData({
            petData,
            index,
            indextt: index2
        })
    },
    // 跳转
    nav_up_pet: function () {
        wx.navigateTo({
            url: "../upload/upload"
        })
    },
   //关注事件
    bind_attention(e) {
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        let petData = this.data.petData
        util.promiseSync(util.url.url.follow, {user_id: app.userInfo.id, list_sort_id: id}).then(json => {
            if (petData[index].follow == 1) {
                petData[index].follow = 0
                this.setData({
                    petData
                })
            } else {
                petData[index].follow = 1
                this.setData({
                    petData
                })
            }
        })
    },


    // 登录
    bindGetUserInfo: function (e) {
        console.log(e.detail.rawData);
        this.setData({
            popup_userinfo: false,
        })
        var UserInfo = JSON.parse(e.detail.rawData)
        util.promiseSync(util.url.url.saveUserInfo, {
            nickname: UserInfo.nickName,
            avatar_url: UserInfo.avatarUrl,
            id:app.user.id
        })
        console.log(this.data.UserInfo)
    },
    // 取消
    bind_close_userinfo: function (e) {
        this.setData({
            popup_userinfo: false
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.page1=1;
        this.page2=1;
        this.page3=1;
        let userInfo = util.storage('userInfo');
        app.userInfo = userInfo
        this.setData({
            filePath: app.filePath,
        })
        this.getHotWord()
        this.i=0;//初始化数据
        var that = this
        // 初始化加载写真集
        that.setData({
            news_img: that.data.news[0],
            news_chartlet: that.data.news_chartlet_list[0],
        })

        // 查看是否授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: function (res) {
                            console.log(res.userInfo)
                            that.setData({
                                popup_userinfo: false
                            })
                        }
                    })
                } else {
                    that.setData({
                        popup_userinfo: true
                    })
                }
            },

        })
        // 将个人信息传递给后台

        this.banner();
        this.hotTalk();
        this.petList(userInfo.id,1,3)
    },

    // 首页动画轮播
    banner() {
        util.promiseSync(util.url.url.indexBanner, {}).then((json) => {
            this.setData({
                imgUrls: json.data
            })
        })
    },
    // 获取话题
    hotTalk() {
        util.promiseSync(util.url.url.hotTalk, {}).then((json) => {
            this.setData({
                scroll:json.data
            })
        })
    },

    // 宠物动态列表
    petList(id,page=1,page_size=3) {
        let that = this
        util.promiseSync(util.url.url.petList,{user_id: id, page: page,page_size:page_size}).then((json) => {
            json.data.forEach(function (item, index) {
                item.index = 0
            });
            this.statuImgaeList(json.data,page_size)
            that.setData({
                petData: json.data
            });

        })
    },

    // 获取轮播图片
    statuImgaeList(data,page_size) {
        let that = this
        let petData = data
        // this.i=0
        petData.forEach(function (item, index) {
            bannerList(item, index, that)
        })

        function bannerList(item, index, self) {
            let arr = []
            // let that1=that
            //死数据
            util.promiseSync(util.url.url.petBannerList, {bg_id: 1}).then(json1 => {
                // let petData = self.data.petData
                json1.data.forEach((item1, index) => {
                    arr.push({image: item1.graffiti.img_url, id: item1.graffiti.id})
                })
                item.bannerList = arr;
                petData[index] = item;
                that.i++
                if(that.i>=10){
                    that.setData({
                        petData:[...that.data.petData,...petData]
                    })
                    that.i=0
                }
                // let newPetData=[...that.data.petData,...petData]
                // if(that.data.petData.length==0){
                //
                // }else{
                //     that.setData({
                //         petData:[that.data.petData,
                //         ]
                //     })
                // }

            })
        }
    },

    editHref() {
        // console.log(this.data.petData[this.data.index].bg[this.data.indextt].img_url);
        wx.navigateTo({
            url: `../scrawl/scrawl?id=${this.data.petData[this.data.index].id}`
        })
        app.globalData.edit = this.data.petData[this.data.index].bg[this.data.indextt].img_url
    },

    // 获取动态更多
    getMore() {
        let user = util.storage('userInfo')
        let page = this.data.page;
        this.page++
        this.petList(app.userInfo.id,page,3)
    },
    getMore2(){

    },
    //获取热门图片
    gethotImage(){
        totalUtil.promiseSync(util.url.url.index_hot, { page: 1, pageSize: 10 }).then((json) => {
            this.setData({
                images_arr: json.data
            })
        })
    },

    // 热门话题文字
    getHotWord(){
        util.promiseSync(util.url.url.topWord,{}).then(json=>{
            if(json.status==1){
                this.setData({
                    topWord:json.data
                })
            }
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
    onShareAppMessage: function (e) {
        console.log(e);
        return {
            title: '转发',
            path: '/pages/index/comment/comment'
        }
    }
})