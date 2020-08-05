import Taro from '@tarojs/taro'
import { View, Form, Input, Textarea, Button } from '@tarojs/components'
import React, { Component } from 'react'
import { AtButton } from 'taro-ui'


export default function ProjectForm(props) {
  return (
    <View className="project-form">
      <View className='form-title'>添加新的项目</View>
      <Form onSubmit={props.handleSubmit}>
        <View>
          <Input
            className="input-title"
            type="text"
            placeholder="点击输入标题"
            value={props.projecttitle}
            onInput={props.handleTitleInput}
          />
          <Textarea
            placeholder="点击输入简介"
            className="input-content"
            value={props.projectcontent}
            onInput={props.handleContentInput}
          />
          <AtButton className="info-button" hover-class='button-hover-effect' onClick= {props.handleSubmit}>
            提交
          </AtButton>
        </View>
      </Form>
    </View>
  )
}