<template>
    <div>
        <Header> 
            <div slot="left" class="h_city" @click="goBack">
                <i class="iconfont icon-left icon22"></i>
            </div>
            <div slot="content" class="content">
                卡包
            </div>
            <div slot="right" @click="showModal" class="h_right">
                <i class="iconfont icon-gengduo icon22"></i>
            </div>
        </Header>
        <div class="wrapper_nofoot bgf5">
            <div class="addCard" v-if="cardList.length === 0?true:false">
                <span class="iconfont icon-qia" style="font-size:50px;color:#888"></span>
                <p style="font-size:12px;color:#888">暂无影院会员卡</p>
                <a @click="tomultiplecard"  class="addbtn">+ 查看本城市全部会员卡</a>
            </div>
            <div class="scroll" v-if="cardList.length === 0?false:true">
                <div class="card_list">
                    <router-link to="/multiplecard/list" class="addbtn">+ 查看本城市全部会员卡</router-link>
                    <router-link class="member-card" v-for="(item,index) in cardList" :to="`/multiplecard/detail/${item.title}`" :key="index" :style="{backgroundColor:item.color}">
                        <img class="card-avatar img" :src="item.icon" alt="">
                        <div class="card-desc">
                            <div>
                                <h2>{{item.title}}</h2>
                                <p>{{item.effective}}</p>
                            </div>
                        </div>
                        <div class="card-footer clearfix">
                            <div class="card-save-count"><span class="iconfont icon-gantanhao"></span>{{item.desc}}</div>
                            <div class="card-status">售价:{{item.price}}</div>
                        </div>
                        <div class="card-mark">折扣卡</div>
                    </router-link>
                </div>
            </div>
        </div>
        <ActionSheet :visible="visible" :onCancel="handleCancel"></ActionSheet>
    </div>
</template>

<script>
import Header from '../../components/Header'
import ActionSheet from '../../components/ActionSheet'
import BScroll from 'better-scroll'
import { Toast } from 'mint-ui'
import './index.less'
export default {
    data(){
        return{
            visible:false,
        }
    },
    computed:{
        cardList(){
            return this.$store.state.cardData.filter((item)=>{
                return item.status === false;
            })
        }
    },
    mounted(){
        new BScroll('.wrapper_nofoot', {
            scrollY: true,
            click: true
        });
    },
    methods:{
        goBack(){
            this.$router.push(`${this.$store.state.cardRoute?this.$store.state.cardRoute:'/movie'}`)
        },
        showModal(){
            this.visible = true;
        },
        handleCancel(){
            this.visible = false
        },
        tomultiplecard(){
            if(this.$store.state.user){
                this.$router.push("/multiplecard/list")
            }else{
                Toast({
                    message: '请先登录',
                    position: 'middle',
                    duration: 2000
                });
                this.$router.push("/setting")
            }
        }
    },
    components:{
        Header,
        ActionSheet
    },
}   
</script>

<style lang="less">
    .addCard{
        position: absolute;
        top:40%;
        left: 50%;
        transform: translate(-50%,-50%)!important;
        text-align: center;
        .addbtn{
            margin-top: .58rem;
            padding: .26rem;
            font-size: .28rem;
            border: 1px solid coral;
            display: block;
            background-color: #fff;
            padding: 15px;
            color: coral;
            border-radius: 5px;
        }
    }
    .scroll{
        position: absolute;
        left: 0;
        top: 0;
        overflow: hidden;
        width: 100%;
        .addbtn{
            padding: .26rem;
            font-size: .28rem;
            border: 1px solid coral;
            display: block;
            background-color: #fff;
            padding: 15px;
            color: coral;
            border-radius: 5px;
        }
    }
</style>