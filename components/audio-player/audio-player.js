import Player from "./Player";

const defaultIcon = "/static/images/default-audio.png";
const pauseIcon = "/static/images/pause-audio.png";

Component({
  properties: {},
  data: {
    icon: defaultIcon,
  },
  lifetimes: {
    async attached() {
      this.player = new Player();
    },
    async detached() {
      this.player.destroy();
      this.player = null;
    },
  },
  methods: {
    touch() {
      const type = this.player.getType();
      if (type === "play") {
        this.pause();
      } else {
        this.play();
      }
    },
    play() {
      this.setData({
        icon: defaultIcon,
      });
      this.player.play();
      this.triggerEvent("play");
    },
    pause() {
      this.setData({
        icon: pauseIcon,
      });
      this.player.pause();
      this.triggerEvent("pause");
    },
  },
});
