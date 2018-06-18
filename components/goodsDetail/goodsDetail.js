// components/goodsDetail/goodsDetail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      disable:{
          type:Boolean,
          value:true
      },
      active:{
          type:Number,
          value:1
      },
      goodsList:{
          type:Array,
          value:[1,2,3]
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      goDetail(e){
            let id=e.currentTarget.dataset.id
          this.triggerEvent('goDetail',{id:id})
      }
  }
})
