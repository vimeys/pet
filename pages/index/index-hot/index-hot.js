// pages/test-column/test-column.js
const totalUtil = require("../../../utils/totalUtil.js");
var app = getApp()
let col1H = 0;
let col2H = 0;
let i = 0;
Page({
  data: {
    images_arr: [],
    col1: [],
    col2: [],
    page: 1,
      // filePath:app.filepath,
    more_text: app.more_star_text
  },

  onLoad: function () {
    var that = this
    that.setData({
      img_url: app.filePath
    })
    wx.getSystemInfo({
      success: (res) => {
        totalUtil.promiseSync(totalUtil.url.url.index_hot, { page: 1, pageSize: 10 }).then((json) => {
          that.setData({
            images_arr: json.data
          })
        })
        //加载首组图片
      }
    })
  },

  // 分页
  getMore: function () {
    var that = this
    let page = this.data.page;
    page++
    console.log(page)
    totalUtil.promiseSync(totalUtil.url.url.index_hot, { page: page, pageSize: 10 }).then((json) => {
      let images = this.data.images_arr;
      if (json.data.length < 2) {
        // 加载完毕
        console.log(0)
        that.setData({
          more_text: app.more_end_text,
          disabled:true
        })
      }else{
        console.log(1)
        images = images.concat(json.data)
        that.setData({
          images_arr: images,
          page: page
        })
        console.log(that.data.images_arr)
      }
      
    })
  },

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
})

