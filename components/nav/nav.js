import {getStatusBarHeight, isIos} from './../../utils/util'
// components/nav/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },
  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行

      let _statusBarHeight = getStatusBarHeight();

      this.setData({"statusBarHeight": _statusBarHeight})
    
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
