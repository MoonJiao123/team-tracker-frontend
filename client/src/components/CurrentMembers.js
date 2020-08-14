/**
 * 查看现在的队友手风琴组件
 * 作者：Moon
 */
import { View, Image } from '@tarojs/components'
import React, { Component } from 'react'
import { AtAccordion, AtList, AtListItem } from 'taro-ui'
export default class CurrentMembers extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
        }

    }

    handleClick(value) {
        this.setState({
            open: value
        })
    }

    getallMembers() {
        let list = ['A', 'B', 'C']
        let memberslist = list.map((d) => <AtListItem
            title={d}
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
        />);
        return memberslist
    }

    render() {
        return (
            <View >
                <AtAccordion className="currentmembers" open={this.state.open} onClick={this.handleClick.bind(this)}
                    title='队友' icon={{ value: 'user', size: '15' }}>
                    {this.state.open?<AtList >
                        {this.getallMembers()}
                    </AtList>:null}
                </AtAccordion>
            </View>


        )
    }

}