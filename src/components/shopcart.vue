<!-- shopcart -->
<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList()">
        <div class="content-left">
          <div class="logo-wraper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.prevent.stop="payPrice()">
          <div class="pay" :class="payClass" >{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="(ball,index) in balls" :key="index">
          <transition
            name="drop"
            @before-enter="beforeDrop"
            @enter="dropping"
            @after-enter="afterDrop"
          >
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="flod">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="scroll-list-wrap">
            <cube-scroll ref="listscroll" style="max-height:217px;">
              <ul>
                <li class="food" v-for="(food,index) in selectFoods" :key="index">
                  <span class="name">{{food.name}}</span>
                  <div class="price">
                    <span>￥{{food.price*food.count}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol @add="addFood" :food="food"></cartcontrol>
                  </div>
                </li>
              </ul>
            </cube-scroll>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script>
import cartcontrol from "../components/cartcontrol.vue";
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 0,
            count: 0
          }
        ];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      dropBalls: [],
      listShow: false,
      
    };
  },
  components: {
    cartcontrol
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return "去结算";
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    },
    

  },
  mounted() {},
  methods: {
    toggleList() {
      if (this.totalCount) {
        this.listShow = !this.listShow;
        
      }
      this.$nextTick(() => {
        this.$refs.listscroll.refresh()
      })
    },
    hideList() {
      this.listShow = false;
    },
    empty() {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
      this.listShow = false;
    },
    addFood(target) {
      this.drop(target);
    },
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el) {
      let len = this.balls.length;
      while (len--) {
        let ball = this.balls[len];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = "";
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    dropping(el, done) {
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = `translate3d(0,0,0)`;
        el.style.transform = `translate3d(0,0,0)`;
        let inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.webkitTransform = `translate3d(0,0,0)`;
        inner.style.transform = `translate3d(0,0,0)`;
        el.addEventListener("transitionend", done);
      });
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
    },
    payPrice(){
      if (this.totalPrice < this.minPrice) {
          return;
        }
        this.$createDialog({
        type: 'confirm',
        title: '',
        content: `支付${this.totalPrice}元`,
        icon: 'cubeic-safe-pay',
        confirmBtn: {
          text: '确定',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          this.empty()
        },
      }).show()
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../assets/mixin.scss";
@import "../common/style/base.scss";
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 150;
  width: 100%;
  height: 48px;
  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);
    .content-left {
      flex: 1;
      .logo-wraper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        width: 56px;
        height: 56px;
        margin: 0 12px;
        padding: 6px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          text-align: center;
          background: #2b343c;
          border-radius: 50%;
          &.highlight {
            background: rgb(0, 160, 220);
          }
          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;
            &.highlight {
              color: #fff;
            }
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          background: rgb(240, 20, 20);
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }
      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        padding-right: 12px;
        line-height: 24px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 700;

        &.highlight {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        &.not-enough {
          background: #2b333b;
        }
        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0, 160, 220);
        transition: all 0.4s linear;
      }
    }
  }
  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: -1;
    transform: translate3d(0, -100%, 0);
    &.fold-enter-active,
    &.fold-leave-active {
      transition: all 0.5s;
    }
    &.fold-enter,
    &.fold-leave-active {
      transform: translate3d(0, 0, 0);
    }
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .title {
        float: left;
        font-size: 14px;
        color: rgba(7, 17, 27, 1);
      }
      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }
    .scroll-list-wrap {
      position: relative;
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;
      .food {
        position: relative;

        padding: 12px 0;
        box-sizing: border-box;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(1, 17, 27);
        }
        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}
.list-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);
  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 0.5s;
  }
  &.fade-enter,
  &.fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>