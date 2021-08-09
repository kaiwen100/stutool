Page({
  data: {
      inputShowed: false,
      inputVal: ""
  },
  onLoad() {
      this.setData({
          search: this.search.bind(this),
          noneview: true
      })
      
  },
  search: function (value) {
    var searchtext = this.data.shoopingtext; //搜索框的值
    if (searchtext != "") {
      if (searchtext.length == 11) {
        const db = wx.cloud.database();
        db.collection("stutool").where({
          "Phone": searchtext
        }).get()
        .then(res => {
          if ("" != res.data) {
            this.setData({
              studentarray : res.data,
              noneview: false,
              failview: false,
              formaterrorview : false,
              showView: (false)
            })
          } else {
            this.setData({
              failview: true,
              noneview: false,
              formaterrorview : false,
              showView:(true)
            })
          }
        })
      } else {
        this.setData({
          failview: false,
          noneview: false,
          formaterrorview : true,
          showView:(true)
        })
      }
      
    }
  },
  //搜索框的值
  shoppinginput: function(e) {
    //当删除input的值为空时
    if (e.detail.value == "") {
      this.setData({
        failview: false,
        noneview: true,
        formaterrorview : false,
        showView:(true)
      });
    }
    this.setData({
      shoopingtext: e.detail.value
    })
  },
  selectResult: function (e) {
      console.log('select result', e.detail)
  },
});