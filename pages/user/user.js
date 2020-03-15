// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collectNums: 0,

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect");
    this.setData({
      userInfo,
      collectNums: collect.length
    })
  },

})