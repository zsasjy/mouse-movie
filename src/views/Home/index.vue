<template>
    <div>
        <Header>
            <router-link to="/citylist" slot="left" class="h_city">
                <span class="font">{{$store.state.city}} <i class="iconfont icon-down icon12"></i></span>
            </router-link>
            <div slot="content" class="search">
                <input type="text" @focus="goSearch" placeholder="电影/影评/影院">
                <i class="iconfont icon-suosou"></i>
            </div>
        </Header>
        <div class="wrapper">
            <div class="home">
                首页
            </div>
        </div>
    </div>
</template>

<script>
// import {reqTop250} from '../../api'
import Header from '../../components/Header'
// import { Indicator } from 'mint-ui';
export default {
    name:'Home',
    data(){
        return {

        }
    },
    methods:{
        goSearch(){
            this.$router.push('/search');
        }
    },
    async mounted(){
        // Indicator.open('Loading...');
        // const result = await reqTop250();
        // if(result) {
        //     Indicator.close();
        //     console.log(result);
        // }
    },
    components:{
        Header
    }
}
</script>

<style lang="less">
    .home{
        padding: 10px;
        h4{
            font-size: 21px;
        }
    }
</style>