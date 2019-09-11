// pages/Receive/Receive.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    adList:[]
  },
  goback: function () {
    wx.navigateTo({
      url: '../index/index?phone=' + this.data.phone
    })
  },
  enlarge: function (e) {
    var index = e.currentTarget.id;
    var that = this;
    var arr = [];
    for (var i = 0; i < this.data.adList.length;i++){
      arr.push(this.data.adList[i].advImg)
    }
    wx.previewImage({
      current: arr[index], // 当前显示图片的http链接
      urls: arr
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.URL + '/api/admin/store/get_adverstisement.do',
      success:function(res){
        console.log(res);
        if (res.data.code == 0){
          that.setData({
            adList:res.data.data
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
    return {
      title: '蓝盒子家',
      path: '/pages/index/index',
    }
  },   
})