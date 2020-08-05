import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import React, { Component } from 'react'
import taro from '@tarojs/taro'
import DeleteProjectButton from './DeleteProjectButton'

export default function ProjectInfo(props) {
  return (
    <View className="project-info">
      <View className='project-minus-inline'>
        <View className="project-title" >{props.projecttitle}</View>
        <DeleteProjectButton />
      </View>
      <View className="project-content">{props.projectcontent}</View>
      <AtButton className="info-button" hover-class='button-hover-effect' onClick={() => taro.redirectTo({
        url: '/pages/project/project?name=' + props.projecttitle
      })}>
        进入项目
          </AtButton>
    </View>
  )
}