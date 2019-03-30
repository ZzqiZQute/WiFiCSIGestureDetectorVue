<template>
<div>
<div v-show="show" v-html="msg">
</div>
<input type="button" @click="onbtnclick" value="Toggle" />
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
      show:true,
      msg:"<h1>Hello world</h1>"
    }
   },
  methods:{
    onbtnclick:function(event){
      this.show=!this.show
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
