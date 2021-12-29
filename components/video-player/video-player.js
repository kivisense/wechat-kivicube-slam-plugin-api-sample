// components/video-player/video-player.js
import { resUrl } from "../../utils/util";

Component({
  lifetimes: {
    async attached() {
      this.videoContext = wx.createVideoContext("kivi-video", this);
    },
    async detached() {
      this.videoContext.stop();
      this.videoContext = null;
    },
  },
  data: {
    showVideo: false,
    videoPath: resUrl("media/movie.mp4"),
  },
  methods: {
    play() {
      this.setData({ showVideo: true });
      this.videoContext.play();
      this.triggerEvent("play");
    },
    stop() {
      this.setData({ showVideo: false });
      this.videoContext.stop();
      this.triggerEvent("close");
    },
  },
});
