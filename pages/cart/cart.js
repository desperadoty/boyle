Page({
  data: {
    isCart: false,
    cart: [], //购物车数组，存放商品
    goodsCount: 1, //每件商品默认数量为1
    totalPrice: 0, //总金额
    totalCount: 0  //总数量
  },
  onLoad: function(options) {

  },
  onShow: function() {
    var that = this;
    //获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，就赋一个空数组）
    var arr = wx.getStorageSync('cart') || [];
    //有数据的话，就遍历数组，计算总金额和总数量
    if(arr.length > 0) {
      for(var i in arr) {
        that.data.totalPrice += Number(arr[i].price)*Number(arr[i].goodsCount);
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
  onHide: function() {
    //清除数据
    this.setData({
      isCart: false,
      cart: [], //购物车数据
      totalPrice: 0, //总金额
      totalCount: 0 //总数量
    });
  },
  /*减少购买数量 */
  delCount: function(e) {
    console.log(e)
    //获取购物车内该商品的数量
    //获取设置在该btn的id，即list的index值
    if(this.data.cart[e.target.id.substring(3)].goodsCount <= 1) {
      return;
    }
    //商品总数量减1
    this.data.totalCount -= 1;
    //总金额减去该商品的单价
    this.data.totalPrice -= Number(this.data.cart[e.target.id.substring(3)].price);
    //该商品的数量减1
    this.data.cart[e.target.id.substring(3)].goodsCount = --this.data.cart[e.target.id.substring(3)].goodsCount;
    //更新data数据对象
    this.setData({
      cart: this.data.cart,
      totalPrice: this.data.totalPrice,
      totalCount: this.data.totalCount
    })
    //将数据重新放入缓存内
    try {
      wx.setStorageSync('cart',this.data.cart)
    } catch(e) {
      console.log(e)
    }
  },
  /*增加购买数量*/
  addCount: function(e) {
    //商品总数量加1
    this.data.totalCount += 1;
    //总金额加上该商品的单价
    this.data.totalPrice += Number(this.data.cart[e.target.id.substring(3)].price);
    //该商品的数量加1
    this.data.cart[e.target.id.substring(3)].goodsCount = ++this.data.cart[e.target.id.substring(3)].goodsCount;
    //更新data数据对象
    this.setData({
      cart: this.data.cart,
      totalPrice: this.data.totalPrice,
      totalCount: this.data.totalCount
    })
    //将数据重新放入缓存内
    try {
      wx.setStorageSync('cart', this.data.cart)
    } catch(e) {
      console.log(e)
    }
  },
  /*删除某个item*/
  delGoods: function(e) {
    //商品总数量减去对应删除项的数量
    this.data.totalCount -= this.data.cart[e.target.id.substring(3)].goodsCount;
    //总金额减去对应删除项的单价*数量
    this.data.totalPrice -= this.data.cart[e.target.id.substring(3)].goodsCount*this.data.cart[e.target.id.substring(3)].price;
    //从购物车数组中移除该项商品
    this.data.cart.splice(e.target.id.substring(3),1);
    //更新data数据对象
    this.setData({
      cart: this.data.cart,
      totalPrice: this.data.totalPrice,
      totalCount: this.data.totalCount
    })
    //将数据重新放入缓存内
    try {
      wx.setStorageSync('cart', this.data.cart)
    } catch(e) {
      console.log(e)
    }
  },
  /*跳转至待付款页面*/
  WaitForPay: function() {
    wx.navigateTo({
      url: '../pay/pay',
    })
  }
})