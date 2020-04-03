<template>
    <div>
        <transition name="fade">
            <div class="mask" v-if="this.visible" @click="onCancel"></div>
        </transition>
        <transition name="late">
            <div class="actionsheet" v-if="this.visible">
                <div class="btn"><p></p></div>
                <div class="actionsheet_share">
                    <div class="share_item" v-for="(item,index) in shareList" :key="index" @click="shareHandle(item)">
                        <span class="iconfont" :class="item.icon" :style={color:item.color}></span>
                        <span class="share_font">{{item.font}}</span>
                    </div>
                </div>
                <div class="actionsheet_share" style="padding-top:0px">
                    <div class="share_item" v-for="(item,index) in handleList" :key="index" @click="handles(item)">
                        <span class="iconfont" :class="item.icon" :style={color:item.color}></span>
                        <span class="share_font">{{item.font}}</span>
                    </div>
                </div>
                <div class="actionsheet_item" @click="onCancel">取消</div>
            </div>
        </transition>
    </div>
</template>

<script>
import { Indicator,Toast } from 'mint-ui';
export default {
    props:{
        visible:{
            type:Boolean
        },
        onCancel:{
            type:Function
        }
    },
    data(){
        return {
            shareList:[
                {icon:'icon-qq',font:'QQ',color:'#4CC5F2'},
                {icon:'icon-qq-copy',font:'QQ空间',color:'#FECE00'},
                {icon:'icon-weixin-copy',font:'微信',color:'#0CCB19'},
                {icon:'icon-pengyouquan',font:'朋友圈',color:'#60F05A'},
                {icon:'icon-weibo-copy',font:'微博',color:'#F45458'},
            ],
            handleList:[
                {icon:'icon-fuzhi',font:'复制链接',color:'#cccccc'},{},{},{},{}
            ],
            handle:false
        }
    },
    methods:{
        shareHandle(item){
            this.handle=!this.handle;
            if(this.handle){
                Indicator.open({
                    text: 'Loading...',
                    spinnerType: 'fading-circle'
                });
                setTimeout(()=>{
                    Indicator.close();
                    Toast({
                        message: `${item.font}分享成功`,
                        position: 'middle',
                        duration: 2000
                    });
                    this.onCancel();
                    this.handle = false;
                },2000)
            }
        },
        handles(item){
            if(!item.font){
                return
            }
            if(item.font === "复制链接"){
                let text = this.$route.path;
                if(window.clipboardData){               
                    window.clipboardData.setData('text',text);
                }else{
                    (function(text){
                        document.oncopy=function(e){
                            e.clipboardData.setData('text',text);
                            e.preventDefault();
                            document.oncopy=null;
                        }
                    })(text);
                    document.execCommand('Copy');
                }
                Toast({
                    message: `${item.font}成功`,
                    position: 'middle',
                    duration: 2000
                });
                this.onCancel();
            }
        }
    }
}
</script>

<style lang="less"> 
    .mask{
        width: 100%;
        height: 100%;
        position: fixed;
        font-size: 16px;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .5);
        z-index: 0;
    }
    .actionsheet{
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        font-size: 16px;
        z-index: 9999;
        background-color: #cccccc;
        .btn{
            background-color: #ffffff;
            overflow: hidden;
            p{
                width: 40px;
                height: 6px;
                margin: 0 auto;
                background-color: #cccccc;
                border-radius: 15px;
                margin-top: 4px;
            }
        }
        .actionsheet_share{
            width: 100%;
            height: 80px;
            background-color: #ffffff;
            display: flex;
            justify-content: center;
            padding: 10px;
            padding-top: 10px;
            padding-bottom: 0px;
            .share_item{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-content: center;
                text-align: center;
                .iconfont{
                    font-size: 30px;
                }
                .share_font{
                    margin-top: 3px;
                    font-size: 12px;
                    color: #999;
                }
            }
        }
        .actionsheet_item{
            display: block;
            width: 100%;
            height: 45px;
            line-height: 45px;
            font-size: 16px;
            color: #999;
            background-color: #fff;
            text-align: center;
            margin-top: 8px;
        }
        
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }
    .fade-leave, .fade-enter-to {
        opacity: 1
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.6s
    }
    .late-enter, .late-leave-to {
        bottom:-50%;
    }
    .late-leave, .late-enter-to {
        bottom:0;
    }
    .late-enter-active, .late-leave-active {
        transition: bottom 0.6s
    }
    </style>