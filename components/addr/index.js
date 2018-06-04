// import { regular } from '../util/util.js';
// import utils from "../../utils/util";
const app = getApp();

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    addressList: {
      type: Array,
      // value: [{ name: "大川", phone: '13438811111', region: ["北京市", "北京市", "东城区"], address: "很远" },
      // { name: "大川", phone: '13438811111', region: ["北京市", "北京市", "东城区"], address: "很远" }],
      observer (e){
        this._navigateBack();
      }
    }
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    info: {
      // region: ["北京市", "北京市", "东城区"],
      consignee: "",
      mobile: "",
      address: "",
      province:0, // 一级城市索引
      city:0, // 二级城市索引
      district:0, // 三级城市索引
      address:""
    },
    provinceData:[[],[],[]], // 一级城市数据
    // cityData:"",  //二级城市数据
    // districtData:"", //三级城市数据
    // 弹窗显示控制
    showlist: "",
    token:"",
    pickerShow:false,
    iseditor:false
  },
  ready() {
    var res = this.data.addressList;
    console.log(res)
    const that = this;
    res.map(function (item) {
      item.check = false;
    })
    this.setData({
      res_data: res,
    })
    wx.getStorage({
      key:"userToken",
      success: res =>{
        that.setData({
          token:res.data.token
        })
      }
    })
    this.regionRequest();
  },
  /**
   * 私有方法
   */
  methods: {
    _navigateBack(){ //确认订单页面 使用地址管理功能成功后 返回监听
      const that = this;
      const page = getCurrentPages();
      let addressList = that.data.addressList;
      let pageIndex = '';
      for( let i = 0; i < page.length; i++ ){
        if( page[i].route == 'pages/me/order_sure1/order_sure1' ){
          pageIndex = i;
        }
      };
      if( !pageIndex ) return false;
      addressList.map((item,index) =>{
        if( item.is_default == 1 ){
          page[pageIndex].data.orderData.address = item;
        }
      });
      page[pageIndex].setData({
        orderData:page[pageIndex].data.orderData
      })
    },
    regionRequest(){ // 一级城市数据拉取
      const that = this;
      utils.request({
        url: app.data.requestUrl + "/index.php?m=api&c=Api&a=getProvince",
        // data:{},
        success: res =>{
          res.map((item,index) =>{
            that.data.provinceData[0].push(item)
          })
          that.setData({
            provinceData:that.data.provinceData
          });
          that.cityRequest(that.data.provinceData[0][that.data.info.province].id, 0);
        }
      })
    },
    cityRequest(parent_id, typeId ){ //二级城市数据拉取
      const that = this;
      // if( typeId == "1" ) return false;
      // wx.showLoading({title: '加载中'});
      
      wx.request({
        url: app.data.requestUrl + "/index.php?m=api&c=Api&a=getRegionByParentId",
        data:{
          parent_id:parent_id
        },
        success: res =>{
          let key;
          if( typeId == 0 ){
            that.data.provinceData[1] = res.data.result;
            key = 'city';
          }else if( typeId == 1 ){
            that.data.provinceData[2] = res.data.result;
            key = "district";
          }
          res.data.result.map((item,index) =>{
            if( item.id == that.data.info[key] ){
              that.data.info[key] = index;
            }
          });
          if( typeId == 0 ){
            that.cityRequest(that.data.provinceData[1][that.data.info.city].id, 1);
          };
          that.setData({
            provinceData:that.data.provinceData,
            info:that.data.info
          });
          if( that.data.iseditor && key == "district" ){  // 处理编辑时 地址闪烁问题
            that.setData({
              pickerShow:true
            })
          }
          // wx.hideLoading();
        }
      })
    },
    bindDataChange(e){ //输入
      var key = e.target.id;
      var value = e.detail.value;
      this.setData({
        [key]: value
      })
    },
    bindRegionChange(e) {  //城市选择
      const that = this;
      let typeId = e.currentTarget.dataset.type;
      let index = e.detail.value;
      let key = ["province","city","district"]
      let column = e.detail.column;
      
      // province:"", // 一级城市索引
      // city:"", // 二级城市索引
      // district:"", // 三级城市索引
      that.data.info[ key[column] ] = index;

      that.setData({
        info:that.data.info
      })

      this.cityRequest(that.data.provinceData[column][index].id, column);
    },
    bindBtn() {
      const thatD = this.data;
      if (!(regular.name(this.data.info.consignee))) {
        wx.showModal({ title: '提示', content: "请输入正确的姓名" });
        return false;
      };
      if (!(regular.phone(this.data.info.mobile))) {
        wx.showModal({ title: '提示', content: "请输入正确的手机号码" });
        return false;
      };
      // if( !thatD.info.province || !thatD.info.city || !thatD.info.district ){
      //   wx.showModal({ title: '提示', content: "请选择地址" });
      //     return false;
      // };
      if (regular.isNull(this.data.info.address)) {
        wx.showModal({ title: '提示', content: "请输入详细地址" });
        return false;
      };
      var newData = this.data.addressList;
      // if (this.data.showlist == "add") {
      //   newData.push(this.data.info)
      // } else {
      //   newData.map((item, index) => {
      //     if (index == this.data.index) {
      //       item = this.data.info
      //     }
      //   })
      // }
      this.request(this.data.info);
      this.triggerEvent("address", newData);
    },
    request(newData){  //提交地址
      const thatD = this.data;
      const that = this;
      let data = {
        token:that.data.token, //token
        consignee:newData.consignee, //收货人
        province:thatD.provinceData[0][thatD.info.province].id, //省份
        city:thatD.provinceData[1][thatD.info.city].id, //城市
        district:thatD.provinceData[2][thatD.info.district].id, //地区
        address:newData.address, //详细地址
        mobile:newData.mobile, //手机号
    }
    if( newData.address_id ){  //编辑地址 传入地址ID
      data.address_id = newData.address_id
    }
    console.log(data)
    utils.request({
      url: app.data.requestUrl + "/index.php?m=Api&c=User&a=addAddress",
      data:data,
      method:"POST",
      success: res2 =>{
        wx.redirectTo({  //重新打开地址管理页面 更新地址信息
          url:"/pages/me/address/address"
        })
      }
    }) 
    },
    addAddress() {
      this.setData({
        showlist: "add",
        // info: { region: ["北京市", "北京市", "东城区"] }
        pickerShow:true
      })
    },
    checkAddress(e) {  //设置默认地址
      var idx = e.currentTarget.dataset.index;
      var newData = this.data.addressList;
      const that = this;
      newData.map((item, index) => {
        item.is_default = 0;
        if (index == idx) {
          item.is_default = 1;
        }
      })
      utils.request({
        url:app.data.requestUrl + "/index.php?m=Api&c=user&a=setDefaultAddress",
        data:{
          address_id: newData[idx].address_id,
          token:that.data.token
        },
        success: res =>{
          //默认地址设置成功
          that.setData({
            addressList: newData
          })
          that._navigateBack();
        }
      })
      this.triggerEvent("address", newData);
    },
    deleteAddress(e) {
      var idx = e.currentTarget.dataset.index;
      var newData = this.data.addressList;
      const that = this;
      let delete_data = []
      let show_data = [];
      wx.showModal({
        title:"提示",
        content:"确认要删除该地址吗?",
        mask:true,
        success: res =>{
          if( res.confirm ){
            newData.map((item, index) => {
              if (index == idx) {
                if (item.is_default == 1) {
                  wx.showModal({ title: '提示', content: "不能删除默认地址" });
                  show_data.push(item)
                } else {
                  utils.request({
                    url:app.data.requestUrl + "/index.php?m=Api&c=user&a=del_address",
                    data:{
                      address_id:item.address_id,
                      token:that.data.token
                    },
                    success: res =>{
                      //删除成功
                      delete_data.push(item)
                    }
                  })
                }
              } else {
                show_data.push(item)
              }
            })
            this.setData({
              addressList: show_data
            })
            this.triggerEvent("address", newData);
          }
        }
      })
    },
    editAddress(e) {  //编辑地址
      var idx = e.currentTarget.dataset.index;
      var newData = this.data.addressList;
      const that = this;
      var provinceData = that.data.provinceData;
      newData.map((item, index) => {
        if (index == idx) {
          provinceData[0].map((itm,index) =>{
            if( item.province == itm.id ){
              item.province = index;
              that.cityRequest(itm.id, 0);
            }
          });
          this.setData({
            showlist: "change",
            info: item,
            iseditor:true
          })
        }
      })
      this.triggerEvent("address", newData);
    }
  }
})