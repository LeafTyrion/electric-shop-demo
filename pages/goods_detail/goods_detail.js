// pages/goods_detail/goods_detail.js
import {
  request
} from "../../request/index.js";
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    // 此商品是否被收藏
    isCollect: false
  },

  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const goods_id = options.goods_id;

    this.getGoodsDetail(goods_id);
  },
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { goods_id } = options;
    this.getGoodsDetail(goods_id)

  },

  // 获取商品详情
  async getGoodsDetail(goods_id) {
    const result = await request({
      url: "/goods/detail",
      data: {
        goods_id
      },
    })
    console.log(result);
    const goodsObj = result.data.message;
    this.GoodsInfo = goodsObj;
    // 获取缓存中收藏商品数组
    let collect = wx.getStorageSync("collect") || [];
    // 判断此商品是否被收藏
    let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id);
    this.setData({
      // goodsObj: result.data.message,
      // 优化数据获取，提高性能
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone对富文本中部分属性不识别，如webp格式,可以手动进行替换
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics,
      },
      isCollect,
    })
  },
  // 点击轮播图，放大预览
  handlePreviewImage(e) {
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })
  },
  // 加入购物车功能，使用缓存
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];

    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index === -1) {
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // mask有间隔时间，避免连续多次点击
      mask: true,
    });
  },
  handleCollect() {
    let isCollect = false;
    let collect = wx.getStorageSync("collect") || [];
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index !== -1) {
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      })
    } else {
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect
    })
  }
})