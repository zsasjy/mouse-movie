<template>
    <div class="app">
        <keep-alive v-if="keep">
            <router-view></router-view>
        </keep-alive>
        <router-view v-if="!keep"></router-view>
        <Footer v-if="hideFooter"></Footer>
    </div>
</template>

<script>
import './assets/css/default.less'
import Footer from './components/Footer'
export default {
    watch:{
        $route(to){
            if(to.path.indexOf("/multiplecard/detail")!==-1
            ||to.path.indexOf("/cinemainfo")!==-1
            ||to.path.indexOf("/movieinfo"!==-1)){
                this.keep = false;
            }else{
                this.keep = true;
            }
            if(to.path === "/cardbag"){
                this.$store.dispatch('changeCardRoute',this.router);
            }else{
                if(to.path.indexOf("/multiplecard")!==1) return;
                this.router = to.path;
            }
        }
    },
    computed:{
        hideFooter(){
            if(this.hideFootList.includes(this.$route.path)||
            this.$route.path.indexOf('/multiplecard')!==-1||
            this.$route.path.indexOf('/cinemainfo')!==-1||
            this.$route.path.indexOf('/movieinfo')!==-1||
            this.$route.path.indexOf('/submitorder')!==-1){
                return false
            }
            return true;
        }
    },
    data(){
        return{
            keep:false,
            router:"",
            hideFootList:['/setting','/search','/cardbag','/citylist','/about','/userinfo'],
        }
    },
    components:{
        Footer
    }
}
</script>

<style lang="less">

</style>