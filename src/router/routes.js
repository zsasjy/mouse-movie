const Home = {
    path:"/home",
    name:"Home",
    // meta:{},
    component:()=>import('@/views/Home')
}
const Movie = {
    path:"/movie",
    name:'Movie',
    component:()=>import('@/views/Movie'),
    children:[
        {
            path:"comingsoon",
            name:'ComingSoon',
            component:()=>import('@/views/Movie/ComingSoon'),
        },
        {
            path:"intheaters",
            name:'InTheaters',
            component:()=>import('@/views/Movie/InTheaters'),
        },
        {
            path:"newmovies",
            name:'NewMovies',
            component:()=>import('@/views/Movie/NewMovies'),
        },
        {
            path:"weekly",
            name:'Weekly',
            component:()=>import('@/views/Movie/Weekly'),
        },
        {
            path:"usbox",
            name:'UsBox',
            component:()=>import('@/views/Movie/UsBox'),
        },
        {
            path:"top250",
            name:'Top250',
            component:()=>import('@/views/Movie/Top250'),
        }
    ]
}
const Cardbag = {
    path:'/cardbag',
    name:'Cardbag',
    component:()=>import('@/views/Cardbag')
}
const Cinema = {
    path:'/cinema',
    name:'Cinema',
    component:()=>import('@/views/Cinema'),
}

const Mine = {
    path:'/mine',
    name:'Mine',
    component:()=>import('@/views/Mine')
}
const Search = {
    path:'/search',
    name:'Search',
    component:()=>import('@/pages/Search')
}
const Setting = {
    path:'/setting',
    name:'Setting',
    component:()=>import('@/pages/Setting')
}
const Citylist = {
    path:'/citylist',
    name:'CityList',
    component:()=>import('@/pages/CityList')
}
const About = {
    path:'/about',
    name:'About',
    component:()=>import('@/pages/About')
}
const UserInfo = {
    path:'/userinfo',
    name:'UserInfo',
    component:()=>import('@/pages/UserInfo')
}
const CinemaInfo = {
    path:'/cinemainfo/:id',
    name:'CinemaInfo',
    component:()=>import('@/pages/CinemaInfo')
}
const MovieInfo = {
    path:'/movieinfo/:id',
    name:'MovieInfo',
    component:()=>import('@/pages/MovieInfo')
}
const SubmitOrder = {
    path:'/submitorder/:id',
    name:'SubmitOrder',
    component:()=>import('@/pages/SubmitOrder')
}
const Multiplecard = {
    path:'/multiplecard',
    name:'Multiplecard',
    component:()=>import('@/pages/Multiplecard'),
    children:[
        {
            path:'list',
            name:'List',
            component:()=>import('@/pages/Multiplecard/List'),
        },
        {
            path:'detail/:id',
            name:'Detail',
            component:()=>import('@/pages/Multiplecard/Detail'),
        }
    ]
}
export default [
    Home,
    Movie,
    Cardbag,
    Cinema,
    Mine,
    Search,
    Setting,
    Citylist,
    About,
    UserInfo,
    Multiplecard,
    CinemaInfo,
    SubmitOrder,
    MovieInfo
]
