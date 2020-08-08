import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import React, { Component } from 'react'
import taro from '@tarojs/taro'
import DeleteProjectButton from './DeleteProjectButton'
export default class ProjectInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }

  }

  render() {
    return (
      <View className="project-info">
        <View className='project-minus-inline'>
          <View className="project-title" >{this.props.projecttitle}</View>
          <DeleteProjectButton title={this.props.projecttitle} openid={this.props.openid} handleDelete={this.props.handleDelete} />
        </View>
        <View className="project-content">{this.props.projectcontent}</View>
        <AtButton className="info-button" hover-class='button-hover-effect' onClick={() => taro.redirectTo({
          url: '/pages/project/project?name=' + this.props.projecttitle
        })}>
          进入项目
          </AtButton>
      </View>
    )
  }
}