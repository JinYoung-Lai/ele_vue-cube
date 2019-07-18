<!-- food -->
<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <cube-scroll ref="scroll">
        <div class="food-content">
          <div class="img-header">
            <img :src="food.image" />
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月销{{food.sellCount}}</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span>
              <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol @add="addFood" :food="food"></cartcontrol>
            </div>
            <transition name="fade">
              <div
                @click.stop.prevent="addFirst"
                class="buy"
                v-show="!food.count || food.count===0"
              >加入购物车</div>
            </transition>
          </div>
          <div class="split"></div>
          <div class="info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <div class="split"></div>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect :tabs="tabs"></ratingselect>
          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
import cartcontrol from "./cartcontrol.vue";
import ratingselect from "./ratingselect.vue";
import Vue from "vue";
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      tabs: [
        {
          label: "全部",
          tabKey: 2,
          ratings: [],
          count: 0
        },
        {
          label: "推荐",
          tabKey: 0,
          ratings: [],
          count: 0
        },
        {
          label: "吐槽",
          tabKey: 1,
          ratings: [],
          count: 0
        }
      ],
      positive: [],
      negative: []
    };
  },
  components: {
    cartcontrol,
    ratingselect
  },
  computed: {},
  mounted() {
    
  },
  methods: {
    show() {
      this.showFlag = true;
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
        let ratings = this.food.ratings;
        for (let i = 0; i < ratings.length; i++) {
          if (ratings[i].rateType === 0) {
            this.positive.push(ratings[i]);
          } else if (ratings[i].rateType === 1) {
            this.negative.push(ratings[i]);
          }
        }
        this.tabs[0].ratings = ratings;
        this.tabs[1].ratings = this.positive;
        this.tabs[2].ratings = this.negative;
        this.tabs[0].count = ratings.length;
        this.tabs[1].count = this.positive.length;
        this.tabs[2].count = this.negative.length;
      });
    },
    hide() {
      this.showFlag = false;
    },
    addFood(target) {
      this.$emit("add", target);
    },
    addFirst(event) {
      this.$emit("add", event.target);
      Vue.set(this.food, "count", 1);
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../common/style/base.scss";
.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  width: 100%;
  z-index: 140;
  background: #fff;
  transform: translate3d(0, 0, 0);
  &.move-enter-active,
  &.move-leave-active {
    transition: all 0.2s linear;
  }
  &.move-enter,
  &.move-leave-active {
    transform: translate3d(100%, 0, 0);
  }
  .img-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .back {
      position: absolute;
      top: 10px;
      left: 0;
      .icon-arrow_lift {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .content {
    position: relative;
    padding: 18px;
    .title {
      line-height: 14px;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
    }
    .detail {
      margin-bottom: 18px;
      height: 10px;
      line-height: 10px;
      font-size: 0;
      .sell-count,
      .rating {
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .sell-count {
        margin-right: 12px;
      }
    }
    .price {
      line-height: 24px;
      font-weight: 700;
      .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
      }
      .old {
        font-size: 10px;
        color: rgb(147, 153, 159);
        text-decoration: line-through;
      }
    }
    .cartcontrol-wrapper {
      position: absolute;
      right: 12px;
      bottom: 12px;
    }
    .buy {
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10;
      height: 24px;
      padding: 0 12px;
      line-height: 24px;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 10px;
      color: #fff;
      background: rgb(0, 160, 220);
      opacity: 1;
      &.fade-enter-active,
      &.fade-leave-active {
        transition: all 0.2s;
      }
      &.fade-enter,
      &.fade-leave-active {
        opacity: 0;
        z-index: -1;
      }
    }
  }
  .info {
    padding: 18px;
    .title {
      line-height: 14px;
      margin-bottom: 6px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .text {
      line-height: 24px;
      padding: 0 8px;
      font-size: 12px;
      color: rgb(77, 85, 93);
    }
  }
  .rating {
    width: 100%;
    padding-top: 18px;
    .title {
      line-height: 14px;
      margin-left: 18px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
  }
}
</style>