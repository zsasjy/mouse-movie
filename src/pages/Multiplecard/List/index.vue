<template>
    <div>
        <Header> 
            <router-link to="/cardbag" slot="left" class="h_city">
                <i class="iconfont icon-left icon22"></i>
            </router-link>
            <div slot="content" class="content">
                影院会员卡
            </div>
            <div slot="right" @click="showModal" class="h_right">
                <i class="iconfont icon-gengduo icon22"></i>
            </div>
        </Header>
        <div class="wrapper_nofoot ">
            <div class="scroll">
                <div class="headerimg">
                    <img src="//s0.meituan.net/bs/?f=myfe/canary:/img/mc_banner.jpg" alt="">
                </div>
                <div class="card_list">
                    <router-link class="member-card" v-for="(item,index) in $store.state.cardData" :to="`/multiplecard/detail/${item.title}`" :key="index" :style="{backgroundColor:item.color?item.color:''}">
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
import Header from '../../../components/Header'   
import ActionSheet from '../../../components/ActionSheet'
import BScroll from 'better-scroll'
import '../index.less'
export default {
    data(){
        return{
            visible:false,
            
        }
    },
    methods:{
        showModal(){
            this.visible = true;
        },
        handleCancel(){
            this.visible = false
        }
    },
    mounted(){
        new BScroll('.wrapper_nofoot', {
            scrollY: true,
            click: true
        });
    },
    components:{
        Header,
        ActionSheet
    }
}
</script>

<style lang="less">

.scroll{
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    .headerimg{
        width: 100%;
        img{
            width: 100%;
        }
    }
    
}
</style>