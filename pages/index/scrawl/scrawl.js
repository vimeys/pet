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
      isChartImage:false,//是否显示贴图
      hatCenterX:wx.getSystemInfoSync().windowWidth/2-50,
      hatCenterY:100,
      handleCenterX:wx.getSystemInfoSync().windowWidth/2,
      handleCenterY:150,
      hatSize:100,
      scale:1,
      rotate:0,
      width:0,
      height:0,
      chartlet:true,
      top: -1000,//canvas的定位top
      left: -1000,//canvas的定位left
      showImageList:false,//贴图集是否显示
      typeSave:true,
      animation:false,
      friction:200,
      damping:200,
      scale1:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(app);
      this.arr=[]
      this.sun=1;
      this.getChartletList();
      this.id=options.id;
      this.img_id=options.img_id;
      console.log(13 + app.globalData.edit);
      this.setData({
          bgPic: app.globalData.edit,
          filePath:app.filePath
      })
      let that=this;
       wx.getImageInfo({
           src:app.filePath+app.globalData.edit,
           success:(res)=>{
               this.setData({
                   src:res.path
               })
             let width,height,x,y;
             let windowWidth=wx.getSystemInfoSync().windowWidth;
             width=res.width;
             height=res.height;
               console.log(width, height);
               if(width>height){//比较是否长款比例
                   let scale;
                   scale=height/(windowWidth*2);
                   width=Math.trunc(res.width/scale);
                   height=Math.trunc(res.height/scale);
                   x=(Math.trunc(res.width/scale)-windowWidth*2)/4;
                   y=0;
                   that.setData({
                       width,
                       height,
                       x,y
                   })
               }else{
                   let scale;
                   scale=width/(windowWidth*2);
                   width=Math.trunc(res.width/scale);
                   height=Math.trunc(res.height/scale);
                   y=(Math.trunc(res.height/scale)-windowWidth*2)/4;
                   x=0;
                   that.setData({
                       width,
                       height,
                       x,
                       y
                   })
               }
           }
        });
  },


