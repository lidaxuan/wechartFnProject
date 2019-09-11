// pages/Distinguish/Distinguish.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    scanPhone:"",
    scanUsername:"",
    scanAddress:"",
    addressList:[],
    More:true,
    loo:true,
  },
  //选择已有地址
  selectAddress:function(e){
    console.log(e);
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var index = e.currentTarget.dataset.index;
    prevPage.setData({
      phone: this.data.addressList[index].phone,
      username: this.data.addressList[index].username,
      address: this.data.addressList[index].detailedAddress
    })
    wx.navigateBack()
  },
  //使用识别地址
  scanAddress:function(e){
    console.log(e);
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var index = e.currentTarget.dataset.index;
    prevPage.setData({
      phone: this.data.scanUphone,
      username: this.data.scanUsername,
      address: this.data.scanAddress
    })
    wx.navigateBack()
  },
  getMore:function(){
    var arr = this.data.addressList;
    if(this.data.More){
      for (var i = 0; i < this.data.addressList.length; i++){
        arr[i].state = true
      }
      this.setData({
        More: false,
        addressList: arr
      })
    }else{
      for (var i = 0; i < this.data.addressList.length; i++) {
        if (i >= 2) {
          arr[i].state = false
        } else {
          arr[i].state = true
        }
      }
      this.setData({
        More: true,
        addressList: arr
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      phone: options.phone,
      scanPhone: options.scanPhone,
      scanUsername:options.scanUsername,
      scanAddress:options.scanAddress
    })
    wx.request({
      url: app.globalData.URL + '/api/admin/storage/get-address.do',
      data:{
        phone:this.data.phone
      },
      success:function(res){
        console.log(res);
        if(res.data.code == 0 && res.data.data != null){
          for (var i = 0; i < res.data.data.length;i++) {
            if (i >= 2) {
              res.data.data[i].state = false
            }else{
              res.data.data[i].state = true
            }
          }
          that.setData({
            addressList: res.data.data
          })
          console.log(that.data.addressList);
        }else{
          //console.log(11111)
          that.setData({
            loo: false,
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