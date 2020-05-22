const QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
let qqmapsdk;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapHeight: 0,
    location: {
      lat: '',
      lng: ''
    },
    address: {
      address: '',
      recommend: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    if (options.lat && options.lng) {
      this.setData({
        location: {
          lat: options.lat,
          lng: options.lng
        }
      },() => {
        this.reverseGeocoder()
      });
      
    }

    qqmapsdk = new QQMapWX({
      key: 'IPZBZ-IJ4K4-5G3UX-X7B7P-DCJX3-JUFS6'
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          mapHeight: res.windowHeight + 'px'
        })
      }
    })
  },
  // 获取地图中心定位
  onChangeRegion(event) {
    const _this = this;
    if (event.type === 'end' && event.causedBy === 'drag') {
      console.log(event.type);
      const mapCtx = wx.createMapContext('map', this); // map 为组件的 id
      mapCtx.getCenterLocation({
        success: res => {
          const latitude = res.latitude;
          const longitude = res.longitude;
          console.log(res);
          _this.setData({
            location: {
              lat: latitude,
              lng: longitude
            }
          }, function () {
            _this.reverseGeocoder()
          });
        },
        complete: res => {
        }
      });
    }
  },
  // 地址逆解析
  reverseGeocoder() {
    const _this = this;
    const {lat, lng} = this.data.location;
    qqmapsdk.reverseGeocoder({
      location: `${lat},${lng}` || '',
      get_poi: 1,
      success: function (data) { 
        const res = data.result;
        _this.setData({
          address: {
            address: res.address,
            recommend: res.formatted_addresses.recommend
          }
        })
        console.log(res);
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
      }
    })
  },
  toSearch: function () {
    wx.navigateTo({
      url: '../search/search'
    });
  },
  locateCurrent: function () {
    console.log('self locate')
    const {lat, lng} = app.globalData.location;
    this.setData({
      location:{lat, lng}
    })
  },
  confirmAddress: function () {
    const {lat, lng} = this.data.location;
    console.log(lat, lng)
    wx.redirectTo({
      url: `../index/index?lat=${lat}&lng=${lng}&text=${this.data.address.address}${this.data.address.recommend}`
    });
  }
})