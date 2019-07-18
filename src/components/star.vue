<!-- star -->
<template>
  <div class="star" :class="starType" >
    <span class="star-item" v-for="(item,index) in starClasses" :key="index" :class="item"></span>
  </div>
</template>

<script>
export default {
  props:{
    score:{
      type:Number
    },
    size:{
      type:Number
    }
  },
  data () {
    return {
    };
  },
  components: {},
  computed: {
    starType(){
      return `star-${this.size}`;
    },
    starClasses(){
      let result = [];
      let score = Math.floor(this.score * 2)/2;
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for(let i=0; i<integer; i++){
        result.push('on');
      }
      if(hasDecimal){
        result.push('half');
      }
      while(result.length < 5){
        result.push('off');
      }
      return result
    }
  },
  mounted() {},
  methods: {}
}

</script>
<style lang='scss' scoped>
@import "../assets/mixin.scss";
.star{
  font-size: 0;
  .star-item{
    display: inline-block;
    background-repeat: no-repeat;  
  }
  &.star-48{
    .star-item{
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
      &:last-child{
        margin-right: 0;
      }
      &.on{
        @include bg-image("../assets/imgs/star/star48_on")
      }
      &.half{
        @include bg-image("../assets/imgs/star/star48_half")
      }
      &.off{
        @include bg-image("../assets/imgs/star/star48_off")
      }
    }
  }
  &.star-36{
    .star-item{
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
      &:last-child{
        margin-right: 0;
      }
      &.on{
        @include bg-image("../assets/imgs/star/star36_on")
      }
      &.half{
        @include bg-image("../assets/imgs/star/star36_half")
      }
      &.off{
        @include bg-image("../assets/imgs/star/star36_off")
      }
    }
  }
  &.star-24{
    .star-item{
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &:last-child{
        margin-right: 0;
      }
      &.on{
        @include bg-image("../assets/imgs/star/star24_on")
      }
      &.half{
        @include bg-image("../assets/imgs/star/star24_half")
      }
      &.off{
        @include bg-image("../assets/imgs/star/star24_off")
      }
    }
  }
}
</style>