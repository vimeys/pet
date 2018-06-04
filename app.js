//app.js
import util from 'utils/totalUtil'
App({
  // 加载更多
  more_star_text:'查看更多...',
  more_end_text:'已全部加载',
  globalData: { bgPic: '../../../images/1.png' },
  // 测试图片
  test_img_url: '/images/test/index-banner.png',
  test_img_url2: '/images/test/img.png',
  test_img_hsq: '/images/test/hsq.jpeg',
  test_img_hsq1: '/images/test/hsq1.jpg',
  test_img_hsq_320: '/images/test/hsq-320.jpg',
  text_img_list: [
    '/images/test/index-banner.png',
    '/images/test/img.png',
    '/images/test/hsq.jpeg',
    '/images/test/index-banner.png',
    '/images/test/hsq1.jpg',
    '/images/test/hsq-320.jpg',
    '/images/test/index-banner.png',
  ],
  // 贴图
  news_chartlet_list: [
    [
      '/images/test/news-chartlet1.png',
      '/images/test/news-chartlet2.png',
      '/images/test/news-chartlet3.png'
    ], [
      '/images/test/news-chartlet1.png',
      '/images/test/news-chartlet1.png',
      '/images/test/news-chartlet1.png'
    ], [
      '/images/test/news-chartlet2.png',
      '/images/test/news-chartlet2.png',
      '/images/test/news-chartlet2.png'
    ], [
      '/images/test/news-chartlet3.png',
      '/images/test/news-chartlet3.png',
      '/images/test/news-chartlet3.png'
    ]
  ],
  filePath: '',//图片视频的路径前缀
  onLaunch: function () {

    util.promiseSync(util.url.url.filePath, {}).then((json) => {
      this.filePath = json.data  //固定图片路径
      this.globalData = { bgPic: '../../../images/1.png' }
    })
    wx.setStorageSync('user', { uid: 7, petId: 1 });
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())

    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        util.promiseSync(util.url.url.login, { code: res.code }).then((json) => {
          console.log(json);
          if (json.status == 1) {
            wx.setStorageSync('userInfo', json.data);
          } else {
            util.showLoading(json.status)
            setTimeout(() => {
              wx.hideLoading()
            }, 2000)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})