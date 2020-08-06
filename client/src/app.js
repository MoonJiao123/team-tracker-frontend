import React, { Component } from "react";
import Taro from "@tarojs/taro";
import "./util/v-request";
import "./custom-variables.scss";
import "./app.scss";

class App extends Component {
  componentWillMount() {
    Taro.login({
      success: function(res) {
        if (res.code) {
          console.log("登陆成功");
          // console.log(res.code);
          if (wx.cloud) {
            wx.cloud.init({
              env: "team-tech-4sg8t",
              traceUser: true
            });
          }

          wx.vrequest({
            url:
              "http://boysenberry-23sgjxsm.pai.tcloudbase.com:8081/api/project/own/user1",
            success: res => {
              console.log("data=", res.data);
            }
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      }
    });
  }
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    // app.js

    Taro.getSystemInfo({}).then(res => {
      Taro.$navBarMarginTop = res.statusBarHeight || 0;
    });
    // 将状态栏高度挂载全局
    return this.props.children;
  }
}

export default App;
