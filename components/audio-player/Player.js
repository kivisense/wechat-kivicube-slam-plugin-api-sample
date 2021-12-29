class Player {
  constructor() {
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.src =
      "https://kivicube-resource.kivisense.com/projects/wx-slam-test-assets/media/bgm.mp3";
    this.innerAudioContext.loop = true;
    this.type = "pause";
  }

  play() {
    this.innerAudioContext.play();
    this.type = "play";
  }

  pause() {
    this.innerAudioContext.pause();
    this.type = "pause";
  }

  stop() {
    this.innerAudioContext.stop();
    this.type = "stop";
  }

  getType() {
    return this.type;
  }

  destroy() {
    this.stop();

    this.innerAudioContext.destroy();
  }
}

export default Player;
