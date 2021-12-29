Component({
  data: {
    showLoading: false,
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
