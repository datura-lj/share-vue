<template>
  <div class="header">
    <div class="go-boack" @click="goBack">
      回去
    </div>
    <h2>{{ headerData.text }}</h2>
    <div class="time">
      <span>{{ timeNow }}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'

  export default {
    name: 'header',
    data() {
      return {
        who: 'header'
      }
    },
    props: {
      headerData: {
        type: Object,
        default: {
          text: 'datura',
          times: '00'
        }
      }
    },
    computed: {
      ...mapGetters({
        timeNow: 'timeNow'
      })
    },
    mounted() {
      this.who = this.$route.query.who;
    },
    methods: {
      goBack() {
        if(this.who === 'home'){
          this.$router.back();
          //window.history.go(-1);
        }
      }
    }

  }
</script>

<style type="text/css" scoped lang="scss">
  .header{
    width: 100%;
    height: 0.4rem;
    background-color: aqua;
    text-align: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;

    h2{
      width: 100%;
      line-height: .4rem;
      color: darkorange;
      font-size: .3rem;
    }
    .time{
      position: absolute;
      top: 0;
      right: 0.16rem;
      color: #000;
      line-height: .4rem;
      font-size: .14rem;
    }
    .go-boack{
      width: 0.5rem;
      height: 100%;
      text-align: center;
      line-height:0.4rem;
      position: absolute;
      left: 0;
      top: 0;
      background-color: cornflowerblue;
    }
  }
</style>
