// pages/type/type.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: "",
    nan: true,
    nv: false,
    user_sex: 1,
    eject: false,
    user_age: 1,
    year: "15-20岁",
    one:true,
    two:false,
    there:false,
    four:false,
    five:true,
    six:false,
    seven:false,
    eight:false,
    house:1,
    information:1,
  },
  getsex:function(i) {
    if (i.currentTarget.dataset.sex == 1){
      this.setData({
        nan: true,
        nv: false,
        user_sex: 1
      })
    } else if (i.currentTarget.dataset.sex == 2) {
      this.setData({
        nan: false,
        nv: true,
        user_sex: 0
      })
    }
  },
  getEject:function() {
    var that = this;
    this.setData({
      eject: !that.data.eject,
    })
  },
  getYear:function(i) {
    if (i.currentTarget.dataset.y == 1) {
      this.setData({
        user_age: 1,
        year: "15-20岁",
        eject: false,
      })
    } else if (i.currentTarget.dataset.y == 2) {
      this.setData({
        user_age: 2,
        year: "20-30岁",
        eject: false,
      })
    } else if (i.currentTarget.dataset.y == 3) {
      this.setData({
        user_age: 3,
        year: "30-40岁",
        eject: false,
      })
    }
  },
  gethouse:function(i) {
    if (i.currentTarget.dataset.house == 1) {
      this.setData({
        one: true,
        two: false,
        there: false,
        four: false,
        house: 1,
      })
    } else if (i.currentTarget.dataset.house == 2) {
      this.setData({
        one: false,
        two: true,
        there: false,
        four: false,
        house: 2,
      })
    } else if (i.currentTarget.dataset.house == 3) {
      this.setData({
        one: false,
        two: false,
        there: true,
        four: false,
        house: 3,
      })
    } else if (i.currentTarget.dataset.house == 4) {
      this.setData({
        one: false,
        two: false,
        there: false,
        four: true,
        house: 4,
      })
    }
  },
  getpotential:function(i) {
    if (i.currentTarget.dataset.potential == 1) {
      this.setData({
        five: true,
        six: false,
        seven: false,
        eight: false,
        information: 1,
      })
    } else if (i.currentTarget.dataset.potential == 2) {
      this.setData({
        five: false,
        six: true,
        seven: false,
        eight: false,
        information: 2,
      })
    } else if (i.currentTarget.dataset.potential == 3) {
      this.setData({
        five: false,
        six: false,
        seven: true,
        eight: false,
        information: 3,
      })
    } else if (i.currentTarget.dataset.potential == 4) {
      this.setData({
        five: false,
        six: false,
        seven: false,
        eight: true,
        information: 4,
      })
    }
  },
  save:function() {
    console.log(this.data.uid)
    console.log(this.data.user_sex)
    console.log(this.data.user_age)
    console.log(this.data.house)
    console.log(this.data.information)
    console.log(this.data.eid)
    var that = this;
    wx.request({
      url: app.globalData.URL + '/api/admin/clerk/add-userhouse.do',
      method: "POST",
      data: {
        uid: that.data.uid,
        userSex: that.data.user_sex,
        userAge: that.data.user_age,
        house: that.data.house,
        information: that.data.information,
        expressId: that.data.eid
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 1500
          })
          wx.redirectTo({
            url: '/pages/index/index',
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
       uid: options.uid,
       eid: options.eid
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