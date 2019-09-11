// pages/complete/complete.js
const app = getApp();
const timeD = require("../../utils/util.js");
Page({
  data: {
    phone: "",
    completeArr: [],
    nul:false,
    font: "",
    Img: [],
  },
  enlarge: function (e) {
    var index = e.currentTarget.id;
    var that = this;
    wx.previewImage({
      current: that.data.Img[index], // 当前显示图片的http链接
      urls: that.data.Img
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phone:options.phone
    })
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          console.log(that.data.phone)
          wx.request({
            url: app.globalData.URL + '/api/user/receive/express.do',
            method: "GET",
            data: {
              phone: that.data.phone
            },
            success: function (res) {
              console.log(res);
              if (res.data.code == 0) {
                if (res.data.data == null || res.data.data.length == 0) {
                  that.setData({
                    font: res.data.message,
                    nul: true
                  })
                }else{
                  var arr = [];
                  for (var i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].beginTime = timeD.formatTime(res.data.data[i].beginTime);
                    res.data.data[i].endTime = timeD.formatTime(res.data.data[i].endTime);
                    arr.push(res.data.data[i].expressPicture)
                  }
                  that.setData({
                    completeArr: res.data.data,
                    Img: arr
                  })
                }
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