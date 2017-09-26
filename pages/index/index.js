Page({
  data: {
    logo: '/image/logo.jpg',
    addToCart:"/image/addToCart.png",
    goodsList: [{
      id: '001',
      image: '/image/logo.jpg',
      name: '果维小巨蛋',
      price: '15.00'
    }, {
      id: '002',
      image: '/image/logo.jpg',
      name: '经典凯撒主食沙拉',
      price: '24.00'
    }, {
      id: '003',
      image: '/image/logo.jpg',
      name: '菲力牛扒主食沙拉',
      price: '40.00'
    }, {
      id: '004',
      image: '/image/logo.jpg',
      name: '吞拿鱼海藻主食沙拉',
      price: '32.00'
    }, {
      id: '005',
      image: '/image/logo.jpg',
      name: '维密水果沙拉',
      price: '25.00'
    }, {
      id: '006',
      image: '/image/logo.jpg',
      name: '芒果鸡肉主食沙拉',
      price: '26.00'
    }, {
      id: '007',
      image: '/image/logo.jpg',
      name: '牛油果鸡肉藜麦沙拉',
      price: '48.00'
    }, {
      id: '008',
      image: '/image/logo.jpg',
      name: '鲜橙紫薯藜麦配甜虾沙拉',
      price: '32.00'
    }, {
      id: '009',
      image: '/image/logo.jpg',
      name: '和风蟹柳沙拉',
      price: '36.00'
    }, {
      id: '010',
      image: '/image/logo.jpg',
      name: '日式金枪鱼土豆沙拉',
      price: '25.00'
    }, {
      id: '011',
      image: '/image/logo.jpg',
      name: '泰皇豆腐主食沙拉',
      price: '26.00'
    }]
  },
  imageError: function (e) {
    console.log('image3发生error事件，携带值为', e.detail.errMsg)
  },
  // 加入购物车
  bindAddCart: function (e) {
    this.setData({
      toastHidden: false
    });
    // 遍历列表 与 购物车列表
    for (var i in this.data.goodsList) {
      // 列表中某一项item的id == 点击事件传递过来的id。则是被点击的项
      if (this.data.goodsList[i].id == e.target.id) {
        // 给goodsList数组的当前项添加count元素，值为1，用于记录添加到购物车的数量
        this.data.goodsList[i].goodsCount = 1;
        // 获取购物车的缓存数组（没有数据，则赋予一个空数组）
        var arr = wx.getStorageSync('cart') || [];
        // 如果购物车有数据
        if (arr.length > 0) {
          // 遍历购物车数组
          for (var j in arr) {
            // 判断购物车内的item的id，和事件传递过来的id，是否相等
            if (arr[j].id == e.target.id) {
              // 相等的话，给count+1（即再次添加入购物车，数量+1）
              arr[j].goodsCount = arr[j].goodsCount + 1;
              // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）
              try {
                wx.setStorageSync('cart', arr)
              } catch (e) {
                console.log(e)
              }
              // 返回（在if内使用return，跳出循环节约运算，节约性能）
              return;
            }
          }
          // 遍历完购物车后，没有对应的item项，把goodsList的当前项放入购物车数组
          arr.push(this.data.goodsList[i]);
        }
        // 购物车没有数据，把item项push放入当前数据（第一次存放时）
        else {
          arr.push(this.data.goodsList[i]);
        }
        // 最后，把购物车数据，存放入缓存
        try {
          wx.setStorageSync('cart', arr)
          // 返回（在if内使用return，跳出循环节约运算，节约性能）
          return;
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
})