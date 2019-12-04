//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    motto: 'DevFest 2019 @ GDG Zhengzhou',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    clickCount:0
  },
  //事件处理函数
  bindViewTap: function() {
    this.setData({
      clickCount:this.data.clickCount + 1
    });
    if (this.data.clickCount === 5) {
      const that = this;
      wx.scanCode({
        onlyFromCamera: true,
        success(res) {
          const userId = that.getUserId(res);
          wx.navigateTo({
            url: `../gift/gift?userid=${userId}`,
          })
        }
      })
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow(){
    this.setData({
      clickCount:0
    })
  },
  getAttendee() {
    const that = this;
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        const userId = that.getUserId(res);
        wx.navigateTo({
          url: `../signed/signed?userid=${userId}`,
        })
      }
    })
  },
  getUserId(res) {
    console.log(res);
    console.log(util.Base64.decode(res.result));
    const result = util.Base64.decode(util.Base64.decode(res.result));
    console.log(result);
    const obj = JSON.parse(result);
    console.log(obj.uninum);
    console.log(util.Base64.decode(obj.uninum));
    const num = util.Base64.decode(obj.uninum).replace('GDGZhengzhou@DevFest2019', '');
    console.log(num);
    return parseInt(num) / 1229 / 314;
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
