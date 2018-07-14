
//获取应用实例
const app = getApp()
import  util from '../../../utils/totalUtil'
let upUrl='http://172.200.1.14:1080/public/petapi/file/getFilePath/';
var timer=null
Page({
    data: {
        bgPics: [],//上传的图片集
        bgPic: null,//当前背景图片
        isChartImage:false,//控制贴图的显示
        chartletList:[],
        chartletCover:[],
        imgList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],//贴图的id
        currentHatId: 1,
        hatCenterX: wx.getSystemInfoSync().windowWidth / 2-50,
        hatCenterY: 100,
        // cancelCenterX: wx.getSystemInfoSync().windowWidth / 2 - 50 - 2,
        // cancelCenterY: 100,
        handleCenterX: wx.getSystemInfoSync().windowWidth / 2,
        handleCenterY: 150,
        hatSize: 100,//大小
        scale: 1,//比例
        rotate: 0,
        top: -1000,//canvas的定位top
        left: -1000,//canvas的定位left
        width:750,//canvas的宽
        height:750,//canvas的高
        imageId:0,//第几张图片的id
        drawArray:[{
            hasChartlet:false,//是否有贴图
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
        idx:0//显示贴图集的下标
    },
    onLoad(){
        this.bg=[];
        this.ttBg=[];
        this.kBg=[];
        this.user=util.storage('user');
        this.setData({
            bgPics: app.globalData.bgPic,
            bgPic:app.globalData.bgPic[0]
        });
        this.getChartletList()
        // 循环需要绘制的坐标
        let num=app.globalData.bgPic.length;//上传图片的数量
        let drawArray=util.repeatArr(this.data.drawArray,num);
        drawArray=JSON.parse(JSON.stringify(drawArray));
        this.setData({
            drawArray,
            filePath:app.filePath
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
        for(var i=0;i<length;i++){
            getImage(this,i)
        }
        function getImage(that,i) {
            wx.getImageInfo({
                src:app.globalData.bgPic[i],
                success:(res)=>{
                    let width,height;
                    width=res.width;
                    let scale;
                    scale=width/750;
                    array[i].XYZ.width=Math.trunc(res.width/scale);
                    array[i].XYZ.height=Math.trunc(res.height/scale);
                    that.setData({
                        drawArray:array
                    })
                }
            });
        }
    },

    //获取贴图列表
    getChartletList(){
        util.promiseSync(util.url.url.getChartletList,{}).then(json=>{
            console.log(json);

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
        // let imageId=this.data.imageId
        // let dArr=this.data.drawArray
        // dArr[imageId].hasChartlet=true
        let showImageList=true;
        this.gatherIndex=index
        let imgList=this.data.chartletCover[index]
        this.setData({
            idx:index,
            showImageList,
            imgList:imgList
        })
    },
    onReady(){
        this.hat_center_x=this.data.hatCenterX;
        this.hat_center_y=this.data.hatCenterY;
        // this.cancel_center_x=this.data.cancelCenterX;
        // this.cancel_center_y=this.data.cancelCenterY;
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
        // obj.cancel_center_x=this.data.cancelCenterX;
        // obj.cancel_center_y=this.data.cancelCenterY;
        obj.handle_center_x=this.data.handleCenterX;
        obj.handle_center_y=this.data.handleCenterY;
        obj.scale=this.data.scale;
        obj.rotate=this.data.rotate;
        obj.touch_target="";
        obj.start_x=0;
        obj.start_y=0;
        this.starObj=obj
    },

    // 可移动区域滑动
    move(e){
        let arr=this.data.drawArray;
        arr[this.data.imageId].XYZ.hat_center_x=e.detail.x
        arr[this.data.imageId].XYZ.hat_center_y=e.detail.y
        this.setData({
            hatCenterX:e.detail.x,
            hatCenterY:e.detail.y,
            drawArray:arr
        })

    },
    touchStart(e){
        this.start_x=e.touches[0].clientX;
        this.start_y=e.touches[0].clientY;
    },
    touchMove(e){
        var current_x=e.touches[0].clientX;
        var current_y=e.touches[0].clientY;
        var moved_x=Math.round(current_x-this.start_x);
        var moved_y=Math.round(current_y-this.start_y);
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
        let arr=this.data.drawArray;

        if(distance_after/distance_before*this.scale>4){
            arr[this.data.imageId].XYZ.scale=4;
            arr[this.data.imageId].XYZ.rotate=angle_after-angle_before+this.rotate;


            this.setData({
                drawArray:arr
            })
        }else{
            arr[this.data.imageId].XYZ.scale=distance_after/distance_before*this.scale;
            arr[this.data.imageId].XYZ.rotate=angle_after-angle_before+this.rotate;
            this.setData({
                drawArray:arr
            })
        }
        this.start_x=current_x;
        this.start_y=current_y;
    },
    touchEnd(e){
        this.touch_target="";
        this.hat_center_x=this.data.hatCenterX;
        this.hat_center_y=this.data.hatCenterY;
        this.handle_center_x=this.data.handleCenterX;
        this.handle_center_y=this.data.handleCenterY;
        this.scale=this.data.scale;
        this.rotate=this.data.rotate;
    },
    // 选择贴图
    chooseImg(e){
        let index=e.target.dataset.hatId;
        let arr=this.data.drawArray
        arr[this.data.imageId].chartletSrc=this.data.filePath+this.data.chartletCover[this.data.imageId][index].img_url;
        this.setData({
            currentChartImage:this.data.imgList[index].img_url,
            isChartImage:true,
            showImageList:!this.data.showImageList,
        })
    },


    // 选择编辑图片
    chooseBgImage(e){
        let id=e.currentTarget.dataset.id;
        let height=this.data.drawArray[id].XYZ.height
        this.setData({
            bgPic:this.data.bgPics[id],
            imageId:id,
            chartlet:false,
            height:height
        });
        this.scale=this.starObj.scale;
        this.rotate=this.starObj.rotate;
        this.touch_target="";
        this.start_x=0;
        this.start_y=0;
        // this.handle_center_y=this.starObj.handleCenterY;
        this.setData({
            hatCenterX:this.starObj.hat_center_x,
            hatCenterY:this.starObj.hat_center_y,
            // cancelCenterX:this.starObj.cancel_center_x,
            // cancelCenterY:this.starObj.cancel_center_y,
            handleCenterX:this.starObj.handle_center_x,
            handleCenterY:this.starObj.handle_center_y
        })
    },
    // 显示预览图片
    prevPic(){
        this.setData({
            // top:0,
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
    // save(){
    //     this.draw()
    //     wx.canvasToTempFilePath({
    //         canvasId:'myCanvas',
    //         success:(res)=>{
    //             wx.saveImageToPhotosAlbum({
    //                 filePath:res.tempFilePath,
    //                 success:()=>{
    //
    //                 }
    //             })
    //         }
    //     })
    // },
    // 绘制贴图
    draw() {
        let array=this.data.drawArray
        app.globalData.scale=this.scale;
        app.globalData.rotate = this.rotate;
        app.globalData.hat_center_x = this.hat_center_x;
        app.globalData.hat_center_y = this.hat_center_y;
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
        pc.drawImage(this.data.bgPic,0,0,array[this.data.imageId].XYZ.width/2-15,array[this.data.imageId].XYZ.height/2-15);
        pc.translate(hat_center_x,hat_center_y);
        pc.rotate(rotate * Math.PI / 180);
        if(array[this.data.imageId].hasChartlet){
            pc.drawImage(this.data.drawArray[this.data.imageId].chartletSrc, -hat_size / 2, -hat_size / 2, hat_size, hat_size);
        }
        pc.draw();

        let top=windowHeight-array[this.data.imageId].XYZ.width;
        if(top>0){
            this.setData({
                width:array[this.data.imageId].XYZ.width,
                height:array[this.data.imageId].XYZ.height,
                top:top
            })
        }else{
            this.setData({
                width:array[this.data.imageId].XYZ.width,
                height:array[this.data.imageId].XYZ.height,
                top:0
            })
        }

    },
    // 带背景贴图绘制及上传
    drawUp(drawArray, drawsuccess) {
        let that = this;
        let drawArray1 = drawArray;
        let length = drawArray.length;
        let data = drawsuccess;
        let i = data.i ? data.i : 0,//当前上传的哪张图片
            success = data.success ? data.success : 0,//上传成功的个数
            fail = data.fail ? data.fail : 0;
        let scale = drawArray1[i].XYZ.scale;
        let rotate = drawArray1[i].XYZ.rotate;
        let hat_center_x = drawArray1[i].XYZ.hat_center_x;
        let hat_center_y = drawArray1[i].XYZ.hat_center_y;
        let currentHatId = drawArray1[i].chartletSrc;
        const pc = wx.createCanvasContext('myCanvas');
        const windowWidth = wx.getSystemInfoSync().windowWidth;
        const hat_size = 100 * scale;
        pc.clearRect(0, 0, windowWidth, 300);
        pc.drawImage(this.data.bgPics[i], 0, 0, drawArray1[i].XYZ.width / 2, drawArray1[i].XYZ.height / 2);
        pc.translate(hat_center_x, hat_center_y);
        pc.rotate(rotate * Math.PI / 180);
        pc.drawImage("../../../images/" + currentHatId + ".png", -hat_size / 2, -hat_size / 2, hat_size, hat_size);
        drawArray1[i].hasChartlet ? pc.draw(false, () => {
            wx.canvasToTempFilePath({
                canvasId: 'myCanvas',
                success: (res) => {
                    wx.uploadFile({
                        url: util.url.url.upfile,
                        filePath: res.tempFilePath,
                        formData: {
                            user_id: this.user.uid,
                            app: 123,
                            filetype: 'image'
                        },
                        name: 'file',
                        success: resBg => {
                            this.ttBg.push(resBg.data)
                            success++;
                        },
                        fail(res) {
                            fail++
                        },
                        complete() {
                            i++;
                            if (i == length) {
                                that.setData({
                                    drawsuccess: {}
                                })
                                that.drawUpK(that.data.drawArray, that.data.drawsuccess)
                            } else {
                                data.i = i;
                                data.success = success;
                                data.fail = fail;
                                that.drawUp(drawArray1, data)
                            }
                        }
                    })
                },

            })
        }) : test1(that);

        // 没有背景添加空值接口
        function test1(that) {
            success++
            i++
            if (i == length) {
                that.setData({
                    drawsuccess: {}
                })
                that.drawUpK(that.data.drawArray, that.data.drawsuccess)
            } else {
                that.ttBg.push('');
                data.i = i;
                data.success = success;
                data.fail = fail;
                that.drawUp(drawArray1, data)
            }
        }

    },
    //空贴图
    drawUpK(drawArray,drawsuccess){
        let that=this;
        let drawArray1=drawArray;
        let length=drawArray.length;
        let data=drawsuccess;
        let i=data.i?data.i:0,//当前上传的哪张图片
            success=data.success?data.success:0,//上传成功的个数
            fail=data.fail?data.fail:0;
        let scale = drawArray1[i].XYZ.scale;
        let rotate = drawArray1[i].XYZ.rotate;
        let hat_center_x = drawArray1[i].XYZ.hat_center_x;
        let hat_center_y = drawArray1[i].XYZ.hat_center_y;
        // let currentHatId = app.globalData.currentHatId;
        let currentHatId = drawArray1[i].chartletSrc;
        const pc = wx.createCanvasContext('myCanvas');
        const windowWidth = wx.getSystemInfoSync().windowWidth;
        const windowHeight =wx.getSystemInfoSync().windowHeight;
        const hat_size = 100 * scale;
        // this.setData({
        //     width:app.globalData.width,
        //     height:app.globalData.height,
        // })
        pc.clearRect(0, 0, windowWidth, 300);
        // pc.drawImage(this.data.bgPics[i],0,0,app.globalData.width/2,app.globalData.height/2);
        // pc.drawImage(this.data.bgPics[i],0,0,drawArray1[i].XYZ.width/2,drawArray1[i].XYZ.height/2);
        if(drawArray1[i].hasChartlet){
            pc.translate(hat_center_x,hat_center_y);
            pc.rotate(rotate * Math.PI / 180);
            pc.drawImage("../../../images/" + currentHatId + ".png", -hat_size / 2, -hat_size / 2, hat_size, hat_size);
            // pc.draw()
        }
        drawArray1[i].hasChartlet?pc.draw(false,()=>{
            wx.canvasToTempFilePath({
                canvasId:'myCanvas',
                success:(res)=>{
                    wx.uploadFile({
                        url: util.url.url.upfile,
                        filePath: res.tempFilePath,
                        formData:{
                            user_id:this.user.uid,
                            app:123,
                            filetype:'image'
                        },
                        name: 'file',
                        success:resBg=>{
                            this.kBg.push(resBg.data)
                            success++;
                        },
                        fail(res){
                            fail++
                        },
                        complete(){
                            i++;
                            if(i==length){
                                that.setData({
                                    drawsuccess:{}
                                })
                                that.addttBg()
                                // that.drawUpK(that.data.drawArray,that.data.drawsuccess)
                            }else{
                                // debugger
                                data.i=i;
                                data.success=success;
                                data.fail=fail;
                                that.drawUpK(drawArray1,data)
                            }
                        }
                    })
                },

            })
        }):test2(that);
        
        
        // 没有背景添加空值接口
            function test2(that) {
            success++
            i++
            if(i==length){
                that.setData({
                    drawsuccess:{}
                })
                that.addttBg()
            }else{
                that.kBg.push('')
                data.i=i;
                data.success=success;
                data.fail=fail;
                that.drawUpK(drawArray1,data)
            }


        };
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
            url: util.url.url.upfile,
            filePath: bgPics[i],
            name: 'file',
            formData:{
                user_id:this.user.uid,
                app:123,
                filetype:'image'
            },
            success:res=>{
                this.bg.push(JSON.parse(res.data).data.id);
                success++;
            },
            fail(res){
                fail++
            },
            complete(){
                i++;
                if(i==length){
                    that.setData({
                            drawsuccess:{}
                        })
                    that.addBg()
                    that.drawUp(that.data.drawArray,that.data.drawsuccess)
                }else{
                    data.i=i;
                    data.success=success;
                    data.fail=fail;
                    that.bgUp(bgPics,data)
                }
            }
        })
    },

    // 上传背景集合
    addBg(){
            let obj={}
            obj.pet_id=1
            obj.user_id=7
            obj.is_edit=1
            obj.img_id=this.bg
        console.log(this.bg);
        util.promiseSync(util.url.url.addBg,obj).then((json)=>{
        })
    },


    //上传合成图片
    addttBg(){
        let obj={}
        let useId=7
        let editId= 7
        obj.pet_id=1
        obj.graffiti_id=[]
        obj.hyaline_id=[]
        obj.bg_id=[];
        for(let i=0;i<this.bg.length;i++){
           obj.bg_id=this.bg[i];
            obj.img_id=this.ttBg[i];
           obj.hyaline_id=this.kBg[i];
        }
        util.promiseSync(util.url.url.addttBg,obj).then((json)=>{
            if(json.status==1){
                util.showSuccess('发布成功')
                setTimeout(function () {
                    wx.navigateBack({delta:2})
                },1000)

            }
        })
    },
    // 提交
    updata(e){
        let a=this.data.bgPics,
            b=this.data.drawsuccess;
        wx.showLoading({
          title: '发布中，请稍等...'
        })
        this.bgUp(a,b)
    }
});