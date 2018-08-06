// pages/index/gambit/gambit.js
const util = require("../../../utils/totalUtil.js");
const utils = require("../../../utils/util.js");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
        hiddenT: false,
        test_img_hsq_320: app.test_img_hsq_320,
        filePath: '',//图片前缀,
        topWord: [],
        scroll: [],
        more: true,//是否还有更多
        showSearch: true,//是否显示放大镜
        word: [],// 关键词
      disabled:false,
        more_text: '查看更多'
    },
  // method: {
  //   listenFocus: util.listenFocus,
  //   listenBlur: util.listenBlur,
  // },
  // listenFocus: function () {
  //   utils.listenFocus(this)
  // },
  // listenBlur: function () {
  //   utils.listenBlur(this)
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        filePath:app.filePath
    })
    this.page=1
    this.getHot()
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
    getHot(){
      util.promiseSync(util.url.url.hotTalkLIst,{}).then(json=>{
          this.setData({
              hot:json.data
          })
      })
    },
    href(e){
        let id=e.currentTarget.dataset.id
        wx.navigateTo({
          url:  '../gambit-content/gambit-content?id='+id
        })
    },
    // 点击关键词搜索
    tapSearch(e){
        let id=e.currentTarget.dataset.id;
        wx.navigateTo({
            url:  '../gambit-content/gambit-content?id='+id
        })
    },
        // let text=this.data.topWord[index].content
        // util.promiseSync(util.url.url.searchHot,{content:text,page:1,pageSize:10}).then(json=>{
        //     if(json.status==1){
        //         if(json.data.length){
        //             this.setData({
        //                 talkList:json.data
        //             })
        //         }else{
        //             wx.showToast({
        //               title: '相关话题已删除',
        //                 icon:'none'
        //             })
        //         }
        //
        //     }
        // })
    // 获取热门话题
    getHotTalkList(id,size){
      util.promiseSync(util.url.url.hotTalk,{user_id:id,page:size,pageSize:3}).then(json=>{
          if (this.data.more) {
              if (json.data.length == 3) {
                  if (size == 1) {
                      this.setData({
                          hiddenT: true,
                          talkList: json.data
                      })
                  } else {
                      this.setData({
                          talkList: [...this.data.talkList, ...json.data]
                      })
                  }
              } else {
                  this.setData({
                      more: false
                  })
                  this.setData({
                      more_text: '没有啦',
                      disabled: true
                  })
              }
          } else {
              wx.showToast({
                  title: '没有啦',
                  icon: 'none'
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
    // 监听获取输入框焦点
    listenFocus(){
        utils.listenFocus(this)
    },
    // 搜索
    listenBlur(e){
      utils.listenBlur(this)
        let value=e.detail.value;
        util.promiseSync(util.url.url.searchHot,{content:value,page:1,pageSize:4}).then(json=>{
            if(json.status==1){
                if(json.data.length>0){
                    this.setData({
                        talkList:json.data
                    })
                }else{
                    wx.showToast({
                      title: '暂无相关话题',
                        icon:'none'
                    })
                }

            }
        })
    },
    // 获取更多
    getMore(){
         this.page++
        let user=util.storage('userInfo');
        this.getHotTalkList(user.id,this.page)
    },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      let user=util.storage('userInfo')
      app.user=user
      this.getHotTalkList(user.id,1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})