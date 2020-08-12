import React, { Component } from "react";
import { View, Image } from "@tarojs/components";
import "./project.scss";
import "../index/index.scss";
import Task from "../../components/Task";
import SearchTask from "../../components/SearchTask";
import CurrentMembers from "../../components/CurrentMembers";
import NavBar from "../../components/Navbar";
import { getCurrentInstance } from "@tarojs/taro";
import Taro from "@tarojs/taro";

export default class Project extends Component {
  constructor() {
    super();
    this.state = {
      user: getCurrentInstance().router.params.user,
      projectname: getCurrentInstance().router.params.name
    };
    this.handlesearch= this.handlesearch.bind(this)
  }

  //get call to get all current projects
  config = {
    navigationBarTitleText: "我的项目"
  };

  // search task
  handlesearch(e, content, name, user) {
    let searchdata = {
      searchedString: content,
      projectName: name,
      ownerName: user,
    }
    //console.
    wx.request({
      url:
        "https://stark-crag-91309.herokuapp.com/api/task/search",
      data: JSON.stringify(searchdata),
      method: "POST",
      dataType: 'json',
      header: {
        'content-ype': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log("search res "+JSON.stringify(res.data))
        return res.data
        // this.setState({
        //   currentproject: '[' + JSON.stringify(res.data) + ']',
        // })
      }
    });
  }
  render() {
    return (
      <View className="index">
        <NavBar />
        <SearchTask handlesearch={this.handlesearch} user={this.state.user} projectname = {this.state.projectname}/>
        <CurrentMembers />
        <Task user={this.state.user} projectname={this.state.projectname} />
      </View>
    );
  }
}
