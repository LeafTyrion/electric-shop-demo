// components/tabs/tabs.js
Component({
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },
  /**
   * 页面的初始数据
   */
  data: {

  },
  methods: {
    // 点击事件
    handleItemTap(e) {
      const {
        index
      } = e.currentTarget.dataset;
      this.triggerEvent("tabsItemChange", {
        index
      });

    }
  }

});