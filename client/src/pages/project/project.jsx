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
      projectname: getCurrentInstance().router.params.name,
      searchedTasks:[]
    };
    this.handlesearch= this.handlesearch.bind(this)
    this.getCurrentTasks = this.getCurrentTasks.bind(this)
    this.resettaskelement = React.createRef();
    this.clearelement = React.createRef();

  }

  //get call to get all current projects
  config = {
    navigationBarTitleText: "我的项目"
  };

  //clear results
  getCurrentTasks(e){
    this.resettaskelement.current.getTodo(this.state.projectname, this.state.user);
    this.resettaskelement.current.getDoing(this.state.projectname, this.state.user);
    this.resettaskelement.current.getDone(this.state.projectname, this.state.user);
    this.clearelement.current.reset();
  }

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
        this.setState({
          searchedTasks:res.data
        })
      }
    });
  }
 
  render() {
    return (
      <View className="index">
        <NavBar />
        <SearchTask ref={this.clearelement} getCurrentTasks={this.getCurrentTasks} handlesearch={this.handlesearch} user={this.state.user} projectname = {this.state.projectname}/>
        <CurrentMembers />
        <Task ref = {this.resettaskelement} user={this.state.user} projectname={this.state.projectname} searchedTasks={this.state.searchedTasks}/>
      </View>
    );
  }
}
