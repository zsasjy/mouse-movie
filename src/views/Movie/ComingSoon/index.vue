<template>
   <div class="wrapper fixtop90">
        <div class="scroll">
            <div class="wrap" v-for="(item,index) in subjects" :key="index" >
                <div class="imgleft">
                    <img :src="item.images.medium" alt="">
                </div>
                <div class="info">
                    <router-link :to="`/movieinfo/${item.id}`">
                        <h1 class="title">{{item.title}}<span style="back "></span></h1>
                        <p class="score">评分：{{item.rating.average}}</p>
                        <div class="author">{{item.author}}</div>
                    </router-link>
                    <div class="wantsee" @click.stop="wanttosee(index)">
                        <div class="wrap">
                            <span class="icon iconfont icon-yduishoucangkongxin" :class="item.has_video?'icon-yduishoucangshixin':'icon-yduishoucangkongxin'"></span>
                            <span class="text">{{item.has_video?"已想看":"想看"}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import { Indicator,Toast } from 'mint-ui';
import {reqComingSoon} from '../../../api'
import '../index.less'
export default {
    data(){
        return{
            subjects:[],
        }
    },
    methods:{
        async initComingSoon(callback){
            Indicator.open('Loading...');
            const result = await reqComingSoon({});
            let authors = [];
            if(result){
                Indicator.close();
                for(let i in result.subjects){
                    for(let j in result.subjects[i].casts){
                        authors.push(result.subjects[i].casts[j].name)
                    }
                    result.subjects[i].author = `${result.subjects[i].year} / ${result.subjects[i].genres.join(" ")} / ${authors.join("/")} `
                    authors.splice(0,authors.length)
                }
                this.subjects = result.subjects;
                callback&&callback();
            }
        },
        wanttosee(index){
            Toast({
                message: `${this.subjects[index].has_video?'取消标记':'标记为想看'}`,
                iconClass: 'iconfont icon-duihao',
                duration: 900
            });
            this.subjects[index].has_video = !this.subjects[index].has_video;
        }
    },
    mounted(){
        this.initComingSoon(()=>{
            this.$nextTick(()=>{
                new BScroll(".wrapper",{
                    scrollY:true,
                    click:true
                })
            })
        });
    }
}
</script>

<style lang="less">
    .fixtop90{
        top: 90px;
        .scroll{
            width: 100%;
            overflow: hidden;
            position: absolute;
            left: 0;
            top: 0;
            font-size: 16px;
        }
    }
</style>