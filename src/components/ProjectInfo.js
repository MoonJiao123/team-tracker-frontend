import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import React, { Component } from 'react'
import taro from '@tarojs/taro'

export default function ProjectInfo(props) {
  return (
    <View className="project-info">
      <View className="project-title">{props.projecttitle}</View>
      <View className="project-content">{props.projectcontent}</View>
      <Button className="info-button" formType="submit" type="primary" onClick={() => taro.redirectTo({
        url: '/pages/project/project?name='+props.projecttitle
      })}>
        进入项目
          </Button>
    </View>
  )
}