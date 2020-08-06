import { View, Button,Image } from '@tarojs/components'
import React, { Component } from 'react'
import minus from './images/minus.png'
class DeleteProjectButton extends Component {
    constructor() {
        super();
        this.state = {
            clicked: 0,
        }
        this.handleClick = this.handleClick.bind(this);

    }
    handleClick(e) {
        this.setState({
            clicked: 1
        });
        console.log("deleted the project")
    }
    render(){
        return (
            <View className="minus-image"><Image src={minus}  onClick = {this.handleClick} style='width: 90px;height: 50px;'/></View>
          
        )
    }
    
}
export default DeleteProjectButton