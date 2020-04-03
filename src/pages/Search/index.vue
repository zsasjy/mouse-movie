<template>
    <div class="search">
        <Header style="background-color:#f0f0f0;border-bottom:1px solid #e5e5e5">
            <div slot="content" class="search on_search">
                <form @submit.stop.prevent="addSearchTag">
                    <input type="text" v-model="search" @input="onSearch" placeholder="电影/影评/影院" autocomplete="off">
                </form>
                <i class="iconfont icon-suosou"></i>
            </div>
            <div slot="right" @click="goBack" class="h_right" style="color:#FF7F50;font-size:14px">
                取消
            </div>
        </Header>
        <div class="wrapper_nofoot" style="background-color: #f5f5f5;">
            <div class="scroll">
                <div class="tag_list" v-show="showTag">
                    <div class="tag_item" v-for="(item,index) in $store.state.searchTag" :key="index">
                        <span class="iconfont icon-shizhong icon22"></span>
                        <div class="tag_content">
                            {{item}}
                        </div>
                        <span @click="closeTagSearch(item)" class="iconfont icon-chahao icon12"></span>
                    </div>
                </div>
                <div class="result" v-if="movies.length">
                    <h3>电影/电视剧/综艺</h3>
                    <div class="list" v-for="(item,index) in movies" :key="index">
                        <div class="movie cell clearfix">
                            <img class="poster" :src="item.img" alt="">
                            <div class="info">
                                <div class="name-score">
                                    <p class="name">{{item.nm}}</p>
                                    <span class="no-score">暂无评分</span>
                                </div>
                                <div class="detail-section">
                                    <div class="detail-items">
                                        <p class="one-line">{{item.enm}}</p>
                                        <p >{{item.cat}}</p>
                                        <p >{{item.time}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="result" v-if="cinemas.length">
                    <h3>影院</h3>
                    <div class="list">
                        <div class="cinema cell" v-for="(item,index) in cinemas" :key="index">
                            <div class="info">
                                <p class="name-price">
                                    <span class="name one-line">{{item.nm}}</span>
                                    <span class="sell-price">
                                        <span class="price">{{item.sellPrice}}</span>元起
                                    </span>
                                </p>
                                <p class="address one-line">{{item.addr}}</p>
                                <p class="feature-tags">
                                    <span>座</span>
                                    <span>退</span>
                                    <span>改签</span>
                                </p>
                            </div>
                            <div class="distance">{{item.distance}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reqMovieSearch} from '../../api'
import BScroll from 'better-scroll'
import Header from '../../components/Header'
export default {
    data(){
        return {
            search:"",
            showTag:true,
            movies:[],
            cinemas:[]
        }
    },
    components:{
        Header
    },
    methods:{
        goBack(){
            this.search = "";
            this.$router.go(-1);
            this.movies = [];
            this.cinemas = [];
        },
        async onSearch(){
            if(this.search){
                this.showTag = false;
                const result = await reqMovieSearch({kw:this.search});
                if(result){
                    this.movies = result.movies?result.movies.list:[];
                    this.cinemas = result.cinemas?result.cinemas.list:[];
                    for(let i in this.movies){
                        if(this.movies[i].img.split("http://p0.meituan.net/w.h/")[1]){
                            this.movies[i].img = `https://p0.meituan.net/128.180/${this.movies[i].img.split("http://p0.meituan.net/w.h/")[1]}`
                        }else if(this.movies[i].img.split("http://p1.meituan.net/w.h/")[1]){
                            this.movies[i].img = `https://p1.meituan.net/128.180/${this.movies[i].img.split("http://p1.meituan.net/w.h/")[1]}`
                        }
                    }
                }
            }
            if(this.search === ""){
                this.movies = [];
                this.cinemas = [];
                this.showTag = true;
            }
        },
        addSearchTag(){
            if(this.search){
                this.$store.dispatch("addSearchTag",this.search)
            }
        },
        closeTagSearch(val){
            this.$store.dispatch("delSearchTag",val)
        }
    },
    mounted(){
        new BScroll('.wrapper_nofoot', {
            scrollY: true,
            click: true
        });
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
    .search{
        font-size: 16px;
        .tag_list{
            background-color: #ffffff;
            .tag_item{
                margin-left: 15px;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #e5e5e5;
                line-height: 44px;
                align-items: center;
                color: #DDDDDD;
                &:last-child{
                    border: none;
                }
                span{
                    vertical-align: middle;
                    &:first-child{
                        margin-right: 10px;
                    }
                    &:last-child{
                        align-self: center;
                        padding: 0 15px;
                        flex: 0 0 auto;
                    }
                }
                .tag_content{
                    color: #333;
                    font-size: 15px;
                    -webkit-box-flex: 1;
                    flex: 1 1 auto;
                    display: inline-block;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
        .result{
            margin-bottom: 10px;
            background-color: #fff;
            h3{
                font-size: 15px;
                color: #999;
                padding: 9px 15px;
            }
            .list{
                padding-left: 15px;
                border-top: 1px solid #e6e6e6;
                border-bottom: 1px solid #e6e6e6;
            }
            .movie{
                padding: 12px 0;
                min-height: 90px;
                .poster{
                    display: block;
                    background-color: #eee;
                    width: 64px;
                    height: 90px;
                    float: left;
                    margin-right: 10px;
                }
                .info{
                    margin-right: 15px;
                    margin-top: 1px;
                    .name-score{
                        font-size: 16px;
                        color: #222;
                        display: flex;
                        -webkit-box-pack: justify;
                        justify-content: space-between;
                        margin-bottom: 2px;
                        .name{
                            display: flex;
                            align-items: center;
                            font-weight: 700;
                            font-size: 17px;
                            flex-grow: 1;
                            max-height: 24px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .no-score{
                            font-size: 14px;
                            color: #666;
                            flex-shrink: 0;
                        }
                    }
                    .detail-section{
                        position: relative;
                        .detail-items{
                            flex-grow: 1;
                            overflow: hidden;
                            padding-right: 10px;
                            margin-right: 48px;
                            min-height: 27px;
                            p{
                                font-size: 13px;
                                color: #666;
                                margin-top: 2px;
                            }
                        }
                    }
                    
                }
            }
            .cinema{
                display: flex;
                -webkit-box-align: center;
                align-items: center;
                -webkit-box-pack: justify;
                justify-content: space-between;
                padding: 15px 15px 15px 0;
                .info{
                    flex: 1;
                    overflow: hidden;
                    .price{
                        font-size: 17px;
                        color: #ef4238;
                    }
                    .name-price{
                        font-size: 16px;
                        color: #000;
                        margin-bottom: 6px;
                        display: flex;
                    }
                    .sell-price{
                        font-size: 11px;
                        color: #999;
                        white-space: nowrap;
                        margin-left: 10px;
                    }
                    .address{
                        font-size: 13px;
                        color: #999;
                    }
                }
                .distance{
                    font-size: 13px;
                    color: #999;
                }
                .feature-tags {
                    margin-top: 7px;
                    span{
                        border: 1px solid #589daf;
                        color: #589daf;
                        position: relative;
                        display: inline-block;
                        padding: 0 3px;
                        margin-right: 5px;
                        height: 18px;
                        line-height: 15px;
                        border-radius: 2px;
                        font-size: .04rem;
                    }
                }
            }
            .cell{
                border-bottom: 1px solid #e6e6e6;
            }
        }
    }
</style>