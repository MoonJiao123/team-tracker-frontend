import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AddProjectButton, ProjectInfo } from '../../components'
import Logo from '../../components/Logo'
import Searchbar from '../../components/Searchbar'
import Login from '../../components/login'

export default class Index extends Component {
 
  //get call to get all current projects
  getcurrentprojects() { }
  config = {
    navigationBarTitleText: '首页',
  }
  render() {
    let samepleproject1 = { 'projecttitle': 'pikachu', 'projectcontent': 'sameple contenthhhhhhhhhhhhhhh sdfsfssdafadfaadfasdfa' };
    let samepleproject2 = { 'projecttitle': 'animalcrosiing', 'projectcontent': 'askdfsakdhfklasdhfsahfkds skahdflksdhf fksdhfks' };
    let currentProject = [];
    currentProject.push(samepleproject1);
    currentProject.push(samepleproject2);
    console.log(currentProject)
    //render a list of projects
    const listProjects = currentProject.map((d) => <View className="projectlist" key={d.projecttitle}><ProjectInfo projecttitle={d.projecttitle} projectcontent={d.projectcontent} /></View>);
    return (
      <View className="index">
        <Login/>
        <View className="inline-block">
          <Logo />
          
        </View>
        <AddProjectButton />
        <Searchbar />

        <View className='currentproject'>
          {listProjects}
        </View>
      </View>

    )
  }
}
