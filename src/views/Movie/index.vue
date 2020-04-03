<template>
    <div>
        <Header>
            <router-link to="/citylist" slot="left" class="h_city">
                <span class="font">{{$store.state.city}} <i class="iconfont icon-down icon12"></i></span>
            </router-link>
            <div slot="content" class="content">
                电影
            </div>
            <router-link to='/search' slot="right" class="h_right">
                <i class="iconfont icon-suosou icon22"></i>
            </router-link>
        </Header>
        <div class="nav">
            <div class="scroll">
                <router-link to="/movie/comingsoon" :class="{active:$route.path === '/movie/comingsoon'}">即将上映</router-link>
                <router-link to="/movie/intheaters" :class="{active:$route.path === '/movie/intheaters'}">正在上映</router-link>
                <router-link to="/movie/newmovies" :class="{active:$route.path === '/movie/newmovies'}">新片榜</router-link>
                <router-link to="/movie/weekly" :class="{active:$route.path === '/movie/weekly'}">口碑榜</router-link>
                <router-link to="/movie/top250" :class="{active:$route.path === '/movie/top250'}">Top250</router-link>
                <router-link to="/movie/usbox" :class="{active:$route.path === '/movie/usbox'}">北美票房榜</router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import Header from '../../components/Header'
export default {
    components:{
        Header
    },
    mounted(){
        new BScroll(".nav",{
            startX: 0,
            scrollX:true,
            scrollY:false,
            click:true
        })
        
    },
}
</script>

<style lang="less">
    
    .nav{
        width: 100%;
        height: 45px;
        position: fixed;
        top: 45px;
        float: left;
        font-size: 15px;
        font-weight: 700;
        line-height: 45px;
        border-bottom: 1px solid #e5e5e5;
        overflow: hidden;
        white-space: nowrap;
        .scroll{
            width: auto;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            a{
                height:45px;
                line-height: 45px;
                margin:0 .2rem;
                font-size: 15px;
                color: #666;
            }
            .active{
                color: coral;
            }
        }
    }
   
</style>