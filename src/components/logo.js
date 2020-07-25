import { View,Image} from '@tarojs/components'
import React, { Component } from 'react'
import logoimg from './images/logo.png'

export default function Logo() {
    return (
        <View className="logo">
            <Image src={logoimg} />
        </View>
      )
}