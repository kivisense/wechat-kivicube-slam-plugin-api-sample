import uma from "umtrack-wx";

// app.js
App({
  umengConfig: {
    appKey: "61d50c5ae014255fcbd8c71b",
    useOpenid: false,
    autoGetOpenid: false,
    debug: false,
    uploadUserInfo: false,
    enableVerify: true // 测试验证数据使用
  },
  onLaunch() {},
  globalData: {
    uma,
  },
});
