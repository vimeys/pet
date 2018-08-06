// pages/activity/clock/clock.js
var app=getApp();
import  util from '../../../utils/totalUtil'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      filePath:app.filePath,
      arr:[{has:false},{has:false},{has:true}],
      isLucky:true,
      animate:false,
      move:false,
      card:{
          cardName:'猛犬卡',
          image:'/images/me-pat-card.png'
      },
      modul:true
  },


  //点击抽奖
    lucky(e){
    //todo 模拟数据

        let code=this.data.Data[this.data.index].unique_code
        let id=wx.getStorageSync('active_id')
        this.setData({
            animate:true
        })
      util.promiseSync(util.url.url.activeCardLucky,{activity_id:id,user_id:app.user.id,unique_code:code}).then(json=>{
          if(json.status==1){
              if(json.data.reward.key==1){
                    wx.showModal({
                      title: '遗憾',
                      content: '谢谢惠顾,下次再来',
                        showCancel:false,
                      success: res=>{
                        if (res.confirm) {

                        }
                      }
                    })
              }else if(json.data.reward==2){
                  wx.showModal({
                      title: '恭喜',
                      content:`恭喜获得${json.data.reward.value}爪币`,
                      showCancel:false,
                      success: res=>{
                          if (res.confirm) {

                          }
                      }
                  })
              }
          }else if(json.data.reward==3){
              // wx.showToast({
              //   title: json.msg,
              //   icon:'none'
              // })
              this.setData({
                  modul:false,
                  codeUrl:json.data.reward.value.url
              })
          }

      })
    },
    //点击保存二维码
    save(){
        wx.downloadFile({
            url: this.data.codeUrl,
            success: function (res) {
                //图片保存到本地
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function (data) {
                        this.setData({
                            modul:true
                        })
                        wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000
                        })
                    },
                    fail: function (err) {
                        console.log(err);
                        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                            console.log("当初用户拒绝，再次发起授权")
                            wx.openSetting({
                                success(settingdata) {
                                    console.log(settingdata)
                                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                        console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                                    } else {
                                        console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                                    }
                                }
                            })
                        }
                    },
                    complete(res){
                        console.log(res);
                    }
                })
            }
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          filePath:app.filePath
      })
      // console.log(options.Scene);
      let code=options.Scene;
      console.log(code);
      this.setData({
          code:code
      })
      // console.log(app);
      if(code){
          this.getCard(code)
      }else{
          let id=wx.getStorageInfoSync('active_id')
          this.getCardList(id)
      }

  },
    getCard(code){
        console.log(code);
        console.log(app.user.id);
        //todo 模拟数据
        util.promiseSync(util.url.url.getCard, {user_id: app.user.id, unique_code: code}).then((josn) => {
                if (josn.status == 1) {
                    this.getCardList(json.data.card_info.activity_id)
                }else{
                    let id=wx.getStorageInfoSync('active_id')
                    this.getCardList(id)
                }
            }
        )
    },
    //获取卡片
    getCardList(id){
        //todo 模拟数据
      util.promiseSync(util.url.url.activeCardList,{activity_id:4,user_id:app.user.id}).then(json=>{
          console.log(json);
          function check(json){
              return json.length==0
          }
          let index=json.data.forEach((item,index) =>{
              if(item.unique_code==this.data.code){
                  return index
              }
          })
          index=index?index:0
          let abc=json.data.every(check)

          this.setData({
              Data:json.data,
              num:json.data.length,
              ismerge:abc,
              index:index,
              data:json.data[index]
          })
      })
    },
    // 选择卡片
    choose(e){
        let index=e.currentTarget.dataset.index;
        let data=this.data.Data[index]
        this.setData({
            data:data
        })
    },
    // 单张抽奖
    oneLuck(index){
      // let code=this.data.
      // util.promiseSync(util.url.url.activeCardLucky,{activity_id:4,user_id:app.user.id,unique_code:})
    },


    //合成卡片
    mergeCard(){
        //todo 模拟数据
      util.promiseSync(util.url.url.activeCardMerge,{activity_id:4,user_id:app.user_id}).then(json=>{
          console.log(json);
          if(json.status==1){
                this.setData({
                    move:true
                })
              let card=this.data.card
              card.cardName='超级狗';
                card.image='/images/close.png';
              setTimeout(()=>{
                    this.setData({
                        card,
                        animate:true
                    })
              },1500)
              setTimeout(()=>{
                    this.setData({
                        move:false,
                        animate:true
                    })
              },3100)
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
  onShareAppMessage: function () {
  
  }
})