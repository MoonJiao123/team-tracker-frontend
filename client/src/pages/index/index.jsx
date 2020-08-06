import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AddProjectButton, ProjectInfo } from '../../components'
import Logo from '../../components/Logo'
import Searchbar from '../../components/Searchbar'
import Login from '../../components/login'
import NavBar from '../../components/Navbar'

export default class Index extends Component {
 
  //get call to get all current projects
  getcurrentprojects() { }
  config = {
    navigationBarTitleText: '首页',
    usingComponents: {
      'navbar': '../../components/Navbar', // 书写第三方组件的相对路径
    }
  }
  render() {
    let samepleproject1 = { 'projecttitle': 'pikachu', 'projectcontent': 'sameple contenthhhhhhhhhhhhhhh sdfsfssdafadfaadfasdfa' };
    let samepleproject2 = { 'projecttitle': 'animalcrosiing', 'projectcontent': 'askdfsakdhfklasdhfsahfkds skahdflksdhf fksdhfks' };
    let samepleproject3 = { 'projecttitle': 'animalcrosiing', 'projectcontent': 'askdfsakdhfklasdhfsahfkds skahdflksdhf fksdhfks' };
    let samepleproject4 = { 'projecttitle': 'animalcrosiing', 'projectcontent': 'askdfsakdhfklasdhfsahfkds skahdflksdhf fksdhfks' };
    let samepleproject5 = { 'projecttitle': 'animalcrosiing', 'projectcontent': 'askdfsakdhfklasdhfsahfkds skahdflksdhf fksdhfks' };

    let currentProject = [];
    currentProject.push(samepleproject1);
    currentProject.push(samepleproject2);
    currentProject.push(samepleproject3);
    currentProject.push(samepleproject4);
    currentProject.push(samepleproject5);
    console.log(currentProject)
    //render a list of projects
    const listProjects = currentProject.map((d) => <View className="projectlist" key={d.projecttitle}><ProjectInfo projecttitle={d.projecttitle} projectcontent={d.projectcontent} /></View>);
    return (
      <View className="index">
         <NavBar />
        <Login/>
        <View className="inline-block">
        </View>
        
        <Searchbar />
        <AddProjectButton />
        <View className='currentproject'>
          {listProjects}
        </View>
      </View>

    )
  }
}
