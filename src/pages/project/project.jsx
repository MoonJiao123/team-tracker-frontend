import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import './project.scss'
import Task from '../../components/Task'
import logoimg from './images/logo.png'
import SearchTask from '../../components/SearchTask'
import CurrentMembers from '../../components/CurrentMembers'
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";

export default class Project extends Component {

  Logo() {
    return (
      <View className="logo">
        <Image src={logoimg} style='width: 70px;height: 70px;' />
      </View>
    )
  }

  //get call to get all current projects
  config = {
    navigationBarTitleText: '我的项目',
  }


  render() {
    return (
      <View className='project'>
        {this.Logo()}
        <CurrentMembers/>
        <SearchTask />
        <Task />
      </View>

    )
  }
}
