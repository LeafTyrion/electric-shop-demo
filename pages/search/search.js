// pages/search/search.js
import {
  request
} from "../../request/index.js";
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"

/**
 * 防止抖动，每次输入一个字符便发送请求，请求次数过多
 * 解决方法：
 * 1. 定义全局定时器
 * 2. 
 */

Page({
  data() {
    goods: [];
    // 取消按钮是否显示
    isFocus: false;
    // 输入框值
    inpVaule: "";
  },
  // 定时器
  TimeId: -1,

  handleInput(e) {
    const {
      value
    } = e.detail;
    // 检查输入合法性
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      })
      return;
    }
    this.setData({
      isFocus: true,
    })
    // 设置每隔1秒钟再发送一次请求
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000)

  },
  async qsearch(query) {
    const result = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    });
    console.log(result);
    this.setData({
      goods: result.data.message
    })
  },
  async handleCancel() {
    this.setData({
      inpVaule: "",
      isFocus: false,
      goods: []
    })
  }

})