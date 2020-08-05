/**
 * task的所有东西
 * 3个todo, doing, done, 有一个 plus button和input list 
 * 作者:Moon
 */
import { View, Image, Textarea, Input } from '@tarojs/components'
import React, { Component } from 'react'
import AddTask from './AddTask'
import plus from '../components/images/plus.png'

export default class Task extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      doings: [],
      dones: [],
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
  handleTaskInput(e, mode) {
    switch (mode) {
      case 'todo':
        this.setState({
          todos: e
        })
        console.log(this.state.todos)
        break;
      case 'doing':
        this.setState({
          doings: e
        })
        break;
      case 'done':
        this.setState({
          dones: e
        })
        break;
    }
  }
  renderlist(list, mode) {
    return list.map((item) => <View className='tasklistitem' key={item}><Input value={item} onChange={this.handleTaskInput.bind(this,mode)} maxLength='100' /> </View>)
  }
  render() {
    var temptodos = ['没做', '啧啧啧', 'ksdjglksadjf', 'aksdjfaklsd', 'tesssssssdsfhasdjhfaskdjhfjkasdhfjkasdhfjkashfkjasdhfjkasdhfjdshfjshdjkfsdjfhkasjdhfkjasdhfjkasdhfjkds', 'dfd', 'asdfasdf']
    var tempdoings = ['坐着呢', '啊啊啊', 'ksdjglksadjf', 'aksdjfaklsd']
    var tempdones = ['做完啦', '嘿嘿额', 'ksdjglksadjf', 'aksdjfaklsd']
    this.state.todos = temptodos;
    this.state.doings = tempdoings;
    this.state.dones = tempdones;

    return (

      < View className="alltask" >

        <View className="project-info" >
          <View className="plusimage"><Image src={plus} onClick={this.handleClickTodo} style='width: 30px;height: 30px;'
          /></View>
          <View className='tasktext'>待完成</View>
          {this.state.clicked == 1 ? <AddTask taskValue={this.state.taskValue} handleContentInput={e => this.handleContentInput(e)} handleSubmit={e => this.handleSubmit(e)} /> : null}
          <View className='tasklistcontainer'>{this.renderlist(this.state.todos,'todo')}</View>
        </View>

        <View className="project-info" >
          <View className="plusimage"><Image src={plus} onClick={this.handleClickDoing} style='width: 30px;height: 30px;'
          /></View>
          <View className='tasktext'>进行中</View>
          {this.state.clicked == 2 ? <AddTask taskValue={this.state.taskValue} handleContentInput={e => this.handleContentInput(e)} handleSubmit={e => this.handleSubmit(e)} /> : null}
          <View className='tasklistcontainer'>{this.renderlist(this.state.doings, 'doing')}</View>
        </View>

        <View className="project-info" >
          <View className="plusimage"><Image src={plus} onClick={this.handleClickDone} style='width: 30px;height: 30px;'
          /></View>
          <View className='tasktext'>已完成</View>
          {this.state.clicked == 3 ? <AddTask taskValue={this.state.taskValue} handleContentInput={e => this.handleContentInput(e)} handleSubmit={e => this.handleSubmit(e)} /> : null}
          <View className='tasklistcontainer'>{this.renderlist(this.state.dones, 'done')}</View>
        </View>


      </View >

    )
  }

}