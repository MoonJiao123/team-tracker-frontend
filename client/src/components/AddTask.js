import { View, Button, Form,Input} from '@tarojs/components'
import React, { Component } from 'react'
import { AtButton } from 'taro-ui'
export default function AddTask(props) { 
    return (
        <View className='task-form'>
          <View className='form-title'>添加新的任务</View>
          <Form onSubmit={props.handleSubmit}>
            <View>
              <Input
                className="input-title"
                type="text"
                placeholder="新任务"
                value={props.taskValue}
                onChange={props.handleContentInput}
              />
              <AtButton className="info-button" hover-class='button-hover-effect' onClick= {props.handleSubmit} >
                提交
              </AtButton>
            </View>
          </Form>
        </View>
      )
}
