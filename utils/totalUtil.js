// const url=require("url")
import url from 'url'
// 时间格式转换
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 时间撮转换成时间
function formatTime2(date) {
    var data=new Date();
    data.setTime(date*1000);
    var year = data.getFullYear();
    var month = data.getMonth() + 1;
    var day = data.getDate();

    var hour = data.getHours();
    var minute = data.getMinutes();
    var second = data.getSeconds();


    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const  formatYear=function(date){
    var data=new Date();
    data.setTime(date*1000);
    var year = data.getFullYear();
    var month = data.getMonth() + 1;
    var day = data.getDate();
    return [year,month,day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}


const showLoading = text=> wx.showLoading({
   title:text
})





//默认取对象的第一个
const firstObjValue=data=>{
    for(var key in data){
        return data[key]
    }
}

//公共添加图片链接
const pushHttp=(arr,httpStr,attr,imgName)=>{
    for(let key in arr){
        console.log(arr[key][attr]);
        arr[key][attr]=httpStr+JSON.parse(arr[key][attr])[imgName]
    }
    console.log(arr);
}


// ajax请求封装同步
function promiseSync(url,data) {
    return new Promise(function (resolve,reject) {
        wx.request({
            url:url,
            data:data,
            dataType:'json',
            method:'POST',
            success:function(res){// 请求链接成功后执行过程
                // console.log(res);
                var json=res.data;
                if(res.statusCode==200){
                    resolve(json)
                }else{
                    console.log("总请求失败,请检查接口信息");
                }
            },
            fail:function(res){  // 请求链接失败后执行
                console.log(res);
                reject(res.data)
            }
        })
    })
}

// 异步加载

function promise(url,data) {
    return new Promise(function (resolve,reject) {
        wx.showLoading({
          title: '加载中...'
        })
        wx.request({
            url:url,
            data:data,
            method:'POST',
            success:function(res){// 请求链接成功后执行过程
                wx.hideLoading();
                var json=res.data;
                if(json.code==200){
                    resolve(json)
                }else{
                    console.log("总请求失败,请检查接口信息");
                }
                // if(json.status==1){// 当请求数据成功后执行
                //     resolve(json)
                // }else if(json.status==0){
                //     // console.log(res);
                //     wx.login({
                //         success(res){
                //             wx.request({
                //                 url:"",
                //                 data:{code:res.code},
                //                 success:res=>{
                //                     resolve(json)
                //                 }
                //             })
                //         }
                //     })
                //     resolve(json)
                // }
            },
            fail:function(res){  // 请求链接失败后执行
                console.log(res);
                reject(res.data)
            }
        })
    })
}
// 获取同步缓存数据
const storage=name=>{

    let sto=wx.getStorageSync(name);
    return sto
}
//循环数组中的值
const repeatArr= (arr,num)=>{
    let length=arr.length
    let newArr=[]
    if(length==1){
        for(let i=0;i<num;i++){
            newArr.push(arr[0])
        }
    }
    return newArr
}

module.exports = {
    formatTime,
    formatTime2,
    formatYear,
    showBusy,
    showSuccess,
    showModel ,
    firstObjValue,
    showLoading,
    pushHttp,
    promise,
    promiseSync,
    storage,
    repeatArr,
    url
}
