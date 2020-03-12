// pages/cart/cart.js
import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWX.js"
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
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
    const cart = wx.getStorageSync("cart") || [];
    this.setData({
      address,
    })
    this.setCart(cart);
  },

  // 获取用户收货地址
  async handleChooseAddress() {
    // 获取用户权限，获取地址信息
    // wx.getSetting({
    //   success: (result) => {
    //     const scopeAddress = result.authSetting["scope.address"];
    //     if (scopeAddress === true || scopeAddress === undefined) {
    //       wx.chooseAddress({
    //         success: (result1) => {
    //           console.log(result1);
    //         },
    //       });
    //     } else {
    //       wx.openSetting({
    //         success: (result) => {
    //           wx.chooseAddress({
    //             success: (result3) => {
    //               console.log(result3);
    //             },
    //           });
    //         },
    //       });
    //     }
    //   },
    // });
    // 优化代码
    try {
      // 1. 获取权限信息
      const result = await getSetting();
      const scopeAddress = result.authSetting["scope.address"];
      // 2. 判断权限状态
      if (scopeAddress === true || scopeAddress === undefined) {
        await chooseAddress();
      } else {
        // 3. 诱导用户打开授权页面
        await openSetting();
      }
      // 4. 调用收货地址apiß
      let address = await chooseAddress();
      // 拼接详细地址
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      console.log(address);
      wx.setStorageSync("address", address);

    } catch (error) {
      console.log(error);
    }
  },

  // 商品选中反选
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    let { cart } = this.data;
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;

    this.setCart(cart);

  },

  // 设置购物车状态，计算全选状态，总数量，总价格等
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    // 获取商品选中状态，并且计算价格
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    })
    // cart数组为空的情况
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum,
    })
    wx.setStorageSync("cart", cart);
  },

  // 商品全选反选功能
  handleItemAllCheck() {
    let { cart, allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
  },
  // 商品数量编辑功能
  async handleItemNumEdit(e) {
    const { operation, id } = e.currentTarget.dataset;
    let { cart } = this.data;
    const index = cart.findIndex(v => v.goods_id === id);
    if (cart[index].num === 1 && operation === -1) {
      const result = await showModal({ content: "您是否要删除此件商品？" });
      if (result.confirm) {
        cart.splice(index, 1);
        this.setCart(cart)
      } else if (result.cancel) {
        console.log('用户点击取消')
      }
    } else if (cart[index].num === 99 && operation === 1) {
      wx.showToast({
        title: '已达到购买最大数量',
      })
    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }
  },
  async handlePay() {
    const { address, totalNum } = this.data;
    if (!address.userName) {
      await showToast({ title: "您还没有选择收货地址" });
      return
    }
    if (totalNum === 0) {
      await showToast({ title: "您还没有选购商品" });
      return
    }
    wx.navigateTo({
      url: '/pages/pay/pay',
    });
  }
})