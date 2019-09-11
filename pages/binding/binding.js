// pages/binding/binding.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        nickname: "",
        phone: "",
        codename: "获取验证码",
        disabled: false,
        foc: false,
    },
    getPhoneValue: function (e) {
        this.setData({
            phone: e.detail.value
        })
    },

    getCode: function () {
        var that = this;
        var myreg = /^1\d{10}$/;
        if (this.data.phone == "") {
            wx.showToast({
                title: '手机号不能为空',
                icon: 'none',
                duration: 1500
            })
            /*
            setTimeout(function () {
              wx.hideToast()
            }, 1000)
            */
            return false;

        } else if (!myreg.test(this.data.phone)) {
            wx.showToast({
                title: '手机号格式错误',
                icon: 'none',
                duration: 1500
            })
            return false;
        } else {
            that.setData({
                disabled: true,
                foc: true,
            })
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
                                    codename: '重新发送',
                                    disabled: false
                                })

                            } else {
                                that.setData({
                                    codename: num + "s"
                                })
                            }
                        }, 1000)
                    } else {
                        wx.showToast({
                            title: res.data.message,
                            icon: 'none',
                            duration: 1500
                        })
                        that.setData({
                            disabled: false
                        })
                    }
                }
            })
        }
    },

    /**
     * 绑定店员信息
     */
    formSubmit: function (e) {
        if (e.detail.value.phone.length != 11) {
            wx.showToast({
                title: '手机号格式错误!',
                icon: 'none',
                duration: 1500
            })
        } else if (e.detail.value.code.length != 4) {
            wx.showToast({
                title: '验证码错误!',
                icon: 'none',
                duration: 1500
            })
        } else if (e.detail.value.bindCode.length != 6) {
            wx.showToast({
                title: '绑定码错误!',
                icon: 'none',
                duration: 1500
            })
        } else {
            wx.request({
                url: app.globalData.URL + '/api/admin/clerk/bind.do',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                data: {
                    openid: app.globalData.openid,
                    phone: e.detail.value.phone,
                    code: e.detail.value.code,
                    bindCode: e.detail.value.bindCode,
                    name: this.data.nickname
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 500) {
                        wx.showToast({
                            title: res.data.message,
                            icon: 'none',
                            duration: 1500
                        })
                    } else {
                        wx.showToast({
                            title: res.data.message,//这里打印出登录成功
                            icon: 'success',
                            duration: 1500
                        })
                        wx.redirectTo({
                            url: '/pages/index/index',
                        })
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
            nickname: options.nickname
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
        console.log(111)
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