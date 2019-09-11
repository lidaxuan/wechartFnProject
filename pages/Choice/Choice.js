// pages/Choice/Choice.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allStore:[],
  },

  //选择店面
  selectStore:function(e){
    console.log(e);
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var index = e.currentTarget.dataset.index;
    prevPage.setData({
      storeName: this.data.allStore[index].storename,
      storeAddress: this.data.allStore[index].storedetail
    })
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude   //纬度
        var longitude = res.longitude //经度
        wx.request({
          url: app.globalData.URL + '/api/admin/storage/getstore-address.do',
          data:{
            longitude: longitude,
            latitude: latitude
          },
          success:function(res){
            console.log(res);
            if(res.data.code == 0){
              that.setData({
                  allStore:res.data.data
              })
            }
          },
          fail:function(res){

          }
        })
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