// pages/study/study.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // imgList用于存储本地图片的临时地址 形如：http://tmp/0sxx3zbIXXMm5bbb7099a9b44038c251e42cdc99308e.png
    imgList: [],
    // imgMaxNumber用于控制图片上传的数量
    imgMaxNumber: 2
  },

  // 选择图片功能
  ChooseImage() {
    wx.chooseImage({
      count: this.data.imgMaxNumber, // 默认最大上传的图片数量为2张
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => { //下列代码相当于实现选中多张图片的功能
        // 判断imgList中是否有图片的临时地址 若有则将新的图片地址列表合并进imgList列表中  
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else { //否则将imgList设置为图片地址列表
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  // 图片预览功能
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  // 删除图片功能
  DelImg(e) {
    wx.showModal({
      title: '确定删除这张图片吗？',
      cancelText: '再看看',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  // 上传图片到服务器函数
  uploadPhoto() {
    // 判断用户是否选择了图片
    if (this.data.imgList.length>=1)
    {
      return new Promise((resolve,reject)=>{
        wx.uploadFile({
          url: 'http://xxxxx', //仅为示例，非真实的接口地址
          filePath: this.data.imgList[0],                  //要传的图片路径 这里只上传了imgList中的第一张图片
          header:{"authorization":"Bearer "+wx.getStorageSync('token')},
          name: 'file',                                //获取图片二进制文件的key
          formData: {                                  //其他需要携带的参数
            'user': 'test'
          },
          success (res){
            console.log(res.data);
            wx.showToast({
              title: '上传图片成功',
              icon: 'success'
            })
            resolve(res.data);
          }
        })
      })
    }
    else{
      wx.showToast({
        title: '请先选择图片',
        icon: 'error'
      })
      return;
    }
  },
  // 绑定提交按钮
  async uploadImgs() {
    // console.log(this.data.imgList);
    try {
      wx.showLoading({
        title: '上传中'
      })
      // 上传图片到服务器
      let res = await this.uploadPhoto();
      wx.hideLoading();
      console.log("res",res)
    } catch (error) {
      ()=>{
        wx.hideLoading()
        wx.showToast({
          title: '上传图片错误',
          icon: 'error'
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})