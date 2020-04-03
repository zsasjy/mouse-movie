<template>
    <header class="header">
        <slot name="left"></slot>
        <slot name="content"></slot>
        <slot name="right"></slot>
    </header>
</template>

<script>
export default {
    name:'headers',
    props:{
        title:{
            type:String
        }
    }
}
</script>

<style lang="less">
    .header{
        width: 100%;
        height: 45px;
        font-size: 16px;
        position:fixed;
        top: 0;
        left: 0;
        background-color: coral;
        color: #ffffff;
        .h_city{
            width: 20%;
            position: absolute;
            left: 0px;
            height: 45px;
            line-height: 45px;
            padding: 0px 0px 0 10px;
            color: #ffffff;
            .font{
                font-size: 14px;
            }
        }
        .search,.on_search{
            width: 75%;
            height: 45px;
            position: absolute;
            left: 20%;
            padding: 9px 0px;
            input{
                width: 100%;
                height: 27px;
                font-size: 14px;
                line-height: 1.42857143;
                color: #555;
                background-color: #fff;
                background-image: none;
                border: 1px solid #ccc;
                border-radius: 15px;
                outline: none;
                padding-left: 25px;
                &::placeholder{
                    color: #999;
                }
            }
            i{
                position: absolute;
                left: 5px;
                top: 13px;
                color: #999;
                font-size: 20px;
            }
        }
        .on_search{
            width: 83%;
            left: 10px;
            padding: 7.5px 0px;
            input{
                height: 30px;
            }
        }
        .content{
            width: 50%;
            height: 45px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            color: #ffffff;
            text-align: center;
            line-height: 45px;
            font-size: 18px;
        }
        .h_right{
            width: 10%;
            height: 45px;
            line-height: 45px;
            position: absolute;
            right: 0;
            text-align: right;
            margin-right: 10px;
            color: #ffffff;
        }
    }

</style>