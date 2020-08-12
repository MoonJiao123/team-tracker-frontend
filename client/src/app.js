import React, { Component } from "react";
import Taro from "@tarojs/taro";
import "./util/v-request";
import "./custom-variables.scss";
import "./app.scss";

class App extends Component {
  componentWillMount() {
    //云开发初始化
    wx.cloud.init({
      env: "cloud-env-ciizt",
      traceUser: true
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
