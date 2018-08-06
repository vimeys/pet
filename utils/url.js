// const Url ='http://106.15.184.105/public/petapi/';
const Url ='https://leshala.com/public/petapi/';
// const Url = 'http://172.200.1.14:1080/public/petapi/';
const url={};


// 杨森
url.filePath      =Url+'file/getFilePath';//获取图片视频的路径前缀
url.upfile        =Url+'file/upload';//上传图片视频保存接口
url.login         =Url+'user/login';//获取登陆
url.addBg         =Url+'Graffiti/bgAdd';//上传背景
url.addttBg       =Url+'Graffiti/GraffitiAdd';//上传贴图
url.addVideo      =Url+'Graffiti/videoAdd';//发布视频

// 首页
url.indexBanner   =Url+'index/bannerList';//首页轮播
url.petRankList   =Url+'index/petRankingList';//宠物首页动态列表
url.petList       =Url+'index/getPetDynamic';//宠物动态列表
url.petBannerList =Url+'graffiti/getGraffitiList';  //获取贴图轮播
url.stateDetail   =Url+'graffiti/getListSortDetails';//获取动态单个详情
url.follow        =Url+'follow/add';//点击是否关注
url.like          =Url+'like/add';//点击是否点赞
url.followList    =Url+'index/getFollowPetDynamic';//用户的关注列表
url.rank          =Url+'index/petRankingList';//宠物排行榜
url.likeBg        =Url+'like/bg';//单张图片点赞

//上传页面
url.petNameList   =Url+'pet_info/getUserPetLIst';//宠物列表
url.upHotTalk     =Url+'Graffiti/addTopic';//上传话题详情

//涂鸦
url.chartletList  =Url+'graffiti/getChartletList';//获取贴图集
url.chartletItem  =Url+'graffiti/getGraffitiList';//获取单个贴图列表
url.getCode       =Url+'activity/getCodeImg';//获取二维码
url.getChartletList=Url+'graffiti/getChartletList';//获取贴图列表
url.petData       =Url+'pet_info/petInfo';//获取单个宠物信息


// 话题
url.hotTalk       =Url+'index/topicList';//热门话题列表
url.topicDetail   =Url+'index/topicInfo';//话题详情
url.topicComment  =Url+'index/commentsList';//获取动态话题评论
url.topWord       =Url+'index/hotTopicList'//获取关键词
url.searchHot     =Url+'index/getHotTopicSearch';//搜索热门话题
url.commentList   =Url+'index/CommentsReply';//获取回复列表
url.hotTalkLIst   =Url+'index/hotTopic';
url.commentLike   =Url+'like/commentLike';//评论点赞



//商品列表页面
url.goodsList     =Url+'goods/getGoodsList';//获取商品列表
url.goodsDetail   =Url+'goods/getGoodsDetails';//获取商品详情
url.goodsConfirm  =Url+"goods/addOrder";//订单提交
url.orderList     =Url+'goods/getOrderList';//订单列表
url.orderConfirm  =Url+'goods/orderConfirm';//订单确认收货

// 活动
url.activeList    =Url+'Activity/getActivityList';//活动列表
url.activeDetail  =Url+'activity/getActivityDetails';//活动详情
url.getCard       =Url+'card_activity/cardScavenging'
url.activeCardList=Url+'card_activity/getUserCardList';//活动卡牌列表及用户卡片信息
url.activeCardLucky=Url+'card_activity/cardLuckDraw';//单张抽奖
url.activeCardMerge=Url+'/card_activity/mergeCard';//合成卡片
url.activeCardMergeLucky=Url+'card_activity/mergeCardLuckDraw'//合成的卡片抽奖
url.dui           =Url+'card_activity/convertibilityCode';//商家兑换
url.confirmDui    =Url+'card_activity/confirmConvertibility'//商家确认对凰
// url.active
//生成宠物卡
url.addPetId      =Url+'pet_info/add';//添加宠物卡

//我的
url.goldList      =Url+"user/getBill";//宠物金币流水列表
url.getMessageList=Url+"user/getMessageList";//消息列表
url.userPetList   =Url+'user/getPetList';//宠物列表
url.isHasMes      =Url+"user/countUnreadMessage";//是否有已读消息
url.stateManage   =Url+'User/dynamicManagement';//获取发布管理
url.delissus      =Url+'user/dynamicDelete';//删除当前修改
url.changeissus   =Url+'user/editState'//修改当前
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