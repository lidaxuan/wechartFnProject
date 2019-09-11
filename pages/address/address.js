const app = getApp()
const pinyin = require("../../utils/pinyin.js");
Page({
  data:{
    // 当前选择的导航字母
    selected: 0,
    // 选择字母视图滚动的位置id
    scrollIntoView: 'A',
    // 导航字母
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
    'U', 'V', 'W', 'X', 'Y', 'Z'],
    groups: []
  },
  getReceivingName:function(e){
    console.log(e);
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      quName: e.currentTarget.dataset.receivingname,
    })
    wx.navigateBack()   
  },
  onLoad:function(options){
    var that = this
    wx.request({
      url: app.globalData.URL + '/api/admin/storage/get-receiving.do',
      success:function(res){
        console.log(res);
        if (res.data.code == 0){
          var list = res.data.data;
          //小区列表渲染
          let map = {
            hot: {
              groupName: '',
              items: []
            }
          }
          list.forEach((item, index) => {
            if (index < list.length) {
              map.hot.items.push({
                name: item.receivingName,
                avatar: ''
              })
            }
            const key = (pinyin.py.getFirstLetter(item.receivingName.substring(0, 1))).toUpperCase()
            if (!map[key]) {
              map[key] = {
                groupName: key,
                items: []
              }
            }
            map[key].items.push({
              name: item.receivingName,
              avatar: ''
            })
          })
          // 为了得到有序列表，我们需要处理 map
          let ret = []
          let hot = []
          for (let key in map) {
            let val = map[key]
            if (val.groupName.match(/[a-zA-Z]/)) {
              ret.push(val)
            }
          }
          ret.sort((a, b) => {
            return a.groupName.charCodeAt(0) - b.groupName.charCodeAt(0)
          })
          that.setData({
            groups: hot.concat(ret)
          }) 
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500
          })         
        }  
      }
    })
    const res = wx.getSystemInfoSync(),
      letters = this.data.letters;
    // 设备信息
    this.setData({
      windowHeight: res.windowHeight,
      windowWidth: res.windowWidth,
      pixelRatio: res.pixelRatio
    });
    // 第一个字母距离顶部高度，css中定义nav高度为94%，所以 *0.94
    const navHeight = this.data.windowHeight * 0.94, // 
          eachLetterHeight = navHeight / 26,
          comTop = (this.data.windowHeight - navHeight) / 2, 
          temp = [];

    this.setData({
      eachLetterHeight: eachLetterHeight
    });

    // 求各字母距离设备左上角所处位置

    for(let i = 0, len = letters.length; i < len; i++) {
      const x = this.data.windowWidth - (10 + 50) / this.data.pixelRatio,
            y = comTop + (i * eachLetterHeight);
      temp.push([x, y]);
    }
    this.setData({
      lettersPosition: temp
    })
  },
  tabLetter(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      selected: index,
      scrollIntoView: index
    })
    
    this.cleanAcitvedStatus();
  },
  // 清除字母选中状态
  cleanAcitvedStatus() {
    setTimeout(() => {
      this.setData({
          selected: 0
      })
    }, 500);
  },
  touchmove(e) {
    const x = e.touches[0].clientX,
          y = e.touches[0].clientY,
          lettersPosition = this.data.lettersPosition,
          eachLetterHeight = this.data.eachLetterHeight,
          letters = this.data.letters;
    console.log(y);
    // 判断触摸点是否在字母导航栏上
    if(x >= lettersPosition[0][0]) {
      for(let i = 0, len = lettersPosition.length; i < len; i++) {
        // 判断落在哪个字母区域，取出对应字母所在数组的索引，根据索引更新selected及scroll-into-view的值
        const _y = lettersPosition[i][1], // 单个字母所处高度
              __y = _y + eachLetterHeight; // 单个字母最大高度取值范围
        if(y >= _y && y <= __y) {
           this.setData({
            selected: letters[i],
            scrollIntoView: letters[i]
          });
          break;
        }
      }
    }
  },
  touchend(e) {
    this.cleanAcitvedStatus();
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
