// pages/expressD/expressD.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId:0,
    storeName:"",
    storeNumber:"",
    storeAddress:"",
    quName:"请选择小区",
    array: [],
    city: "北京市",
    cityArr: ['北京市'],    
    area: "密云区",    
    areaArr: ['密云区'],
    expressImg:"../../img/cccc_03.png",
    expressPic:"",
    phone:"", //填写或者选中
    username:"", //填写或者选中
    address:"", //填写或者选中
    scanPhone:"", //扫描
    scanUsername:"",//扫描
    scanAddress:"",//扫描
    billImg:"",

  },
  //收件人手机号
  phoneChange:function(e){
    //console.log(e);
    this.setData({
      phone:e.detail.value
    })
  },
  getadd: function(){
    wx.navigateTo({
      url: '/pages/address/address'
    })    
  },
  //查找地址
  searchAddress: function (e) {
    //console.log(e);
    var myreg = /^1\d{10}$/;
    if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none',
        duration: 1500
      })
      return false;
    }else{
      wx.navigateTo({
        url: '/pages/Distinguish/Distinguish?phone=' + this.data.phone + '&scanPhone=' + this.data.scanPhone + '&scanUsername=' + this.data.scanUsername + '&scanAddress=' + this.data.scanAddress,
      })
    }

  },
  //收件人姓名
  nameChange: function (e) {
    //console.log(e);
    this.setData({
      username: e.detail.value
    })
  },
  //收件人详细地址
  addressChange: function (e) {
    //console.log(e);
    this.setData({
      address: e.detail.value
    })
  },
  // 选择小区
  bindPickerChange(e) {
    var val = this.data.array[e.detail.value].receivingName;
    //console.log(val)
    this.setData({
      quName: val
    })
  },
  // 选择市
  areaChange(e) {
    var val = this.data.cityArr[e.detail.value];
    //console.log(val)
    this.setData({
      city: val
    })
  },  
  // 选择区
  areaChange(e) {
    var val = this.data.areaArr[e.detail.value];
    //console.log(val)
    this.setData({
      area: val
    })
  },
  //店面列表
  storeList:function(e){
    wx.navigateTo({
      url: '/pages/Choice/Choice',
    })
  },
  //扫描快递单
  scanExpress:function() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '识别中',
          mask: true
        })
        var tempFilePaths = res.tempFilePaths
        
        that.setData({
          billImg: tempFilePaths[0]
        })
        that.uploadExpress()
      }
    })
  },
  getCanvasImg: function (tempFilePath) {
    var that = this;
    const ctx = wx.createCanvasContext('attendCanvasId');
    ctx.drawImage(tempFilePath, 0, 0, 900, 1200);
    ctx.draw(true, function () {
      wx.canvasToTempFilePath({
        canvasId: 'attendCanvasId',
        quality: 0.5,
        success: function success(res) {
          console.log(res)
          that.setData({
            billImg: res.tempFilePath
          })          
          that.uploadExpress();
        }
      });
    });
  },
  uploadExpress: function () {
    var that = this
    console.log(that.data.billImg);
    wx.uploadFile({
      url: app.globalData.URL + '/api/admin/storage/upload-image.do',
      filePath: that.data.billImg,
      name: 'image',
      success: function (res) {
        console.log(res);
        var res1 = JSON.parse(res.data);
        if (res1.data.data != ''){
          //console.log(res1.data);
          wx.request({
            url: app.globalData.URL + '/api/admin/storage/express_url.do',
            data:{
              imgurl: res1.data
            },
            success:function(res){
              wx.hideLoading()
              var newArr = []
              console.log(res)
              //console.log(res.data.items)
              for (var i = 0; i < res.data.items.length;i++){
                for (var j = i+1; j < res.data.items.length; j++) {
                  if (res.data.items[i].item == res.data.items[j].item) {
                    res.data.items.splice(i+1,1)
                  }
                }
              }
              console.log(res.data.items)
              for (var i = 0; i < res.data.items.length; i++) {
                if (res.data.items[i].item == "收件人名称") {
                  that.setData({
                    username:res.data.items[i].itemstring,
                    scanUsername:res.data.items[i].itemstring,
                  })
                } else if (res.data.items[i].item == "收件人手机号") {
                  that.setData({
                    phone:res.data.items[i].itemstring,
                    scanPhone:res.data.items[i].itemstring,
                  })
                } else if (res.data.items[i].item == "收件人地址") {
                  var str = res.data.items[i].itemstring;
                  var index = str.indexOf('区');
                  str = str.slice(index+1);
                  var obj = that.data.array;
                  for (var i=0;i<obj.length;i++) {
                    if (str.indexOf(obj[i].receivingName) != -1) {
                      that.setData({
                        quName: obj[i].receivingName
                      })
                    }
                  }
                  that.setData({
                    address:str,
                    scanAddress:str,
                  })
                }
              }
            },
            fail:function(res2){

            }
          })
        }
      }
    })
  },
  //快递照片上传
  choose: function () {
      var that = this
      wx.chooseImage({
         count: 1,
         sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
         success: function (res) {
            // wx.showLoading({
            //   title: '上传中',
            //   mask: true
            // })
            
            var tempFilePaths = res.tempFilePaths
            that.setData({
              expressImg: tempFilePaths[0]
            })
            that.upload()
         }
      })
   },
  upload: function () {
    var that = this
    wx.uploadFile({
      url: app.globalData.URL + '/api/admin/storage/upload-image.do',
      filePath: that.data.expressImg,
      name: 'image',
      success: function (res) {
        //console.log(res);
        // wx.hideLoading()
        var res1 = JSON.parse(res.data);
        if (res1.code == 0) {
          that.setData({
            expressPic:res1.data
          })
        }
      }
    })
  },
  //存放快递
  addExpress:function(e){
    this.setData({
      phone: e.detail.value.phone
    })
    var myreg = /^1\d{10}$/;
    if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (this.data.username == ""){
      wx.showToast({
        title: '姓名必填',
        icon: 'none',
        duration: 1500
      })
      return false;      
    }
    if (this.data.quName == "请选择小区") {
      wx.showToast({
        title: '请选择小区',
        icon: 'none',
        duration: 1500
      })
      return false;
    } 
    if (this.data.address == "") {
      wx.showToast({
        title: '详细地址必填',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (this.data.expressPic == "") {
      wx.showToast({
        title: '快递照片必传',
        icon: 'none',
        duration: 1500
      })
      return false;
    } 
    console.log(e);
    wx.request({
      url: app.globalData.URL + '/api/admin/storage/express.do',
      data: {
        storeId: this.data.storeId,
        username: this.data.username,
        phone: this.data.phone,
        receivingCity: this.data.city,
        receivingArea: this.data.area,
        receivingName: this.data.quName,
        detailedAddress: this.data.address,
        storefront: this.data.storeName,
        storeAddress:this.data.storeAddress,
        storageNumber: this.data.storeNumber,
        expressPicture: this.data.expressPic,
        formid: e.detail.formId
      },
      method: 'POST',
      success:function(res){
        console.log(res)
        if(res.data.code == 0){
          wx.redirectTo({
            url: '/pages/Deposit/Deposit?phone=' + res.data.data,
          })
        } else if (res.data.code == 500){
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail:function(res){
        wx.showToast({
          title: '服务器内部错误',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          wx.request({
            url: app.globalData.URL + '/api/admin/clerk/get-openid.do',
            data:{
              code:res.code
            },
            success:function(res){
                //console.log(res);
                if(res.data.data.status == 1){
                  app.globalData.clerkOpenid = res.data.data.openid
                  //console.log(res.data.data.storeName)
                  //console.log(res.data.data.storeNumber)
                  that.setData({
                    storeName: res.data.data.storeName,
                    storeNumber: res.data.data.storeNumber,
                    storeAddress: res.data.data.storeAddress,
                    storeId: res.data.data.storeId
                  });
                } else if (res.data.data.status == 2){
                  app.globalData.openid = res.data.data.openid
                  wx.redirectTo({
                    url: '/pages/Sign/Sign?status=1'
                  })
                }else{
                  wx.showToast({
                    title: res.data.message,
                    icon: 'none',
                    duration: 1500
                  })
                }
            },
            fail:function(res){
              wx.showToast({
                title: '服务器内部错误',
                icon: 'none',
                duration: 1500
              })
            }
          })
        }
      }
    })
    //小区
    wx.request({
      url: app.globalData.URL + '/api/admin/storage/get-receiving.do',
      success:function(res){
        console.log(res);
        if(res.data.code == 0){
          that.setData({
            array:res.data.data
          })
        } else if (res.data.code == 500){
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail:function(res){
        wx.showToast({
          title: '服务器内部错误',
          icon: 'none',
          duration: 1500
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