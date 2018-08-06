// pages/index/scrawl/scrawl.js
var app=getApp()
import  util from '../../../utils/totalUtil'
var samllImageIndex=0
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
      cancelCenterX:wx.getSystemInfoSync().windowWidth/2-100,
      cancelCenterY:50,
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
      scale1:false,
      image_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(app);
      this.index=0
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
        let li={
            hatCenterX:wx.getSystemInfoSync().windowWidth/2-50,
            hatCenterY:100,
            handleCenterX:wx.getSystemInfoSync().windowWidth/2,
            handleCenterY:150,
            cancelCenterX:wx.getSystemInfoSync().windowWidth/2-100,
            cancelCenterY:50,
            hatSize:100,
            scale:1,
            rotate:0,
            iconShow:true,
            smallImage:true
        };//小贴图li
        let src=app.filePath+e.target.dataset.hatId;//
        let that=this
         wx.getImageInfo({
             src:app.filePath+e.target.dataset.hatId,
             success(res){
                 that.setData({
                     currentChartImage:res.path
                 })
                 li.currentChartImage=res.path
                 let image_list=that.data.image_list
                 image_list.push(li)
                 that.setData({
                     image_list:image_list
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
        // this.hat_center_x=this.data.hatCenterX;
        // this.hat_center_y=this.data.hatCenterY;
        // this.handle_center_x=this.data.handleCenterX;
        // this.handle_center_y=this.data.handleCenterY;
        //
        // this.scale=this.data.scale;
        // this.rotate=this.data.rotate;
        //
        // this.start_x=0;
        // this.start_y=0;
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

    // },
    click(e){
        let id=e.currentTarget.dataset.id;
        console.log(id);
    },
    touchStart(e){
         samllImageIndex =e.target.dataset.index;
        if(e.target.id=="hat"){
            this.touch_target="hat";
        }else if(e.target.id=="handle"){
            this.touch_target="handle"
        }else{
            this.touch_target=""
            let data=this.data.image_list
            data.splice(samllImageIndex,1)
            console.log(data);
            this.setData({
                image_list:data
            })
        };

        if(this.touch_target!=""){
            this.start_x=e.touches[0].clientX;
            this.start_y=e.touches[0].clientY;
        }
    },
    touchMove(e){
        let that=this;
        fn(that,e)
        // var current_x=e.touches[0].clientX;
        // var current_y=e.touches[0].clientY;
        // var moved_x=current_x-this.start_x;
        // var moved_y=current_y-this.start_y;
        // this.setData({
        //     handleCenterX:this.data.handleCenterX+moved_x,
        //     handleCenterY:this.data.handleCenterY+moved_y,
        // });
        // let diff_x_before=this.handle_center_x-this.hat_center_x;
        // let diff_y_before=this.handle_center_y-this.hat_center_y;
        // let diff_x_after=this.data.handleCenterX-this.hat_center_x;
        // let diff_y_after=this.data.handleCenterY-this.hat_center_y;
        //
        // let distance_before=Math.sqrt(diff_x_before*diff_x_before+diff_y_before*diff_y_before);
        // let distance_after=Math.sqrt(diff_x_after*diff_x_after+diff_y_after*diff_y_after);
        // let angle_before=Math.atan2(diff_y_before,diff_x_before)/Math.PI*180;
        // let angle_after=Math.atan2(diff_y_after,diff_x_after)/Math.PI*180;
        //
        //
        // if(distance_after/distance_before*this.scale>4){
        //     this.setData({
        //         scale:4,
        //         rotate:angle_after-angle_before+this.rotate
        //     })
        // }else{
        //     this.setData({
        //         scale:distance_after/distance_before*this.scale,
        //         rotate:angle_after-angle_before+this.rotate,
        //     })
        // }
        //
        // this.start_x=current_x;
        // this.start_y=current_y;

    },
    touchEnd(){
        this.hat_center_x=this.data.image_list[samllImageIndex].hatCenterX;
        this.hat_center_y=this.data.image_list[samllImageIndex].hatCenterY;
        this.handle_center_x=this.data.image_list[samllImageIndex].handleCenterX;
        this.handle_center_y=this.data.image_list[samllImageIndex].handleCenterY;
        // }
        this.scale=this.data.image_list[samllImageIndex].scale;
        this.rotate=this.data.image_list[samllImageIndex].rotate;
    },

    draw() {
        // let scale = this.data.scale;
        // let rotate = this.data.rotate;
        // let hat_center_x = this.hat_center_x;
        // let hat_center_y = this.hat_center_y;
        // let currentHatId = this.data.currentHatId;
        const pc = wx.createCanvasContext('myCanvas');
        const windowWidth = wx.getSystemInfoSync().windowWidth;
        // const hat_size = 100 * scale;
        pc.clearRect(0, 0, windowWidth, windowWidth);
        console.log(123,app.filePath+this.data.bgPic);
        console.log(this.data.x, this.data.y);
        let src=app.filePath+this.data.bgPic
        // pc.drawImage(app.filePath+this.data.bgPic, -this.data.x, -this.data.y, windowWidth, windowWidth);
        pc.drawImage(this.data.src, -this.data.x, -this.data.y, this.data.width/2, this.data.height/2);

        // pc.translate(this.data.hatCenterX,this.data.hatCenterY);
        // pc.rotate(rotate * Math.PI / 180);
        if(this.data.image_list){
            this.data.image_list.forEach((item,index)=>{
                let  hat_size = 100 * item.scale;
                pc.translate(item.hatCenterX,item.hatCenterY);
                pc.rotate(item.rotate * Math.PI / 180);
                pc.drawImage(item.currentChartImage, -hat_size / 2, -hat_size / 2, hat_size, hat_size);
                pc.translate(-item.hatCenterX,-item.hatCenterY);
                pc.rotate(0);
            })
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
        if(this.data.image_list){
            this.data.image_list.forEach((item,index)=>{
                let  hat_size = 100 * item.scale;
                pc.translate(item.hatCenterX,item.hatCenterY);
                pc.rotate(item.rotate * Math.PI / 180);
                pc.drawImage(item.currentChartImage, -hat_size / 2, -hat_size / 2, hat_size, hat_size);
                pc.translate(-item.hatCenterX,-item.hatCenterY);
                pc.rotate(0);
            })
        }
        // pc.translate(this.data.hatCenterX,this.data.hatCenterY);
        // pc.rotate(rotate * Math.PI / 180);
        // pc.drawImage(this.data.currentChartImage, -hat_size / 2, -hat_size / 2, hat_size, hat_size);
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
        if(this.data.image_list){
            this.data.image_list.forEach((item,index)=>{
                let  hat_size = 100 * item.scale;
                pc.translate(item.hatCenterX,item.hatCenterY);
                pc.rotate(item.rotate * Math.PI / 180);
                pc.drawImage(item.currentChartImage, -hat_size / 2, -hat_size / 2, hat_size, hat_size);
                pc.translate(-item.hatCenterX,-item.hatCenterY);
                pc.rotate(0);
            })
        }
        // pc.translate(this.data.hatCenterX,this.data.hatCenterY);
        // pc.rotate(rotate * Math.PI / 180);
        // pc.drawImage(this.data.currentChartImage, -hat_size / 2, -hat_size / 2, hat_size, hat_size);
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
                            obj.bg_id=[petData.bg[bgIndex].id];
                            // for(let i=0;i<this.bg.length;i++){
                            //    obj.bg_id=this.bg[i];
                            //     obj.graffiti_id=this.ttBg[i];
                            //    obj.hyaline_id=this.kBg[i];
                            // }
                            util.promiseSync(util.url.url.addttBg,obj).then((json)=>{
                                if(json.status==1){
                                    util.showSuccess('发布成功');
                                    wx.setStorageSync('restart', 1);
                                    setTimeout(function () {
                                        wx.navigateBack({delta:1})
                                    },2000)
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
    // close(e){
    //     if(e.target.id=="cancel"){
    //         console.log(123);
    //     }
    //     this.setData({
    //       isChartImage:false
    //   })
    // },
    // 跳转log
    hrefLog(){
      wx.navigateTo({
        url: '../history/history?id='+this.id+'&img_id='+this.img_id
      })
    }
})

var throttle = function (fn, delay, mustRun) {
    var timer = null,
        previous = null;

    return function () {
        var now = +new Date(),
            context = this,
            args = arguments;
        if (!previous) previous = now;
        var remaining = now - previous;
        if (mustRun && remaining >= mustRun) {
            fn.apply(context, args);
            previous = now;
        } else {
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);

        }
    }
}

var touchMove = function (that, e) {
    // var current_x=e.touches[0].clientX;
    // var current_y=e.touches[0].clientY;
    // var moved_x=current_x-that.start_x;
    // var moved_y=current_y-that.start_y;
    // that.setData({
    //     handleCenterX:that.data.handleCenterX+moved_x,
    //     handleCenterY:that.data.handleCenterY+moved_y,
    // });
    // let diff_x_before=that.handle_center_x-that.hat_center_x;
    // let diff_y_before=that.handle_center_y-that.hat_center_y;
    // let diff_x_after=that.data.handleCenterX-that.hat_center_x;
    // let diff_y_after=that.data.handleCenterY-that.hat_center_y;
    //
    // let distance_before=Math.sqrt(diff_x_before*diff_x_before+diff_y_before*diff_y_before);
    // let distance_after=Math.sqrt(diff_x_after*diff_x_after+diff_y_after*diff_y_after);
    // let angle_before=Math.atan2(diff_y_before,diff_x_before)/Math.PI*180;
    // let angle_after=Math.atan2(diff_y_after,diff_x_after)/Math.PI*180;
    //
    //
    // if(distance_after/distance_before*that.scale>4){
    //     that.setData({
    //         scale:4,
    //         rotate:angle_after-angle_before+this.rotate
    //     })
    // }else{
    //     that.setData({
    //         scale:distance_after/distance_before*that.scale,
    //         rotate:angle_after-angle_before+that.rotate,
    //     })
    // }
    //
    // that.start_x=current_x;
    // that.start_y=current_y;
    var current_x = e.touches[0].clientX;
    var current_y = e.touches[0].clientY;
    var moved_x = current_x - that.start_x;
    var moved_y = current_y - that.start_y;
    // console.log(moved_x, moved_y);
    let list =that.data.image_list;
    console.log(samllImageIndex);
    let li=list[samllImageIndex];
    if (that.touch_target == "hat") {

        li.hatCenterX=li.hatCenterX + moved_x;
        li.hatCenterY=li.hatCenterY + moved_y;
        li.cancelCenterX=li.cancelCenterX + moved_x;
        li.cancelCenterY=li.cancelCenterY + moved_y;
            li.handleCenterX=li.handleCenterX + moved_x;
            li.handleCenterY= li.handleCenterY + moved_y;
        // that.setData({
        //     hatCenterX: that.data.hatCenterX + moved_x,
        //     hatCenterY: that.data.hatCenterY + moved_y,
        //     cancelCenterX: that.data.cancelCenterX + moved_x,
        //     cancelCenterY: that.data.cancelCenterY + moved_y,
        //     handleCenterX: that.data.handleCenterX + moved_x,
        //     handleCenterY: that.data.handleCenterY + moved_y
        // })
        that.setData({
            image_list:list
        })
    };
    if (that.touch_target == "handle") {
        console.log(li);
        console.log(li.hatCenterX);
        li.handleCenterX=li.handleCenterX + moved_x;
        li.handleCenterY=li.handleCenterY + moved_y;
        li.cancelCenterX= 2 * li.hatCenterX - li.handleCenterX;
        li.cancelCenterY= 2 * li.hatCenterY -li.handleCenterY
        that.setData({
           image_list:list
        });
        // that.setData({
        //     handleCenterX: that.data.handleCenterX + moved_x,
        //     handleCenterY: that.data.handleCenterY + moved_y,
        //     cancelCenterX: 2 * that.data.hatCenterX - that.data.handleCenterX,
        //     cancelCenterY: 2 * that.data.hatCenterY - that.data.handleCenterY
        // });
        // let diff_x_before = li.handleCenterX - li.hatCenterX;
        // let diff_y_before = li.handleCenterY -li.hatCenterY;
        // let diff_x_after = li.handleCenterX - li.hatCenterY;
        // let diff_y_after = li.handleCenterY - li.hatCenterY;
        let diff_x_before = that.handle_center_x - that.hat_center_x;
        let diff_y_before = that.handle_center_y -that.hat_center_y;
        let diff_x_after = li.handleCenterX - that.hat_center_x;
        let diff_y_after = li.handleCenterY - that.hat_center_y;
        let distance_before = Math.sqrt(diff_x_before * diff_x_before + diff_y_before * diff_y_before);
        let distance_after = Math.sqrt(diff_x_after * diff_x_after + diff_y_after * diff_y_after);
        let angle_before = Math.atan2(diff_y_before, diff_x_before) / Math.PI * 180;
        let angle_after = Math.atan2(diff_y_after, diff_x_after) / Math.PI * 180;
        li.scale=distance_after / distance_before * that.scale;
        li.rotate=angle_after - angle_before + that.rotate;
        that.setData({
           image_list:list
        })
    }
    that.start_x = current_x;
    that.start_y = current_y;
}

//为touchMove函数节流
const fn = throttle(touchMove, 10, 10);




