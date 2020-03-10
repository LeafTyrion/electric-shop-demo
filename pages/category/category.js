// pages/category/category.js
import {
  request
} from "../../request/index.js";
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"

Page({

  data: {
    //左侧菜单数据
    leftMenuList: [],
    // 右侧类别数据
    rightContent: [],
    // 被点击的左侧菜单索引
    currentIndex: 0,
    // 接口返回数据
    category: [],
    // 右侧内容滚动条距离顶部的距离
    scrollTop: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 缓存机制
    const category = wx.getStorageSync('catestory');
    if (!category) {
      this.getCategory();

    } else {
      // 定义过期时间
      if ( Date.now() - category.time > 1000 * 10) {
        console.log("缓存过期，获取新数据")
        this.getCategory();
      } else {
        console.log("使用的是缓存数据");
        this.category = category.data
        let leftMenuList = this.category.map(v => v.cat_name);
        let rightContent = this.category[0].children;
        this.setData({
          leftMenuList,
          rightContent,
        })
      }
    }
  },

async getCategory() {
    // Promise请求方式
    // request({
    //     url: "/categories"
    //   })
    //   .then(result => {
    //     console.log(result)
    //     this.category = result.data.message;

    //     // 获取到数据存入缓存
    //     wx.setStorageSync('catestory', {
    //       time: Date.now(),
    //       data: this.category
    //     });

    //     let leftMenuList = this.category.map(v => v.cat_name);
    //     let rightContent = this.category[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightContent,
    //     })
    //   })

    // async await语法 发送异步请求
    const result = await request({
      url: "/categories"
    });
    console.log(result);
    this.category = result.data.message;
    // 获取到数据存入缓存
    wx.setStorageSync('catestory', {
      time: Date.now(),
      data: this.category
    });

    let leftMenuList = this.category.map(v => v.cat_name);
    let rightContent = this.category[0].children;
    this.setData({
      leftMenuList,
      rightContent,
    })
  },

  // 左侧菜单点击事件
  handleItemTap(e) {
    const {
      index
    } = e.currentTarget.dataset;
    let rightContent = this.category[index].children;

    this.setData({
      currentIndex: index,
      rightContent,

      // 重新设置右侧菜单距离顶部的距离
      scrollTop: 0,
    })
  }

})