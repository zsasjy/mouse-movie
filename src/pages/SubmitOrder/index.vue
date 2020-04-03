<template>
    <div>
        <Header>
            <router-link to="/cinema" slot="left" class="h_city">
                <i class="iconfont icon-left icon22"></i>
            </router-link>
            <div slot="content" class="content">
                确认订单
            </div>
        </Header>
        <div class="wrapper_nofoot" style="background-color:#f0f0f0">
            <div class="scroll">
                <div class="body-wrapper">
                    <div class="deal-info">
                        <div class="deal-info-image">
                            <img :src="orderInfo.imageUrl" alt="">
                        </div>
                        <div>
                            <h1>
                                <span class="hot-tag">{{orderInfo.titleTag}}</span>{{orderInfo.title}}
                            </h1>
                            <div class="text-info">
                                <p v-for="(item,index) in orderInfo.validTime" :key="index">
                                    {{item.title}}：{{item.content}}
                                </p>
                            </div>
                            <p class="price-area">
                                <em>{{orderInfo.originPrice}}元 </em>
                                <del>{{orderInfo.value}}元</del>
                            </p>
                        </div>
                    </div>
                    <div class="list">
                        <div class="info">
                            <h6>套餐详情</h6>
                            <div class="list" v-for="(menus,index) in orderInfo.menus" :key="index">
                                <div class="detail-group" v-for="(item,index) in menus.items" :key="index">
                                    <span class="left">{{item.name}}</span>
                                    <span class="middle">{{item.amount}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="list">
                        <div class="kv-line-r">
                            <h6>数量</h6>
                            <div class="kv-v">
                                <div class="stepper">
                                    <button class="btn btn-weak minus" :disabled="pricePackage.quantity===1?'disabled':false" @click="reduction">-</button>
                                    <input class="mt number" min="1" max="500" v-model="pricePackage.quantity" type="number">
                                    <button class="btn btn-weak plus" @click="increase">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="list">
                        <div class="kv-line-r">
                            <h6 style="line-height:0.3rem">提示信息</h6>
                        </div>
                        <div class="info linetop" v-for="(item,index) in orderInfo.promptInfo" :key="index">
                            <div class="deal-term">{{item}}</div>
                        </div>
                    </div>
                    <div class="list">
                        <div class="btn-wrapper">
                            <span>手机号</span>
                            <input type="tel" class="input-weak" placeholder="请填写正确的手机号" v-model="phone">
                        </div>
                    </div>
                    <div class="btn-wrapper deal-fix-btn">
                        <div class="deal-tags">
                            <ul class="deal-tags-list">
                                <li class="color-ok">
                                    <i class="iconfont icon-icok"></i>
                                    <span>随时可退</span>
                                </li>
                            </ul>
                            <ul class="deal-total">
                                <div class="reduce-block" v-if="pricePackage.allReducePay === '0.00'?false:true">
                                    <span>已减</span>
                                    <span class="money">￥</span>
                                    <span class="num">{{pricePackage.allReducePay}}</span>
                                </div>
                                <div class="total-block">
                                    <span class="pay">小计</span>
                                    <span class="money totalm">￥</span>
                                    <span class="num totaln">{{finallyPrice}}</span>
                                </div> 
                            </ul>
                        </div>
                        <button class="oksubmit" @click="addOrderList">确认支付</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reqDealGoodsPrice} from '../../api'
import { Indicator,Toast } from 'mint-ui';
import Header from '../../components/Header'
import BScroll from 'better-scroll'
export default {
    data(){
        return{
            orderInfo:{},
            pricePackage:{},
            phone:this.$store.state.user.phone,
            reduce:""
        }
    },
    computed:{
        finallyPrice(){
            return (this.pricePackage.quantity * ((this.pricePackage.allNeedPay / 1)*10))/10 || 0
        },
    },
    methods:{
        async initOrder(callback){
            const data = JSON.parse(decodeURIComponent(this.$route.params.id))
            const result = await reqDealGoodsPrice({...data});
            if(result){
                this.orderInfo = result.data.dealBrief
                this.pricePackage = result.data.pricePackage
                callback&&callback();
            }
        },
        reduction(){
            if(this.pricePackage.quantity<=1){
                return 
            }
            this.pricePackage.quantity -= 1;
        },
        increase(){
            this.pricePackage.quantity += 1;
        },
        addOrderList(){
            Indicator.open("支付中...")
            setTimeout(()=>{
                Indicator.close();
                Toast({
                    message: '支付成功',
                    iconClass: 'iconfont icon-duihao',
                    duration:500
                });
                let orderItem = Object.assign({},this.orderInfo,this.pricePackage);
                this.$store.dispatch('addOrder',orderItem)
                this.$router.push('/cinema')
            },800)
        }
    },
    mounted(){
        this.initOrder(()=>{
            this.$nextTick(() => { // 列表数据更新显示后执行
                new BScroll('.wrapper_nofoot', {
                    scrollY: true,
                    click: true
                })
            })
        }); 
    },
    components:{
        Header
    }
}
</script>

