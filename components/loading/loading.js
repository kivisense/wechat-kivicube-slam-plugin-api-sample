Component({
  properties: {},
  data: {
    showLoading: false,
  },
  lifetimes: {
    async attached() {},
    async detached() {},
  },
  methods: {
    show() {
      this.setData({
        showLoading: true,
      });
    },
    hidden() {
      this.setData({
        showLoading: false,
      });
    },
  },
});
