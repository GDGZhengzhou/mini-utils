// pages/signed/signed.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    email: '',
    motto:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const id = options.userid;
    const that = this;
    if (!id) return false;
    wx.showLoading({
      title: '数据加载中'
    });
    wx.request({
      url: `${app.globalData.baseUrl}/${id}`,
      success(res) {
        console.log(res.data);
        const userInfo = res.data;
        if (!userInfo.signed) {
          that.userSign(userInfo);
        } else {
          wx.showToast({
            title: '请勿重复签到!',
            icon: 'none',
            complete: function () {
              setTimeout(()=>{
                wx.navigateBack({
                  delta: 1
                });
              },2000);
            }
          })
        }
      },
      fail(res) {
        // console.log(res);
        if (res.statusCode === 404) {
          wx.showToast({
            title: '无效二维码!',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '网络异常，请重新扫描!',
            icon: 'none',
            complete:function() {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                });
              }, 2000);
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  userSign(data) {
    const that = this;
    wx.request({
      url: `${app.globalData.baseUrl}/${data.id}`,
      data:{
        ...data,
        signed:true
      },
      method:'PUT',
      success(res) {
        that.setData({
          username:data.name,
          email:data.email,
          motto:'已成功签到'
        })
        wx.hideLoading();
      },
      fail(res) {
        wx.showToast({
          title: '网络异常，请重试！',
          icon: 'none',
          complete: function () {
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              });
            }, 2000);
          }
        })
      }
    })
  }
})