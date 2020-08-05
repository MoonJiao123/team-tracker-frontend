/**
 * 创建封装logo
 * 作者：Moon
 */
import { View, Image } from '@tarojs/components'
import React, { Component } from 'react'
import logoimg from './images/logo.png'
export default function Logo() {
    return (
        <View className="logo">
            <Image className="logo-img" src={logoimg} style='width: 90px;height: 50px;' />
        </View>
    )
}