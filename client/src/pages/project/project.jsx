import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import './project.scss'
import '../index/index.scss'
import Task from '../../components/Task'
import SearchTask from '../../components/SearchTask'
import CurrentMembers from '../../components/CurrentMembers'
import NavBar from '../../components/Navbar'
import { getCurrentInstance } from '@tarojs/taro'

export default class Project extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      projectname: ''
    }

  }

  //get call to get all current projects
  config = {
    navigationBarTitleText: '我的项目',
  }

  componentWillMount(){
    this.setState({
      user: getCurrentInstance().router.params.user,
      projectname: getCurrentInstance().router.params.name
    })
  }

  render() {
    return (
      <View className='index'>
        <NavBar/>
        <SearchTask />
        <CurrentMembers />
        <Task user={this.state.user} projectname={this.state.projectname}/>
      </View>

    )
  }
}
