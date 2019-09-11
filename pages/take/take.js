// pages/take/take.js
const app = getApp()
Page({
  data: {
    phone: "",
    codeN: "获取验证码",
    disabled: false,
    arae: "",
    nickname: "",
    avatarUrl: "",
    foc: false,
  },
  getPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getarae: function (e) {
    this.setData({
      arae: e.detail.value
    })
    console.log(this.data.arae);
  },
  //获取验证码
  getCode: function () {
    var that = this;
    that.setData({
      disabled: true,
      foc: true
    })
    var myreg = /^1\d{10}$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1500
      })
      that.setData({
        disabled: false
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none',
        duration: 1500
      })
      that.setData({
        disabled: false
      })
    } else {
      wx.request({
        url: app.globalData.URL + '/api/user/login/sms.do',
        data: {
          phone: this.data.phone
        },
        success(res) {
          //console.log(res)
          //验证码发送成功
          if (res.data.code == 0) {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1500
            })
            var num = 61;
            var timer = setInterval(function () {
              num--;
              if (num <= 0) {
                clearInterval(timer);
                that.setData({
                  codeN: '重新发送',
                  disabled: false
                })

              } else {
                that.setData({
                  codeN: num + "s"
                })
              }
            }, 1000)
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1500
            })
          }
        }
      })
    }
  },
  getbing: function () {
    console.log(this.data.phone);
    console.log(this.data.arae);
    var that = this;
    wx.request({
      url: app.globalData.URL + '/api/user/login/register.do',
      method: "GET",
      data: {
        phone: this.data.phone,
        code: this.data.arae,
        openid: app.globalData.openid,
        nickname: this.data.nickname,
        avatarUrl: this.data.avatarUrl
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '绑定成功',
            icon: 'none',
            duration: 1500
          })
          wx.redirectTo({
            url: '../index/index?phone='+that.data.phone
          })
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nickname: options.nickname,
      avatarUrl: options.avatarUrl
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