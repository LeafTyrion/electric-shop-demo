import { requestPayment, showToast } from "../../utils/asyncWX.js"
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"
import { request1 } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow() {
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter(v => v.checked)
    let totalPrice = 0;
    let totalNum = 0;
    // 获取商品选中状态，并且计算价格
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
    wx.setStorageSync("cart", cart);
  },
  // 点击支付
  async handleOrderPay() {

    try {
      // 获取用户信息和token等
      const token = wx.getStorageSync("token");
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/auth',
        });
        return;
      }
      // 创建订单
      const header = { Authorization: token };
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      const cart = this.data.cart;
      let goods = [];
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      const orderParams = { order_price, consignee_addr, goods };
      // 发送POST请求，传输订单信息
      const orderNumber = await request1({
        url: "http://127.0.0.1:8084/api/wx-order",
        method: "POST",
        data: orderParams,
        header
      });
      const pay = await request1({
        url: "http://127.0.0.1:8084/api/wx-pay",
        method: "POST",
        header,
        data: orderNumber.data
      });
      // 微信官方提供的支付接口
      await requestPayment(pay.data);
      await showToast({ title: "支付成功" })

      // 删除支付成功后的商品
      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v => !v.checked);
      wx.setStorageSync("cart", newCart);

    } catch (error) {
      await showToast({ title: "支付失败" })
      console.log(error)
    }

  }
})