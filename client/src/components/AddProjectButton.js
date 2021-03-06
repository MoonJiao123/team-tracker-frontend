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
    constructor(props) {
        super(props);
        this.state = {
            clicked: 0,
            projecttitle: '',
            projectcontent: ''
        }
        this.handleClick = this.handleClick.bind(this);

    }
    reset() {
        this.setState({
            clicked: 0,
            projecttitle: '',
            projectcontent: ''
        })
    }
    handleClick(e) {
        this.setState({
            clicked: 1
        });
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
                <View className="plusimage"><Image src={plus} onClick={this.handleClick} style='width: 30px;height: 30px;'
                /></View>

                <View className="addprojectformdiv">
                    {this.state.clicked ? <ProjectForm
                        projecttitle={this.state.projecttitle}
                        projectcontent={this.state.projectcontent}
                        handleSubmit={e => this.props.handleSubmit(e, this.state.projecttitle, this.state.projectcontent)}
                        handleTitleInput={e => this.handleTitleInput(e)}
                        handleContentInput={e => this.handleContentInput(e)}
                    /> : null}
                </View>
            </View>

        )
    }
}

export default AddProjectButton