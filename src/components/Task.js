/**
 * task的所有东西
 * 3个todo, doing, done, 有一个 plus button和input list 
 * 作者:Moon
 */
import { View, Image,Textarea,Input } from '@tarojs/components'
import React, { Component } from 'react'
import AddTask from './AddTask'
import plus from '../pages/project/images/plus.png'
export default class Task extends Component {
  constructor() {
    super();
    this.state = {
      clicked: 0,
      content: ''
    }
    this.handleClickTodo = this.handleClickTodo.bind(this);
    this.handleClickDoing = this.handleClickDoing.bind(this);
    this.handleClickDone = this.handleClickDone.bind(this);
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
  handleSubmit(e) {
    e.preventDefault()
    //call backend ot add
    this.setState({
      clicked: 0,
      content: '',
    })
  }
  handleContentInput(e) {
    this.setState({
      content: e.target.value,
    })
    console.log(this.state.content);

  }
  //call backend to get the lists
  getTodo() { }
  getDoing() { }
  getDone() { }
  renderlist(list) {
    return list.map((item) => <View className='tasklistitem' key={item}><Input value={item} maxLength	='100'/> </View>)
  }
  render() {
    var todos = ['没做', '啧啧啧', 'ksdjglksadjf', 'aksdjfaklsd','tesssssssdsfhasdjhfaskdjhfjkasdhfjkasdhfjkashfkjasdhfjkasdhfjdshfjshdjkfsdjfhkasjdhfkjasdhfjkasdhfjkds','dfd','asdfasdf']
    var doings = ['坐着呢', '啊啊啊', 'ksdjglksadjf', 'aksdjfaklsd']
    var dones = ['做完啦', '嘿嘿额', 'ksdjglksadjf', 'aksdjfaklsd']
    return (

      < View className="alltask" >

        <View className="task" >
          <View className="plusimage"><Image src={plus} onClick={this.handleClickTodo} style='width: 50px;height: 50px;'
          /></View>
          <View className='tasktext'>Todo</View>
          {this.state.clicked == 1 ? <AddTask taskValue={this.state.taskValue} handleContentInput={e => this.handleContentInput(e)} handleSubmit={e => this.handleSubmit(e)} /> : null}
          <View className='tasklistcontainer'>{this.renderlist(todos)}</View>
        </View>

        <View className="task" >
          <View className="plusimage"><Image src={plus} onClick={this.handleClickDoing} style='width: 50px;height: 50px;'
          /></View>
          <View className='tasktext'>Doing</View>
          {this.state.clicked == 2 ? <AddTask taskValue={this.state.taskValue} handleContentInput={e => this.handleContentInput(e)} handleSubmit={e => this.handleSubmit(e)} /> : null}
          <View className='tasklistcontainer'>{this.renderlist(doings)}</View>
        </View>

        <View className="task" >
          <View className="plusimage"><Image src={plus} onClick={this.handleClickDone} style='width: 50px;height: 50px;'
          /></View>
          <View className='tasktext'>Done</View>
          {this.state.clicked == 3 ? <AddTask taskValue={this.state.taskValue} handleContentInput={e => this.handleContentInput(e)} handleSubmit={e => this.handleSubmit(e)} /> : null}
          <View className='tasklistcontainer'>{this.renderlist(dones)}</View>
        </View>


      </View >

    )
  }

}