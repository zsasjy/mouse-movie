<template>
    <div>
        <Header>
            <div slot="content" class="content">
                我的
            </div>
            <router-link to="/setting" slot="right" class="h_right">
                <i class="iconfont icon-shezhi icon22"></i>
            </router-link>
        </Header>
        <div class="wrapper bgf5">
            <div class="login_state">
                <div class="ls_wrap">
                    <div class="head_img">
                        <img v-if="!$store.state.user" src="http://www.cpnic.com/UploadFiles/img_3_1896319479_3251814844_26.jpg" alt="">
                        <img v-if="$store.state.user" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585553481143&di=9e5b2ba5a57d3e42d09628e2e9ccb606&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F20%2F20180220165946_RiGPS.thumb.700_0.jpeg" alt="">
                    </div>
                    <div class="user_msg">
                        {{$store.state.user?$store.state.user.username:"未登录"}}
                    </div>
                </div>
            </div>
            <div class="order" v-if="$store.state.user">
                <div class="order_title">
                    我的订单
                </div>
                <div class="order_item">
                    <div class="scroll">
                        <div class="tuan-list">
                            <div class="tuan-item" v-for="(item,index) in $store.state.user.order" :key="index">
                                <img :src="item.imageUrl" alt="">
                                <div class="item-info">
                                    <div class="title">
                                        <span>{{item.titleTag}}</span>{{item.title}}
                                    </div>
                                    <div class="sell-num">{{item.curNumberDesc}}</div>
                                    <div class="price">
                                        <span class="sell-price"><span>￥</span>{{item.originPrice}}</span>
                                        <i style="color:#888;font-size:12px;font-style:normal">&nbsp;&nbsp;&nbsp;&nbsp;x{{item.quantity}}</i>
                                        <span class="payok">已支付</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../../components/Header'
import BScroll from 'better-scroll'
export default {
    components:{
        Header
    },
    filters:{
        imgs(value){
            if(value.split("http://p0.meituan.net/w.h/")[1]){
                return `https://p0.meituan.net/128.180/${value.split("http://p0.meituan.net/w.h/")[1]}`
            }else if(value.split("http://p1.meituan.net/w.h/")[1]){
                return `https://p1.meituan.net/128.180/${value.split("http://p1.meituan.net/w.h/")[1]}`
            }
        }
    },
    mounted(){
        this.$store.user?new BScroll('.order_item',{
            scrollY:true,
            click:true
        }):""
    },
    methods:{
        showSetting(){
            
        }
    }
}
</script>

<style lang="less">
    .bgf5{
        background-color: #f0f0f0;
    }
    .login_state{
        width: 100%;
        font-size: 16px;
        height: 120px;
        background-image: linear-gradient(#FF7F50,#FF7F50,#FF7F50);
        z-index: 999;
        .ls_wrap{
            height: 100px;
            padding: 20px 30px;
            color: #ffffff;
            display: flex;
            align-content: center;
            .head_img{
                width: 60px;
                height: 60px;
                border-radius: 50%;
                overflow: hidden;
                background-color: #ffffff;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .user_msg{
                height: 60px;
                line-height: 60px;
                margin-left: 20px;
            }
        }
    }
    .order{
        width: 100%;
        font-size: 16px;
        z-index: 999;
        .order_title{
            font-size: 14px;
            color: #333;
            padding: 10px;
            background-color: #fff;
            margin: 10px 0;
        }
        .order_item{
            width: 100%;
            padding:10px;
            position: relative;
            top: 0;
            left: 0;
            .scroll{
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background-color: #fff;
            }
            .tuan-list{
                position: relative;
                margin: 0 0 0 15px;
                .tuan-item{
                    cursor: pointer;
                    position: relative;
                    width: 100%;
                    padding: 13px 0;
                    overflow: hidden;
                    border-bottom: 1px solid #eeeeee;
                    z-index: 1;
                    &:last-child{
                        border: none;
                    }
                    img{
                        float: left;
                        display: block;
                        width: 92px;
                        height: 92px;
                    }
                    .item-info{
                        position: relative;
                        margin: 0 15px 0 102px;
                        height: 92px;
                        overflow: hidden;
                        .title{
                            font-size: 14px;
                            line-height: 18px;
                            color: #333;
                            display: -webkit-box;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            span{
                                display: inline-block;
                                vertical-align: top;
                                margin-top: 1px;
                                margin-right: 7px;
                                padding: 0 4px;
                                font-size: 10px;
                                line-height: 15px;
                                height: 15px;
                                background: #f90;
                                border-radius: 2px;
                                color: #fff;
                            }
                        }
                        .sell-num{
                            display: inline-block;
                            position: absolute;
                            bottom: 34px;
                            right: 0;
                            line-height: 16px;
                            height: 16px;
                            font-size: 12px;
                            color: #999;
                        }
                        .price{
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            .sell-price{
                                span{
                                    font-size: 14px;
                                }
                                font-size: 17px;
                                color: #f03d37;
                                display: inline-block;
                            }
                            .payok{
                                margin-left: 7px;
                                color: #888;
                                font-size: 14px;
                            }
                        }
                        .buy-btn{
                            position: absolute;
                            right: 0;
                            bottom: 0;
                            display: inline-block;
                            padding: 0 8px;
                            height: 27px;
                            line-height: 27px;
                            font-size: 12px;
                            border-radius: 3px;
                            color: #fff;
                            background-color: #FF7F50;
                        }
                    }
                }
            }
        }
    }
</style>