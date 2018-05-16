
//获取应用实例
const app = getApp()
import  utils from '../../../utils/totalUtil'
let upUrl='http://172.200.1.14:1080/public/petapi/file/getFilePath/';
Page({
    data: {
        bgPics: [],//上传的图片集
        bgPic: null,//当前背景图片
        chartlet:false,//控制贴图的显示
        imgList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],//贴图的id
        currentHatId: 1,
        hatCenterX: wx.getSystemInfoSync().windowWidth / 2,
        hatCenterY: 150,
        cancelCenterX: wx.getSystemInfoSync().windowWidth / 2 - 50 - 2,
        cancelCenterY: 100,
        handleCenterX: wx.getSystemInfoSync().windowWidth / 2 + 50 - 2,
        handleCenterY: 200,
        hatSize: 100,//大小
        scale: 1,//比例
        rotate: 0,
        top: -1000,//canvas的定位top
        left: -1000,//canvas的定位left
        width:750,//canvas的宽
        height:1000,//canvas的高
        imageId:0,//第几张图片的id
        drawArray:[{
            hasChartlet:true,//是否有贴图
            chartletSrc:1,//贴图的链接
            XYZ:{
                scale:1,//比例
                rotate:'',//旋转角度
                hat_center_x:'',//地图中心位置X
                hat_center_y:'',//地图中心位置Y
                width:'',//图片的宽度
                height:''//图片的高度
            }
        }],
        drawsuccess:{},
        showImgList:false,
    },
    onLoad(){
        console.log(1)
        this.bg=[];
        this.ttBg=[];
        this.kBg=[];

        this.user=utils.storage('user');
        this.setData({
            bgPics: app.globalData.bgPic,
            bgPic:app.globalData.bgPic[0]
        });
        // 循环需要绘制的坐标
        let num=app.globalData.bgPic.length;//上传图片的数量
        let drawArray=utils.repeatArr(this.data.drawArray,num)
        drawArray=JSON.parse(JSON.stringify(drawArray));
        this.setData({
            drawArray
        })
        this.getImgInfo()
        //  wx.getImageInfo({
        //      src:app.globalData.bgPic[0],
        //      success:(res)=>{
        //        let width,height;
        //        width=res.width;
        //        height=res.height
        //          let scale
        //          // if(width>height){
        //           scale=width/750;
        //            app.globalData.width=Math.trunc(res.width/scale)
        //            app.globalData.height=Math.trunc(res.height/scale);
        //            this.setData({
        //                width:app.globalData.width,
        //                height:app.globalData.height
        //            })
        //        // }else{
        //        //    scale=height/750;
        //        //       app.globalData.width=Math.trunc(res.width/scale)
        //        //       app.globalData.height=Math.trunc(res.height/scale);
        //        //   }
        //
        //      }
        //   });
    },
    // 获取图片高度
    getImgInfo(){
        let array=this.data.drawArray;
        let length=array.length;
        // let i=
        for(var i=0;i<length;i++){
            getImage(this,i)
        }
        function getImage(that,i) {
            wx.getImageInfo({
                src:app.globalData.bgPic[i],
                success:(res)=>{
                    let width,height;
                    width=res.width;
                    // height=res.height
                    let scale;
                    // if(width>height){
                    scale=width/750;
                    console.log(array);
                    console.log(res);
                    console.log(i);
                    app.globalData.width=Math.trunc(res.width/scale);
                    app.globalData.height=Math.trunc(res.height/scale);
                    console.log(Math.trunc(res.width / scale));
                    console.log(Math.trunc(res.height / scale));
                    array[i].XYZ.width=Math.trunc(res.width/scale);
                    array[i].XYZ.height=Math.trunc(res.height/scale);
                    that.setData({
                        drawArray:array
                    })
                    // }else{
                    //    scale=height/750;
                    //       app.globalData.width=Math.trunc(res.width/scale)
                    //       app.globalData.height=Math.trunc(res.height/scale);
                    //   }

                }
            });
        }
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
        let obj={}
        obj.hat_center_x=this.data.hatCenterX;
        obj.hat_center_y=this.data.hatCenterY;
        obj.cancel_center_x=this.data.cancelCenterX;
        obj.cancel_center_y=this.data.cancelCenterY;
        obj.handle_center_x=this.data.handleCenterX;
        obj.handle_center_y=this.data.handleCenterY;
        obj.scale=this.data.scale;
        obj.rotate=this.data.rotate;
        obj.touch_target="";
        obj.start_x=0;
        obj.start_y=0;
        console.log(obj);
        this.starObj=obj
        console.log(this);
    },
    touchStart(e){
        console.log(e.target.id);
        if(e.target.id=="hat"){
            this.touch_target="hat";
        }else if(e.target.id=="handle"){
            this.touch_target="handle"
        }else{
            this.touch_target="23"
        };

        if(this.touch_target!=""){
            this.start_x=e.touches[0].clientX;
            this.start_y=e.touches[0].clientY;
        }
    },
    touchEnd(e){
        // this.hat_center_x=this.data.hatCenterX;
        // this.hat_center_y=this.data.hatCenterY;
        // this.cancel_center_x=this.data.cancelCenterX;
        // this.cancel_center_y=this.data.cancelCenterY;
        // this.handle_center_x=this.data.handleCenterX;
        // this.handle_center_y=this.data.handleCenterY;
        // }
        this.touch_target="";
        // this.scale=this.data.scale;
        // this.rotate=this.data.rotate;
    },
    touchMove(e){

        console.log(e);
        var current_x=e.touches[0].clientX;
        // var current_x=e.touches[0].pageX;
        var current_y=e.touches[0].clientY;
        // var current_y=e.touches[0].pageY;
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

            this.hat_center_x=this.data.hatCenterX;
            this.hat_center_y=this.data.hatCenterY;
            this.cancel_center_x=this.data.cancelCenterX;
            this.cancel_center_y=this.data.cancelCenterY;
            this.handle_center_x=this.data.handleCenterX;
            this.handle_center_y=this.data.handleCenterY;
            // }
            // this.touch_target="";
            this.scale=this.data.scale;
            this.rotate=this.data.rotate;
            let arr=this.data.drawArray;
            arr[this.data.imageId].XYZ.scale=this.scale
            arr[this.data.imageId].XYZ.rotate=this.rotate
            arr[this.data.imageId].XYZ.hat_center_x=this.hat_center_x
            arr[this.data.imageId].XYZ.hat_center_y=this.hat_center_y
            this.setData({
                drawArray:arr
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

            this.hat_center_x=this.data.hatCenterX;
            this.hat_center_y=this.data.hatCenterY;
            this.cancel_center_x=this.data.cancelCenterX;
            this.cancel_center_y=this.data.cancelCenterY;
            this.handle_center_x=this.data.handleCenterX;
            this.handle_center_y=this.data.handleCenterY;
            // }
            // this.touch_target="";
            this.scale=this.data.scale;
            this.rotate=this.data.rotate;
            let arr=this.data.drawArray;
            arr[this.data.imageId].XYZ.scale=this.scale
            arr[this.data.imageId].XYZ.rotate=this.rotate
            arr[this.data.imageId].XYZ.hat_center_x=this.hat_center_x
            arr[this.data.imageId].XYZ.hat_center_y=this.hat_center_y
            this.setData({
                drawArray:arr
            })
        }
        this.start_x=current_x;
        this.start_y=current_y;


    },


    chooseImg(e){
        console.log(e);
        this.setData({
            currentHatId:e.target.dataset.hatId,
            chartlet:true,
            showImageList:!this.data.showImageList,


        })
    },
    // 弹出选择贴图
    showImageList(){
        let imageId=this.data.imageId
        let dArr=this.data.drawArray
        dArr[imageId].hasChartlet=true
        this.setData({
            showImageList:!this.data.showImageList,
            drawArray:dArr
        })
    },
    // 去确认页面
    combinePic(){
        app.globalData.scale=this.scale;
        app.globalData.rotate = this.rotate;
        app.globalData.hat_center_x = this.hat_center_x;
        app.globalData.hat_center_y = this.hat_center_y-150;
        app.globalData.hat_center_z = this.hat_center_y;
        app.globalData.currentHatId = this.data.currentHatId;
        wx.navigateTo({
            url: '../combine/combine',
        })
    },

    // 选择编辑图片
    chooseImage(e){
        console.log(e);
        let id=e.currentTarget.dataset.id;
        this.setData({
            bgPic:this.data.bgPics[id],
            imageId:id,
            chartlet:false
        });
        // this.hat_center_x=this.starObj.hatCenterX;
        // this.hat_center_y=this.starObj.hatCenterY;
        // this.cancel_center_x=this.starObj.cancelCenterX;
        // this.cancel_center_y=this.starObj.cancelCenterY;
        // this.handle_center_x=this.starObj.handleCenterX;
        this.scale=this.starObj.scale;

        this.rotate=this.starObj.rotate;
        this.touch_target="";

        this.start_x=0;
        this.start_y=0;
        // this.handle_center_y=this.starObj.handleCenterY;
        console.log(this.starObj);
        this.setData({
            hatCenterX:this.starObj.hat_center_x,
            hatCenterY:this.starObj.hat_center_y,
            cancelCenterX:this.starObj.cancel_center_x,
            cancelCenterY:this.starObj.cancel_center_y,
            handleCenterX:this.starObj.handle_center_x,
            handleCenterY:this.starObj.handle_center_y
        })
    },
    // 显示预览图片
    prevPic(){
        this.setData({
            top:0,
            left:0
        });
        this.draw()
    },
    //隐藏预览图片
    prevPicHide(){
        this.setData({
            top:-1000,
            left:-1000
        })
    },
    //去剪切页面
    goCopper(){
        app.globalData.imageId=this.data.imageId;
        wx.navigateTo({
            url: '../imageCut/imageCut?imageSrc='+this.data.bgPics[this.data.imageId]
        })
    },
    // 保存到手机世界
    save(){
        // this.setData({
        //     top:0,
        //     left:0
        // })
        this.draw()
        wx.canvasToTempFilePath({
            canvasId:'myCanvas',
            success:(res)=>{
                console.log(res.tempFilePath);
                wx.saveImageToPhotosAlbum({
                    filePath:res.tempFilePath,
                    success:()=>{

                    }
                })
            }
        })
    },
    // 绘制贴图
    draw() {
        let user=utils.storage('user')
        app.globalData.scale=this.scale;
        app.globalData.rotate = this.rotate;
        app.globalData.hat_center_x = this.hat_center_x;
        app.globalData.hat_center_y = this.hat_center_y-72;
        // app.globalData.hat_center_z = this.hat_center_y;
        app.globalData.currentHatId = this.data.currentHatId;

        let scale = app.globalData.scale;
        let rotate = app.globalData.rotate;
        let hat_center_x = app.globalData.hat_center_x;
        let hat_center_y = app.globalData.hat_center_y;
        let currentHatId = app.globalData.currentHatId;
        const pc = wx.createCanvasContext('myCanvas');
        const windowWidth = wx.getSystemInfoSync().windowWidth;
        const windowHeight =wx.getSystemInfoSync().windowHeight;
        const hat_size = 100 * scale;


        pc.clearRect(0, 0, windowWidth, 300);
        pc.drawImage(this.data.bgPic,0,0,app.globalData.width/2,app.globalData.height/2);
        pc.translate(hat_center_x,hat_center_y);
        pc.rotate(rotate * Math.PI / 180);

        pc.drawImage("../../../images/" + currentHatId + ".png", -hat_size / 2, -hat_size / 2, hat_size, hat_size);
        pc.draw();

        let top=windowHeight-app.globalData.height
        if(top>0){
            this.setData({
                width:app.globalData.width,
                height:app.globalData.height,
                top:top
            })
        }

    },
    // 带背景贴图绘制及上传
    drawUp(drawArray,drawsuccess) {
        let that=this;
        let drawArray1=drawArray;
        let length=drawArray.length;
        let data=drawsuccess;
        let i=data.i?data.i:0,//当前上传的哪张图片
            success=data.success?data.success:0,//上传成功的个数
            fail=data.fail?data.fail:0;
        let scale = drawArray1[i].XYZ.scale;
        let rotate = drawArray1[i].rotate;
        let hat_center_x = drawArray1[i].hat_center_x;
        let hat_center_y = drawArray1[i].hat_center_y-72;
        // let currentHatId = app.globalData.currentHatId;
        let currentHatId = drawArray1[i].chartletSrc;
        const pc = wx.createCanvasContext('myCanvas');
        const windowWidth = wx.getSystemInfoSync().windowWidth;
        const windowHeight =wx.getSystemInfoSync().windowHeight;
        const hat_size = 100 * scale;
        this.setData({
            width:app.globalData.width,
            height:app.globalData.height,
        })
        pc.clearRect(0, 0, windowWidth, 300);
        // pc.drawImage(this.data.bgPics[i],0,0,app.globalData.width/2,app.globalData.height/2);
        pc.drawImage(this.data.bgPic,0,0,drawArray1[i].width/2,drawArray1[i].height/2);
        if(drawArray1[i].hasChartlet){
            pc.translate(hat_center_x,hat_center_y);
            pc.rotate(rotate * Math.PI / 180);
            pc.drawImage("../../../images/" + currentHatId + ".png", -hat_size / 2, -hat_size / 2, hat_size, hat_size);
            // pc.draw()
        }

        pc.draw(false,()=>{
            wx.canvasToTempFilePath({
                canvasId:'myCanvas',
                success:(res)=>{
                    console.log(res.tempFilePath);
                    wx.uploadFile({
                        url: utils.url.url.upfile,
                        filePath: res.tempFilePath,
                        formData:{
                            user_id:this.user.uid,
                            app:123,
                            filetype:'image'
                        },
                        name: 'file',
                        success:resA=>{
                            console.log(resA);
                            this.ttBg.push(resA.data)
                            // console.log(upUrl+JSON.parse(resA.data).data.img_url);
                            success++;
                            // console.log(res.tempFilePath);
                        },
                        fail(res){
                            fail++
                        },
                        complete(){
                            i++;
                            // console.log(res.tempFilePath);
                            if(i==length){
                                console.log(that.ttBg);
                            }else{
                                data.i=i;
                                data.success=success;
                                data.fail=fail;
                                that.drawUp(drawArray1,data)
                            }
                        }
                    })
                },

            })
        });
        // function log(){
        //     console.log();
        // }

    },
    // 上传背景图
    bgUp(bgPic,drawsuccess){
        let that=this;
        let bgPics=bgPic;
        let length=bgPics.length;

        let data=drawsuccess;
        let i=data.i?data.i:0,//当前上传的哪张图片
            success=data.success?data.success:0,//上传成功的个数
            fail=data.fail?data.fail:0;
        wx.uploadFile({
            url: utils.url.url.upfile,
            filePath: bgPics[i],
            name: 'file',
            formData:{
                user_id:this.user.uid,
                app:123,
                filetype:'image'
            },
            success:res=>{
                console.log(res);
                this.bg.push(JSON.parse(res.data).data)
                // console.log('http://172.200.1.14:1080'+JSON.parse(res.data).data.url);
                success++;
                // console.log(res.tempFilePath);
            },
            fail(res){
                fail++
            },
            complete(){
                i++;
                // console.log(res.tempFilePath);
                if(i==length){
                    console.log(that.bg);
                    that.setData({
                            drawsuccess:{}
                        })
                    that.drawUp(that.data.drawArray,that.data.drawsuccess)
                }else{
                    data.i=i;
                    data.success=success;
                    data.fail=fail;
                    that.bgUp(bgPics,data)
                }
            }
        })
        // ajax.promise(url.url.)
    },

    // 提交
    updata(e){
        let a=this.data.bgPics,
            b=this.data.drawsuccess;

        this.bgUp(a,b)
    }
});