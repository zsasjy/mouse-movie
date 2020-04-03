import {
    CHANGECITY,
    USEREXIT,
    USERLOGIN,
    ADDORDER,
    DELORDER,
    CLEARORDER,
    ADDSEARCHTAG,
    DELSEARCHTAG,
    CHANGECARDROUTE,
    HANDLECARDLIST,
} from './types'

import {userInfo} from '../utils/localstorage'
export default {
    // 修改城市名
    changeCity({commit},city){
        commit(CHANGECITY,{city})
    },
    // 登录
    login({commit},value={}){
        userInfo.saveUser(value);
        commit(USERLOGIN,{value})
    },
    // 退出
    exit({commit,state}){
        userInfo.removeUser(state.user);
        commit(USEREXIT)
    },
    // 搜索添加tag
    addSearchTag({commit,state},value){
        let taglist = state.searchTag;
        taglist.unshift(value);
        taglist.length = taglist.length > 10 ? 10 : taglist.length;
        commit(ADDSEARCHTAG,{taglist:Array.from(new Set(taglist))})
    },
    // 搜索删除tag
    delSearchTag({commit,state},value){
        let taglist = Array.from(state.searchTag);
        for(let i in taglist){
            if(taglist[i] === value){
                taglist.splice(i,1);
            }
        }
        commit(DELSEARCHTAG,{taglist})
    },
    // 加入订单
    addOrder({commit,state},value){
        if(!Object.is(state.user,{}) && state.user.username){
            let newOrder = state.user.order;
            newOrder.push(value)
            commit(ADDORDER,{newOrder})
        }
    },
    // 删除订单
    delOrder({commit,state},value){
        if(!Object.is(state.user,{}) && state.user.username){
            let newState = state.user.order;
            let index = newState.findIndex((item,index)=>{
                if(Object.is(item,value)){
                    return index
                }
            });
            newState.splice(index,1);
            commit(DELORDER,{newState})
        }
    },
    // 清空订单
    clearOrder({commit}){
        commit(CLEARORDER)
    },
    // 修改路由
    changeCardRoute({commit},value){
        commit(CHANGECARDROUTE,{value})
    },
    // 添加我拥有的卡
    addHaveCard({commit,state},value){
        let newCardData = state.cardData
        newCardData.forEach(item => {
            if(item.id === value.id && item.title === value.title){
                item.status = false;
            }
        });
        
        commit(HANDLECARDLIST,{newCardData})
    },
    // 删除我拥有的卡
    delHaveCard({commit,state},value){
        let newCardData = state.cardData
        newCardData.forEach(item => {
            if(item.id === value.id && item.title === value.title){
                item.status = true;
            }
        });
        commit(HANDLECARDLIST,{newCardData})
    }
}