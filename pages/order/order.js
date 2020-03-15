// pages/order/order.js
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "全部订单",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ],
    orders: [
      {
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "create_time": 1564731518,
      },
      {
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "create_time": 1564731518,
      },
      {
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "create_time": 1564731518,
      },
    ]
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
    }

    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    console.log(currentPage.options);
    const { type } = currentPage.options;
    this.changeTitleByIndex(type - 1)
    this.getOrders(type);
  },
  async getOrders(type) {
    const result = this.data.orders;
    // const result = await request({ url: "/my/orders/all", data: { type } })
    console.log(result);
    // this.setData({
    //   orders: result.data.message,
    // })
  
    this.setData({
      orders: result.map(v => ({ ...v, create_time_cn: (new Date(v.create_time * 1000).toLocaleString()) }))
    })
  },

  // 根据标题提索引激活选中菜单
  changeTitleByIndex(index) {
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  //改变标题
  handleTabsItemChange(e) {
    const {
      index
    } = e.detail;
    this.changeTitleByIndex(index);
    // 重新发送请求
    this.getOrders(index + 1);
  }
})