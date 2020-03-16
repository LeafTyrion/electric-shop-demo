// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品/商家投诉",
        isActive: false
      },
    ],
    chooseImgs: [],
    // 文本域内容
    textValue: "",
  },
  // 外网图片数组路径
  UpLoadImgs: [],

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
  },
  // 点击+选择图片
  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });
  },
  //删除图片，通过data-index传递参数
  handleRemoveImg(e) {
    const { index } = e.currentTarget.dataset;
    let { chooseImgs } = this.data;
    // 1指的是删除1个
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },
  // 文本域输入事件
  handleTextInpue(e) {
    this.setData({
      textValue: e.detail.value
    })
  },

  handleFormSubmit() {
    const { textValue, chooseImgs } = this.data;
    // 验证内容不为空
    if (!textValue.trim()) {
      wx.showToast({
        title: '问题描述不能为空',
        icon: 'none',
        mask: true,
      });
      return;
    }
    wx.showLoading({
      title: "正在上传中...",
      mask: true,
    });
    // 判断有没有要上传的图片
    if (chooseImgs.length != 0) {
      chooseImgs.forEach((v, i) => {
        wx.uploadFile({
          url: 'http://tu.svvme.com/public/api',
          filePath: v,
          name: "file",
          formData: {},
          success: (result) => {
            console.log(result);
            let url = JSON.parse(result.data);
            this.UpLoadImgs.push(url);
            console.log(this.UpLoadImgs);
            // 上传完毕后提交文本内容和图片外链到服务器,没做呢还
            if (i === chooseImgs.length - 1) {
              console.log("全部上传完毕");
              this.setData({
                textValue: "",
                chooseImgs: []
              })
              // todo 调用post接口将图片外链数组和textarea上传到后台中

            }
          },
        });
      })
    } else {
      this.setData({
        textValue: ""
      })
      console.log("只写了文本")
      wx.hideLoading();
      wx.navigateBack({
        delta: 1
      });
    }
    // 上传图片内容到服务器，每次只能上传一个，遍历数组一个个上传


  }
})