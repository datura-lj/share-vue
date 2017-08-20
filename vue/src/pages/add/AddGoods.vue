<template>
  <div class="add-goods">
    <my-header :headerData="headerData"></my-header>
    <div class="form">
      <div class="goods-title">
        <span>
          商品名称：
        </span>
        <input type="text" placeholder="请输入商品名称" v-model="addGoodsMsg.title"/>
      </div>
      <div class="goods-price">
        <span>
          商品价格：
        </span>
        <input type="text" placeholder="请输入商品价格" v-model="addGoodsMsg.price" />
      </div>
      <div class="goods-img">
        <span>
          图片地址：
        </span>
        <input type="text" placeholder="请输入商品图片地址" v-model="addGoodsMsg.img" />
      </div>
    </div>
    <input type="button" class="add-sure" value="确认添加" @click="addGoods" />
  </div>
</template>

<script type="text/ecmascript-6">
  import Event from 'common/js/bus.js'
  import Header from 'components/header/Header'

  export default {
    name: 'addGoods',
    data() {
      return {
        headerData: {
          "text": '添加商品'
        },
        addGoodsMsg:{
          "title": '无标题',
          "price": 0.00,
          "img": 'http://img1.imgtn.bdimg.com/it/u=1057601304,2646654295&fm=26&gp=0.jpg'
        }
      }
    },
    components: {
      'my-header': Header
    },
    methods: {
      add() {
        this.$http.post('api/goods/',{
          "price": this.addGoodsMsg.price,
          "title": this.addGoodsMsg.title,
          "img": this.addGoodsMsg.img
        },{

        }).then((res) => {
          const goodsId = res.body.body.id;
          if(res.body.code === 0) {
            Event.$emit('update',goodsId);
            console.log('添加商品成功');
          }
        }, (err) => {
          console.log(err)
        })
      },
      addGoods() {
        this.add();
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css" rel="stylesheet/scss">
  .add-goods{
    padding: 0.5rem .16rem;
    font-size: 0.25rem;

    .form {
      span{
        height: 0.25rem;
        display: inline-block;
        background-color: antiquewhite;
        padding: 0.04rem;
        font-size: 0.25rem;
        margin-top: 0.1rem;
      }
      input{
        height: 0.3rem;
        font-size: 0.15rem;
      }
    }
    .add-sure{
      margin-top: 0.3rem;
      width: 100%;
      font-size: 0.3rem;
      color: green;
      font-weight: 600;
      border-radius: 8px;
      height: 0.5rem;
    }
  }
</style>
