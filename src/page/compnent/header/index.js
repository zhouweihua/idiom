import './index.less'
import React from 'react'

export default class Header extends React.Component {
  state = {
    reflashFlag: false,
    loginFlag: "true",
    userHead: '',
  }
  componentWillMount = () =>{
  }
  componentDidMount = () =>{
    // let loginFlag = window.localStorage.getItem("loginFlag")
    // if (loginFlag !== "true") {
    //   loginFlag = "false"
    // }
    // this.setState({
    //   loginFlag: loginFlag
    // })
  }

  render() {
    const { loginFlag } =this.state
    return (
      <div className="header">
        <div className="headerContain">
          {loginFlag === "false" ? <div className="login">login/Register</div> : null}
          {loginFlag === "true" ? (
            <div className="login">
              <div className="userHeader"/>
              <div className="userName">xxx@qq.com</div>/
              <div className="userLogout"> Sign out</div>
            </div>
          ) :null}
        </div>
      </div>
    )
  }
}
