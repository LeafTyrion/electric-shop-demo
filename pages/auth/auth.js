// pages/auth/auth.js
import { login } from "../../utils/asyncWX.js"
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"
import { request } from "../../request/index.js"
Page({
  async handleGetUserInfo(e) {
    try {
      const { encryptedData, rawData, iv, signature } = e.detail;
      const { code } = await login();
      const loginParams = { encryptedData, rawData, iv, signature, code };
      console.log(loginParams);
      const res = await request({ url: "/users/wxlogin", data: loginParams, method: "post" });
      console.log(res);
      wx.setStorageSync("token", res.data.token);
      wx.setStorageSync("token", "fuckyou!");
      // 返回上一层 
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
  }
})