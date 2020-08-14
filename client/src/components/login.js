import React, { Component } from "react"
import Taro from '@tarojs/taro'
import { View, Button, Image } from "@tarojs/components"
import '../pages/index/index.scss'

export default class Login extends Component {
  state = {
    oauthBtnStatus: true, // 授权按钮是否显示 默认为显示
    userInfo: null, // 用户信息
    btnText: '授权更精彩'
  }
  componentWillMount() {
    // 获取用户当前授权状态
    this.getOauthStatus()
  }
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}
  // 获取用户授权结果
  getOauthStatus = () => {
    Taro.getSetting().then(res => {
      if(Object.keys(res.authSetting).length === 0 || !res.authSetting['scope.userInfo']){ // 用户信息无授权
        console.log('用户无授权信息')
      }else{ // 用户允许授权获取用户信息
        // 隐藏授权按钮
        this.setState({oauthBtnStatus: false})
        // 获取用户信息
        this.getUserInfo()
      }
    })
    .catch(err => console.log(err))
  }
  // 获取用户信息
  
  getUserInfo = () => {
    Taro.getUserInfo({
      lang: 'zh_CN'
    }).then( res => { // 获取成功
      this.setState(()=>({
        userInfo: res.userInfo
      }))
      console.log(res)
    } )
    .catch( err => console.log(err) )
  }
  // 用户授权操作后按钮回调
  onGotUserInfo = res => {
    if(res.detail.userInfo){ // 返回的信息中包含用户信息则证明用户允许获取信息授权
      console.log('授权成功')
    }else{ // 用户取消授权，进行提示，促进重新授权
      Taro.showModal({
        title: '嗨请授权一下啦',
        content: '求求你了',
        showCancel: false // 不展示取消按钮
      })
        .then(ModalRes => {
          if(ModalRes.confirm){ // 点击确定按钮
            this.setState({btnText:'重新授权登录'})
          }
        })
    }
  }
  render() {
    const { oauthBtnStatus, userInfo, btnText } = this.state
    return (
      <View className='login-page'>
        { oauthBtnStatus ? <Button className='login-btn' openType='getUserInfo' onGetUserInfo={this.onGotUserInfo}>{btnText}</Button> : ''}
        {/* { userInfo ? JSON.stringify(userInfo) : ''}
        { userInfo ? <Image src={userInfo.avatarUrl} /> : ''} */}
      </View>
    )
  }
}