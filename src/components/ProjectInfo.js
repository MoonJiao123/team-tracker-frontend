import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import React, { Component } from 'react'


export default function ProjectInfo(props) {
    return (
        <View className="project-info">
          <View className="project-title">{props.projecttitle}</View>
          <View className="project-content">{props.projectcontent}</View>
        </View>
      )
}