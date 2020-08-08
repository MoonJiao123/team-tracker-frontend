import React, { Component } from 'react'
import { AtSearchBar } from 'taro-ui'

export default class Searchbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  onChange (value) {
    this.setState({
      value: value
    })
  }
  handleClear(){
    this.setState({
      value: ''
    })
  }
  render () {
    return (
      <AtSearchBar className="searchbar"
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onActionClick = {e => this.props.handleClick(e,this.state.value,this.props.openid)}
        onClear = {e => this.props.getCurrent(e)}
      />
    )
  }
}