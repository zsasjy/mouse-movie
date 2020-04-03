import axios from 'axios'
import { Toast } from 'mint-ui';

function responseSuccess(resData){
    if(resData && (resData.status >= 200 && resData.status < 400)){
        if(resData.data.code === 406){
            return responseError(resData);
        }
        return resData.data;
    }else{
        return responseError(resData);
    }
}
function responseError(rejData){
    if(rejData.toString().indexOf('404')!==-1){
        Toast({
            message: '请求资源不存在',
            iconClass: 'iconfont icon-404'
        })
    }else if(rejData.toString().indexOf('500')!==-1){
        Toast({
            message: '服务器正忙，请稍后重试',
            iconClass: 'iconfont icon-404'
        })
    }else{
        Toast({
            message: '请求错误，请稍后重试',
            iconClass: 'iconfont icon-404'
        })
    }
}

export default (url,data={},method="GET") => {
    method = method && method.toLowerCase();
    let params = data;
    const timeout = 300000;
    if(method === 'get'){
        return axios({
            url,
            params,
            method,
            timeout,
        }).then(res => {return responseSuccess(res)})
        .catch(err => {return responseError(err)})
    }
    if(method === 'delete'){
        return axios({
            url,
            params,
            method,
            timeout,
        }).then(res => {return responseSuccess(res)})
        .catch(err => {return responseError(err)})
    }
    if(method === 'post'){
        return axios({
            url,
            data,
            method,
            timeout,
        }).then(res => {return responseSuccess(res)})
        .catch(err => {return responseError(err)})
    }
    if(method === 'put'){
        return axios({
            url,
            data,
            method,
            timeout,
        }).then(res => {return responseSuccess(res)})
        .catch(err => {return responseError(err)})
    }
}