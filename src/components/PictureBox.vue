<template>
  <div id="container" :style="style">
    <img :src="src" alt="图片" id="pic" ref="pic" @load="load">
  </div>
</template>

<script>
export default {
  name: "PictureBox",
  props: ["src", "picwidth"],
  data() {
    return {
      style: {
        width: this.picwidth + "px"
      }
    };
  },
  watch: {
    picwidth: function(val) {
      this.style = { width: val + "px" };
      this.$nextTick(() => {
        this.reloadpic();
      });
    }
  },
  mounted() {},
  updated() {},
  methods: {
    load: function(event) {
      this.actualWidth = event.target.width;
      this.actualHeight = event.target.height;
      this.reloadpic();
    },
    reloadpic: function() {
      const width = this.actualWidth;
      const height = this.actualHeight;
      const w = this.$el.offsetWidth;
      const h = this.$el.offsetHeight;
      const s1 = w / h;
      const s2 = width / height;
      if (s1 > s2) {
        // 容器宽高比大于图片
        this.$refs.pic.height = h;
        this.$refs.pic.width = h * s2;
      } else {
        this.$refs.pic.width = w;
        this.$refs.pic.height = w / s2;
      }
    }
  }
};
</script>

<style scoped>
#container {
  box-shadow: 0px 0px 2px gray;
  display: inline-block;
  position: absolute;
  box-sizing: border-box;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#pic {
  max-width: 100%;
  max-height: 100%;
}
</style>

