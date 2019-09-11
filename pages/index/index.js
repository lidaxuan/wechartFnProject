const app = getApp()

Page({
  data: {
    phone: "",
    in_express: 0,
    out_express: 0,
    storeId:0,
    intotal:0,
    outtotal:0,
    status:0
  },
  understand: function () {
    wx.navigateTo({
      url: '../service/service'
    })
  },
  getsh: function () {
    wx.navigateTo({
      url: '../upper/upper'
    })
  },
  yiqu: function () {
    var that = this;
    console.log(that.data.phone);
    wx.navigateTo({
      url: '../complete/complete?phone=' + that.data.phone
    })
  },
  newExpress: function () {
    var that = this;
    console.log(that.data.phone);
    wx.navigateTo({
      url: '../newExpress/newExpress?phone=' + that.data.phone
    })
  },  
  new: function () {
    var that = this;
    wx.navigateTo({
      url: '../newEx/newEx?phone=' + that.data.phone
    })
  },
  lqu: function () {
    var that = this;
    wx.navigateTo({
      url: '../Collect/Collect?storeId=' + that.data.storeId
    })
  },
  cunfang: function () {
    var that = this;
    wx.navigateTo({
      url: '../expressD/expressD'
    })
  },
  wqu: function () {
    var that = this;
    wx.navigateTo({
      url: '../noget/noget?storeId=' + that.data.storeId
    })
  },
  onShow: function (option) {
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: app.globalData.URL + '/api/user/login/index-openid.do',
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res)
              if (res.data.data.status == 1) { //店员首页
                that.setData({
                  storeId: res.data.data.storeId, //店员管理店铺ID
                  status: res.data.data.status, //状态，店员
                })
                app.globalData.openid = res.data.data.openid              
                wx.request({
                  url: app.globalData.URL + '/api/admin/clerk/count.do',
                  method: "GET",
                  data: {
                    storeId: that.data.storeId,
                  },
                  success: function (res) {
                    console.log(res);
                    if (res.data.code == 0) {
                      that.setData({
                        intotal: res.data.data.intotal, //店员未领取快递
                        outtotal: res.data.data.outtotal, //店员未标记快递
                      })
                    }
                  },
                  fail: function (res) {
                    console.log(res);
                  }
                })
              } else if (res.data.data.status == 2) { //个人首页
                that.setData({
                  phone: res.data.data.phone, //用户手机号
                  status: res.data.data.status, //状态，用户
                })
                wx.request({
                  url: app.globalData.URL + '/api/user/receive/count.do',
                  method: "GET",
                  data: {
                    phone: that.data.phone,
                  },
                  success: function (res) {
                    console.log(res);
                    if (res.data.code == 0) {
                      that.setData({
                        in_express: res.data.data.in_express, //个人用户已取快递
                        out_express: res.data.data.out_express, //个人用户未取快递
                      })
                    }
                  },
                  fail: function (res) {
                    console.log(res);
                  }
                })
              } else if (res.data.data.status == 3) { //没有绑定，跳转到个人用户授权
                app.globalData.openid = res.data.data.openid
                wx.redirectTo({
                  url: '/pages/Sign/Sign?status=2',
                })
              } else {

              }              
            },
            fail: function (res) {

            }
          })
        }
      }
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
