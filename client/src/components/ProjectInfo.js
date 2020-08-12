import { View, Input, } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import React, { Component } from 'react'
import taro from '@tarojs/taro'
import DeleteProjectButton from './DeleteProjectButton'
export default class ProjectInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentinput: this.props.projectcontent
    }
    this.infodelete = this.infodelete.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }
  infodelete(e, title, openid) {
    this.props.handleDelete(e, title, openid)
  }
  handleInput(e) {
    this.setState({
      contentinput: e.target.value
    })
  }
  render() {
    console.log("render " + this.state.contentinput)
    return (
      <View className="project-info">
        <View className='project-minus-inline'>
          <View className="project-title" >{this.props.projecttitle}</View>
          <DeleteProjectButton title={this.props.projecttitle} openid={this.props.openid} infodelete={this.infodelete} />
        </View>
        <View className="project-content">
          <Input
            value={this.props.projectcontent}
            onInput = {e => this.handleInput(e)}
            onBlur={e => this.props.handleBlur(e, this.state.contentinput, this.props.projecttitle, this.props.openid)}
            maxLength="100"
          />
        </View>
        <AtButton className="info-button" hover-class='button-hover-effect' onClick={() => taro.redirectTo({
          url: '/pages/project/project?name=' + this.props.projecttitle + '&user=' + this.props.openid
        })}>
          进入项目
          </AtButton>
      </View>
    )
  }
}