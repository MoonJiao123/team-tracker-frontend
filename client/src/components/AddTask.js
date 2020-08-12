import { View, Button, Form, Input } from '@tarojs/components'
import React, { Component } from 'react'
import { AtButton } from 'taro-ui'
export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      projectname: '',
      newtask: ''
    }
    this.handleTaskInput = this.handleTaskInput.bind(this)
  }
  //track input new task
  handleTaskInput(e) {
    this.setState({
      newtask: e.target.value,
    })
  }
  //clear after submit
  resettask() {
    this.setState({
      newtask: '',
    })
  }
  render() {
    return (
      <View className='task-form'>
        <View className='form-title'>添加新的任务</View>
        <Form >
          <View>
            <Input
              className="input-title"
              type="text"
              placeholder="新任务"
              onBlur={this.handleTaskInput}
            />
            <AtButton className="info-button" hover-class='button-hover-effect' onClick={e => this.props.handleSubmit(e, this.state.newtask, this.props.status)} >
              提交
              </AtButton>
          </View>
        </Form>
      </View>
    )
  }
}
