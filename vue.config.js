module.exports = {
    lintOnSave:false,
    // publicPath: './',
    devServer:{
        host:"localhost",
        port:8888,
        quiet:true,
        compress:true,
        proxy:"http://m.maoyan.com"
    },
    configureWebpack:{
        module:{
            rules:[
                {
                    test:/\.less$/,
                    use:"less-loader"
                }
            ]
        },
        resolve:{
            extensions:['.js','.json','.vue'],
            alias:{
                // '@':resolve('src')
            }
        }
    }
}