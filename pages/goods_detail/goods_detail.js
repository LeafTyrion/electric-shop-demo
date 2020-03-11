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
    const goodsObj = result.data.message;
    this.setData({
      // goodsObj: result.data.message,
      // 优化数据获取，提高性能
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone对富文本中部分属性不识别，如webp格式,可以手动进行替换
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics: goodsObj.pics,
      }
    })
  }
})