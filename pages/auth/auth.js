// pages/auth/auth.js
import { login } from "../../utils/asyncWX.js"
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"
import { request1 } from "../../request/index.js"
Page({
  async handleGetUserInfo(e) {
    try {
      const { encryptedData, rawData, iv, signature } = e.detail;
      const { code } = await login();
      const loginParams = { encryptedData, rawData, iv, signature, code };
      const res = await request1({ url: "http://127.0.0.1:8083/api/wx-login", data: loginParams, method: "post" });
      wx.setStorageSync("token", res.data.token);
      // 返回上一层 
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
  }
})