import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { AddProjectButton, ProjectInfo } from '../../components'
import Searchbar from '../../components/Searchbar'
import Login from '../../components/login'
import NavBar from '../../components/Navbar'
import Taro, { connectSocket, removeSavedFile } from "@tarojs/taro";
import manager from '../../components/images/manager.png';
import team from '../../components/images/team.png'
export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      currentproject: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.getCurrent = this.getCurrent.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.resetelement = React.createRef();
    this.clearelement = React.createRef();

    //let getter = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        var openid = res.result.openId;
        this.setState({
          user: openid
        });

        //get inital current project
        wx.request({
          url:
            "https://stark-crag-91309.herokuapp.com/api/project/own/" + res.result.openId,
          dataType: JSON,
          success: res => {
            this.setState({
              currentproject: res.data,
            })
          }
        });
      }
    })
  }

  handleBlur(e, content, name, user) {
    let mydata = {
      projectDescription: content,
      projectName: name,
      ownerName: user
    }
    wx.request({
      url: "https://stark-crag-91309.herokuapp.com/api/project",
      method: "POST",

      data: JSON.stringify(mydata),
      dataType: "json",
      header: {
        "content-ype": "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log("res " + JSON.stringify(res.data))
        // this.setState({
        //   currentproject: res.data,
        // })
      }
    });
  }

  //onActionClick for search bar
  handleClick(e, value, user) {

    let searchdata = {
      ownerName: user,
      searchedString: value
    }
    wx.vrequest({
      url:
        'https://stark-crag-91309.herokuapp.com/api/project/search',
      data: JSON.stringify(searchdata),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      dataType: 'json',
      success: res => {
        this.setState({
          currentproject: JSON.stringify(res.data),
        })
      }

    });
  }
  //clear the search bar will call get all projects of the user again
  getCurrent(e) {
    wx.request({
      url:
        "https://stark-crag-91309.herokuapp.com/api/project/own/" + this.state.user,
      dataType: JSON,

      success: res => {
        this.setState({
          currentproject: res.data,
        })
        this.clearelement.current.handleClear();
      }
    });
  }
  //delete a project
  handleDelete(e, title, user) {
    let mydata = {
      "projectName": title,
      "ownerName": user
    }

    wx.request({
      url:
        "https://stark-crag-91309.herokuapp.com/api/project/byProjectNameAndOwnerName",

      dataType: JSON,
      data: JSON.stringify(mydata),
      method: 'DELETE',
      success: res => {
        this.setState({
          currentproject: res.data,
        })

      }
    });
  }
  //submit function of addprojectbutton
  handleSubmit(e, title, content) {
    // e.preventDefault()
    // //云开发初始化
    // wx.cloud.init({
    //   env: 'cloud-env-ciizt',
    //   traceUser: true
    // })

    let tar = {
      projectName: title,
      projectDescription: content,
      ownerName: this.state.user
    }

    //call backend ot add
    wx.request({
      url:
        "https://stark-crag-91309.herokuapp.com/api/project",
      method: 'POST',

      data: JSON.stringify(tar),
      dataType: 'json',
      header: {
        'content-ype': 'application/x-www-form-urlencoded'
      },
      success: res => {
        //refresh
        wx.vrequest({
          url:
            "https://stark-crag-91309.herokuapp.com/api/project/own/" + this.state.user,
          dataType: JSON,
          success: res => {
            this.setState({
              currentproject: res.data,
            })
            //call ref to reset addprojectbutton state
            this.resetelement.current.reset();

          }
        });
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

    let currentProject = this.state.currentproject;
    if (currentProject != undefined && currentProject.length != 0) {
      currentProject = JSON.parse(currentProject)
    }
    let listprojects = [];
    if (currentProject != undefined && currentProject.length != 0) {
      listprojects = currentProject.map((d) => <View className="projectlist" key={d.projectName}><ProjectInfo openid={this.state.user} handleDelete={this.handleDelete} projecttitle={d.projectName} projectcontent={d.projectDescription} handleBlur={this.handleBlur} /></View>);
    }
    return (
      <View className="index">
        <NavBar />
        <View className="inline-block">
        </View>
        <Searchbar handleClick={this.handleClick} ref={this.clearelement} openid={this.state.user} getCurrent={this.getCurrent} />
        <Login />
        <AddProjectButton openid={this.state.user} ref={this.resetelement} handleSubmit={this.handleSubmit} />


        <View className='my-project'>

          <View >
            <Image className='manager-pic'
              src={manager}
              style="width: 40px;height: 40px;"
            />
          </View>

          <View className="project-sep">我的项目</View>
        </View>

        <View className='currentproject'>
          {listprojects}
          {/* {!Object.keys(listprojects)?  listprojects  : <View className='project-title'>无项目，点击加号添加项目</View>} */}
        </View>




        <View className='my-project'>

          <View >
            <Image className='manager-pic'
              src={team}
              style="width: 40px;height: 40px;"
            />
          </View>

          <View className="project-sep">参与项目</View>
          
        </View>

        <View className='currentproject'>
          {/* {listprojects != null?  listprojects  : <View className='project-title'>No project listed, please add some projects ;-;</View>} */}
        </View>



      </View>

    )
  }
}
