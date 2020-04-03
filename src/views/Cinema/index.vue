<template>
    <div>
        <Header>
            <router-link to="/citylist" slot="left" class="h_city">
                <span class="font">{{$store.state.city}} <i class="iconfont icon-down icon12"></i></span>
            </router-link>
            <div slot="content" class="content">
                影院
            </div>
            <router-link to='/search' slot="right" class="h_right">
                <i class="iconfont icon-suosou icon22"></i>
            </router-link>
        </Header>
        <div class="wrapper">
            <div class="scroll">
                <div class="list-wrap">
                    <router-link class="item" v-for="(item,index) in cinemas" :key="index" :to="`/cinemainfo/${item.id}`">
                        <div class="title one-line">{{item.nm}}</div>
                        <div class="location-block">
                            <div class="one-line">{{item.addr}}</div>
                            <div class="distance">{{item.distance}}</div>
                        </div>
                        <div class="label-block" v-if="item.tag.allowRefund||item.tag.endorse||item.tag.snack||!!item.tag.vipTag">
                            <div class="allowRefund" v-if="item.tag.allowRefund">退</div>
                            <div class="endorse" v-if="item.tag.endorse">改签</div>
                            <div class="snack" v-if="item.tag.snack">小吃</div>
                            <div class="vipTag" v-if="!!item.tag.vipTag">{{item.tag.vipTag}}</div>
                        </div>
                        <div class="discount-block" v-if="item.promotion.cardPromotionTag">
                            <div class="discount-label iconfont icon-1"></div>
                            <div class="discount-label-text">{{item.promotion.cardPromotionTag}}</div>
                        </div>
                    </router-link> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
// import {reqCinemaList} from '../../api'
import CinemaList from './cinemalist.json'
import Header from '../../components/Header'
import { Indicator } from 'mint-ui';
export default {
    data(){
        return {
            showView:false,
            cinemas:[]
        }
    },
    mounted(){
        this.getCinemaAllList(()=>{
            this.$nextTick(() => { // 列表数据更新显示后执行
                new BScroll('.wrapper', {
                    scrollY: true,
                    click: true
                })
            })
        });
    },
    methods:{
        taggerView(){
            this.showView = true;
        },
        async getCinemaAllList(callback){
            Indicator.open('Loading...');
            // const result = await reqCinemaList();
            setTimeout(()=>{
                Indicator.close();
                this.cinemas = CinemaList.cinemas;
                callback&&callback();
            },1000)
        }
    },
    components:{
        Header
    }
}
</script>

<style lang="less">
    .scroll{
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        overflow: hidden;
        font-size: 16px;
    }
    .nav-wrap{
        width: 100%;
        height: 40px;
        z-index: 10;
        background-color: #fff;
        position: relative;
        border-bottom: 1px solid #f0f0f0;
        .tab{
            display: flex;
            .item{
                flex: 1;
                text-align: center;
                line-height: 40px;
                position: relative;
                white-space: nowrap;
                overflow: hidden;
                font-size: 13px;
                text-overflow: ellipsis;
                color: #777;
                &:first-child{
                    border-right: 1px solid #f0f0f0;
                }
            }
        }
    }
    .list-wrap{
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        .item{
            display: block;
            padding: 15px;
            background-color: #fff;
            position: relative;
            overflow: hidden;
            border-bottom: 1px solid #F0F0F0;
            .title{
                height: 23px;
                line-height: 23px;
                font-size: 16px;
                color: #000;
            }
            .location-block{
                margin-top: 6px;
                font-size: 13px;
                color: #666;
                display: flex;
                justify-content: space-between;
                .flex {
                    -webkit-box-flex: 1;
                    flex: 1;
                }
                .distance{
                    margin-left: 5px;
                }
            }
            .label-block{
                height: 20px;
                line-height: 20px;
                margin-top: 4px;
                margin-bottom: 4px;
                overflow: hidden;
                font-size: 0;
                div{
                    position: relative;
                    display: inline-block;
                    padding: 0 3px;
                    height: 18px;
                    line-height: 16px;
                    border-radius: 2px;
                    font-size: .06rem;
                    margin:0 5px 0 0;
                    &.allowRefund,&.sell,&.hallType,&.endorse{
                        color: #589daf;
                        border: 1px solid #589daf;
                    }
                    &.snack,&.vipTag{
                        color: #f90;
                        border: 1px solid #f90;
                    }
                }
            }
            .discount-block{
                color: #999;
                margin-bottom: 4px;
                display: flex;
                .discount-label{
                    font-size: 20px;
                    color: #57C0F8;
                    position: relative;
                    top: -2px;
                }
                .discount-label-text{
                    margin-left: 0;
                    font-size: 11px;
                }
            }
        }
    }
</style>