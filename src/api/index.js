import axios from './axios'

const basePath = "https://douban.uieee.com/v2/movie"
// https://douban.uieee.com/v2/movie/subject/34922185
// 即将上映
export const reqComingSoon = ({start=0,count=40}) => {
    return axios(`${basePath}/coming_soon`,{start,count},'GET');
}
// 正在上映
export const reqInTheaters = ({city="廊坊"}) => {
    return axios(`${basePath}/in_theaters`,{city},'GET');
}
// 新片榜
export const reqNewMovies = () => {
    return axios(`${basePath}/new_movies`,{},'GET')
}
// 口碑榜
export const reqWeekly = () => {
    return axios(`${basePath}/weekly`,{},'GET')
}
// 北美票房榜
export const reqUsBox = () => {
    return axios(`${basePath}/us_box`,{},'GET')
}
// Top250
export const reqTop250 = () => {
    return axios(`${basePath}/top250`,{count:250},'GET')
}
// 电影信息
export const reqMovieInfo = (id) => {
    return axios(`${basePath}/subject/${id}`,{},'GET')
}
// 电影剧照
export const reqMoviePhoto = (id) => {
    return axios(`${basePath}/subject/${id}/photos`,{},'GET')
}
// 电影影评
export const reqMovieReviews = (id) => {
    return axios(`${basePath}/subject/${id}/reviews`,{},'GET')
}
// 电影短评
export const reqMoviewComments = (id) => {
    return axios(`${basePath}/subject/${id}/comments`,{},'GET')
}
// 明星信息
export const reqStarInfo = (id) => {
    return axios(`${basePath}/celebrity/${id}`,{},'GET')
}
// 明星作品
export const reqStarWorks = (id) => {
    return axios(`${basePath}/celebrity/${id}/works`,{},'GET')
}
// 明星剧照
export const reqStarPhotos = (id) => {
    return axios(`${basePath}/celebrity/${id}/photos`,{},'GET')
}
// 电影/影院搜索
export const reqMovieSearch = (value={}) => {
    // 电影stype:-1 影院 stype:2 不写 影院与电影都有
    value.cityId = 106;
    return axios('/ajax/search',{...value},'GET')
}
// 影院列表
export const reqCinemaList = () => {
    return axios('/ajax/cinemaList?offset=0&limit=100&cityId=106',{},'GET')
}
// 影院过滤选项
export const reqFilterCinemas = () => {
    return axios('/ajax/filterCinemas',{ci:106},'GET')
}
// 影院详情
export const reqCinemasInfo = (cinemaId) => {
    return axios('/ajax/cinemaDetail',{cinemaId},'GET')
}
// 零食购买
export const reqDealGoodsPrice = ({dealId,promotionId,price,channelId,category,cinemaId}) => {
    return axios('/deal/goods/price?_v_=yes&token=yFA8iFP9MTj-ccoKwvvyxGanffwAAAAAQgoAAPcEXZhRcodbo6XKQTgDrJXzxsVBRyuehpZSbyZVM24k8XCyNmE6sLp_fgHY4TXKXA',{
        dealId,
        promotionId,
        price,
        channelId,
        category,
        quantity: 1,
        withDiscountCard: false,
        needRecommend: true,
        discountCardPromotionId: 0,
        cinemaId
    },'POST')
}
