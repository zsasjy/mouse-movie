import {
    CHANGECITY,
    USERLOGIN,
    USEREXIT,
    ADDORDER,
    DELORDER,
    CLEARORDER,
    ADDSEARCHTAG,
    DELSEARCHTAG,
    CHANGECARDROUTE,
    HANDLECARDLIST,
} from './types'
export default {
    // 修改城市
    [CHANGECITY](state,{city}){
        state.city = city;
    },
    // 登录操作
    [USERLOGIN](state,{value}){
        state.user = value;
    },
    // 退出操作
    [USEREXIT](state){
        state.user = null;
    },
    // 添加到购物车
    [ADDORDER](state,{newOrder}){
        state.user.order = newOrder;
    },
    // 购物车移除电影
    [DELORDER](state,{newOrder}){
        state.user.order = newOrder
    },
    // 清空购物车
    [CLEARORDER](state){
        state.order = [];
    },
    // 搜索添加tag
    [ADDSEARCHTAG](state,{taglist}){
        state.searchTag = taglist
    },
    // 搜索删除tag
    [DELSEARCHTAG](state,{taglist}){
        state.searchTag = taglist
    },
    // 修改card返回数据
    [CHANGECARDROUTE](state,{value}){
        state.cardRoute = value;
    },
    // 向卡包中添加卡 的状态
    [HANDLECARDLIST](state,{newCardData}){
        state.cardData = newCardData;
    },
}