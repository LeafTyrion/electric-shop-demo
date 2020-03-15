// pages/goods_list/goods_list.js
import {
  request
} from "../../request/index.js";
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取页面传递参数
    console.log(options)
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },

  // 获取商品列表数据
  async getGoodsList() {
    const result = await request({
      url: "/goods/search",
      data: this.QueryParams
    });
    console.log(result);
    const res = result.data.message;
    // 获取总条数
    const total = res.total;
    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagenum);
    this.setData({
      // 拼接下一页数据
      goodsList: [...this.data.goodsList, ...res.goods],
    });
    // 请求成功后关闭下拉刷新效果
    wx.stopPullDownRefresh()
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    // 重置拼接的数组
    this.setData({
      goodsList: []
    });
    // 重置页码
    this.QueryParams.pagenum = 1;

    this.getGoodsList();
  },

  // 页面上滑滚动条触底
  onReachBottom() {
    // 判断下一页有没有数据
    if (this.QueryParams.pagenum >= this.totalPages) {
      console.log("没有下一页数据啦！");
      wx.showToast({
        title: '没有啦！',
      })
    } else {
      console.log("还有呢！");
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }

  },

  // tab点击事件
  handleTabsItemChange(e) {
    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  }
})