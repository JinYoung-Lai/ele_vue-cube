<!-- 评论 -->
<template>
  <div class="main rating" v-if="oSeller">
    <cube-scroll>
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{oSeller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{oSeller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="oSeller.serviceScore"></star>
            <span class="score">{{oSeller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="oSeller.foodScore"></star>
            <span class="score">{{oSeller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{oSeller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <div class="ratingselect-wrapper">
        <ratingselect :tabs="oTabs"></ratingselect>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import ratingselect from "../components/ratingselect.vue";
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
      tabs: [
        {
          label: "全部",
          tabKey: 2,
          ratings: [],
          count: 0
        },
        {
          label: "满意",
          tabKey: 0,
          ratings: [],
          count: 0
        },
        {
          label: "不满意",
          tabKey: 1,
          ratings: [],
          count: 0
        }
      ],
      ratings: [],
      positive: [],
      negative: [],
      //oSeller: {}
    };
  },
  components: {
    star,
    ratingselect
  },
  computed:{
    oSeller(){
      return this.seller.seller;
    },
    oTabs(){
       let ratings = this.seller.ratings;
      if (ratings) {
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
      }
      return this.tabs
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../common/style/base.scss";
@import "../assets/mixin.scss";
.rating {
  bottom: 0;

  .overview {
    display: flex;
    padding: 18px 0;
    .overview-left {
      flex: 0 0 137px;
      width: 137px;
      padding: 6px 0;
      text-align: center;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      @media only screen and (max-width: 320px) {
        flex: 0 0 120;
        width: 120px;
      }
      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }
      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: #07111b;
      }
      .rank {
        line-height: 10px;
        font-size: 10px;
        color: #93999f;
      }
    }
    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;
      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }
      .score-wrapper {
        margin-bottom: 8px;
        font-size: 0;
        .title {
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .star {
          display: inline-block;
          margin: 0 12px;
          vertical-align: top;
        }
        .score {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(255, 153, 0);
        }
      }
      .delivery-wrapper {
        font-size: 0;
        .title {
          display: inline-block;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .delivery {
          margin-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>
