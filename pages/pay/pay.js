// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    goodsCount: 1, //每件商品默认数量为1
    totalPrice: 0, //总金额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var that = this;
    //获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，就赋一个空数组）
    var arr = wx.getStorageSync('cart') || [];
    //有数据的话，就遍历数组，计算总金额和总数量
    if (arr.length > 0) {
      for (var i in arr) {
        that.data.totalPrice += Number(arr[i].price) * Number(arr[i].goodsCount);
        that.data.totalCount += Number(arr[i].goodsCount);
      }
      //更新数据
      this.setData({
        isCart: true,
        cart: arr,
        totalPrice: that.data.totalPrice,
        totalCount: that.data.totalCount
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //清除数据
    this.setData({
      isCart: false,
      cart: [], //购物车数据
      totalPrice: 0, //总金额
      totalCount: 0 //总数量
    });
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
  
  }
})