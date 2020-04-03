<template>
    <div>
        <Header>
            <router-link to="/cinema" slot="left" class="h_city">
                <i class="iconfont icon-left icon22"></i>
            </router-link>
            <div slot="content" class="content">
                影院详情
            </div>
        </Header>
        <div class="wrapper_nofoot">
            <div class="scroll">
                <div class="body-wrap">
                    <div class="cinema-wrap">
                        <div class="cinema-block">
                            <div class="crumbs-nav">
                                <router-link to="/home">鼠眼电影</router-link>
                                >
                                <span>{{cinameinfo.cinemaData&&cinameinfo.cinemaData.nm}}</span>
                            </div>
                            <div class="cinema-info">
                                <div class="title one-line">{{cinameinfo.cinemaData&&cinameinfo.cinemaData.nm}}</div>
                                <div class="location one-line">{{cinameinfo.cinemaData&&cinameinfo.cinemaData.addr}}</div>
                                <div class="location-icon iconfont icon-location"></div>
                            </div>
                        </div>
                    </div>
                    <div class="tuan-wrap" v-if="cinameinfo.dealList && cinameinfo.dealList.divideDealList">
                        <div style="height: 10px; background-color: #f0f0f0;"></div>
                        <div class="tuan-list">
                            <div class="tuan-title">影院超值套餐</div>
                            <div  v-for="(item,index) in cinameinfo.dealList.divideDealList" :key="index">
                                <div class="tuan-item" v-for="(datalist,index) in item.dealList" :key="index">
                                    <img :src="datalist.imageUrl | imgs" alt="">
                                    <div class="item-info">
                                        <div class="title">
                                            <span>{{datalist.titleTag}}</span>{{datalist.title}}
                                        </div>
                                        <div class="sell-num">{{datalist.curNumberDesc}}</div>
                                        <div class="price">
                                            <span class="sell-price"><span>￥</span>{{datalist.price}}</span>
                                        </div>
                                        <div class="buy-btn" @click="onSubmitOrder(datalist)">去购买</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="related-cinemas-wrap">
                            <div style="height: 10px; background-color: #f0f0f0;"></div>
                            <div class="related-cinemas-list">
                                <div class="related-cinemas-title">相关影院</div>
                                <p><router-link class="related-cinema-item" to="/cinemainfo/179">大兴影剧院</router-link></p>
                                <p><router-link class="related-cinema-item" to="/cinemainfo/107">中影国际影城（昌平永旺店）</router-link></p>
                                <p><router-link class="related-cinema-item" to="/cinemainfo/2603">保利国际影城（华贸天地店）</router-link></p>
                                <p><router-link class="related-cinema-item" to="/cinemainfo/141">海淀工人文化宫</router-link></p>
                                <p><router-link class="related-cinema-item" to="/cinemainfo/145">良乡影剧院</router-link></p>
                                <p><router-link class="related-cinema-item" to="/cinemainfo/180">顺义影剧院</router-link></p>
                                <p><router-link class="related-cinema-item" to="/cinemainfo/236">劲松电影院</router-link></p>
                                <p><router-link class="related-cinema-item" to="/cinemainfo/242">东宫影剧院</router-link></p>
                                <p><router-link class="related-cinema-item" to="/cinemainfo/256">金鸡百花影城</router-link></p>
                                <p><router-link class="related-cinema-item" to="/cinemainfo/7634">中影国际影城（丰台千禧街店）</router-link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import Header from '../../components/Header'
import { reqCinemasInfo } from '../../api'
import BScroll from 'better-scroll'
export default {
    data(){
        return {
            cinameinfo:{},
        }
    },
    methods:{
        async getCinameInfo(callback){
            Indicator.open('Loading...');
            const result = await reqCinemasInfo(this.$route.params.id);
            if(result){
                Indicator.close();
                this.cinameinfo = result;
                callback&&callback();
            }
        },
        onSubmitOrder(item){
            let {dealId,promotionId,price,category} = item
            let {cinemaId,channelId} = this.cinameinfo
            let data = JSON.stringify({
                dealId,
                promotionId,
                price,
                category,
                cinemaId,
                channelId
            })
            this.$router.push('/submitorder/'+encodeURIComponent(data));
        },
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
        this.getCinameInfo(()=>{
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
    },
}
</script>

<style lang="less">
    .scroll{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .body-wrap{
        font-size: 16px;
        margin-bottom: 25px;
        .cinema-wrap{
            background-color: #ffffff;
            .cinema-block{
                .crumbs-nav {
                    padding: 10px 0 0 15px;
                    color: #777;
                    a,span{
                        font-size: 14px;
                        color: inherit;
                        display: inline;
                    }
                }
                .cinema-info{
                    position: relative;
                    padding: 15px;
                    padding-right: 100px;
                    .title{
                        font-size: 17px;
                        line-height: 24px;
                        font-weight: 700;
                        color: #333;
                    }
                    .location{
                        margin-top: 2px;
                        font-size: 13px;
                        line-height: 18.5px;
                        color: #999;
                    }
                    .location-icon{
                        position: absolute;
                        right: 0;
                        top: 50%;
                        width: 70px;
                        color: #9DCDFF;
                        height: 31px;
                        font-size: 22px;
                        transform: translateY(-50%);
                        border-left: 1px solid #d8d8d8;
                        text-align: center;
                    }
                }
            }
        }
        .tuan-wrap{
            background-color: #fff;
            .tuan-list{
                position: relative;
                margin: 0 0 0 15px;
                .tuan-title{
                    line-height: 45px;
                    height: 45px;
                    font-size: 15px;
                    color: #666;
                    border-bottom: 1px solid #f0f0f0;
                }
                .tuan-item{
                    cursor: pointer;
                    position: relative;
                    width: 100%;
                    padding: 13px 0;
                    overflow: hidden;
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
        .related-cinemas-wrap{
            background-color: #fff;
            .related-cinemas-list{
                position: relative;
                margin: 0 15px;
                padding-bottom: 15px;
                .related-cinemas-title{
                    line-height: 45px;
                    height: 45px;
                    font-size: 15px;
                    color: #666;
                    a{
                        font-size: 15px;
                        color: #666;
                        margin-right: 5px;
                    }
                }
            }
        }
    }
</style>