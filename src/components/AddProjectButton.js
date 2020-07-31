/**
 * 在首页点击加号创建一个项目（projectform），还有form的输入
 * 作者：Moon
 */
import Taro from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import React, { Component } from 'react'
import plus from './images/plus.png'
import ProjectForm from './ProjectForm'
class AddProjectButton extends Component {
    constructor() {
        super();
        this.state = {
            clicked: 0,
            projecttitle: '',
            projectcontent: ''
        }
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(e) {
        this.setState({
            clicked: 1
        });
    }
    handleSubmit(e) {
        e.preventDefault()
        
        //call backend ot add
        // Taro.request({
        //     url: 'https://stark-crag-91309.herokuapp.com/api/project', 
        //     data: {
        //       projecttitle: this.state.projecttitle,
        //       projectcontent: this.state.projectcontent,
        //       ownername: 'user1'
        //     },
        //     header: {
        //       'content-type': 'application/json' // 默认值
        //     },
        //     success: function (res) {
        //       console.log(res.data)
        //     }
        //   })

        this.setState({
            clicked: 0,
            projecttitle: '',
            projectcontent: '',
        })
    }
    handleTitleInput(e) {
        this.setState({
            projecttitle: e.target.value,
        })
    }

    handleContentInput(e) {
        this.setState({
            projectcontent: e.target.value,
        })
    }
  
    render() {
        return (
            <View className='addproject'>
                <View className="plusimage"><Image src={plus} onClick={this.handleClick} style='width: 50px;height: 50px;'
                /></View>

                <View className="addprojectformdiv">
                    {this.state.clicked ? <ProjectForm
                        className="addprojectform"
                        projecttitle={this.state.projecttitle}
                        projectcontent={this.state.projectcontent}
                        handleSubmit={e => this.handleSubmit(e)}
                        handleTitleInput={e => this.handleTitleInput(e)}
                        handleContentInput={e => this.handleContentInput(e)}
                    /> : null}
                </View>
            </View>

        )
    }
}

export default AddProjectButton