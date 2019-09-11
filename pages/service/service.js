// pages/service/service.js
const app = getApp();
Page({
  data: {
    introduction: "",
    purpose: "",
    charge: "",
    time: "",
    store: "",
    shopArr: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: app.globalData.URL + '/api/user/receive/introduce.do',
            method: "GET",
            success: function (res) {
              console.log(res);
              if(res.data.code == 0){
                that.setData({
                  introduction: res.data.data.one,
                  purpose: res.data.data.two,
                  charge: res.data.data.three,
                  time: res.data.data.four,
                  store: res.data.data.five,
                })
              }
            },
            fail: function (res) {
              console.log(res);
            }
          })
          wx.request({
            url: app.globalData.URL + '/api/admin/store/getstore.do',
            method: "GET",
            success: function (res) {
              console.log(res);
              if (res.data.code == 0) {
                that.setData({
                  shopArr: res.data.data
                })
                console.log(that.data.shopArr);
              }
            },
            fail: function (res) {
              console.log(res);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
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
    return {
      title: '蓝盒子家',
      path: '/pages/index/index',
    }
  },   
})