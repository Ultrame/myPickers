// templet/input-templet.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    statureVal: '0', // 身高的值
    weightVal: '0', // 体重的值
    preYear: '0', // 孕期的年
    preMonth: '00', // 孕期的月
    preDay: '00', // 孕期的日
    birYear: '0000', // 生日的年
    birMonth: '00', // 生日的月
    birDay: '00', // 生日的日
    dWeeks: 0, // 现在是怀孕的多少周
    pregnant: false, // 是否在输入孕期
    birthday: false, // 是否在输入生日
    stature: false, // 是否在输入身高
    weight: false, // 是否在输入体重
    inputTitle: '',
    inputting: false, // 打开picker
    inputAs: [], //第一个picker的取值范围
    inputBs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], //第二个picker的取值范围
    inputCs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], //第三个picker的取值范围
    inputA: 0, // 第一个picker的值
    inputB: 0, // 第二个picker的值
    inputC: 0, // 第三个picker的值
    value: [], // picker的取值
    user: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },
  getUserInfo: function () {
      var pregnantValue = '2018-01-30'
      var birthdayValue = '1992-10-10'
      var statureVal = 172
      var weightVal = 60
      if (birthdayValue) {
        var birYear = birthdayValue.substring(0, 4)
        var birMonth = birthdayValue.substring(5, 7)
        var birDay = birthdayValue.substring(8, 10)
      }
      if (pregnantValue) {
        this.getPregnantWeeks(pregnantValue)
        var preYear = pregnantValue.substring(0, 4)
        var preMonth = pregnantValue.substring(5, 7)
        var preDay = pregnantValue.substring(8, 10)
      }
      this.setData({
        preYear: preYear,
        preMonth: preMonth,
        preDay: preDay,
        birYear: birYear,
        birMonth: birMonth,
        birDay: birDay,
        statureVal: statureVal,
        weightVal: weightVal
      })
  },

  //修改picker的取值范围，并得到各个值对应picker的下标
  //valueStart,valueEnd表示从valueStart开始，到valueEnd结束
  //idx表示需要计算的值，得到的index表示idx对于年限之间的数组所对应的下标
  //month,day表示月和日
  initValRange: function (valueStart, valueEnd, idx, month, day) {
    var values = []
    var value = []
    var index = 0
    var index2 = 0
    var index3 = 0
    for (var i = valueStart; i <= valueEnd; i++) {
      values.push(i)
      if (i === idx) {
        value.push(index)
      }
      index++
    }
    for (var j = 0; j <= 12; j++) {
      if (j === month) {
        value.push(index2 - 1)
      }
      index2++
    }
    for (var k = 0; k <= 31; k++) {
      if (k === day) {
        value.push(index3 - 1)
      }
      index3++
    }
    this.setData({
      value: value
    })
    console.log(values)
    return values
  },
  bindChange: function (e) {
    const val = e.detail.value
    console.log(val)
    this.setData({
      inputA: this.data.inputAs[val[0]],
      inputB: this.data.inputBs[val[1]],
      inputC: this.data.inputCs[val[2]]
    })
  },
  // 点击取消按钮时
  cancel: function (e) {
    var type = e.target.dataset.type
    if (type == 'mobile') {
      this.setData({
        inputtingPhone: false
      })
    } else {
      this.setData({
        inputting: false
      })
    }
  },
  // 计算两个日期相距多少周
  getPregnantWeeks: function (date) {
    var year = parseInt(date.substring(0, 4))
    var month = parseInt(date.substring(5, 7))
    var day = parseInt(date.substring(8, 10))
    var pregnantMs = new Date(year, month - 1, day)
    var currentMs = new Date()
    var dMs = currentMs - pregnantMs
    var dWeeks = Math.ceil(dMs / 1000 / 60 / 60 / 24 / 7)
    this.setData({
      dWeeks: dWeeks
    })
  },

  // 点击picker输入面板上面的确认按钮
  confirm: function () {
    var pregnant = this.data.pregnant
    var birthday = this.data.birthday
    var stature = this.data.stature
    var weight = this.data.weight

    if (pregnant) {
      var pregnantValue = this.data.inputA + '-' + (parseInt(this.data.inputB) < 10 ? '0' + this.data.inputB : this.data.inputB) +'-'+ (parseInt(this.data.inputC) < 10 ? '0' + this.data.inputC : this.data.inputC)
      this.getPregnantWeeks(pregnantValue)
      this.setData({
        inputting: false,
        pregnantValue: pregnantValue,
        preYear: this.data.inputA,
        preMonth: this.data.inputB,
        preDay: this.data.inputC
      })
    }
    if (birthday) {
      var birthdayValue = this.data.inputA + '-' + (parseInt(this.data.inputB) < 10 ? '0' + this.data.inputB : this.data.inputB)+'-'+ (parseInt(this.data.inputC) < 10 ? '0' + this.data.inputC : this.data.inputC)
      this.setData({
        inputting: false,
        birthdayValue: birthdayValue,
        birYear: this.data.inputA,
        birMonth: this.data.inputB < 10 ? '0' + this.data.inputB : this.data.inputB,
        birDay: this.data.inputC < 10 ? '0' + this.data.inputC : this.data.inputC
      })
    }
    if (stature) {
      var statureVal = this.data.inputA
      this.setData({
        inputting: false,
        statureVal: statureVal
      })
    }
    if (weight) {
      var weightVal = this.data.inputA
      this.setData({
        inputting: false,
        weightVal: weightVal
      })
    }

    this.setData({
      inputting: false
    })
  },

  // 控制输入框
  toInput: function (e) {
    var that = this

    var type = e.target.dataset.type
    if (type == 'pregnant') {
      var years = this.initValRange(1990, 2020, parseInt(this.data.preYear), parseInt(this.data.preMonth), parseInt(this.data.preDay))
      that.setData({
        pregnant: true,
        birthday: false,
        stature: false,
        weight: false,
        inputTitle: '请选择孕期',
        inputAs: years,
        inputA: parseInt(this.data.preYear),
        inputB: parseInt(this.data.preMonth),
        inputC: parseInt(this.data.preDay)
      })
    } else if (type == 'birthday') {
      var years = this.initValRange(1990, 2020, parseInt(this.data.birYear), parseInt(this.data.birMonth), parseInt(this.data.birDay))
      that.setData({
        birthday: true,
        pregnant: false,
        stature: false,
        weight: false,
        inputTitle: '请选择出生年月',
        inputAs: years,
        inputA: parseInt(this.data.birYear),
        inputB: parseInt(this.data.birMonth),
        inputC: parseInt(this.data.birDay)
      })
    } else if (type == 'stature') {
      var statures = this.initValRange(30, 180, parseInt(this.data.statureVal))
      that.setData({
        stature: true,
        pregnant: false,
        birthday: false,
        weight: false,
        inputTitle: '请选择身高',
        inputAs: statures,
        inputA: this.data.statureVal
      })
    } else if (type == 'weight') {
      var weights = this.initValRange(15, 120, parseInt(this.data.weightVal))
      that.setData({
        weight: true,
        pregnant: false,
        birthday: false,
        stature: false,
        inputTitle: '请选择体重',
        inputAs: weights,
        inputA: this.data.weightVal
      })
    }
    that.setData({
      inputting: true
    })
  }
})