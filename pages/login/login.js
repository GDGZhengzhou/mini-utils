// pages/login/login.js
const mp = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identifier:'',
    password:''
  },
  /**
   * 
   * @param {detail} options 
   */
  onInputChange(e) {
    console.log(e)
    const name = e.currentTarget.dataset.name;
    const val = e.detail.value;
    this.setData({
      [name]:val,
    })
  },
  login() {
    const {identifier,password} = this.data;
    mp.wxp.request({
      method:'POST',
      url:'https://api.gdgzhengzhou.com/auth/local',
      data:{
        identifier,
        password
      }
    }).then((res)=>{
      console.log(res);
      const {data} = res;
      wx.setStorageSync('TOKEN',data.jwt); 
    }).catch((e)=>{
      wx.showToast({
        title: '权限验证失败!',
        icon:'none'
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})