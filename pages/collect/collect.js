// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "商品收藏",
        isActive: true
      },
      {
        id: 1,
        value: "商品收藏",
        isActive: false
      },
      {
        id: 2,
        value: "商品收藏",
        isActive: false
      },
      {
        id: 3,
        value: "商品收藏",
        isActive: false
      }
    ],
    collect: [],
  },
  onShow() {
    const collect = wx.getStorageSync("collect") || [];
    this.setData({
      collect
    })
  },
  //改变标题
  handleTabsItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  }
})