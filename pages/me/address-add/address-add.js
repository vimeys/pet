// pages/me/dizhi/dizhi.js
const app = getApp();
const totalUtil = require("../../../utils/totalUtil.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    // 省
    province:[],
    province_index:0,
    province_id: '',
    // 市
    city:[{name:'请选择'}],
    city_index: 0,
    city_id: '',
    // 区
    area:[{name:'请选择'}],
    area_index: 0,
    area_id: '',
    submit: 'add'
  },



  // 获取省
  bind_address_province: function (e) {
    var that=this
    var province_index=e.detail.value
    that.setData({
      province_index: e.detail.value,
      province_id: that.data.province[e.detail.value].id
    })
    
    var province_id = that.data.province_id
    var city_id=''

    // 发送请求 并且携带参数（用户选择的省）
    totalUtil.promiseSync(totalUtil.url.url.getRegion, { pid: province_id}).then((json) => {
      // 接收数据：json.data
      city_id = json.data[0].id
      // 赋值，根据省返回数据（市），然后赋值到页面
      that.setData({
        city: json.data,
        city_id: json.data[0].id
      })
      totalUtil.promiseSync(totalUtil.url.url.getRegion, { pid: city_id }).then((json) => {
        that.setData({
          area: json.data,
          area_id: json.data[0].id
        })
      })
    })

    
  },
  bind_address_city :function(e){
    var that = this
    var city_index = e.detail.value
    that.setData({
      city_index: e.detail.value,
      city_id: that.data.city[e.detail.value].id
    })

    var city_id = that.data.city_id
    totalUtil.promiseSync(totalUtil.url.url.getRegion, { pid: city_id }).then((json) => {
      that.setData({
        area: json.data,
        area_id: json.data[0].id
      })
    })
  },
  bind_address_area: function (e) {
    var that=this
    that.setData({
      area_index: e.detail.value,
      area_id: that.data.area[e.detail.value].id
    })
    console.log(that.data.province_id, '--', that.data.city_id, '--', that.data.area_id)
  },

  empty: function (str) {
    return typeof str === 'undefined' || str === null || str === '';
  },
  // 添加地址
  add_address: function (e) {
    var that = this
    var form_data = e.detail.value
    var form_submit = true
    
    form_data.province_id = that.data.province_id
    form_data.city_id = that.data.city_id
    form_data.area_id = that.data.area_id
    console.log(form_data)
    for (var i in form_data) {
      if (!that.empty(form_data[i]) == false) {
        form_submit = false
      }
    }
    // console.log(that.data.userInfo.id)
    // console.log(form_submit)
    if (form_submit == true) {
      if(that.data.submit=='add'){
        totalUtil.promiseSync(totalUtil.url.url.add_address, {
          user_id: that.data.userInfo.id,
          province: form_data.province_id,
          city: form_data.city_id,
          area: that.data.area_id,
          address: form_data.address_info,
          mobile: form_data.mobile,
          consignee: form_data.consignee,
          selected: 1,//默认就是默认地址
        }).then((json) => {
          if (json.status == 1) {
              wx.showToast({
                title: '添加成功',
                  icon:'success',
                  success:()=>{
                    setTimeout(function () {
                        wx.navigateBack({delta:1})
                    },1000)
                  }

              })
          } else if (json.status == 2) {
            console.log('提交失败')
          }
        })
      }
      if (that.data.submit == 'edit'){
        totalUtil.promiseSync(totalUtil.url.url.edit_address_list, {
          user_id: that.data.userInfo.id,
          province: form_data.province_id,
          city: form_data.city_id,
          area: that.data.area_id,
          address: form_data.address_info,
          mobile: form_data.mobile,
          consignee: form_data.consignee,
          id: that.data.data_address.id,
          selected: that.data.data_address.selected
        }).then((json) => {
          if (json.status == 1) {
            console.log('提交成功')
            
            // wx.navigateTo({
            //   url: '/pages/me/address-list/address-list',
            // })
              wx.showToast({
                  title: '修改成功',
                  icon:'success',
                  success:()=>{
                      setTimeout(function () {
                          wx.navigateBack({delta:1})
                      },1000)
                  }

              })
          } else if (json.status == 2) {
            console.log('提交失败')
          }
        })
      }
    }else{
      totalUtil.showModel('添加失败','请填写所有信息')
    }


  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: res.data
        })
      }
    })
    
    wx.getStorage({
      key: 'address',
      success: function (res) {
        that.setData({
          data_address: res.data,
          submit:'edit'
        })
      }
    })
    totalUtil.promiseSync(totalUtil.url.url.getRegion, {}).then((json) => {
      // console.log(json.data)
      that.setData({
        province: json.data
      })
    })
  },






})