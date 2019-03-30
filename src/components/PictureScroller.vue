<template>
  <div id="container" :style="{width:width+'px',height:height+'px'}">
    <div
      style="width:100%;height:100%;position:absolute;display:flex;align-items:center;justify-content:center"
    >
      <div id="hint" ref="hint" v-show="show">Waiting...</div>
    </div>
    <div id="pics" ref="pics">
      <PictureBox v-for="(item,key) in pictureList" :key="key" :src="item" :picwidth="picwidth"></PictureBox>
    </div>
  </div>
</template>

<script>
import picList from "../pictures.js";
import PictureBox from "./PictureBox";
export default {
  name: "PictureScroller",
  data() {
    return {
      show: true,
      picshow: false,
      pp: 300,
      picwidth: 800,
      completedCnt: 0,
      currentNum: 0,
      width: 1400,
      height: 600,
      gap: 0,
      titlshow: true
    };
  },
  components: {
    PictureBox
  },
  created() {
    this.pictureList = picList;
    this.dir = Math.random() < 0.5;
    this.idx = picList.map((value, idx) => idx);
  },
  mounted() {
    window.addEventListener("resize", ev => {
      console.log("resize");
      this.reset();
      this.width = window.innerWidth;
      this.speed = this.width / 50;
      this.gap = this.width / 20;
      this.pp = this.width / 5;
      this.picwidth = this.width - 2 * this.gap - 2 * this.pp;
      this.height = (this.picwidth * 3) / 4;
      const w = this.$el.offsetWidth;
      const t = this.idx.slice(0, 5);
      for (let i = 0; i < 5; i++) {
        this.children[t[i]].style.visibility = "visible";
        this.children[t[i]].style.left = `${this.pp +
          this.gap +
          (i - 2) * (this.gap + this.picwidth)}px`;
      }
    });
    window.addEventListener("load", ev => {
      this.reset();
      this.width = window.innerWidth;
      this.speed = this.width / 50;
      this.gap = this.width / 20;
      this.pp = this.width / 5;
      this.picwidth = this.width - 2 * this.gap - 2 * this.pp;
      this.height = (this.picwidth * 3) / 4;
      const w = this.$el.offsetWidth;
      const t = this.idx.slice(0, 5);
      for (let i = 0; i < 5; i++) {
        this.children[t[i]].style.visibility = "visible";
        this.children[t[i]].style.left = `${this.pp +
          this.gap +
          (i - 2) * (this.gap + this.picwidth)}px`;
      }
    });
    this.children = this.$refs.pics.children;
    for (let i = 0; i < this.$refs.pics.childElementCount; i++) {
      let t = this.children[i];
      t.style.visibility = "hidden";
      t.style.height = "80%";
      t.children[0].addEventListener(
        "load",
        ev => {
          this.completedCnt++;
          this.$refs.hint.innerHTML = `Waiting...(${this.completedCnt}/${
            this.pictureList.length
          })`;
          if (this.completedCnt == this.pictureList.length) {
            //初始化效果
            this.show = false;
            this.picshow = true;
            const w = this.$el.offsetWidth;
            const t = this.idx.slice(0, 5);
            for (let i = 0; i < 5; i++) {
              this.children[t[i]].style.visibility = "visible";
              this.children[t[i]].style.left = `${this.pp +
                this.gap +
                (i - 2) * (this.gap + this.picwidth)}px`;
            }
            // if (this.dir) setInterval(this.movetoright, 1500);
            // else setInterval(this.movetoleft, 1500);
          }
        },
        false
      );
    }
  },
  methods: {
    movetoleft: function() {
      this.reset();
      const start = this.idx.slice();
      const end = this.idx.slice();
      const t = end.shift();
      end.push(t);
      //move
      const s = start.slice(0, 5);
      const e = end.slice(0, 5);
      const w = this.$el.offsetWidth;
      for (let i = 0; i < 5; i++) {
        this.children[s[i]].style.visibility = "visible";
        this.children[s[i]].style.left = `${this.pp +
          this.gap +
          (i - 2) * (this.gap + this.picwidth)}px`;
      }
      let k = 0;
      const animefunc = time => {
        k += this.speed;
        for (let i = 0; i < 5; i++) {
          let kk = parseInt(
            this.children[s[i]].style.left.slice(
              0,
              this.children[s[i]].style.left.length - 1
            )
          );
          kk -= this.speed;
          this.children[s[i]].style.left = `${kk}px`;
        }
        if (k < this.gap + this.picwidth) {
          requestAnimationFrame(animefunc);
        } else {
          for (let i = 0; i < 5; i++) {
            this.children[e[i]].style.visibility = "visible";
            this.children[e[i]].style.left = `${this.pp +
              this.gap +
              (i - 2) * (this.gap + this.picwidth)}px`;
          }
          this.$emit("canmove");
        }
      };
      requestAnimationFrame(animefunc);
      this.idx = end;
    },
    movetoright: function() {
      this.reset();
      const start = this.idx.slice();
      const end = this.idx.slice();
      const t = end.pop();
      end.unshift(t);
      //move
      const s = start.slice(0, 5);
      const e = end.slice(0, 5);
      const w = this.$el.offsetWidth;
      for (let i = 0; i < 5; i++) {
        this.children[s[i]].style.visibility = "visible";
        this.children[s[i]].style.left = `${this.pp +
          this.gap +
          (i - 2) * (this.gap + this.picwidth)}px`;
      }
      let k = 0;
      const animefunc = time => {
        k += this.speed;
        for (let i = 0; i < 5; i++) {
          let kk = parseInt(
            this.children[s[i]].style.left.slice(
              0,
              this.children[s[i]].style.left.length - 1
            )
          );
          kk += this.speed;
          this.children[s[i]].style.left = `${kk}px`;
        }
        if (k < this.gap + this.picwidth) {
          requestAnimationFrame(animefunc);
        } else {
          for (let i = 0; i < 5; i++) {
            this.children[e[i]].style.visibility = "visible";
            this.children[e[i]].style.left = `${this.pp +
              this.gap +
              (i - 2) * (this.gap + this.picwidth)}px`;
          }
          this.$emit("canmove");
        }
      };
      requestAnimationFrame(animefunc);
      this.idx = end;
    },
    reset: function() {
      this.show = false;
      for (let i = 0; i < this.children.length; i++) {
        this.children[i].style.visibility = "hidden";
      }
    }
  }
};
</script>

<style scoped>
#container {
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
#hint {
  margin-top: -20px;
  font-size: 3em;
}
#pics {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
