<template>
    <div>
        <Header> 
            <router-link to="/movie" slot="left" class="h_city">
                <i class="iconfont icon-left icon22"></i>
            </router-link>
            <div slot="content" class="content">
                电影详情
            </div>
            <div slot="right" @click="showModal" class="h_right">
                <i class="iconfont icon-gengduo icon22"></i>
            </div>
        </Header>
        <div class="wrapper_nofoot">
            <div class="actors">
                <div class="movie-info" style="background-color:#295566">
                    <div class="crumbs-nav">
                        <a href="/">鼠眼电影</a>
                        &nbsp;>&nbsp;
                        <span>{{movieInfo.title}}</span>
                    </div>
                    <div class="movie-info-top">
                        <div class="movie-cover">
                            <img class="img noneBg poster" width="100" height="138" :src="movieInfo.images && movieInfo.images.medium" alt="">
                            <img class="img noneBg poster-play" src="//s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/poster-play.png" alt="">
                        </div>
                        <div class="movie-desc">
                            <div class="movie-desc-top">
                                <div class="movie-cn-name"><h1>{{movieInfo.title}}</h1></div>
                                <div class="movie-en-name">{{movieInfo.original_title === movieInfo.title?'':movieInfo.original_title}}</div>
                                <div class="movie-other-info">
                                    <div class="movie-type">
                                        <span class="movie-cat">{{movieInfo.genres&&movieInfo.genres.join(" / ")}}</span>
                                    </div>
                                    <div class="actors">
                                        {{movieInfo.author}}
                                    </div>
                                    <div class="movie-show-time">
                                        <span>{{movieInfo.mainland_pubdate&&movieInfo.mainland_pubdate}}大陆上映 / 
                                            {{movieInfo.durations&&movieInfo.durations[0]}}
                                        </span>
                                        <span class="iconfont icon-right"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="btns">
                                <button class="button want-to-watch">
                                    <span class="iconfont icon-yduishoucangkongxin"></span>
                                    想看
                                </button>
                                <button class="link button btn-right watched">
                                    <span class="iconfont icon-yduishoucangkongxin"></span>
                                    看过
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="real-time">
                        <span>实时口碑</span>
                        <span>{{movieInfo.wish_count}}人想看</span>
                    </div>
                    <div class="introduction">
                        <div class="title">
                            <span>简介</span>
                            <div class="close" @click="()=>{this.expand=!this.expand}">
                                <span v-if="expand">收起<i class="iconfont icon-up"></i></span>
                                <span v-if="!expand">展开<i class="iconfont icon-down"></i></span>
                            </div>
                        </div>
                        <div class="content">
                            <p :class="expand?'':'line-clamp'">
                                {{movieInfo.summary&&movieInfo.summary}}
                            </p>
                        </div>
                    </div>
                    <div class="actors">
                        <div class="title">
                            <span>演职人员</span>
                        </div>
                        <div class="actor-list">
                            <ul ref="actor_wrap">
                                <li class="left-margin" v-for="(item,index) in movieInfo.directors" :key="`directors${index}`">
                                    <img :src="item.avatars.medium" alt="">
                                    <span class="name">{{item.name}}</span>
                                    <span class="role">导演</span>
                                </li>
                                <li class="left-margin" v-for="(item,index) in movieInfo.casts" :key="`casts${index}`">
                                    <img :src="item.avatars&&item.avatars.small" alt="">
                                    <span class="name">{{item.name}}</span>
                                    <span class="role">{{item.name_en}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="videos">
                        <div class="title">预告片/剧照</div>
                        <div class="videos-list">
                            <ul ref="photos">
                                <li class="video" v-for="(item,index) in movieInfo.photos" :key="index">
                                    <img :src="item.image" alt="">
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="discussion">
                    <div class="headers" v-if="movieInfo.popular_comments&&movieInfo.popular_comments.length===0?false:true">
                        <span class="title">短评</span>
                    </div>
                    <div class="comments" v-if="movieInfo.popular_comments&&movieInfo.popular_comments.length===0?false:true">
                        <div class="article" v-for="(item,index) in movieInfo.popular_comments" :key="`popular_comments${index}`">
                            <div>
                                <img class="noneBg avatar" :src="item.author.avatar" alt="">
                            </div>
                            <div class="right">
                                <div class="top">
                                    <div>
                                        <div class="name-box">
                                            <span class="name">{{item.author.name}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="middle">
                                    <span class="comment-content">
                                        {{item.content}}
                                    </span>
                                </div>
                                <div class="bottom">
                                    <time class="time">{{item.created_at}}</time>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="headers" v-if="movieInfo.popular_reviews&&movieInfo.popular_reviews.length===0?false:true">
                        <span class="title">影评</span>
                    </div>
                    <div class="comments" v-if="movieInfo.popular_reviews&&movieInfo.popular_reviews.length===0?false:true">
                        <div class="article" v-for="(item,index) in movieInfo.popular_reviews" :key="`popular_reviews${index}`">
                            <div>
                                <img class="noneBg avatar" :src="item.author.avatar" alt="">
                            </div>
                            <div class="right">
                                <div class="top">
                                    <div>
                                        <div class="name-box">
                                            <span class="name">{{item.author.name}}</span>
                                        </div>
                                        <div class="grade-score">
                                            {{item.title}}
                                        </div>
                                    </div>
                                </div>
                                <div class="middle">
                                    <span class="comment-content">
                                        {{item.summary}}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ActionSheet :visible="visible" :onCancel="handleCancel"></ActionSheet>
    </div>
</template>

<script>
import Header from '../../components/Header'
import ActionSheet from '../../components/ActionSheet'
import { reqMovieInfo } from '../../api'
import BScroll from 'better-scroll'
import { Indicator } from 'mint-ui';
export default {
    data(){
        return{
            visible:false,
            expand:false,
            movieInfo:{},
            phone:[]
        }
    },
    methods:{
        async getMovieInfo(callback){
            Indicator.open('加载中');
            const result = await reqMovieInfo(this.$route.params.id)
            const author = []
            if(result){
                Indicator.close();
                for(let i in result.casts){
                    author.push(result.casts[i].name)
                }
                result.author = author.join("/");
                this.movieInfo = result
                callback&&callback();
            }
        },
        
        goBack(){
            this.$router.push(`${this.$store.state.cardRoute?this.$store.state.cardRoute:'home'}`)
        },
        showModal(){
            this.visible = true;
        },
        handleCancel(){
            this.visible = false
        }
    },
    // created(){
    //     this.getMovieInfo(()=>{
    //         this.$nextTick(()=>{
    //             new BScroll('.wrapper_nofoot',{
    //                 scrollY:true,
    //                 click:true
    //             })
    //         })
    //     });
    // },
    mounted(){
        this.getMovieInfo(()=>{
            const actorlist = this.$refs.actor_wrap;
            const photolist = this.$refs.photos;
            const actorlength = this.movieInfo.directors.length + this.movieInfo.casts.length;
            const photolength = this.movieInfo.photos.length;
            const actorW = 80;
            const photoW = 140;
            actorlist.style.width = (actorW + 6) * actorlength + 'px';
            photolist.style.width = (photoW + 8) * photolength + "px";
            this.$nextTick(()=>{
                new BScroll('.wrapper_nofoot',{
                    scrollY:true,
                    click:true
                })
                new BScroll('.actor-list',{
                    scrollY:false,
                    scrollX:true,
                    click:0
                })
                new BScroll('.videos-list',{
                    scrollY:false,
                    scrollX:true,
                    click:0
                })
            })
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
        top: 0;
        left: 0;
        width: 100%;
    }
    .movie-info{
        font-size: 16px;
        padding: .42rem .32rem;
        color: #fff;
        position: relative;
        .crumbs-nav{
            margin-bottom: .3rem;
            color: #ccc;
            a{
                text-decoration: none;
                color: inherit;
            }
        }
        .movie-info-top{
            overflow: hidden;
            display: flex;
            justify-content: flex-start;
            .movie-cover{
                float: left;
                height: 2.76rem;
                width: 2rem;
                position: relative;
                flex-shrink: 0;
                .poster{
                    height: 2.76rem;
                    width: 100%;
                }
                .noneBg{
                    background-color: none;
                }
                .img{
                    border: 0;
                    display: inline-block;
                }
                .poster-play {
                    height: .6rem;
                    width: .6rem;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                }
            }
            .movie-desc{
                flex-grow: 1;
                margin-left: .24rem;
                display: flex;
                flex-flow: column;
                justify-content: space-between;
                overflow: hidden;
                .movie-desc-top{
                    display: flex;
                    flex-flow: column;
                    justify-content: flex-start;
                    flex-grow: 1;
                    .movie-cn-name{
                        font-size: .4rem;
                        width: 100%;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        font-weight: 700;
                        h1{
                            font-size: .4rem;
                            margin: 0;
                        }
                    }
                    .movie-en-name{
                        font-size: .24rem;
                        opacity: .6;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                    .movie-other-info{
                        display: flex;
                        flex-grow: 1;
                        flex-flow: column;
                        justify-content: center;
                        .movie-type{
                            font-size: .24rem;
                            display: flex;
                            align-items: center;
                            .movie-cat{
                                opacity: .6;
                            }
                        }
                        .actors{
                            opacity: .6;
                            font-size: .24rem;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                            margin: 0;
                        }
                    }
                }
                .movie-show-time{
                    span{
                        opacity: .6;
                        font-size: .24rem;
                    }
                }
            }
            .btns{
                display: flex;
                justify-content: space-between;
                .button{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: hsla(0,0%,100%,.35);
                    box-shadow: 0 0.02rem 0.08rem 0 rgba(0,0,0,.1);
                    border-radius: .08rem;
                    font-size: .28rem;
                    width: 47.61904762%;
                    height: .6rem;
                    color: #fff;
                    outline:0;     
                    border: none;
                }
            }
        }
        .real-time{
            background-color: rgba(0,0,0,.2);
            box-shadow: 0 0 0.06rem 0 hsla(0,0%,100%,.03);
            border-radius: .12rem;
            margin-top: .3rem;
            font-size: .24rem;
            padding: .2rem .24rem;
            display: flex;
            justify-content: space-between;
        }
        .introduction{
            position: relative;
            padding: .32rem 0 0;
            .title{
                display: flex;
                justify-content: space-between;
                align-items: center;
                span{
                    font-size: .3rem;
                }
                .close{
                    font-size: .1rem;
                    opacity: .6;
                    color: #fff;
                    width: 1rem;
                    span{
                        font-size: .1rem;
                        i{
                            vertical-align: middle;
                        }
                    }
                }
            }
            .content{
                font-size: .3rem;
                line-height: .52rem;
                overflow: hidden;
                .line-clamp{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    text-overflow: ellipsis;
                    word-wrap: break-word;
                    word-break: break-all;
                    overflow: hidden;
                    margin: .14rem 0;
                    text-align: justify;
                }
            }
        }
        .actors {
            margin: .36rem 0 .3rem;
            .title{
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .actor-list{
                margin-top: .22rem;
                overflow: hidden;
                ul{
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    .left-margin{
                        margin-left: .12rem;
                        flex-shrink: 0;
                        img{
                            width: 1.6rem;
                            height: 2.24rem;
                            display: block;
                            background: none;
                        }
                        .name,.role{
                            display: block;
                            font-size: .2rem;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                            width: 1.6rem;
                            text-align: center;
                        }
                        .role{
                            opacity: .4;
                        }
                    }
                }
            }
        }
        .videos {
            margin-top: .36rem;
            .title{
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .videos-list {
                margin-top: .22rem;
                ul {
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    .video{
                        flex-shrink: 0;
                        display: flex;
                        flex-flow: column;
                        justify-content: center;
                        align-items: center;
                        margin-left: .16rem;
                        img{
                            width: 2.8rem;
                            height: 1.86rem;
                        }
                    }
                }
            }
        }
        .photos {
            margin-top: .36rem;
            .title {
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .photos-list {
                margin-top: .22rem;
                ul {
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    .left-margin{
                        margin-left: .16rem;
                    }
                }
            }
        }
    }
    .discussion{
        background-color: #fff;
        border-top-left-radius: .2rem;
        border-top-right-radius: .2rem;
        overflow: hidden;
        margin-top: -.24rem;
        position: relative;
        .headers{
            display: flex;
            justify-content: space-between;
            padding: .26rem .32rem .28rem;
            .title {
                font-size: .3rem;
                color: #333;
            }
        }
        .comments{
            .article{
                padding: .3rem;
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                &:first-child{
                    padding-top: 0;
                }
                .avatar {
                    height: .68rem;
                    width: .68rem;
                    border-radius: .34rem;
                }
                img{
                    border: 0;
                    display: inline-block;
                }
                .noneBg {
                    background: none;
                }
                .right{
                    margin-left: .22rem;
                    flex-grow: 1;
                    .top{
                        display: flex;
                        justify-content: space-between;
                        .name-box {
                            display: flex;
                            align-items: center;
                            .name{
                                font-size: .24rem;
                                color: #333;
                            }
                        }
                        .grade-score {
                            font-size: .22rem;
                            color: #999;
                        }
                    }
                    .middle {
                        margin-top: .1rem;
                        .comment-content {
                            font-size: .3rem;
                            color: #333;
                            line-height: .42rem;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 4;
                            text-overflow: ellipsis;
                            word-wrap: break-word;
                            word-break: break-all;
                            overflow: hidden;
                        }
                    }
                    .bottom {
                        margin-top: .2rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: .24rem;
                        color: #666;
                        .right {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            img{
                                width: 10px;
                                height: 10px;
                                background: none;
                                display: inline-block;
                            }
                            .praise-num {
                                margin-left: .1rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>