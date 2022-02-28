// components/card/card.js
import { stats } from "../../utils/stats";

Component({
  properties: {
    detail: {
      default: {},
      type: Object,
    },
  },
  methods: {
    buyNow() {
      wx.showModal({
        title: "立即下单",
        content: "这是演示示意，实际可以跳转下单页面",
        showCancel: true,
        cancelText: "取消",
        confirmText: "确定",
        success: (result) => {
          if (result.confirm) {
          }
        },
        fail: () => {},
        complete: () => {},
      });

      stats("ar_click_orderNow");
    },
  },
});
