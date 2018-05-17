// const Url='http://39.108.177.168:1201/api/';
const Url = 'http://172.200.1.14:1080/public/petapi/';
const url={};


// 杨森
url.filePath=Url+'file/getFilePath';//获取图片视频的路径前缀
url.upfile=Url+'file/upload';//上传图片视频保存接口
url.login=Url+'user/login';//获取登陆
// 首页
url.indexBanner=Url+'index/bannerList';//首页轮播
url.hotTalk=Url+'index/topicList';//热门话题
url.petRankList=Url+'index/petRankingList';//宠物首页动态列表
url.petList=Url+'index/getPetDynamic';//宠物动态列表

//end


//邓琪睿




//end




url.http ='https://yzcg.yuzhua.info/upload/';//图片前缀
module.exports={
    url
};