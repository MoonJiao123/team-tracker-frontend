import Taro from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import React, { Component } from 'react'
import plus from './images/plus.png'
import ProjectForm from './ProjectForm'
import ProjectInfo from './ProjectInfo'
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
        console.log("clicked");
        this.setState({
            clicked: 1
        });
    }
    handleSubmit(e) {
        e.preventDefault()
        //call backend ot add
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
    reset() {
        this.setState({
            clicked: 0
        });
    }
    render() {
        return (

            <View className="addprojectbutton" >
                <Image src={plus} onClick={this.handleClick} />
                {this.state.clicked ? <ProjectForm
                    projecttitle={this.state.projecttitle}
                    projectcontent={this.state.projectcontent}
                    handleSubmit={e => this.handleSubmit(e)}
                    handleTitleInput={e => this.handleTitleInput(e)}
                    handleContentInput={e => this.handleContentInput(e)}
                /> : null}
            </View>

        )
    }
}

export default AddProjectButton