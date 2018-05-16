
const formatTime = (date, date_type) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if(date_type=="date"){
    return [year, month, day].map(formatNumber).join('/')
  }else if(date_type=="time"){
    return [hour, minute, second].map(formatNumber).join(':')
  }else{
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/*搜索框聚焦时，搜索logo动画效果*/
/*param:传入的动画效果*/
const listenFocus = (that) => {
  that.setData({
    animate: "animate"
  })
}
const listenBlur = (that) => {
  that.setData({
    animate: "animate1"
  })
}

//动态-点击显示图片
function bind_news(e) {
  var that = this
  var index = e.currentTarget.dataset.index
  that.setData({
    news_img: that.data.news[index],
    news_active: index,
    news_chartlet: that.data.news_chartlet_list[index]
  })
}

// 点赞
function bind_love() {
  var that = this
  that.setData({
    love: !that.data.love
  })
}

// 关注
function bind_attention(){
  var that=this
  console.log(that.data.btn_attention)
  that.setData({
    btn_attention: !that.data.btn_attention
  })
}
module.exports = {
  formatTime,
  bind_love,
  bind_news,
  bind_attention,
}
