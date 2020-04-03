<template>
    <div>
        <Header>
            <router-link to="/setting" slot="left" class="h_city">
                <i class="iconfont icon-left icon22"></i>
            </router-link >
            <div slot="content" class="content">
                账户与安全
            </div>
        </Header>
        <div class="wrapper_nofoot s_wrap">
            <div class="setting_wrap">
                <div class="setting_item">
                    登录名
                    <span class="right icon12">
                        {{user.username}}
                        <i class="iconfont icon-right"></i>
                    </span>
                </div>
                <div class="setting_item">
                    账户密码
                    <span class="right icon12">
                        设置
                        <i class="iconfont icon-right"></i>
                    </span>
                </div>
                <div class="setting_item">
                    绑定手机号<span class="right icon12">{{user.phone}}</span>
                </div>
                <div class="setting_item">
                    第三方账户
                    <span class="right">
                        <i class="iconfont margin5"  v-for="(item,index) in user.thirdParty" :key="index" :class="item.icon" :style="{color:item.color}"></i>
                    </span>
                </div>
                <div class="setting_item">
                    注册时间<span class="right icon12">{{user.createTime}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../../components/Header'
export default {
    data(){
        return {
            user:{}
        }
    },
    created(){
        this.$store.state.user && (this.user = this.$store.state.user);
    },
    components:{
        Header
    },
    
}
</script>

<style scoped lang="less">
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
                .margin5{
                    margin-left:5px
                }
            }
            .iconfont{
                vertical-align: middle;
                font-size: 18px;
            }
        }
    }
}
</style>