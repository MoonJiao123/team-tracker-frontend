import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { ProjectForm, ProjectInfo } from '../../components'
export default class Index extends Component {
  state={
    posts: [
      {
        title: '泰罗奥特曼',
        content: '泰罗是奥特之父和奥特之母唯一的亲生儿子。',
      },
    ],
    projecttitle:'',
    projectcontent:''
  }
  config = {
    navigationBarTitleText: '首页',
  }
  handleSubmit(e) {
    e.preventDefault()

    const { projecttitle: title, projectcontent: content } = this.state
    const newProject = this.state.posts.concat({ title, content })

    this.setState({
      posts: newProject,
      projecttitle: '',
      projectcontent: '',
    })
  }
  handleTitleInput(e) {
    this.setState({
      formTitle: e.target.value,
    })
  }

  handleContentInput(e) {
    this.setState({
      formContent: e.target.value,
    })
  }
  render () {
    return (
      <View className="index">
        {this.state.posts.map((post, index) => (
          <ProjectInfo key={index} title={post.title} content={post.content} />
        ))}
        <ProjectForm
          projecttitle={this.state.projecttitle}
          projectcontent={this.state.projectcontent}
          handleSubmit={e => this.handleSubmit(e)}
          handleTitleInput={e => this.handleTitleInput(e)}
          handleContentInput={e => this.handleContentInput(e)}
        />
      </View>
    )
  }
}
