import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import React, { Component } from 'react'

import './index.scss'

export default function ParentHomePage() {
  return (
    <View className="parent-home-page">
      <View className="project-name">HomePage</View>
    </View>
  )
}