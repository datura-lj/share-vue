<template>
  <div class="detail">
    <my-header :headerData="headerData"></my-header>
    <div class="show-goods">
      <h2>{{goodsMsg.title}}</h2>
      <img :src="goodsMsg.img" alt=""/>
      <p>价格为：{{goodsMsg.price}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/header/Header'

  export default {
    name: 'detail',
    data() {
      return {
        goodsMsg: {},
        headerData: {
          "text": '商品详情页'
        }
      }
    },
    components: {
      'my-header': Header
    },
    created() {
      const goodsId = this.$route.query.id;

      this.$http({
          method: 'GET',
          url: 'api/goods/',
          params: {
            "id": goodsId
          },
          timeout: 5000
        })
        .then((res) => {
          const data = (res.data.body)[0];
          this.goodsMsg = {};
          this.goodsMsg = {
            "title": data.title,
            "img": data.img,
            "price": data.price
          };
        }, (err) => {
          console.log(err)
        })
    }
  }
</script>

<style type="text/css" scoped lang="scss" rel="stylesheet/scss">
  .detail{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0.5rem 0.16rem;

    .show-goods{
      background-color: palegreen;
      padding: 0.1rem 0.16rem;
      text-align: center;
      h2{
        font-size: 0.25rem;
        width: 100%;
      }
      img{
        width: 100%;
      }
      p{
        font-size: 0.2rem;
        color: #666;
      }
    }
  }
</style>
