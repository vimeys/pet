// components/status/status.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      petData:{
        type:Array,
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
      bind_attention(e){
          let id=e.currentTarget.dataset.id;
          let index=e.currentTarget.dataset.index;
          this.triggerEvent('bind_attention', res.tempFilePath)
      }
  }
})
