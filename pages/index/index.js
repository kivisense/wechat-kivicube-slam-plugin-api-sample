import { errorHandler, showAuthModal, getCameraAuth } from "../../utils/util";
import Food from "./Food";

const steps = ["findPlane", "showPoint", "startScene"]; // 一些UI限制的步骤

Page({
  data: {
    showSlam: false,
    // 使用 kivicube-slam 组件需要申请license
    license:
      "ad51dc82b4846b28943338eeaac37f560345bbdba05a91a7aa5da0768d87ca5fea23cbbf1a4772785d92c7d2baaf0b88f373a0dd9c4a1c8bd8184a2f53bd59e0",
    step: "",

    detail: {
      img: "/static/images/beef.png",
      title: "火焰炙烤牛排",
      price: 138,
      appid: "wx734c1ad7b3562129",
      url: "pages/webview/webview?url=https%3A%2F%2Fm.dianping.com%2Fshop%2FG5IwJkv46Ie2NW0P%2Fdish214097741%3Fmsource%3Dmina_food",
    },
  },

  async onLoad() {
    this.loading = this.selectComponent("#loading");

    this.loading.show();

    // 此处使用会获取摄像头的权限，直到同意后才会初始化slam以免摄像头报错导致无法初始化。
    await getCameraAuth();

    this.setData({ showSlam: true });

    // 设置屏幕常亮
    wx.setKeepScreenOn({
      keepScreenOn: true,
    });

    this.Food = new Food();
    // 提前下载素材
    this.Food.loadAssets();

  },

  onUnload() {
    this.Food.clear();

    this.Food = null;
    this.Player = null;
    this.loading = null;
    this.videoPlayer = null;
    this.audioPlayer = null;
  },

  async ready({ detail: slam }) {
    try {
      const { Food } = this;
      // 初始化场景
      await Food.initScene(slam);

      this.findPlane();
      this.loading.hidden();
    } catch (e) {
      this.loading.hidden();
      errorHandler(e);
    }
  },

  // 寻找屏幕
  findPlane() {
    this.setData({ step: steps[0] });

    setTimeout(() => {
      this.setData({ step: steps[1] });
      this.Food.findPlane();
    }, 3000);
  },

  // 开始场景展示
  startScene() {
    if (this.data.step !== steps[1]) {
      return;
    }
    try {
      this.Food.startScene();
      this.setData({ step: "" });

      setTimeout(() => {

        this.setData({ step: steps[2] });

        wx.nextTick(() => {
          this.audioPlayer = this.selectComponent("#audioPlayer");
          this.videoPlayer = this.selectComponent("#videoPlayer");
          this.audioPlayer.play();
        })
      }, 2000);
    } catch (err) {
      wx.showToast({ title: "放置模型失败，请对准平面", icon: "none" });
    }
  },

  playVideo() {
    this.audioPlayer.pause();
  },

  closeVideo() {
    this.audioPlayer.play();
  },

  error({ detail }) {
    // 判定是否camera权限问题，是则向用户申请权限。
    if (detail?.isCameraAuthDenied) {
      showAuthModal(this);
    } else {
      errorHandler(detail);
    }
  },
});
