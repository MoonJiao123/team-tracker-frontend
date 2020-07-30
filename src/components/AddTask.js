import { View, Button, Form,Input} from '@tarojs/components'
import React, { Component } from 'react'
export default function AddTask(props) { 
    return (
        <View className="task-form">
          <View>添加新的任务</View>
          <Form onSubmit={props.handleSubmit}>
            <View>
              <Input
                className="input-title"
                type="text"
                placeholder="新任务"
                value={props.taskValue}
                onChange={props.handleContentInput}
              />
              <Button className="form-button" formType="submit" type="primary">
                提交
              </Button>
            </View>
          </Form>
        </View>
      )
}
