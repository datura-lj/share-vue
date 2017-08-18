<template>
  <div class="home">
    <div class="logo" v-if="logoState"></div>
    <my-header :headerData="headerData"></my-header>
    <div class="content">
      <div class="del">
        <div class="top clearFix">
          <p class="">还剩下商品id遍历为：【<span v-for="val in goodsIdArr">{{val}},</span>】</p>
          <h1 class=""> 请选择删除商品的id： <b>{{delNumber}}</b></h1>
        </div>
        <div class="bottom clearFix">
          <input class="fl"  type="text" v-model="delNumber" placeholder="请输入要删除商品id" />
          <input class="fl" type="button" value="删除" @click="del" />
        </div>
        <div class="add-goods">
          <router-link :to="{path: '/addGoods', query:{who: 'home'}}">
            <input type="button" value="添加商品" />
          </router-link>
        </div>
      </div>
      <div class="goods-box">
        <ul class="clearFix">
          <li v-for="item in goodsList" class="fl">
            <div>
              <h3>{{item.title}}</h3>
              <router-link :to="{path:'/detail',query:{id:item.id,who: 'home'}}">
                <img :src="item.img" alt="">
              </router-link>
              <p> 单价:{{item.price}}元</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import Event from 'common/js/bus.js'
  import Header from 'components/header/Header'

  export default {
    name: 'home',
    data () {
      return {
        logoState: true,
        delNumber: -1,
        goodsList:[],
        goodsIdArr:[],
        headerData: {
          "text": '首页'
        }
      }
    },
    components: {
      'my-header': Header
    },
    created() {
      this.getGoods();
      this.getServerTime();
    },
    mounted() {
      setTimeout(()=>{
        this.logoState = false;
      },3000);
      Event.$on('update',(id) => {
        console.log('新增商品的id：'+id);
        this.getGoods();
      });
    },
    computed: {
      ...mapGetters({
        timeNow: 'timeNow'
      })
    },
    beforeDestory(){
      Event.$off("update");
    },
    methods: {
      ...mapActions({
        getTime: 'getTime'
      }),
      getGoods () {
        this.$http({
          method: 'GET',
          url: '/goods/',
          timeout: 5000
        }).then((res) => {
          this.goodsIdArr = [];
          this.goodsList = res.data.body;
          for (let i=0;i<this.goodsList.length;i++){
            this.goodsIdArr.push(this.goodsList[i].id);
          }
        }, (err) => {
          console.log(err)
        })
      },
      del () {
        console.log('删除:'+this.delNumber);
        if(this.delNumber !== -1){
          this.$http({
            method: 'DELETE',
            url: '/goods/'+ this.delNumber,
            timeout: 5000
          }).then((res) => {
            if(res.data.code ==0 ){
              this.getGoods();
            }
          }, (err) => {
            console.log(err)
          })
        }
      },
      getServerTime () {
        if(this.timeNow == '00:00'){
          this.$http.jsonp(
            'http://api.k780.com/?app=life.time&appkey=26779&sign=1b91ca19ffb32d2d84c85315b289588b&format=json&jsoncallback=data',
            {
              credentials: true,
              jsonp: 'callback',
              jsonpCallback: 'data'
            })
            .then((res) => {
              if (res.data.success === '1') {
                let times = res.data.result.timestamp;
                this.getTime(times)
              }
            }, (err) => {
              console.log('错误了:' + err)
            })
        }
      }
    }
  }
</script>

<style type="text/css" rel="stylesheet/scss" scoped lang="scss">
  .home{
    width: 100%;
    height: 100%;
    overflow: hidden;

    .logo{
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1001;
      width: 100%;
      height: 100%;
      background: url("../../../static/images/logo.jpg") no-repeat 0 0;
      background-color: #fff;
      background-size: contain;
    }
    .content{
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      box-sizing: border-box;
      background-color: antiquewhite;
      padding-top: .4rem;
    }

    .goods-box{
      width: calc(100% - 0.1rem);
      padding: 0 0.05rem;

      ul {
        padding-bottom: .4rem;
        li{
          width: calc(50% - 0.1rem);
          /*border: 1px solid #000;*/
          background-color: #fff;
          margin: 0.05rem;
          padding-top: 0.2rem;
          box-sizing: border-box;

          img{
            width: 100%;
            height: 1.5rem;
          }

          h3{
            text-align: center;
            font-size: 0.2rem;
            color: #333;
          }

          p{
            text-align: center;
            font-size: 0.16rem;
            color: #999;
          }
        }
        li:nth-child(2n+0){
          border-left: none;
        }
      }
    }
    .del{
      padding: .1rem .16rem;

      .top h1{
        margin: 0.1rem;
        font-size: .16rem;
      }
      .top p{
        font-size: 0.16rem;
        color: #000;
        span{
          color: #f00;
        }
      }
      .top b{
        font-size: .25rem;
        color: #f00;
      }

      .bottom {
        margin-top: 0.1rem;
        background-color: pink;
        input{
          height: .3rem;
        }

        input[type=button]{
          width: .5rem;
          margin-left: 0.4rem;
        }
      }

      .add-goods{
        width: 100%;
        text-align: center;
        margin-top: 0.1rem;

        input{
          font-size: 0.2rem;
          padding: 0.04rem;
          background-color: lawngreen;
        }
      }
    }

  }
</style>
