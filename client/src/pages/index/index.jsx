import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AddProjectButton, ProjectInfo } from '../../components'
import Searchbar from '../../components/Searchbar'
import Login from '../../components/login'
import NavBar from '../../components/Navbar'
import Taro, { connectSocket } from "@tarojs/taro";

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
    }
  }
  componentWillMount() {
    //let getter = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openId)
        var openid = res.result.openId;
        this.setState({
          user: openid
        });
      }
    })
  }


  //get call to get all current projects
  getcurrentprojects(user) {
    wx.vrequest({
      url:
        "https://stark-crag-91309.herokuapp.com/api/project/own/" + user,

      success: res => {
        return res.data
      }
    });

  }

  config = {
    navigationBarTitleText: '首页',
    usingComponents: {
      'navbar': '../../components/Navbar', // 书写第三方组件的相对路径
    }
  }
  render() {
    
    let currentProject =this.getcurrentprojects(this.state.user);
    let listprojects = currentProject&&currentProject.map((d) => <View className="projectlist" key={d.projecttitle}><ProjectInfo projecttitle={d.projecttitle} projectcontent={d.projectcontent} /></View>);

    return (
      <View className="index">
        <NavBar />
        <View className="inline-block">
        </View>
        <Searchbar />
        <Login />
        <AddProjectButton openid={this.state.user} getcurrentprojects={this.getcurrentprojects}/>
        <View className='currentproject'>
          {listprojects != null ? { listprojects } : <View className='project-title'>No project listed, please add some projects ;-;</View>}
        </View>
      </View>

    )
  }
}
