<template>
    <div class="card_detail">
        <Header> 
            <router-link to="/multiplecard/list" slot="left" class="h_city">
                <i class="iconfont icon-left icon22"></i>
            </router-link>
            <div slot="content" class="content">
                会员卡详情页
            </div>
        </Header>
        <div class="wrapper_nofoot detail_wrapper">
            <div class="scroll">
                <div class="scroll_content">
                    <div class="card_list" style="padding-bottom:0px">
                        <div class="member-card" :style="{backgroundColor:cardInfo.color?cardInfo.color:'#3273C2'}">
                            <img class="card-avatar img" :src="cardInfo.icon" alt="">
                            <div class="card-desc">
                                <div>
                                    <h2>{{cardInfo.title}}</h2>
                                    <p>{{cardInfo.effective}}</p>
                                </div>
                            </div>
                            <div class="card-footer clearfix">
                                <div class="card-save-count"><span class="iconfont icon-gantanhao"></span>{{cardInfo.desc}}</div>
                                <div class="card-status">售价:￥{{cardInfo.price}}</div>
                            </div>
                            <div class="instruction"><span class="iconfont icon-gantanhao" style="vertical-align: middle;margin-right:3px"></span>使用说明</div>
                        </div>
                    </div>
                    <div class="card_info">
                        <div class="card_notice">
                            <span>首单特惠</span>
                            <span>首单2张立减4.0元</span>
                        </div>
                    </div>
                    <div class="card_tips">
                        <div>
                            <h2>购票优惠</h2>
                            <div class="card_tips_list">
                                <div class="card_tips_item">
                                    <img src="//p1.meituan.net/movie/8a3aa6b113694a653b29e30831832fe82893.png.webp" class="img right-icon" alt="">
                                    <div class="desc">
                                        <div class="card_tips_desc">购票享超值会员价</div>
                                        <div class="card_tips_subdesc">有效期内，在会员卡支持影院购票可享优惠价；享受会员卡优惠的场次及价格动态变化，优惠幅度由影院决定；每天限购2张会员票，超出后需以非优惠价格购买</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card_tips cinema_tips">
                        <h2>支持影院</h2>
                        <h3>
                            <span class="city-name"><i class="iconfont icon-location" style="vertical-align: middle;margin-right:.1rem"></i>廊坊</span>
                            <span>{{cardInfo.place.length}}家, 全国{{cardInfo.place.length}}家</span>
                        </h3>
                    </div>
                    <div class="cinema">
                        <div class="cinema-list">
                            <div class="cinema-item" v-for="(item,index) in cardInfo.place" :key="index">
                                <h3 class="cinema-name">{{item.title}}</h3>
                                <div class="cinema-location">
                                    <span>{{item.details}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-law" v-if="cardInfo.status">
                        <span>开卡即同意</span>
                        <a style="text-decoration: underline">《鼠眼影城卡协议》</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="footerpay" v-if="cardInfo.status">
            <div class="pay" @click="openCard">
                {{cardInfo.price}}元立即开卡
            </div>
        </div>
        <div class="footerpay" v-if="!cardInfo.status">
            <div class="pay" @click="closeCard">
                注销此卡
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../../../components/Header'
import BScroll from 'better-scroll'
import { Indicator,Toast,MessageBox  } from 'mint-ui';
import '../index.less'
export default {
    data(){
        return{
            cardInfo:{}
        }
    },
    created(){
        for(let i in this.$store.state.cardData){
            if(this.$store.state.cardData[i].title === this.$route.params.id){
                this.cardInfo = this.$store.state.cardData[i]
            }
        }
    },
    mounted(){
        new BScroll('.scroll', {
            scrollY: true,
            click: true
        });
    },
    methods:{
        openCard(){
            Indicator.open();
            setTimeout(()=>{
                Indicator.close();
                Toast({
                    message: '购买成功',
                    position: 'middle',
                    duration: 1000
                });
                this.$store.dispatch("addHaveCard",this.cardInfo);
                this.$router.push('/cardbag');
            },1500)
        },
        closeCard(){
            MessageBox.confirm("您确定要注销该优惠卡吗？").then(() => {
                Indicator.open();
                setTimeout(()=>{
                    Indicator.close();
                    Toast({
                        message: '注销成功',
                        position: 'middle',
                        duration: 1000
                    });
                    this.$store.dispatch("delHaveCard",this.cardInfo);
                    this.$router.push('/cardbag');
                },1500)
            }).catch()
        }
    },
    components:{
        Header
    }
}
</script>

<style lang="less">
    .detail_wrapper{
        bottom: 1.3rem;
        font-size: 16px;
        background-color: #f5f5f5;
    }
    .card_detail{
        .scroll{
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            
            .scroll_content{
                .card_info{
                    background-color: #fff;
                    margin: .2rem 0;
                    border-top: 1px solid #e6e6e6;
                    border-bottom: 1px solid #e6e6e6;
                    padding-left: .3rem;
                    padding-right: .3rem;
                    border-top: 0;
                    margin-top: 0;
                    padding-bottom: .4rem;
                    .card_notice{
                        color: #999;
                        padding-top: .4rem;
                        font-size: .28rem;
                        font-family: PingFangSC-Regular;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        span{
                            &:first-child{
                                margin-right: .1rem;
                                padding: 0 .08rem;
                                font-size: .24rem;
                                border: 1px solid #FF9900;
                                border-radius: .04rem;
                                color: #FF9900;
                            }
                        }
                    }
                }
                .card_tips{
                    background-color: #fff;
                    margin: .2rem 0;
                    border-top: 1px solid #e6e6e6;
                    border-bottom: 1px solid #e6e6e6;
                    padding-left: .3rem;
                    padding-right: .3rem;
                    padding-top: .6rem;
                    .right-icon{
                        vertical-align: top;
                        margin-top: .1rem;
                        float: left;
                        width: .6rem;
                        height: .6rem;
                    }
                    h2{
                        margin: 0;
                        line-height: .48rem;
                        font-size: .34rem;
                        text-align: center;
                        color: #333;
                        font-weight: normal;
                        &::before{
                            content: '';
                            display: inline-block;
                            margin-right: .18rem;
                            height: .02rem;
                            vertical-align: middle;
                            border: .01rem solid #ccc;
                            border-width: 0 .28rem;
                        }
                        &::after{
                            content: '';
                            display: inline-block;
                            margin-left: .18rem;
                            height: .02rem;
                            vertical-align: middle;
                            border: .01rem solid #ccc;
                            border-width: 0 .28rem;
                        }
                    }
                    .card_tips_list{
                        padding-top: .4rem;
                        .card_tips_item{
                            margin-bottom: .6rem;
                            .desc{
                                display: table-cell;
                                width: 100%;
                                padding-left: .25rem;
                                .card_tips_desc{
                                    color: #333;
                                    font-size: .3rem;
                                    margin-bottom: 0.04rem;
                                }
                                .card_tips_subdesc{
                                    font-size: .26rem;
                                    color: #999;
                                }
                            }
                        }
                    }
                }
                .cinema_tips{
                    padding-top: .4rem;
                    padding-bottom: .4rem;
                    margin-bottom: 0;
                    h3{
                        margin: 0;
                        font-weight: normal;
                        font-size: .26rem;
                        color: #999;
                        text-align: center;
                        
                    }
                }
                .cinema{
                    border-bottom: 1px solid #e6e6e6;
                    .cinema-list{
                        background: #fff;
                        padding-left: .3rem;
                        .cinema-item{
                            display: block;
                            position: relative;
                            padding: .3rem .3rem .3rem 0;
                            border-bottom: 1px solid #e6e6e6;
                            .cinema-name {
                                font-size: .3rem;
                                color: #333;
                                font-weight: normal;
                                margin: 0;
                                margin-bottom: .04rem;
                            }
                            .cinema-location {
                                display: flex;
                                font-size: .26rem;
                                color: #999;
                                height: .37rem;
                                line-height: .37rem;
                                span{
                                    &:first-child {
                                        display: inline-block;
                                        -webkit-box-flex: 1;
                                        -ms-flex-positive: 1;
                                        flex-grow: 1;
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                    }
                                }

                            }
                        }
                    }
                }
                .card-law {
                    margin-top: .2rem;
                    padding: 0 .3rem;
                    height: 1.17rem;
                    line-height: 1.17rem;
                    background-color: #fff;
                    color: #999;
                    font-size: .26rem;
                    font-family: PingFangSC-Regular;
                    text-align: center;
                }
            }
            
        }
    }
    .footerpay{
        width: 100%;
        height: 1.3rem;
        background-color: #ffffff;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        box-sizing: border-box;
        .pay{
            height: .9rem;
            margin: .2rem .3rem;
            background-color: coral;
            border-radius: .08rem;
            text-align: center;
            color: #fff;
            font-family: PingFangSC-Regular;
            font-size: .32rem;
            letter-spacing: .02rem;
            text-align: center;
            line-height: .9rem;
        }
    }
</style>