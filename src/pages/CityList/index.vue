<template>
    <div>
        <Header>
            <router-link to="/movie" slot="left" class="h_city">
                <i class="iconfont icon-left icon22"></i>
            </router-link>
            <div slot="content" class="content">
                城市列表
            </div>
        </Header>
        <div class="wrapper_nofoot">
            <div class="scroll">
                <div class="city-list-container">
                    <div ref="location_city">
                        <div class="city-title">
                            定位城市
                        </div>
                        <div class="city-list city-list-inline clearfix" @click="location">
                            <div class="location-city">定位失败，请点击重试</div>
                        </div>
                    </div>
                    <div ref="hotcity">
                        <div class="city-title">
                            {{hotcity.title}}
                        </div> 
                        <div class="city-list city-list-inline clearfix">
                            <div class="city-item" v-for="(item,index) in hotcity.lists" :key="`city${index}`" @click="changeCity(item)">
                                {{item}}
                            </div>
                        </div>
                    </div>
                    <div ref="citytitle">
                        <div class="city_title_wrap" v-for="(city,index) in citylist" :key="`citylist${index}`">
                            <div class="city-title city-title-letter">
                                {{city.title}}
                            </div>
                            <div class="city-list city-list-block clearfix">
                                <div class="city-item" v-for="(item,index) in city.lists" :key="`item${index}`" @click="changeCity(item)">
                                    {{item}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fixtitle" ref="fixed">
                <div class="city-title">{{fixedTitle}}</div>
            </div>
            <div class="navrightcity">
                <div class="nav-item nav-letter" @click="scroll_to_city(0)">定</div>
                <div class="nav-item nav-letter" @click="scroll_to_city(1)">热</div>
                <div v-for="(item,index) in citylist" :key="`nav${index}`" class="nav-item nav-letter" @click="scroll_to_city(index+2)">
                    {{item.title}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../../components/Header'
import BScroll from 'better-scroll'
import CL from "./citylist.json"
import { Indicator,Toast } from 'mint-ui';
export default {
    data(){
        return{
            scrollY:-1,
            title:[],
            citylist:[],
            hotcity:{},
            tops:[],
            currentIndex:0,
            diff:-1
        }
    },
    computed:{
        fixedTitle(){
            if (this.scrollY < 0) {
                return ''
            }
            return this.title[this.currentIndex] && this.title[this.currentIndex]
        }
    },
    watch:{
        scrollY(newY){
            const {tops} = this
            const index = tops.findIndex((top, index) => {
                this.diff = tops[index + 1] - newY
                return newY >= top && newY < tops[index + 1]
            })
            this.currentIndex = index;
        },
        diff(newVal) {
            let fixedTop = (newVal > 0 && newVal < 30) ? newVal - 30 : 0
            if (this.fixedTop === fixedTop) {
                return
            }
            this.fixedTop = fixedTop
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
        }
    },
    methods:{
        initCityList(callback){
            if(CL){
                let title = [];
                this.citylist = CL.city;
                this.hotcity = CL.hotcity;
                title.push("定位城市");
                title.push(this.hotcity.title);
                for(let i in this.citylist){
                    title.push(this.citylist[i].title)
                }
                this.title = title;
                callback&&callback();
            }

        },
        _initTops() {
            // 1. 初始化tops
            const tops = []
            let top = 0;
            tops.push(top);
            top += this.$refs.location_city.clientHeight;
            tops.push(top)
            top += this.$refs.hotcity.clientHeight
            tops.push(top);
            const lis = this.$refs.citytitle.getElementsByClassName('city_title_wrap')
            Array.from(lis).forEach(li => {
                top += li.clientHeight
                tops.push(top)
            })
            // 3. 更新数据
            this.tops = tops
        },
        scroll_to_city(index){
            const scrollY = this.tops[index]
            this.scrollY = scrollY
            this.cityScroll.scrollTo(0, -scrollY, 300)
        },
        changeCity(item){
            this.$store.dispatch('changeCity',item);
            this.$router.go(-1);
        },
        location(){
            Indicator.open("定位中...")
            setTimeout(()=>{
                Indicator.close();
                Toast({
                    message: '定位失败，设置为廊坊',
                    position: 'middle',
                    duration: 2000
                });
                this.$store.dispatch('changeCity','廊坊');
                this.$router.go(-1);
            },1200)
            
        }
    },
    mounted(){
        this.initCityList(()=>{
            this.$nextTick(()=>{
                this.cityScroll = new BScroll('.wrapper_nofoot',{
                    probeType: 3,
                    scrollY:true,
                    click:true
                })
                this._initTops();
                this.cityScroll.on('scroll', ({x, y}) => {
                    if(y > 0){
                        this.scrollY = - y
                    }else{
                        this.scrollY = Math.abs(y)
                    }
                })
                this.cityScroll.on('scrollEnd', ({x, y}) => {
                    if(y > 0){
                        this.scrollY = - y
                    }else{
                        this.scrollY = Math.abs(y)
                    }
                })
            })
        });
    },
    components:{
        Header
    },
}
</script>

<style scoped lang="less">
    .scroll{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .fixtitle{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        .city-title{
            padding-left: 15px;
            line-height: 30px;
            font-size: 14px;
            color: #333;
            background-color: #ebebeb;
        }
    }
    .city-list-container{
        background-color: #ebebeb;
        font-size: 14px;
        color: #333;
        height: 100%;
        width: 100%;
        z-index: 1000;
        overflow-y: auto;
        .city-list {
            padding-right: 30px;
        }
        .city-title-letter {
            padding-left: 25px;
        }
        .city-list-block {
            background-color: #f5f5f5;
            .city-item {
                height: 44px;
                line-height: 44px;
                margin-left: 15px;
                border-bottom: 1px solid #c8c7cc;
            }
        }
        .city-title{
            padding-left: 15px;
            line-height: 30px;
        }
        .city-list-inline {
            background-color: #f5f5f5;
            padding-bottom: 8px;
            .location-city,.city-item {
                float: left;
                background: #fff;
                width: 29%;
                height: 33px;
                margin-top: 15px;
                margin-left: 4%;
                padding: 0 4px;
                border: 1px solid #e6e6e6;
                border-radius: 3px;
                line-height: 33px;
                text-align: center;
                box-sizing: border-box;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .location-city{
                width: auto;
                min-width: 30%;
                padding: 0 20px;
            }
        }
    }
    .navrightcity {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        width: 35px;
        z-index: 10;
        text-align: center;
        font-size: 12px;
        .nav-item {
            height: 16px;
            height: 2.8vh;
        }
        .nav-letter {
            width: 15px;
            margin-left: 15px;
        }
    }
</style>