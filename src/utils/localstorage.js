import store from 'store'

const USERKEY = 'user-key';

export const userInfo = {
    // 保存user
    saveUser(user){
        store.set(USERKEY,user,new Date().getTime() + 1440000)
    },
    // 查看user
    getUser(){
        return store.get(USERKEY) || {}
    },
    // 删除user
    removeUser(){
        // localStorage.removeItem(USERKEY)
        store.remove(USERKEY)
    }
};