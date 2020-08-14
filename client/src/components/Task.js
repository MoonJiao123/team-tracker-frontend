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
import deleteimg from '../components/images/delete.png'
import { AtSwipeAction } from "taro-ui"
import "taro-ui/dist/style/components/swipe-action.scss";
export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      doings: [],
      dones: [],
      clicked: 0,
      searchedTasks: [],
    };

    this.handleClickTodo = this.handleClickTodo.bind(this);
    this.handleClickDoing = this.handleClickDoing.bind(this);
    this.handleClickDone = this.handleClickDone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTaskDelete = this.handleTaskDelete.bind(this)
    this.resetnewtask = React.createRef();

  }
  componentDidMount() {
    this.getTodo(this.props.projectname, this.props.user);
    this.getDoing(this.props.projectname, this.props.user);
    this.getDone(this.props.projectname, this.props.user);

  }
  componentWillReceiveProps(nextProps) {
    let newTodos = []
    let newDoings = []
    let newDones = []
    if (nextProps.searchedTasks !== this.props.searchedTasks) {
      nextProps.searchedTasks.forEach(element => {
        switch (element.status) {
          case `Todo`:
            newTodos.push(element.taskName)
            break
          case `Doing`:
            newDoings.push(element.taskName)
            break
          case `Done`:
            newDones.push(element.taskName)
            break
          default:
            break;
        }

      });
      this.setState({
        todos: newTodos,
        doings: newDoings,
        dones: newDones
      })
    }
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
    console.log("taskingo"+taskinfo)
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
          doings: res.data
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
          dones: res.data
        });
      }
    });
  }

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
        wx.request({
          url: "https://stark-crag-91309.herokuapp.com/api/task/updateTask",
          method: "POST",

          data: JSON.stringify(mydata),
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
        break;
      case "doing":
        let doingdata = {
          taskName: e.target.value,
          description: e.target.value,
          status: "Doing",
          projectName: this.props.projectname,
          ownerName: this.props.user,
          originalTaskName: item
        }
        wx.request({
          url: "https://stark-crag-91309.herokuapp.com/api/task/updateTask",
          method: "POST",

          data: JSON.stringify(doingdata),
          dataType: "json",
          header: {
            "content-ype": "application/x-www-form-urlencoded"
          },
          success: res => {
            this.setState({
              doings: res.data
            });
          }
        });
        break;
      case "done":
        let donedata = {
          taskName: e.target.value,
          description: e.target.value,
          status: "Done",
          projectName: this.props.projectname,
          ownerName: this.props.user,
          originalTaskName: item
        }
        wx.request({
          url: "https://stark-crag-91309.herokuapp.com/api/task/updateTask",
          method: "POST",

          data: JSON.stringify(donedata),
          dataType: "json",
          header: {
            "content-ype": "application/x-www-form-urlencoded"
          },
          success: res => {

            this.setState({
              dones: res.data
            });
          }
        });
        break;
    }
  }

  handleTaskDelete(e, mode, name) {
    let tempmode = mode
    switch (mode) {
      case 'todo':
        tempmode = 'Todo'
        break;
      case 'doing':
        tempmode = 'Doing'
        break;
      case 'done':
        tempmode = 'Done'
        break;
    }
    let deletedata = {
      taskName: name,
      status: tempmode,
      projectName: this.props.projectname,
      ownerName: this.props.user,
    }
    wx.request({
      url: "https://stark-crag-91309.herokuapp.com/api/task/byTask",
      method: "DELETE",

      data: JSON.stringify(deletedata),
      dataType: "json",
      success: res => {
        switch (mode) {
          case 'todo':
            this.setState({
              todos: res.data
            });
            break;
          case 'doing':
            this.setState({
              doings: res.data
            });
            break;
          case 'done':
            this.setState({
              dones: res.data
            });
            break;
          // code block
        }

      }
    });
  }
  //move task
  handleSwipe(e, mode, item) {
    let tempmode = mode
    switch (mode) {
      case 'todo':
        tempmode = 'Doing'
        break;
      case 'doing':
        tempmode = 'Done'
        break;
      case 'done':
        tempmode = 'Done'
        break;
    }
    let movedata = {
      taskName: item,
      newStatus: tempmode,
      projectName: this.props.projectname,
      ownerName: this.props.user,
    }
    console.log("movedata "+JSON.stringify(movedata))
    wx.request({
      url: "https://stark-crag-91309.herokuapp.com/api/task/moveTaskStatus",
      method: "POST",

      data: JSON.stringify(movedata),
      dataType: "json",
      header: {
        "content-ype": "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log("result "+JSON.stringify(res.data))
        switch (mode) {
          case 'todo':
            this.setState({
              todos: res.data[0],
              doings: res.data[1]
            });
            break;
          case 'doing':
            this.setState({
              doings: res.data[0],
              dones: res.data[1]
            });
            break;
          case 'done':
            break;
        }
      }
    });
  }
  renderlist(list, mode) {
    var list = list.map(item => (
      <AtSwipeAction className="swipe" key={item} onClick={e => this.handleSwipe(e, mode, item)} options={[
        {
          text: '下一步',
          style: {
            backgroundColor: '#CAE7B9'
          },
        },

      ]}>
        {/* <View className="tasklistitem" > */}
        <View onLongPress={e => this.handleTaskDelete(e, mode, item)} className="swipe">
          <Textarea className='input'
            value={item}
            onBlur={e => this.handleTaskBlur(mode, e, item)}
            maxlength="1000"
          />
        </View>
      </AtSwipeAction>
    ));
    return list;
  }

  render() {
    return (

      <View className="alltask">

        <View className="project-info">

          <View className="plusimage">
            <Image className="addtask"
              src={plus}
              onClick={this.handleClickTodo}
              style="width: 25px;height: 25px;"
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

          {/* <View className='deleteimg'><Image
            src={deleteimg}
            onClick={this.handledelete}
            style="width: 20px;height: 20px;"
          /></View> */}

        </View>



        <View className="project-info">
          <View className="plusimage">
            <Image className="addtask"
              src={plus}
              onClick={this.handleClickDoing}
              style="width: 25px;height: 25px;"
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
          {/* <View className='deleteimg'><Image
            src={deleteimg}
            onClick={this.handledelete}
            style="width: 20px;height: 20px;"
          /></View> */}
        </View>

        <View className="project-info">
          <View className="plusimage">
            <Image className="addtask"
              src={plus}
              onClick={this.handleClickDone}
              style="width: 25px;height: 25px;"
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
          {/* <View className='deleteimg'><Image
            src={deleteimg}
            onClick={this.handledelete}
            style="width: 20px;height: 20px;"
          /></View> */}
        </View>
      </View>
    );
  }
}
