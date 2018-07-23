// pages/index/index.js
const util = require("../../../utils/totalUtil.js");
var app = getApp();
let col1H = 0;
let col2H = 0;
let i = 0;
Page({
    data: {
        filePath: '',//图片前缀,
        petData: [],//宠物动态列表
        index: 0,
        col1: [],
        commentList:[],//关注列表
        col2: [],
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
        statusPage: 1,//动态page
        imagePage:1,//热门图片page
        follow:1,//关注page,
        imageMore:true,//是否还有更多热门图片
        statusMore:true,//是否还有更多动态
        followMore:true,//是否还有跟多关注列表
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
              wx.getSystemInfo({
                  success: (res) => {
                      wx.showLoading('加载中...')
                      util.promiseSync(util.url.url.index_hot, { page: 1, pageSize: 10 }).then((json) => {//获取热门图片
                          this.setData({
                              images_arr: json.data
                          })
                          wx.hideLoading()
                      })
                      //加载首组图片
                  }
              })
              break
          case '3':
              this.setData({
                  active:3
              })

              this.getfollowList(app.user.id);
              break
      }
    },
    //宠物排行
    rank(){
      util.promiseSync(util.url.url.rank,{page:1,pageSize:4}).then(json=>{
          if(json.status==1){
              this.setData({
                  rank:json.data
              })
          }
      })
    },
    // 动态点赞
    bind_love(e) {
        // this.setData({
        //     love:!this.data.love
        // })
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        let petData = this.data.petData
        util.promiseSync(util.url.url.like, {user_id: app.userInfo.id, list_sort_id: id}).then(json => {
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
        util.promiseSync(util.url.url.petBannerList, {bg_id:this.data.petData[index].bg[index2].img_id}).then(json1 => {
            // let petData = self.data.petData
            let arr=[]
            json1.data.forEach((item1, index) => {
                arr.push({image: item1.hyaline.img_url, id: item1.hyaline.id})
            })
            let data=this.data.petData;
            data[index].bannerList[index2]=  arr;
            // petData[index] = item;
            this.setData({
                petData:data
            })
        })
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
        this.rank();
        util.promiseSync(util.url.url.filePath, {}).then((json) => {
            let filePath = json.data  //固定图片路径
            this.setData({
                filePath:json.data
            })
            // this.globalData = { bgPic: '../../../images/1.png' }
        })
        this.page1=1;
        this.page2=1;
        this.page3=1;
        let userInfo = util.storage('userInfo');
        app.userInfo = userInfo

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
        this.getfollowList(userInfo.id,1,3)
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
            this.statuImageList(json.data,page_size)//获取轮播
            that.setData({
                petData: json.data
            });

        })
    },
    // 获取轮播图片
    statuImageList(data,page_size) {
        let that = this
        let petData = data
        petData.forEach(function (item, index) {
            bannerList(item, index, that)//item指的是没一个动态
        })

        function bannerList(item, index, self) {
            // debugger
            let arr = []
            // let that1=that
            //死数据item.bg[0].img_id
            if(item.model_type=="BgModel"){
                util.promiseSync(util.url.url.petBannerList, {bg_id:item.bg[0].img_id}).then(json1 => {
                    // let petData = self.data.petData
                    json1.data.forEach((item1, index) => {//item1是当前动态的第一个贴图的轮播图片
                        arr[index]=[];
                        arr[index].push({image: item1.hyaline.img_url, id: item1.hyaline.id})
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

        }
    },
    // 获取动态动态
    getMore() {
        let user = util.storage('userInfo')
        let page = this.data.statusPage;
        page++
        this.petList(app.userInfo.id,page,3)
    },




    // 获取关注列表
    getfollowList(id, page = 1, page_size = 10) {
        let that = this;
        util.promiseSync(util.url.url.followList, {user_id: id, page: page, pageSize: page_size}).then(json => {
            let data = json.data
            if (json.status == 1) {
                // Promise.all(
                //     data.forEach((item, index) => {
                //         // if (item.model_type == 'BgModel') {
                //         //     return new Promise(resolve => {
                //         //         let petData = data
                //         //         let arr = []
                //         //         //死数据
                //         //         util.promiseSync(util.url.url.petBannerList, {bg_id: 1}).then(json1 => {
                //         //             json1.data.forEach((item1, index) => {
                //         //                 arr.push({image: item1.graffiti.img_url, id: item1.graffiti.id})
                //         //             })
                //         //             petData.bannerList = arr;
                //         //
                //         //         })
                //         //     })
                //         // }
                //     })
                // ).then(json=>{
                //     console.log(json);
                // })
            }
        })
    },

    // 关注获取动态
    bannerLIst(data, index,page_size, that) {
        let petData = data
        let arr = []
        //死数据
        util.promiseSync(util.url.url.petBannerList, {bg_id: 1}).then(json1 => {
            // let petData = self.data.petData
            json1.data.forEach((item1, index) => {
                arr.push({image: item1.graffiti.img_url, id: item1.graffiti.id})
            })
            petData.bannerList = arr;
            // petData[index] = item;
            // console.log(petData);
            // that.setData({
            //     commentList: [...that.data.commentList, ...petData]
            // })
            return petData
        })
    },


    // 去涂鸦页面
    editHref(e) {
        // console.log(this.data.petData[this.data.index].bg[this.data.indextt].img_url);
        let id=e.currentTarget.dataset.id;
        let index =e.currentTarget.dataset.index;
        let img_id=this.data.petData[index].bg[this.data.indextt].img_id
        app.globalData.edit = this.data.petData[index].bg[this.data.indextt].img_url;
        app.globalData.petId=this.data.petData[index].pet_id;
        wx.setStorageSync('petData', this.data.petData[index]);
        wx.setStorageSync('bgIndex', this.data.indextt);
        wx.navigateTo({
            url: `../scrawl/scrawl?id=${id}&img_id=${img_id}`
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

    // 去动态详情页面
    hrefDetail(e){
        let id=e.currentTarget.dataset.id;
        let index =e.currentTarget.dataset.index;
        wx.navigateTo({
          url: '../stateDetail/stateDetail?id='+id
        })
    },

    // 加载热门图方法
    onImageLoad: function (e) {
        let imageId = e.currentTarget.id;
        let images_arr = this.data.images_arr;
        let imageObj = null;
        console.log(images_arr)
        for (let i = 0; i < images_arr.length; i++) {
            let img = images_arr[i];
            if (img.id == imageId) {
                imageObj = img;
                break;
            }
        }
        let col1 = this.data.col1;
        let col2 = this.data.col2;
        if (i % 2) {
            col2.push(imageObj);
            i++
        } else {
            col1.push(imageObj);
            i++
        }
        let data = {
            col1: col1,
            col2: col2
        };
        console.log(data)
        this.setData(data);
    },
    // 获取更多热门图片
    getMore2: function () {
        var that = this
        let page = this.data.imagePage;
        page++
        console.log(page)
        util.promiseSync(util.url.url.index_hot, { page: page, pageSize: 10 }).then((json) => {
            let images = this.data.images_arr;
            if(this.data.imageMore){//判断是否还有更多
                json.data.forEach((item)=>{
                    images.push(item)
                })
                if(json.data.length<10){
                    that.setData({
                        imageMore:false
                    })
                }
                that.setData({
                    images_arr: images,
                    page: page
                })
            }else{
                wx.showToast({
                     title: '没有啦',
                    icon:'none'
                })
                that.setData({
                    more_text: app.more_end_text,
                    disabled:true
                })
            }
        })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.setData({
            filePath: app.filePath,
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
    onShareAppMessage: function (e) {
        console.log(e);
        return {
            title: '转发',
            path: '/pages/index/comment/comment'
        }
    }
})