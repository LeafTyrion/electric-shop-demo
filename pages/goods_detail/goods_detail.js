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
    goodsObj: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const goods_id = options.goods_id;

    this.getGoodsDetail(goods_id);
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
    this.setData({
      goodsObj: result.data.message,
    })
  }
})