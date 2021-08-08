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
    if (value != "") {
      console.log("flag:" + (value.length == 11))
      if (value.length == 11) {
        const db = wx.cloud.database();
        db.collection("stutool").where({
          "Phone": value
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
  selectResult: function (e) {
      console.log('select result', e.detail)
  },
});