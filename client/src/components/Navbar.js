// src/components/Navbar/index
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Input, Image } from '@tarojs/components'
import Logo from './Logo'
import home from './images/home.png'
class Navbar extends Component {
    // 默认配置

    constructor(props) {
        super(props)

    }

    render() {

        const style = {
            paddingTop: Taro.$navBarMarginTop + 'px'
        }
        // 将状态栏的区域空余出来
        return (
            <View className='navbarWrap' style={style}>
                <View className='navbar'><Image src={home} onClick={() => Taro.redirectTo({
                    url: '/pages/index/index'
                })} style='width: 30px;height: 30px;'
                /></View>
                <Logo />
                <View className='team-name'>Team Tracker</View>
            </View>
        );
    }
}
export default Navbar

// 这里导航栏内容可以自行配置