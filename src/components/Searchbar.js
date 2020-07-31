import React, { Component } from 'react'
import { AtSearchBar } from 'taro-ui'
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/icon.scss";
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
      <AtSearchBar
        value={this.state.value}
        onChange={this.onChange.bind(this)}
      />
    )
  }
}