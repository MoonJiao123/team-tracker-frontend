/**
 * task的所有东西
 * 3个todo, doing, done, 有一个 plus button和input list
 * 作者:Moon
 */
import {
  View,
  Image,
  Textarea,
  Input,
  MovableView,
  MovableArea
} from "@tarojs/components";
import React, { Component } from "react";
import AddTask from "./AddTask";
import plus from "../components/images/plus.png";
import Board from "./Board";
import Taskitem from "./Taskitem";
import project from "../pages/project/project.jsx";
export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      doings: [],
      dones: [],
      clicked: 0
    };

    this.handleClickTodo = this.handleClickTodo.bind(this);
    this.handleClickDoing = this.handleClickDoing.bind(this);
    this.handleClickDone = this.handleClickDone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetnewtask = React.createRef();


  }
  componentDidMount() {
    this.getTodo(this.props.projectname, this.props.user);
    this.getDoing(this.props.projectname, this.props.user);
    this.getDone(this.props.projectname, this.props.user);
  }

  handleClickTodo(e) {
    this.setState({
      clicked: 1
    });
  }
  handleClickDoing(e) {
    this.setState({
      clicked: 2
    });
  }
  handleClickDone(e) {
    this.setState({
      clicked: 3
    });
  }

  //button submit in AddTask component
  handleSubmit(e, taskinfo, status) {
    e.preventDefault();
    let mydata = {
      taskName: taskinfo,
      description: taskinfo,
      status: status,
      projectName: this.props.projectname,
      ownerName: this.props.user
    };

    //call backend ot add a task
    wx.request({
      url: "https://stark-crag-91309.herokuapp.com/api/task",
      method: "POST",

      data: JSON.stringify(mydata),
      dataType: "json",
      header: {
        "content-ype": "application/x-www-form-urlencoded"
      },
      success: res => {

        //update all the tasks
        switch (status) {
          case "Todo":
            this.setState({
              todos: res.data
            });
            break;
          case "Doing":
            this.setState({
              doings: res.data
            });
            break;
          case "Done":
            this.setState({
              dones: res.data
            });
            break;
          // code block
        }
        //refresh
        this.resetnewtask.current.resettask();
        this.setState({
          clicked: 0
        });
      }
    });
  }

  //call backend to get the lists
  getTodo(projectname, user) {
    let data = {
      projectName: projectname,
      ownerName: user
    };
    wx.request({
      url: "https://stark-crag-91309.herokuapp.com/api/task/tasksTodoByProject",
      method: "POST",

      data: JSON.stringify(data),
      dataType: "json",
      header: {
        "content-ype": "application/x-www-form-urlencoded"
      },
      success: res => {
        this.setState({
          todos: res.data
        });
      }
    });
  }
  getDoing(projectname, user) {
    let data = {
      projectName: projectname,
      ownerName: user
    };
    wx.request({
      url:
        "https://stark-crag-91309.herokuapp.com/api/task/tasksDoingByProject",
      method: "POST",

      data: JSON.stringify(data),
      dataType: "json",
      header: {
        "content-ype": "application/x-www-form-urlencoded"
      },
      success: res => {
        this.setState({
          todos: res.data
        });
      }
    });
  }
  getDone(projectname, user) {
    let data = {
      projectName: projectname,
      ownerName: user
    };
    wx.request({
      url: "https://stark-crag-91309.herokuapp.com/api/task/tasksDoneByProject",
      method: "POST",

      data: JSON.stringify(data),
      dataType: "json",
      header: {
        "content-ype": "application/x-www-form-urlencoded"
      },
      success: res => {
        this.setState({
          todos: res.data
        });
      }
    });
  }
  // handleTaskInput(mode, e, key) {
  //   switch (mode) {
  //     case "todo":
  //       var temptodo = this.state.todos.slice();
  //       temptodo[temptodo.indexOf(key)] = e.target.value;
  //       this.setState({
  //         todos: temptodo
  //       });
  //       break;
  //     case "doing":
  //       var tempdoing = this.state.doings.slice();
  //       tempdoing[tempdoing.indexOf(key)] = e.target.value;
  //       this.setState({
  //         doings: tempdoing
  //       });
  //       break;
  //     case "done":
  //       var tempdone = this.state.dones.slice();
  //       tempdone[tempdone.indexOf(key)] = e.target.value;
  //       this.setState({
  //         dones: tempdone
  //       });
  //       break;
  //   }
  // }
  handleTaskBlur(mode, e, item) {
    switch (mode) {
      case "todo":
        let mydata = {
          taskName: e.target.value,
          description: e.target.value,
          status: "Todo",
          projectName: this.props.projectname,
          ownerName: this.props.user,
          originalTaskName: item
        }
        console.log("blur data "+JSON.stringify(mydata))
        wx.request({
          url: "https://stark-crag-91309.herokuapp.com/api/task/updateTask",
          method: "POST",

          data: JSON.stringify(mydata),
          dataType: "json",
          header: {
            "content-ype": "application/x-www-form-urlencoded"
          },
          success: res => {
            console.log("blur res "+res.data)
            this.setState({
              todos: res.data
            });
          }
        });
        break;
      case "doing":
        var tempdoing = this.state.doings.slice();
        tempdoing[tempdoing.indexOf(key)] = e.target.value;
        this.setState({
          doings: tempdoing
        });
        break;
      case "done":
        var tempdone = this.state.dones.slice();
        tempdone[tempdone.indexOf(key)] = e.target.value;
        this.setState({
          dones: tempdone
        });
        break;
    }
  }
  renderlist(list, mode) {
    var list = list.map(item => (
      <View className="tasklistitem" key={item} id={item}>
        <Input
          value={item}
          // onInput={e => this.handleTaskInput(mode, e, item)}
          onBlur={e => this.handleTaskBlur(mode, e, item)}
          maxLength="100"
        />{" "}
      </View>
    ));
    return list;
  }
  render() {
    return (
      <View className="alltask">
        <View className="project-info">
          <View className="plusimage">
            <Image
              src={plus}
              onClick={this.handleClickTodo}
              style="width: 30px;height: 30px;"
            />
          </View>
          <View className="tasktext">待完成</View>
          {this.state.clicked == 1 ? (
            <AddTask
              ref={this.resetnewtask}
              status="Todo"
              handleSubmit={this.handleSubmit}
            />
          ) : null}
          <View id="todo" className="tasklistcontainer">
            {this.renderlist(this.state.todos, "todo")}
          </View>
        </View>

        <View className="project-info">
          <View className="plusimage">
            <Image
              src={plus}
              onClick={this.handleClickDoing}
              style="width: 30px;height: 30px;"
            />
          </View>
          <View className="tasktext">进行中</View>
          {this.state.clicked == 2 ? (
            <AddTask
              ref={this.resetnewtask}
              status="Doing"
              handleSubmit={this.handleSubmit}
            />
          ) : null}
          <View id="doing" className="tasklistcontainer">
            {this.renderlist(this.state.doings, "doing")}
          </View>
        </View>

        <View className="project-info">
          <View className="plusimage">
            <Image
              src={plus}
              onClick={this.handleClickDone}
              style="width: 30px;height: 30px;"
            />
          </View>
          <View className="tasktext">已完成</View>
          {this.state.clicked == 3 ? (
            <AddTask
              ref={this.resetnewtask}
              status="Done"
              handleSubmit={this.handleSubmit}
            />
          ) : null}
          <View id="done" className="tasklistcontainer">
            {this.renderlist(this.state.dones, "done")}
          </View>
        </View>
      </View>
    );
  }
}
