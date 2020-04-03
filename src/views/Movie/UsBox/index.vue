<template>
   <div class="wrapper fixtop90">
        <div class="scroll">
            <div class="wrap" v-for="(item,index) in subjects" :key="index" >
                <div class="imgleft">
                    <img :src="item.subject.images.medium" alt="">
                </div>
                <div class="info">
                    <router-link :to="`/movieinfo/${item.id}`">
                        <h1 class="title">{{item.subject.title}}<span style="back "></span></h1>
                        <p class="score">评分：{{item.subject.rating.average}}</p>
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
import {reqUsBox} from '../../../api'
import '../index.less'
export default {
    data(){
        return{
            subjects:[],
        }
    },
    methods:{
        async initData(callback){
            Indicator.open('Loading...');
            const result = await reqUsBox({});
            let authors = [];
            if(result){
                Indicator.close();
                for(let i in result.subjects){
                    for(let j in result.subjects[i].subject.casts){
                        authors.push(result.subjects[i].subject.casts[j].name)
                    }
                    result.subjects[i].author = `${result.subjects[i].subject.year} / ${result.subjects[i].subject.genres.join(" ")} / ${authors.join("/")} `
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
        this.initData(()=>{
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