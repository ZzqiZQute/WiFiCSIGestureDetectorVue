// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import PictureScroller from './components/PictureScroller'
import PictureBox from './components/PictureBox'
import ScrollButton from './components/ScrollButton'
Vue.config.productionTip = false

/* eslint-disable no-new */
const vm=new Vue({
  el: '#app',
  components: { App,PictureBox,PictureScroller,ScrollButton },
  template: '<App/>'
})

