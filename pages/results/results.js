const app = getApp()
const timeD = require("../../utils/util.js");
Page({
  data: {
    express_code: "",
    username: "",
    phone: "",
    resArr: [],
    eid:0,
    nul: false,
    Img: [],
  },
  getReceive: function () {
    wx.request({
      url: app.globalData.URL + '/api/user/receive/updateExpress.do',
      data:{
        eid:this.data.eid
      },
      success:function(res){
        console.log(res)
        if(res.data.code == 0){
          wx.navigateTo({
            url: '../Receive/Receive'
          })
        }
      },
      fail:function(res){

      }
    })
  },
  enlarge: function (e) {
    var index = e.currentTarget.id;
    var that = this;
    wx.previewImage({
      current: that.data.Img[index], // 当前显示图片的http链接
      urls: that.data.Img
    })
  },
  onLoad: function (options) {
    this.setData({
      express_code: options.express_code
    })
    var that = this;
    wx.request({
      url: app.globalData.URL + '/api/user/receive/newexpress.do',
      method: "GET",
      data: {
        express_code: this.data.express_code,
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 0) {
          if (res.data.data == null){
            that.setData({
              nul : true
            })
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1500,
              success: function () {
                setTimeout(function(){
                  wx.navigateTo({
                    url: '../newEx/newEx'
                  })
                },1500)
              }
            })
          }else{
            res.data.data.beginTime = timeD.formatTime(res.data.data.beginTime);
            var arr = [];
            arr.push(res.data.data.expressPicture)
            that.setData({
              resArr: [res.data.data],
              eid: res.data.data.eid,
              Img: arr
            })
          }
        }
      },
      fail: function (res) {
        console.log(res);
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
