<!-- 商家 -->
<template>
  <div class="main seller" v-if="oSeller">
    <cube-scroll>
      <div class="overview">
        <h1 class="title">{{oSeller.name}}</h1>
        <div class="desc border-1px">
          <star class="star" :size="36" :score="oSeller.score"></star>
          <span class="text">({{oSeller.ratingCount}})</span>
          <span class="text">月售{{oSeller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{oSeller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{oSeller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{oSeller.deliveryTime}}</span>元
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <div class="split"></div>
      <div class="bulletin">
        <h1 class="title">公共与活动</h1>
        <div class="content border-1px">
          <p>{{oSeller.bulletin}}</p>
        </div>
        <ul class="supports" v-for="(item,index) in oSeller.supports" :key="index">
          <li class="supports-item">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <div class="split"></div>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper">
          <cube-scroll
            direction="horizontal"
            ref="horizontalScroll"
            class="horizontal-scroll-list-wrap"
            nest-mode="free"
          >
            <ul class="pic-list">
              <li class="pic-item" v-for="(pic, index) in oSeller.pics" :key="index">
                <img :src="pic" width="120" height="90" />
              </li>
            </ul>
          </cube-scroll>
        </div>
      </div>
      <div class="split"></div>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="(info,index) in oSeller.infos" :key="index">{{info}}</li>
        </ul>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import star from "../components/star.vue";
import axios from "axios";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      favorite: false,
      classMap: []
    };
  },
  components: {
    star
  },
  computed: {
    oSeller() {
      return this.seller.seller;
    },
    favoriteText() {
      return this.favorite ? "已收藏" : "收藏";
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  mounted() {
    if (this.oSeller) {
      console.log(this.oSeller);
    };
  },
  methods: {
    toggleFavorite() {
      this.favorite = !this.favorite;
    },
    
  }
};
</script>
<style lang='scss'>
.horizontal-scroll-list-wrap {
  .cube-scroll-content {
    display: inline-block;
  }
}
</style>

<style lang='scss' scoped>
@import "../common/style/base.scss";
@import "../assets/mixin.scss";
.seller {
  bottom: 0;
  .overview {
    position: relative;
    padding: 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      font-size: 14px;
      color: #07111b;
    }
    .desc {
      padding-bottom: 18px;
      font-size: 0;
      @include border-1px(rgba(7, 17, 27, 0.1));
      .star {
        display: inline-block;
        margin-right: 8px;
        vertical-align: top;
      }
      .text {
        display: inline-block;
        margin-right: 12px;
        line-height: 18px;
        vertical-align: top;
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }
    .remark {
      display: flex;
      padding-top: 18px;
      .block {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        &:last-child {
          border-right: none;
        }
        h2 {
          margin-bottom: 4px;
          line-height: 10px;
          font-size: 10px;
          color: #93999f;
        }
        .content {
          line-height: 24px;
          font-size: 10px;
          color: #07111b;
          .stress {
            font-size: 24px;
          }
        }
      }
    }
    .favorite {
      position: absolute;
      right: 11px;
      top: 18px;
      text-align: center;
      .icon-favorite {
        display: block;
        margin-bottom: 4px;
        width: 50px;
        line-height: 24px;
        font-size: 24px;
        color: #d4d6d9;
        &.active {
          color: rgb(240, 20, 20);
        }
      }
      .text {
        line-height: 10px;
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }
  }
  .bulletin {
    padding: 18px 18px 0 18px;
    .title {
      margin-bottom: 8px;
      font-size: 14px;
      line-height: 14px;
      color: #07111b;
    }
    .content {
      padding: 0 12px 16px 12px;
      @include border-1px(rgba(7, 17, 27, 0.1));
      p {
        line-height: 24px;
        font-size: 12px;
        color: rgb(240, 20, 20);
      }
    }
    .supports {
      .supports-item {
        position: relative;
        padding: 16px 12px;
        font-size: 0;
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 16px;
          height: 16px;
          margin-right: 6px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-image("../assets/imgs/seller/decrease_4");
          }
          &.discount {
            @include bg-image("../assets/imgs/seller/discount_4");
          }
          &.guarantee {
            @include bg-image("../assets/imgs/seller/guarantee_4");
          }
          &.invoice {
            @include bg-image("../assets/imgs/seller/invoice_4");
          }
          &.special {
            @include bg-image("../assets/imgs/seller/special_4");
          }
        }
        .text {
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
      }
    }
  }
  .pics {
    padding: 18px;
    .title {
      padding-bottom: 12px;
      line-height: 14px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .pic-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      .pic-list {
        display: inline-block;
        font-size: 0;
        .pic-item {
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;
          &:last-child {
            margin: 0;
          }
        }
      }
    }
  }
  .info {
    padding: 18px 18px 0 18px;
    color: rgb(7, 17, 27);
    .title {
      padding-bottom: 12px;
      line-height: 14px;
      font-size: 14px;
      @include border-1px(rgba(7, 17, 27, 0.1));
    }
    .info-item {
      padding: 16px 12px;
      line-height: 16px;
      font-size: 12px;
      @include border-1px(rgba(7, 17, 27, 0.1));
      &:last-child {
        @include border-none();
      }
    }
  }
}

</style>