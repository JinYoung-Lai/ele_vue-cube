<!-- ratingSelect -->
<template>
  <div class="ratingSelect">
    <div class="rating-type">
      <cube-tab-bar v-model="selectedLabel" class="tab-bar-wrapper">
        <cube-tab
          class="tab-bar-item"
          :class="{'negative':item.tabKey == 1,'positive':item.tabKey != 1,'active':selectedLabel == item.tabKey}"
          v-for="item in tabs"
          :key="item.tabKey"
          :label="item.tabKey"
        >
          {{item.label}}
          <span class="count">{{item.count}}</span>
        </cube-tab>
      </cube-tab-bar>
    </div>
    <div @click="toggleSwitch()" class="switch" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
    <div class="ratings-wrapper">
      <cube-tab-panels v-model="selectedLabel">
        <cube-tab-panel v-for="item in tabs" :label="item.tabKey" :key="item.tabKey">
          <ul>
            <li
              v-for="(rating,index) in item.ratings"
              :key="index"
              class="rating-item"
              v-show="needShow(rating.text)"
            >
              <div class="avatar">
                <img :src="rating.avatar" width="28px" height="28px" />
              </div>
              <div class="content">
                <h1 class="user">{{rating.username}}</h1>
                <div class="star-wrapper"></div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icon-thumb_up"></span>
                  <span v-for="(item, index) in rating.recommend" :key="index" class="item">{{item}}</span>
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
              </div>
            </li>
          </ul>
        </cube-tab-panel>
      </cube-tab-panels>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../common/js/date";
export default {
  props: {
    tabs: {
      type: Array
    }
  },
  data() {
    return {
      selectedLabel: 2,
      onlyContent: true
    };
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
    toggleSwitch() {
      this.onlyContent = !this.onlyContent;
    },
    needShow(text) {
      if (this.onlyContent && !text) {
        return false;
      } else {
        return true;
      }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/mixin.scss";
@import "../common/style/base.scss";
.ratingSelect {
  width: 100%;
  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    @include border-1px(rgba(7, 17, 27, 0.1));
    .tab-bar-wrapper {
      justify-content: left;
      font-size: 0;
      .tab-bar-item {
        flex: none;
        margin-right: 8px;
        padding: 8px 12px;
        line-height: 16px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        border-radius: 1px;
        &.active {
          color: #fff;
        }
        &.positive {
          background: rgba(0, 160, 220, 0.2);
          &.active {
            background: rgb(0, 160, 220);
          }
        }
        &.negative {
          background: rgba(77, 85, 93, 0.2);
          &.active {
            background: rgb(77, 85, 93);
          }
        }
        .count {
          font-size: 8px;
        }
      }
    }
  }
  .switch {
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    color: rgb(147, 153, 159);
    font-size: 0;
    &.on {
      .icon-check_circle {
        color: #00c850;
      }
    }
    .icon-check_circle {
      display: inline-block;
      vertical-align: top;
      margin-right: 4px;
      font-size: 24px;
    }
    .text {
      display: inline-block;
      vertical-align: top;
      font-size: 12px;
    }
  }
  .ratings-wrapper {
    padding: 0 18px;
    .rating-item {
      display: flex;
      padding: 18px 0;
      @include border-1px(rgba(7, 17, 27, 0.1));
      .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;
        img {
          border-radius: 50%;
        }
      }
      .content {
        flex: 1;
        position: relative;
        .user {
          margin-bottom: 4px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }
        .text {
          margin-bottom: 8px;
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .recommend {
          line-height: 17px;
          font-size: 0;
          .icon-thumb_up,
          .item {
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
          }
          .icon-thumb_up {
            color: rgb(0, 160, 220);
          }
          .item {
            padding: 0 6px;
            border: 1px solid rgba(7, 17, 27, 0.1);
            color: rgb(147, 153, 159);
            background: #fff;
            border-radius: 1px;
          }
        }
        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          color: #93999f;
          font-size: 10px;
        }
      }
    }
  }
}
</style>