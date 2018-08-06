// pages/store/goodsList/goodsList.js
import  util from "../../../utils/totalUtil"
var app=getApp();
var setTime
Page({

    /**
     * 页面的初始数据
     */
    data: {
        disable: true,
        active: 1,
        filePath:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            filePath:app.filePath
        })

        this.getList(1)
    },
    //选择商品导航
    chooseNav(e) {
        let id=e.currentTarget.dataset.id;
        if(id==1){

            this.setData({
                active:1,
                disable:true
            })
            this.getList(1)
        }else{
            this.setData({
                active:2,
                disable:false
            })
            this.getList(0)
        }
    },
    // 获取商品列表
    getList(id){

          util.promiseSync(util.url.url.goodsList,{limit:id}).then(json=>{

              if(json.status==1){
                  this.setData({
                      goodsList:json.data
                  });
                  let that=this;
                  if(id==1){
                      let m=that.data.goodsList[0].start_time.slice(5)
                      m=m.replace('-','月');
                      m=m.replace(/ /g,'日  ');
                      this.setData({
                          time:m
                      })
                      console.log(m);
                      setTime=setInterval(function () {
                            let time= Date.parse(new Date())
                            let start=that.data.goodsList[0].start_time.replace('-','/')
                            start= new Date(start)
                            if(time>start){
                                that.setData({
                                    disable:false
                                })
                            }
                        },1000)

                  }
              }
          })
    },
    // 去详情页面
    goDetail(e){
        console.log(e);
        let  id=e.detail.id
        wx.navigateTo({
          url: '../goods-content/goods-content?id='+id
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

    }
    ,

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        clearInterval(setTime)
    }
    ,

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    }
    ,

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    }
    ,

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
    ,

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})