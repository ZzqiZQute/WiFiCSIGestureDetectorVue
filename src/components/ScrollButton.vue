<template>
  <div
    :style="{width:this.width+'px',height:this.height+'px',display:'inline-flex',alignItems:'center',justifyContent:'center'}"
  >
    <div
      id="arrow"
      ref="arrow"
      @click="clicked"
      :style="{width:this.width*0.5+'px',height:this.height*0.5+'px'}"
    ></div>
  </div>
</template>
<script>
export default {
  name: "ScrollButton",
  data() {
    return {
      width: 80,
      height: 80
    };
  },
  mounted() {
    console.log(this.type);
    var arrow = this.$refs.arrow;
    if (this.type == 0) {
      arrow.style.transform = "rotate(-45deg)";
    } else {
      arrow.style.transform = "rotate(135deg)";
    }
  },
  methods: {
    clicked: function() {
      console.log(this);
      this.$emit("click");
    }
  },
  props: ["type"]
};
</script>
<style scoped>
#arrow {
  cursor: pointer;
  transition: all 0.5s;
  border-left: gray 5px solid;
  border-top: gray 5px solid;
}
#arrow:hover {
  border-left-color: black;
  border-top-color: black;
}
</style>
