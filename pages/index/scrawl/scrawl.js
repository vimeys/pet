// pages/index/scrawl/scrawl.js
var app=getApp()
import  util from '../../../utils/totalUtil'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      bgPic:'',
      imgList:[1,2,3,4,5,6,7,8,9,10],
      currentHatId:2,

      hatCenterX:wx.getSystemInfoSync().windowWidth/2,
      hatCenterY:150,
      cancelCenterX:wx.getSystemInfoSync().windowWidth/2-50-2,
      cancelCenterY:100,
      handleCenterX:wx.getSystemInfoSync().windowWidth/2+50-2,
      handleCenterY:200,

      hatSize:100,

      scale:1,
      rotate:0,
      width:0,
      height:0,
      chartlet:true,
      top: -1000,//canvas的定位top
      left: -1000,//canvas的定位left
      // width:750,//canvas的宽
      // height:1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(app);
      this.arr=[]
      this.sun=1
      this.setData({
          bgPic: app.globalData.bgPic
      })
       wx.getImageInfo({
           src:app.globalData.bgPic,
           success:(res)=>{
             let width,height;
             width=res.width;
             height=res.height
               let scale
               // if(width>height){
                scale=width/750;
                 app.globalData.width=Math.trunc(res.width/scale)
                 app.globalData.height=Math.trunc(res.height/scale);
                 this.setData({
                     width:app.globalData.width,
                     height:app.globalData.height
                 })
             // }else{
             //    scale=height/750;
             //       app.globalData.width=Math.trunc(res.width/scale)
             //       app.globalData.height=Math.trunc(res.height/scale);
             //   }

           }
        });
  },

    onReady(){
        this.hat_center_x=this.data.hatCenterX;
        this.hat_center_y=this.data.hatCenterY;
        this.cancel_center_x=this.data.cancelCenterX;
        this.cancel_center_y=this.data.cancelCenterY;
        this.handle_center_x=this.data.handleCenterX;
        this.handle_center_y=this.data.handleCenterY;

        this.scale=this.data.scale;
        this.rotate=this.data.rotate;

        this.touch_target="";
        this.start_x=0;
        this.start_y=0;
    },
    touchStart(e){
        if(e.target.id=="hat"){
            this.touch_target="hat";
        }else if(e.target.id=="handle"){
            this.touch_target="handle"
        }else{
            this.touch_target=""
        };

        if(this.touch_target!=""){
            this.start_x=e.touches[0].clientX;
            this.start_y=e.touches[0].clientY;
        }
    },
    touchEnd(e){
        this.hat_center_x=this.data.hatCenterX;
        this.hat_center_y=this.data.hatCenterY;
        this.cancel_center_x=this.data.cancelCenterX;
        this.cancel_center_y=this.data.cancelCenterY;
        this.handle_center_x=this.data.handleCenterX;
        this.handle_center_y=this.data.handleCenterY;
        // }
        this.touch_target="";
        this.scale=this.data.scale;
        this.rotate=this.data.rotate;
    },
    touchMove(e){
        var current_x=e.touches[0].clientX;
        var current_y=e.touches[0].clientY;
        var moved_x=current_x-this.start_x;
        var moved_y=current_y-this.start_y;
        if(this.touch_target=="hat"){
            this.setData({
                hatCenterX:this.data.hatCenterX+moved_x,
                hatCenterY:this.data.hatCenterY+moved_y,
                cancelCenterX:this.data.cancelCenterX+moved_x,
                cancelCenterY:this.data.cancelCenterY+moved_y,
                handleCenterX:this.data.handleCenterX+moved_x,
                handleCenterY:this.data.handleCenterY+moved_y
            })
        };
        if(this.touch_target=="handle"){
            this.setData({
                handleCenterX:this.data.handleCenterX+moved_x,
                handleCenterY:this.data.handleCenterY+moved_y,
                cancelCenterX:2*this.data.hatCenterX-this.data.handleCenterX,
                cancelCenterY:2*this.data.hatCenterY-this.data.handleCenterY
            });
            let diff_x_before=this.handle_center_x-this.hat_center_x;
            let diff_y_before=this.handle_center_y-this.hat_center_y;
            let diff_x_after=this.data.handleCenterX-this.hat_center_x;
            let diff_y_after=this.data.handleCenterY-this.hat_center_y;
            let distance_before=Math.sqrt(diff_x_before*diff_x_before+diff_y_before*diff_y_before);
            let distance_after=Math.sqrt(diff_x_after*diff_x_after+diff_y_after*diff_y_after);
            let angle_before=Math.atan2(diff_y_before,diff_x_before)/Math.PI*180;
            let angle_after=Math.atan2(diff_y_after,diff_x_after)/Math.PI*180;
            this.setData({
                scale:distance_after/distance_before*this.scale,
                rotate:angle_after-angle_before+this.rotate,
            })
        }
        this.start_x=current_x;
        this.start_y=current_y;
    },
    draw() {
        let scale = this.scale;
        let rotate = this.rotate;
        let hat_center_x = this.hat_center_x;
        let hat_center_y = this.hat_center_y;
        let currentHatId = this.data.currentHatId;
        const pc = wx.createCanvasContext('myCanvas');
        const windowWidth = wx.getSystemInfoSync().windowWidth;

        const hat_size = 100 * scale;


        pc.clearRect(0, 0, windowWidth, 300);
        pc.drawImage(this.data.bgPic, 0, 0, this.data.width/2, this.data.height/2);
        pc.translate(hat_center_x,hat_center_y);
        pc.rotate(rotate * Math.PI / 180);
        pc.drawImage("../../../images/" + currentHatId + ".png", -hat_size / 2, -hat_size / 2, hat_size, hat_size);
        pc.draw(false,()=>{
            wx.canvasToTempFilePath({
                // x: windowWidth / 2 - 150,
                // y: 0,
                // height: 300,
                // width: 300,
                canvasId: 'myCanvas',
                success: (res) => {
                    console.log(res.tempFilePath);
                    wx.uploadFile({
                        url: util.url.url.upfile,
                        filePath: res.tempFilePath,
                        formData:{
                            user_id:7,
                            app:'petapi',
                            filetype:'image'
                        },
                        name: 'file',
                        success:res1=>{
                            console.log(res1);
                            this.arr[0]=[res1]
                            this.sun=2
                            this.draw2()
                        }
                    })
                }
            })
        });


    },
    draw2() {
        let scale = this.scale;
        let rotate = this.rotate;
        let hat_center_x = this.hat_center_x;
        let hat_center_y = this.hat_center_y;
        let currentHatId = this.data.currentHatId;
        const pc = wx.createCanvasContext('myCanvas');
        const windowWidth = wx.getSystemInfoSync().windowWidth;

        const hat_size = 100 * scale;


        pc.clearRect(0, 0, windowWidth, 300);
        // pc.drawImage(this.data.bgPic, 0, 0, this.data.width/2, this.data.height/2);
        pc.translate(hat_center_x,hat_center_y);
        pc.rotate(rotate * Math.PI / 180);
        pc.drawImage("../../../images/" + currentHatId + ".png", -hat_size / 2, -hat_size / 2, hat_size, hat_size);
        pc.draw(false,()=>{
            wx.canvasToTempFilePath({
                // x: windowWidth / 2 - 150,
                // y: 0,
                // height: 300,
                // width: 300,
                canvasId: 'myCanvas',
                success: (res) => {
                    console.log(res.tempFilePath);
                    wx.uploadFile({
                        url: util.url.url.upfile,
                        filePath: res.tempFilePath,
                        formData:{
                            user_id:7,
                            app:'petapi',
                            filetype:'image'
                        },
                        name: 'file',
                        success:res1=>{
                            this.arr[1]=[res1]
                            console.log(this.arr);
                            // console.log(arr);
                            // sun=2
                            // this.draw2(sun,arr)
                        }
                    })
                }
            });
        });


    },



    // 预览
    prevPic() {
        // this.setData({
        //     top: 0,
        //     left: 0
        // });
        this.draw()
        const windowHeight = wx.getSystemInfoSync().windowHeight;
        let top=windowHeight-this.data.height/2
        if(top>0){
            this.setData({
                top:top/2,
                left:0
            })
        }else{
            this.setData({
                top:0,
                left:0
            })
        }
    },
    prevPicHide(){
        this.setData({
            top:-1000,
            left:-1000
        })
    },
    //保存
    save(){
        this.draw()
        const windowWidth = wx.getSystemInfoSync().windowWidth;
        wx.canvasToTempFilePath({
            // x: windowWidth / 2 - 150,
            // y: 0,
            // height: 300,
            // width: 300,
            canvasId: 'myCanvas',
            success: (res) => {
                console.log(res.tempFilePath);
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: (res) => {
                        // wx.navigateTo({
                        //     url: '../index/index',
                        //     success: function(res) {},
                        //     fail: function(res) {},
                        //     complete: function(res) {},
                        // })
                        console.log("success:" + res);
                    }, fail(e) {
                        console.log("err:" + e);
                    }
                })
            }
        });
    },
    // 发布
    upload(){

        this.up()
    },
    up(sun,arr){

      if(this.sun==1){
          this.draw()
          // let windowWidth = wx.getSystemInfoSync().windowWidth;
      }else{
          this.draw2()
          // let windowWidth = wx.getSystemInfoSync().windowWidth;

      }
    },
    // 跳转log
    hrefLog(){
      wx.navigateTo({
        url: ''
      })
    }
})