import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import './project.scss'
import '../index/index.scss'
import Task from '../../components/Task'
import SearchTask from '../../components/SearchTask'
import CurrentMembers from '../../components/CurrentMembers'
import NavBar from '../../components/Navbar'
export default class Project extends Component {


  //get call to get all current projects
  config = {
    navigationBarTitleText: '我的项目',
  }

  handlerGohomeClick() {

  }

  render() {
    return (
      <View className='index'>
        <NavBar/>
        <SearchTask />
        <CurrentMembers />
        <Task />
      </View>

    )
  }
}