<style lang="less">
    .scroll{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
    }
    .body-wrapper{
        font-size: .26rem;
        .deal-info {
            background-color: #ffffff;
            color: #999;
            position: relative;
            width: 100%;
            background-color: #fff;
            padding: .29rem .2rem;
            .deal-info-image {
                width: 1.5rem;
                height: 1.64rem;
                min-height: 2.5rem;
                text-align: center;
                overflow: hidden;
                margin-right: .2rem;
                padding-left: .06rem;
                float: left;
                img{
                    width: 100%;
                }
            }
            h1{
                margin: 0 0 .15rem;
                font-size: .3rem;
                font-weight: 400;
                color: #333;
            }
            .hot-tag{
                font-family: PingFangSC-Regular,Hiragino Sans GB,sans-serif;
                display: inline-block;
                vertical-align: top;
                margin-right: .1rem;
                padding: .05rem .1rem 0;
                font-size: .23rem;
                line-height: .24rem;
                height: .3rem;
                background: #f90;
                border-radius: .05rem;
                color: #fff;
            }
            .price-area{
                margin-top: .1rem;
                vertical-align: top;
                em{
                    color: #f03d37;
                    font-style: normal;
                    font-size: .34rem;
                }
            }
        }
        .list{
            margin-top: .2rem;
            margin-bottom: 0;
            background-color: #fff;
            .btn-wrapper{
                padding: .28rem .2rem;
                .input-weak{
                    width: 65%;
                    border: none;
                    height: .6rem;
                    margin: -.15rem 0 -.15rem .15rem;
                    text-indent: .1rem;
                    line-height: 1;
                    font-size: .3rem;
                    border-radius: .06rem;
                    padding: 0;
                    outline: none;
                    &:focus{
                        background-color: #f5f5f5;
                    }
                }
            }
            .info{
                padding: .28rem .2rem;
                h6{
                    font-size: .28rem;
                    font-weight: 700;
                    margin-right: .2rem;
                    display: block;
                    margin-bottom: .3rem;
                }
                .detail-group{
                    font-size: .26rem;
                    display: flex;
                    color: #999;
                    justify-content: space-between;
                    margin: .2rem 0;
                }
                .deal-term{
                    margin: 0;
                    white-space: pre-wrap;
                    color: #999;
                    font-size: .26rem;
                    line-height: .42rem;
                    max-height: 100%;
                }
            }
            .linetop{
                border-top: 1px solid #f0f0f0;
            }
            .kv-line-r{
                padding: .28rem .2rem;
                display: flex;
                justify-content: space-between;
                h6{
                    flex: 1;
                    font-size: inherit;
                    margin-right: .2rem;
                    display: block;
                    font-size: .28rem;
                    font-weight: 700;
                    line-height: .7rem;
                }
                .kv-v{
                    .stepper{
                        margin-top: 3px;
                        .btn {
                            width: .6rem;
                            padding: 0;
                            font-size: .5rem;
                            line-height: .6rem;
                            font-weight: lighter;
                            text-align: center;
                            font-family: CourierNewPSMT,"Times New Roman";
                            margin: 0 .1rem;
                            vertical-align: middle;
                            &:disabled {
                                background-color: #dcdcdc;
                                color: #999;
                                border: none;
                            }
                        }
                        .btn-weak {
                            border: .02rem solid #e54847;
                            background: 0 0;
                            color: #e54847;
                        }
                        .number{
                            height: .6rem;
                            display: inline-block;
                            border-radius: .06rem;
                            line-height: .6rem;
                            width: 1.2rem;
                            border: .02rem solid #DDD8CE;
                            box-sizing: border-box;
                            vertical-align: middle;
                            text-align: center;
                            outline: 0;
                        }
                    }
                }
            }
        }
        .deal-fix-btn {
            background: #fff;
            padding: .3rem .2rem;
            margin-top:.2rem;
            .oksubmit{
                display: block;
                width: 100%;
                height: .94rem;
                line-height: .94rem;
                padding: 0 .32rem;
                border-radius: .06rem;
                color: #fff;
                border: none;
                font-size: .36rem;
                box-sizing: border-box;
                cursor: pointer;
                background-color: #f90;
            }
            .deal-tags{
                padding: 0;
                background: #fff;
                margin-bottom: .19rem;
                display: flex;
                align-items: center;
                .deal-tags-list {
                    display: inline-block;
                    flex: 1;
                    .color-ok{
                        color: #6bbd00!important;
                    }
                }
                .deal-total{
                    font-size: .26rem;
                    display: flex;
                    align-items: baseline;
                    .pay{
                        font-size: .28rem;
                        font-weight: 700;
                        margin-left: .1rem;
                    }
                }
                .money{
                    color: #33c1af;
                }
                .num{
                    color: #33c1af;
                    font-size: .28rem;
                }
                .totalm{
                    font-size: .28rem;
                }
                .totaln{
                    font-size: .42rem;
                }
            }
        }
    }
</style>