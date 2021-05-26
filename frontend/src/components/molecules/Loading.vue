<script>
export default {
  render(h) {
    return h; // renderless component
  },
  data() {
    return {
      loadingComponent: null,
    };
  },
  mounted() {
    this.startOverlayLoading();
  },
  beforeDestroy() {
    this.stopOverlayLoading();
  },
  methods: {
    startOverlayLoading() {
      this.loadingComponent = this.$vs.loading({
        type: "points",
        opacity: 1,
        text: "Loading",
      });
    },
    stopOverlayLoading() {
      this.loadingComponent.close();
    },
  },
};
</script>

<style></style>
