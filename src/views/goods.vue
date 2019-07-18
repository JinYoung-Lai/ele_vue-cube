<!-- 商品 -->
<template>
  <div class="main goods" v-if="goods">
    <div class="scroll-list-wrap">
      <cube-scroll-nav :side="true" class="menu-wrapper">
        <cube-scroll-nav-panel
          v-for="(item,index) in goods"
          :key="index"
          :label="item.name"
          class="menu-item"
        >
          <ul>
            <li @click="selectFood(food,$event)" v-for="(food,index) in item.foods" :key="index" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <!-- @add="addFood" :food="food" -->
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <shopcart
      ref="shopcart"
      :selectFoods="selectFoods"
      :deliveryPrice="seller.seller.deliveryPrice"
      :minPrice="seller.seller.minPrice"
    ></shopcart>
    <food ref="food" :food="itemFood"></food>
  </div>
</template>

<script>
import shopcart from "../components/shopcart.vue";
import cartcontrol from "../components/cartcontrol.vue";
import food from "../components/food.vue";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      itemFood: {}
    };
  },
  components: {
    shopcart,
    cartcontrol,
    food
  },
  computed: {
    goods() {
      if (this.seller) {
        return this.seller.goods;
      }
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  mounted() {
  },
  methods: {
    addFood(target) {
      this._drop(target);
      //this.selGoods.push(target)
    },
    _drop(target) {
      // 体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
    selectFood(food, event){
      console.log(food)
      this.itemFood = food;
      this.$refs.food.show()
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../assets/mixin.scss";
@import "../common/style/base.scss";
.goods{
  display: flex;
  bottom:46px;
}
.food-item {
  display: flex;
  margin: 18px;
  padding-bottom: 18px;
  @include border-1px(rgba(7, 17, 27, 0.1));
  &:last-child {
    @include border-none();
  }
  .icon {
    flex: 0 0 57px;
    margin-right: 10px;
  }
  .content {
    flex: 1;
    .name {
      margin: 2px 0 8px 0;
      height: 14px;
      line-height: 14px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .desc,
    .extra {
      line-height: 10px;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
    .desc {
      line-height: 12px;
      margin-bottom: 8px;
    }
    .extra {
      .count {
        margin-right: 12px;
      }
    }
    .price {
      font-weight: 700;
      line-height: 24px;
      .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
      }
      .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
    .cartcontrol-wrapper {
      position: absolute;
      right: 0;
      bottom: 12px;
    }
  }
}
.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 255, 0.637);
  content: "+";
}
</style>