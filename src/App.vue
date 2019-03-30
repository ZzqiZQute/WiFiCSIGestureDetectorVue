<template>
  <div id="app">
    <div
      id="titl"
      ref="titl"
      style="position:absolute;top:0;font-size:70px;letter-spacing:2px;margin-top:30px;white-space:nowrap;"
    >Scrollable Gallery - Using Wifi CSI</div>
    <PictureScroller ref="scroller" @canmove="canmove"/>
    <div style="position:absolute;bottom:0;right:0;float:right">
      <ScrollButton :type="0" @click="leftClick"/>
      <ScrollButton :type="1" @click="rightClick"/>
    </div>
    <div style="position:absolute;bottom:0;">Made by Vue.js</div>
  </div>
</template>

<script>
import PictureScroller from "./components/PictureScroller";
import ScrollButton from "./components/ScrollButton";
export default {
  name: "App",
  components: {
    PictureScroller,
    ScrollButton
  },
  data() {
    return {
      canMove: true
    };
  },
  methods: {
    leftClick: function() {
      if (this.canMove) {
        this.canMove = false;
        this.$refs.scroller.movetoleft();
      }
    },
    rightClick: function() {
      if (this.canMove) {
        this.canMove = false;
        this.$refs.scroller.movetoright();
      }
    },
    canmove: function() {
      this.canMove = true;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("./assets/background.jpg");
  background-size: 100%;
  background-attachment: fixed;
  user-select: none;
}
#titl {
  background-image: linear-gradient(to bottom, black, lightgray);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
