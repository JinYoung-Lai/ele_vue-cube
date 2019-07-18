<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <v-header :seller="oSeller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="rating">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller = "sellerAll"></router-view>
    </keep-alive>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import header from "./components/header.vue"
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      oSeller: {},
      sellerAll:{}
    };
  },
  components: {
    "v-header": header
  },
  created() {
    axios.get("/mock/data.json").then(res => {
      //console.log(res);
      if (res.data != undefined) {
        console.log(res.data)
        this.sellerAll = res.data;
        this.oSeller = res.data.seller;
      }
    });
  },
  mounted() {
    this.$router.push("/goods");
  }
};
</script>

<style lang='scss'>
@import "./assets/mixin.scss";
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  @include border-1px(rgba(7, 17, 27, 0.1));
  .tab-item {
    flex: 1;
    text-align: center;
    & > a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      &.router-link-active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
