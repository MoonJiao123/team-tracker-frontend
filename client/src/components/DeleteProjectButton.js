import { View, Button,Image } from '@tarojs/components'
import React, { Component } from 'react'
import minus from './images/minus.png'
class DeleteProjectButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: 0,
        }
        this.handleClick = this.handleClick.bind(this);

    }
    handleClick(e) {
        this.props.handleDelete(e,this.props.title,this.props.openid)
        this.setState({
            clicked: 1
        });
    }
    render(){
        return (
            <View className="minus-image"><Image src={minus}  onClick = {(e) => this.props.infodelete(e, this.props.title, this.props.openid)} style='width: 90px;height: 50px;'/></View>
          
        )
    }
    
}
export default DeleteProjectButton