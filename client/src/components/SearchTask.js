/**
 * 搜索任务
 * 作者：Moon
 */
import React, { Component } from 'react'
import { AtSearchBar } from 'taro-ui'

export default class SearchTask extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            value: ''
        }
    }
    onChange(value) {
        this.setState({
            value: value
        })
    }
    reset() {
        this.setState({
            value: ''
        })
    }
    render() {
        return (
            <AtSearchBar className="searchbar"
                value={this.state.value}
                onChange={this.onChange.bind(this)}
                onActionClick={e => this.props.handlesearch(e, this.state.value, this.props.projectname, this.props.user)}
                onClear={e => this.props.getCurrentTasks(e)}
            />
        )
    }

}