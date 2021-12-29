const defaultIcon = "/static/images/default-audio.png";
const pauseIcon = "/static/images/pause-audio.png";
import Player from "./Player";

Component({
  properties: {},
  data: {
    icon: defaultIcon,
  },
  lifetimes: {
    async attached() {
      this.Player = new Player();
    },
    async detached() {
      this.Player.destroy();
      this.Player = null;
    },
  },
  methods: {
    touch() {
      const type = this.Player.getType();
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
      this.Player.play();
      this.triggerEvent("play");
    },
    pause() {
      this.setData({
        icon: pauseIcon,
      });
      this.Player.pause();
      this.triggerEvent("pause");
    },
  },
});
