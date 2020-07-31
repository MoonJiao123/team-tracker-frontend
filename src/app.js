import { Component } from 'react'
import './app.scss'
import Taro from '@tarojs/taro'

class App extends Component {
  componentWillMount(){
    Taro.login({
      success: function (res) {
        if (res.code) {
          console.log('登陆成功')
          console.log(res.code)
          Taro.request({
            url: 'https://boysenberry-23sgjxsm.pai.tcloudbase.com:8081/api/project/own/'+res.code,
            method: 'GET',
            success:function(res){
              console.log(res)
            }
            // data: {
            //   code: res.code
            // }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
