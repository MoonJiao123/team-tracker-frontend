import React, { Component } from "react";
import { View, Image } from "@tarojs/components";
import "./project.scss";
import "../index/index.scss";
import Task from "../../components/Task";
import SearchTask from "../../components/SearchTask";
import CurrentMembers from "../../components/CurrentMembers";
import NavBar from "../../components/Navbar";
import { getCurrentInstance } from "@tarojs/taro";

export default class Project extends Component {
  constructor() {
    super();
    this.state = {
      user: getCurrentInstance().router.params.user,
      projectname: getCurrentInstance().router.params.name
    };
    console.log(`project name is ${this.state.projectname}`);
  }

  //get call to get all current projects
  config = {
    navigationBarTitleText: "我的项目"
  };

  // //button actionclick
  // handlesearch() {
  //   let searchdata = {
  //     projectName: value,
  //     ownerName: user
  //   }
  //   wx.request({
  //     url:
  //       "https://stark-crag-91309.herokuapp.com/api/project/byProjectNameAndOwnerName",
  //     data: JSON.stringify(searchdata),
  //     method: "POST",
  //     dataType: 'json',
  //     header: {
  //       'content-ype': 'application/x-www-form-urlencoded'
  //     },
  //     success: res => {
  //       this.setState({
  //         currentproject: '[' + JSON.stringify(res.data) + ']',
  //       })
  //     }
  //   });
  // }
  render() {
    console.log(
      "user " + this.state.user + "project " + this.state.projectname
    );
    return (
      <View className="index">
        <NavBar />
        <SearchTask />
        <CurrentMembers />
        <Task user={this.state.user} projectname={this.state.projectname} />
      </View>
    );
  }
}
