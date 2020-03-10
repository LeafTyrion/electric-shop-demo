// pages/index/index.js
import {
  request
} from "../../request/index.js";
Page({

  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    catitemList: [],
    //楼层数据
    floorList: [],

  },

  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   method: "GET",
    //   success: (result) => {
    //     console.log(result);
    //     this.setData({
    //       swiperList:result.data.message,
    //     })
    //   }
    // })
    // 优化请求方式
    this.getSwiperList();
    this.getCatitemList();
    this.getFloorDataList();

  },

  getSwiperList() {
    // Promise请求方式
    request({
        url: "/home/swiperdata"
      })
      .then(result => {
        console.log(result)
        this.setData({
          swiperList: result.data.message
        })
      })
  },

  getCatitemList() {
    request({
        url: "/home/catitems"
      })
      .then(result => {
        console.log(result)
        this.setData({
          catitemList: result.data.message
        })
      })
  },

  getFloorDataList() {
    request({
        url: "/home/floordata"
      })
      .then(result => {
        console.log(result)
        this.setData({
          floorList: result.data.message
        })
      })
  }


})