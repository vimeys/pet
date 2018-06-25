// pages/index/gambit/gambit.js
const util = require("../../../utils/totalUtil.js");
const utils = require("../../../utils/util.js");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test_img_hsq_320: app.test_img_hsq_320,
    filePath: '',//图片前缀,
      topWord:[],
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
  },
  // method: {
  //   listenFocus: util.listenFocus,
  //   listenBlur: util.listenBlur,
  // },
  listenFocus: function () {
    utils.listenFocus(this)
  },
  listenBlur: function () {
    utils.listenBlur(this)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        filePath:app.filePath
    })
    let user=util.storage('userInfo')
    this.getHotTalkList(user.id,1)
      this.getHotWord()
    // this.listenFocus = util.listenFocus(this);
    // this.listenBlur = util.listenBlur(this);
    // console.log(app.filePath);
    // let userInfo = util.storage('userInfo');
    // this.setData({
    //   filePath: app.filePath
    // })
  },
    // 获取热门话题关键词
    getHotWord(){
      util.promiseSync(util.url.url.topWord,{}).then(json=>{
          if(json.status==1){
            this.setData({
                topWord:json.data
            })
          }
      })
    },
    // 点击关键词搜索
    tapSearch(e){
        let index=e.currentTarget.dataset.index;
        let text=this.data.topWord[index].title
        util.promiseSync(util.url.url.searchHot,{title:text,page:1}).then(json=>{
            if(json.status==1){
                this.setData({
                    talkList:json.data
                })
            }
        })
    },
    // 获取热门话题
    getHotTalkList(id,size){
      util.promiseSync(util.url.url.hotTalk,{user_id:id,page:size,pageSize:10}).then(json=>{
        if(json.status==1){
          this.setData({
              talkList:json.data
          })
        }
      })
    },

    // 获取话题详情
    topicDetail(e){
      let id=e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../gambit-content/gambit-content?id='+id
      })
    },

    //关注
    bind_attention(e){
        let id=e.currentTarget.dataset.id;
        let index=e.currentTarget.dataset.index;
        let talkList=this.data.talkList
        util.promiseSync(util.url.url.follow,{user_id:app.user.id,list_sort_id:id}).then(json=>{
            if(talkList[index].follow==1){
                talkList[index].follow=0
                this.setData({
                    talkList
                })
            }else{
                talkList[index].follow=1
                this.setData({
                    talkList
                })
            }
        })
    },

    //点赞
    bind_love(e){

        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        console.log(id);
        let talkList=this.data.talkList;
        util.promiseSync(util.url.url.like,{user_id:app.user.id,list_sort_id:id }).then(json=>{
            if(talkList[index].like==1){
                talkList[index].like=0
                talkList[index].list_sort.likes--
                this.setData({
                    talkList
                })
            }else{
                talkList[index].like=1
                talkList[index].list_sort.likes++
                this.setData({
                    talkList
                })
            }
        })
    },
    //跳转
    hrefComment(e){
      let id=e.currentTarget.dataset.id;
        wx.navigateTo({
          url: '../gambit-content/gambit-content?id='+id
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