// pages/Collect/Collect.js
const app = getApp()
const timeD = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId:0,
    expressList:[],
    nul: false,
    Img: [],
  },

  //标记
  biaoji:function(e){
    console.log(e);
    var index = e.currentTarget.dataset.index
    wx.redirectTo({
      url: '/pages/type/type?uid=' + this.data.expressList[index].user.uid + "&eid=" + this.data.expressList[index].eid,
    })
  },
  enlarge:function(e){
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
        storeId: options.storeId
      })
      var that = this
      wx.request({
        url: app.globalData.URL + '/api/admin/clerk/no-get-express.do',
        data:{
          storeId:that.data.storeId
        },
        success:function(res){
          console.log(res)
          if (res.data.data == null) {
            that.setData({
              nul : true
            })
          }
          var arr = [];
          if (res.data.code == 0 && res.data.data != null){
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].beginTime = timeD.formatTime(res.data.data[i].beginTime);
              res.data.data[i].endTime = timeD.formatTime(res.data.data[i].endTime);
              arr.push(res.data.data[i].expressPicture)
            }
            that.setData({
              expressList: res.data.data,
              Img: arr
            })
          }
        },
        fail:function(res){

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