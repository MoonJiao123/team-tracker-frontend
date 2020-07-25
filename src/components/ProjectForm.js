import Taro from '@tarojs/taro'
import { View, Form, Input, Textarea, Button } from '@tarojs/components'
import React, { Component } from 'react'


export default function ProjectForm(props) {
  return (
    <View className="project-form">
      <View>添加新的项目</View>
      <Form onSubmit={props.handleSubmit}>
        <View>
          <View className="form-hint">标题</View>
          <Input
            className="input-title"
            type="text"
            placeholder="点击输入标题"
            value={props.projecttitle}
            onInput={props.handleTitleInput}
          />
          <View className="form-hint">简介</View>
          <Textarea
            placeholder="点击输入简介"
            className="input-content"
            value={props.projectcontent}
            onInput={props.handleContentInput}
          />
          <Button className="form-button" formType="submit" type="primary">
            提交
          </Button>
        </View>
      </Form>
    </View>
  )
}