import React, { Component } from 'react'
import { AtSearchBar } from 'taro-ui'

export default class Searchbar extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  onChange (value) {
    this.setState({
      value: value
    })
  }
  render () {
    return (
      <AtSearchBar className="searchbar"
        value={this.state.value}
        onChange={this.onChange.bind(this)}
      />
    )
  }
}