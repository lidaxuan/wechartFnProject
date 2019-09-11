// pages/sign/sign.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '跳到首页',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    status:2
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  results: function () {
    wx.navigateTo({
      url: '../results/results'
    })
  },
  userView: function () {
    wx.navigateTo({
      url: '../user/user'
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo);
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //授权成功后，跳转进入小程序首页
      if(that.data.status==1){
        wx.redirectTo({
          url: '/pages/binding/binding?nickname=' + e.detail.userInfo.nickName,
        })
      }else{
        wx.redirectTo({
          url: '/pages/take/take?nickname=' + e.detail.userInfo.nickName + '&avatarUrl=' + e.detail.userInfo.avatarUrl,
        })
      }
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.setData({
      status: options.status
    })
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
