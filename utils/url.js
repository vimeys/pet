const Url ='http://106.15.184.105/public/petapi';
// const Url = 'http://172.200.1.14:1080/public/petapi/';
const url={};


// 杨森
url.filePath      =Url+'file/getFilePath';//获取图片视频的路径前缀
url.upfile        =Url+'file/upload';//上传图片视频保存接口
url.login         =Url+'user/login';//获取登陆
url.addBg         =Url+'Graffiti/bgAdd';//上传背景
url.addttBg       =Url+'Graffiti/GraffitiAdd';//上传贴图
// 首页
url.indexBanner   =Url+'index/bannerList';//首页轮播
url.petRankList   =Url+'index/petRankingList';//宠物首页动态列表
url.petList       =Url+'index/getPetDynamic';//宠物动态列表
url.petBannerList =Url+'/graffiti/getGraffitiList';  //获取贴图轮播
url.follow        =Url+'follow/add';//点击是否关注
url.like          =Url+'like/add';//点击是否点赞
url.followList    =Url+'index/getFollowPetDynamic';//用户的关注列表

//上传页面
url.petNameList   =Url+'pet_info/getUserPetLIst';//宠物列表
url.upHotTalk     =Url+'Graffiti/addTopic';//上传话题详情


//涂鸦
url.chartletList  =Url+'graffiti/getChartletList';//获取贴图集
url.chartletItem  =Url+'graffiti/getGraffitiList';//获取单个贴图列表
// 话题
url.hotTalk       =Url+'index/topicList';//热门话题列表
url.topicDetail   =Url+'index/topicInfo';//话题详情
url.topicComment  =Url+'index/topicComments';


//end


//邓琪睿
url.saveUserInfo = Url + 'user/saveUserInfo';//保存用户信息
url.pet_classify = Url + 'graffiti/getPetCatList';//获取宠物分类
url.add_comment = Url + 'comment/add';//增加评论
url.index_hot = Url + 'index/getHot';//获取热门
url.getRegion = Url + 'user/getRegion';//获取地址编码列表
url.add_address = Url + 'user/insertAddress';//新增地址
url.get_address_list = Url + 'user/getAddressList';//获取用户地址列表
url.edit_address_list = Url + 'user/updateAddress';//编辑地址
url.delete_address_list = Url + 'user/deleteAddress';//删除地址
//end




url.http ='https://yzcg.yuzhua.info/upload/';//图片前缀
module.exports={
    url
};