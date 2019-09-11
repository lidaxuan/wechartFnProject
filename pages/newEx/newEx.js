const app = getApp()
Page({
  data: {
    phone: '',
    checked: true,
    pickCode: '',
  },
  getRouter: function () {
    wx.navigateTo({
      url: '../Agreement/Agreement'
    })
    // this.setData({
    //   checked: !this.data.checked
    // })
  },
  getpickC: function (e) {
    this.setData({
      pickCode: e.detail.value
    })
  },
  pickup: function () {
    var that = this;
    if (this.data.pickCode == '') {
      wx.showToast({
        title: '取件码不能为空',
        icon: 'none',
        duration: 1500
      })
    }else{
      console.log(this.data.pickCode)
      wx.request({
        url: app.globalData.URL + '/api/user/receive/newexpress.do',
        method: "GET",
        data: {
          express_code: this.data.pickCode,
        },
        success: function (res) {
          console.log(res);
          if(res.data.data == null){
            wx.showToast({
              title: '取件码错误',
              icon: 'none',
              duration: 1500,
            })
          }else{
            wx.navigateTo({
              url: '../results/results?express_code=' + that.data.pickCode
            })
          }
        },
        fail: function (res) {
          console.log(res);
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phone:options.phone
    })
    // if (options.num == '1') {
    //   this.setData({
    //     checked: true,
    //   })
    // }else{
    //   this.setData({
    //     checked: false,
    //   })
    // }
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