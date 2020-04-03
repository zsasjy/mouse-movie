<template>
    <div class="setting">
        <Header>
            <router-link to="/mine" slot="left" class="h_city">
                <i class="iconfont icon-left icon22"></i>
            </router-link >
            <div slot="content" class="content">
                设置
            </div>
        </Header>
        <div class="wrapper_nofoot s_wrap">
            <div class="setting_wrap">
                <router-link to='/userinfo' class="setting_item account" v-if="$store.state.user">
                    账户与安全<span class="right icon12">账户详情<i class="iconfont icon-right" style="margin-left:5px"></i></span>
                </router-link>
                <div class="setting_item" @click="clearCache">
                    清空缓存<i class="iconfont icon-shanchu right"></i>
                </div>
                <div class="setting_item">
                    意见反馈<i class="iconfont icon-right right"></i>
                </div>
                <div class="setting_item" @click="newVersion">
                    检查新版本<i class="iconfont icon-right right"></i>
                </div>
                <router-link to='/about' class="setting_item">
                    关于<i class="iconfont icon-right right"></i>
                </router-link>
            </div>
            <div class="btnLogin" v-show="$store.state.user" @click="exit">
                退出登录
            </div>
            <div class="btnLogin" v-show="!$store.state.user" @click="login">
                登录
            </div>
        </div>    
        
    </div>
</template>

<script>
import { MessageBox,Toast,Indicator } from 'mint-ui';
import Header from '../../components/Header'
export default {
    data(){
        return{
        }
    },
    methods:{
        exit(){
            this.$store.dispatch('exit');
            // this.$router.replace('/home');
        },
        clearCache(){
            const message="缓存可以方便您离线浏览内容"
            const title= " 要清除缓存嘛？"
            MessageBox.confirm(message, title).then(() => {
                Toast({
                    message: '鼠眼：缓存清除成功',
                    position: 'bottom',
                    duration: 2000
                });
            }).catch(()=>{})
        },
        newVersion(){
            Indicator.open('检测中...');
            setTimeout(()=>{
                Indicator.close();
                Toast({
                    message: '鼠眼：当前是最新版本',
                    position: 'bottom',
                    duration: 2000
                });
            },800)
        },
        login(){
            Indicator.open("登录中...")
            setTimeout(()=>{
                Indicator.close()
                this.$store.dispatch('login',{
                    username:"admin",
                    password:"admin123",
                    phone:"18822225555",
                    thirdParty:[{name:"微信",icon:"icon-weixin-copy",color:"#0CCB19"},{name:"QQ",icon:"icon-qq",color:"#4CC5F2"}],
                    createTime:"2020-3-30",
                    order:[],// 订单，
                });
                this.$router.push('/movie')
            },1000)
        }
    },
    components:{
        Header
    },
}
</script>

<style lang="less">
    .s_wrap{
        background-color: #f5f5f5;
        .setting_wrap{
            margin-top: 20px;
            .setting_item{
                display: block;
                position: relative;
                width: 100%;
                height: 40px;
                padding: 10px 50px 10px 10px;
                color: #444;
                background-color: #fff;
                border-bottom: 1px solid #f5f5f5;
                font-size: 14px;
                .right{
                    position: absolute;
                    right: 10px;
                    top: 12px;
                }
                .iconfont{
                    vertical-align: middle;
                    font-size: 18px;
                }
                &:last-child{
                    border: 0;
                }
            }
            .account{
                margin-bottom: 20px;
            }
        }
        .btnLogin{
            background-color: coral;
            margin: 20px;
            padding: 10px;
            text-align: center;
            color: #ffffff;
            font-size: 14px;
        }
    }
    @media (min-width: 374px){ 
        .setting_item{
            height: 50px!important;
            padding: 15px 50px 15px 10px!important;
            .right{
                right: 10px!important;
                top: 15px!important;
            }
        }
    }
    @media (min-width: 425px){ 
        .setting_item{
            height: 60px!important;
            padding: 20px 50px 20px 10px!important;
            .right{
                right: 10px!important;
                top: 21px!important;
            }
        }
    }
</style>