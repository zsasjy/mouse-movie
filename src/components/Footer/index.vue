<template>
    <footer class="footer">
        <router-link class="f_item" v-for="(item,index) in footerList" :key="index" :to="item.path" :class="{action: $route.path.indexOf(item.path)!==-1}">
            <span class="iconfont icon22" :class="item.icon"></span>
            <span class="f_font">{{item.font}}</span>
        </router-link>
    </footer>
</template>

<script>
// background-color: coral;
export default {
    name:'foot',
    data(){
        return {
            footerList:[
                // {path:'/home',icon:'icon-shouye',font:'首页'},
                {path:'/movie',icon:'icon-dianying',font:'电影'},
                {path:'/cinema',icon:'icon-huabankaobei',font:'影院'},
                {path:'/cardbag',icon:'icon-qia',font:'卡包'},
                {path:'/mine',icon:'icon-wode',font:'我的'},
            ]
        }
    }
}
</script>

<style lang="less">
    .footer{
        width: 100%;
        height: 1rem;
        position: fixed;
        bottom: 0;
        left: 0;
        border-top: 1px solid #f0f0f0;
        display: flex;
        justify-content: center;
        align-content: center;
        .f_item{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: #999;
            text-align: center;
        }
        .icon22{
            font-size: .44rem;
        }
        .f_font{
            margin-top: 0rem;
            font-size: .26rem;
        }
        .action{
            color: coral;
        }
    }
    
</style>
