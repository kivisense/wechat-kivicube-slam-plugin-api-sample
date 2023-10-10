let privacyHandler;
let privacyResolves = new Set();
let closeOtherPagePopUpHooks = new Set();

if (wx.onNeedPrivacyAuthorization) {
  wx.onNeedPrivacyAuthorization((resolve) => {
    console.log(
      "触发 onNeedPrivacyAuthorization",
      typeof privacyHandler === "function"
    );
    if (typeof privacyHandler === "function") {
      privacyHandler(resolve);
    }
  });
}

const closeOtherPagePopUp = (closePopUp) => {
  closeOtherPagePopUpHooks.forEach((hook) => {
    if (closePopUp !== hook) {
      hook();
    }
  });
};

Component({
  properties: {
    currentBtnText: {
      type: String,
      value: "同意",
    },
  },
  data: {
    innerShow: false,
    privacyContractName: "AR空间定位示例小程序隐私保护指引",
  },
  lifetimes: {
    attached() {
      const closePopUp = () => {
        this.disPopUp();
      };
      privacyHandler = (resolve) => {
        privacyResolves.add(resolve);
        this.popUp();
        // 额外逻辑：当前页面的隐私弹窗弹起的时候，关掉其他页面的隐私弹窗
        closeOtherPagePopUp(closePopUp);
      };

      this.closePopUp = closePopUp;
      closeOtherPagePopUpHooks.add(this.closePopUp);
    },
    detached() {
      closeOtherPagePopUpHooks.delete(this.closePopUp);
    },
  },
  pageLifetimes: {
    show() {
      if (this.closePopUp) {
        privacyHandler = (resolve) => {
          privacyResolves.add(resolve);
          this.popUp();
          // 额外逻辑：当前页面的隐私弹窗弹起的时候，关掉其他页面的隐私弹窗
          closeOtherPagePopUp(this.closePopUp);
        };
      }
    },
  },
  methods: {
    handleAgree() {
      this.disPopUp();
      // 这里演示了同时调用多个wx隐私接口时要如何处理：让隐私弹窗保持单例，点击一次同意按钮即可让所有pending中的wx隐私接口继续执行 （看page/index/index中的 wx.getClipboardData 和 wx.startCompass）
      privacyResolves.forEach((resolve) => {
        resolve({
          event: "agree",
          buttonId: "agree-btn",
        });
      });
      privacyResolves.clear();
    },
    handleDisagree() {
      this.disPopUp();
      privacyResolves.forEach((resolve) => {
        resolve({
          event: "disagree",
        });
      });
      privacyResolves.clear();
    },
    popUp() {
      if (this.data.innerShow === false) {
        this.setData({
          innerShow: true,
        });
      }
    },
    disPopUp() {
      if (this.data.innerShow === true) {
        this.setData({
          innerShow: false,
        });
      }
    },
    openPrivacyContract() {
      wx.openPrivacyContract({
        success: () => {
          console.log("openPrivacyContract success");
        },
        fail: (res) => {
          console.error("openPrivacyContract fail", res);
        },
      });
    },
    getPrivateInfo() {
      if (wx.getPrivacySetting) {
        wx.getPrivacySetting({
          success: (res) => {
            console.log(
              "是否需要授权：",
              res.needAuthorization,
              "隐私协议的名称为：",
              res.privacyContractName
            );
          },
          fail: () => {},
          complete: () => {},
        });
      } else {
        console.log("不需要隐私授权");
      }
    },
  },
});