//获取贴图列表
    getChartletList(){
        util.promiseSync(util.url.url.getChartletList,{}).then(json=>{
            if(json.status==1){
                let arr=[]
                let chartLet=[]
                for(let  key in json.data){
                    arr.push(json.data[key][0])
                    chartLet.push(json.data[key])
                }
                let imgList='';//单个贴图集
                imgList=util.firstObjValue(json.data)
                this.setData({
                    chartList:arr,//贴图封面
                    chartletCover:chartLet,//整个贴图集
                    imgList:imgList
                })
            }
        })
    },
    // 切换贴图集
    toggleChartList(e){
        let index=e.currentTarget.dataset.index;
        let showImageList=true;
        this.gatherIndex=index
        let imgList=this.data.chartletCover[index]
        this.setData({
            idx:index,
            showImageList,
            imgList:imgList
        })
    },
    // 选择子贴图
    chooseImg(e){
        let src=app.filePath+e.target.dataset.hatId;//
        let that=this
         wx.getImageInfo({
             src:app.filePath+e.target.dataset.hatId,
             success(res){
                 that.setData({
                     currentChartImage:res.path
                 })
             }
         })
        this.setData({
            currentChartImage1:src,
            isChartImage:true,
            showImageList:!this.data.showImageList,
        })
    },
    onReady(){
        this.hat_center_x=this.data.hatCenterX;
        this.hat_center_y=this.data.hatCenterY;
        this.handle_center_x=this.data.handleCenterX;
        this.handle_center_y=this.data.handleCenterY;

        this.scale=this.data.scale;
        this.rotate=this.data.rotate;

        this.start_x=0;
        this.start_y=0;
    },

    
    // 可移动区域滑动
    move(e){
      this.setData({
          hatCenterX:e.detail.x,
          hatCenterY:e.detail.y
    })

    },
    touchStart(e){
            this.start_x=e.touches[0].clientX;
            this.start_y=e.touches[0].clientY;
    },
    touchMove(e){
        var current_x=e.touches[0].clientX;
        var current_y=e.touches[0].clientY;
        var moved_x=current_x-this.start_x;
        var moved_y=current_y-this.start_y;
        this.setData({
            handleCenterX:this.data.handleCenterX+moved_x,
            handleCenterY:this.data.handleCenterY+moved_y,
        });
        let diff_x_before=this.handle_center_x-this.hat_center_x;
        let diff_y_before=this.handle_center_y-this.hat_center_y;
        let diff_x_after=this.data.handleCenterX-this.hat_center_x;
        let diff_y_after=this.data.handleCenterY-this.hat_center_y;

        let distance_before=Math.sqrt(diff_x_before*diff_x_before+diff_y_before*diff_y_before);
        let distance_after=Math.sqrt(diff_x_after*diff_x_after+diff_y_after*diff_y_after);
        let angle_before=Math.atan2(diff_y_before,diff_x_before)/Math.PI*180;
        let angle_after=Math.atan2(diff_y_after,diff_x_after)/Math.PI*180;


        if(distance_after/distance_before*this.scale>4){
            this.setData({
                scale:4,
                rotate:angle_after-angle_before+this.rotate
            })
        }else{
            this.setData({
                scale:distance_after/distance_before*this.scale,
                rotate:angle_after-angle_before+this.rotate,
            })
        }

        this.start_x=current_x;
        this.start_y=current_y;
    },
    touchEnd(){
        this.hat_center_x=this.data.hatCenterX;
        this.hat_center_y=this.data.hatCenterY;
        this.handle_center_x=this.data.handleCenterX;
        this.handle_center_y=this.data.handleCenterY;
        // }
        this.scale=this.data.scale;
        this.rotate=this.data.rotate;
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
        pc.clearRect(0, 0, windowWidth, windowWidth);
        console.log(123,app.filePath+this.data.bgPic);
        console.log(this.data.x, this.data.y);
        let src=app.filePath+this.data.bgPic
        // pc.drawImage(app.filePath+this.data.bgPic, -this.data.x, -this.data.y, windowWidth, windowWidth);
        pc.drawImage(this.data.src, -this.data.x, -this.data.y, this.data.width/2, this.data.height/2);
        pc.translate(this.data.hatCenterX,this.data.hatCenterY);
        pc.rotate(rotate * Math.PI / 180);
        console.log(-hat_size / 4, -hat_size / 4);
        console.log(-hat_size /2, -hat_size /2 );
        if(this.data.currentChartImage){
            pc.drawImage(this.data.currentChartImage, 0, 0, hat_size/2, hat_size/2);
        }
        pc.draw();
    },
    draw1() {
        let scale = this.scale;
        let rotate = this.rotate;
        let hat_center_x = this.hat_center_x;
        let hat_center_y = this.hat_center_y;
        let currentHatId = this.data.currentHatId;
        const pc = wx.createCanvasContext('myCanvas');
        const windowWidth = wx.getSystemInfoSync().windowWidth;

        const hat_size = 100 * scale;


        pc.clearRect(0, 0, windowWidth, 300);
        pc.drawImage(app.filePath+this.data.bgPic,   -this.data.x, -this.data.y, this.data.width/2, -this.data.height/2);
        pc.translate(this.data.hatCenterX,this.data.hatCenterY);
        pc.rotate(rotate * Math.PI / 180);
        pc.drawImage(this.data.currentChartImage, -hat_size / 2, -hat_size / 2, hat_size/2, hat_size/2);
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
                            console.log(res1.data);
                            this.arr[0]=[JSON.parse(res1.data).data.id]
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
        pc.translate(this.data.hatCenterX,this.data.hatCenterY);
        pc.rotate(rotate * Math.PI / 180);
        pc.drawImage(this.data.currentChartImage, -hat_size / 2, -hat_size / 2, hat_size/2, hat_size/2);
        pc.draw(false,()=>{
            wx.canvasToTempFilePath({
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
                            let petData=wx.getStorageSync('petData');
                            let bgIndex=wx.getStorageSync('bgIndex')
                            this.arr[1]=[JSON.parse(res1.data).data.id]
                            console.log(this.arr);
                            let obj={}
                            obj.user_id=petData.user_id;
                            obj.edit_id= app.user.id
                            obj.pet_id=petData.pet_id
                            obj.list_sort_id=this.id;
                            obj.graffiti_id=this.arr[0]
                            obj.hyaline_id=this.arr[1]
                            obj.bg_id=[petData.bg[bgIndex].img_id];
                            // for(let i=0;i<this.bg.length;i++){
                            //    obj.bg_id=this.bg[i];
                            //     obj.graffiti_id=this.ttBg[i];
                            //    obj.hyaline_id=this.kBg[i];
                            // }
                            util.promiseSync(util.url.url.addttBg,obj).then((json)=>{
                                if(json.status==1){
                                    util.showSuccess('发布成功');
                                }
                            })
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
            this.setData({
                top:100,
                left:0
            })

    },
    prevPicHide(){
        this.setData({
            top:-1000,
            left:-1000
        })
    },
    //保存
    save(){

        this.draw1()
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

        if(this.data.typeSave){
            this.setData({
                typeSave:false
            })
            if(this.data.isChartImage){
                this.up()
            }else {
                wx.showToast({
                    title: '你还没有编辑贴图',
                    icon:'none'
                })
            }
            setTimeout(()=>{
                this.setData({
                    typeSave:true
                })
            },10000)
        }


    },
    up(sun,arr){

      if(this.sun==1){
          this.draw1()
          // let windowWidth = wx.getSystemInfoSync().windowWidth;
      }else{
          this.draw2()
          // let windowWidth = wx.getSystemInfoSync().windowWidth;

      }
    },
    close(){
      this.setData({
          isChartImage:false
      })
    },
    // 跳转log
    hrefLog(){
      wx.navigateTo({
        url: '../history/history?id='+this.id+'&img_id='+this.img_id
      })
    }
})