// pages/index/stateDetail/stateDetail.js
var app=getApp();
import util from '../../../utils/totalUtil'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      comment_val:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id=options.id;
    this.page=1
    this.getDetail(id)
      this.setData({
          filePath:app.filePath
      })
  },
    //
    getDetail(id){
      wx.showLoading({
        title: '加载中'
      })
        let that=this;
      util.promiseSync(util.url.url.stateDetail,{list_sort_id:id,user_id:app.user.id}).then((json)=>{

          if(json.status==1){

              json.data.index=0
              this.getBannerList(json.data.details[0].img_id,json)
          }
          this.getCommentLit(json.data.id)
      })

    },
    // 获取轮播图片
    getBannerList(id,json){
        //TODO bi_ig死数据,应该是json.data.bg[0].id}
        let that=this;
        let arr=[];
        util.promiseSync(util.url.url.petBannerList, {bg_id:1 }).then(json1 => {
            // let petData = self.data.petData
            json1.data.forEach((item1, index) => {
                if(item1.hyaline){
                    arr.push({image: item1.hyaline.img_url, id: item1.hyaline.id})
                }
            })
            json.data.bannerList = arr;
            that.setData({
                petData:json.data
            })
            wx.hideLoading()
        })
    },
    //获取动态回复列表
    getCommentLit(id){
      //ToDO 死数据
        util.promiseSync(util.url.url.topicComment, {list_sort_id: 93,page:this.page,pageSize:10}).then(json => {
            if (json.status == 1) {
                this.setData({
                    commmentData: json.data
                })
            }
        })
    },
    // 选择背景图片
    bind_news(e){
        let index = e.currentTarget.dataset.index;
        let petData = this.data.petData
        petData.index = index
        // this.getBannerList(this.data.petData.details[index].img_id)
        util.promiseSync(util.url.url.petBannerList, {bg_id:1 }).then(json1 => {
            // let petData = self.data.petData
            json1.data.forEach((item1, index) => {
                if(item1.hyaline){
                    arr.push({image: item1.hyaline.img_url, id: item1.hyaline.id})
                }
            })
            json.data.bannerList = arr;
            that.setData({
                petData:json.data
            })
            wx.hideLoading()
        })
        this.setData({
            petData,
            indextt:index
            // indextt: index2
        })
    },
    // 获取input的值
    bind_input_val: function (e) {
        console.log(e.detail.value)
        this.setData({
            comment_val: e.detail.value
        })
    },
    //回复
    form_submit(){
        var that = this
        //todo 死数据
        util.promiseSync(util.url.url.add_comment, {
            user_id: app.user.id,
            parent_id: 0,
            to_user_id: 10,//暂无，死数据
            content: that.data.comment_val,
            list_sort_id: this.data.petData.id,//暂无，死数据
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
                util.promiseSync(util.url.url.topicComment, {list_sort_id: this.data.petData.id,page:this.page,pageSize:10}).then(json => {
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
    // 去编辑页面
    editHref() {
        // console.log(this.data.petData[this.data.index].bg[this.data.indextt].img_url);
        let id=e.currentTarget.dataset.id;
        let index =e.currentTarget.dataset.index;
        let img_id=this.data.petData.bg[this.data.indextt].img_id
        app.globalData.edit = this.data.petData[index].bg[this.data.indextt].img_url;
        app.globalData.petId=this.data.petData[index].pet_id;
        wx.setStorageSync('petData', this.data.petData);
        wx.setStorageSync('bgIndex', this.data.indextt);
        wx.navigateTo({
            url: `../scrawl/scrawl?id=${id}&img_id=${img_id}`
        })
        wx.navigateTo({
            url: `../scrawl/scrawl?id=${this.data.petData[this.data.index].id}`
        })
        app.globalData.edit = this.petData.details[this.data.petData.index].img.img_url
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