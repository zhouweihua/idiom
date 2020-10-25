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
  getinitialstate = () => {

  }
  componentDidMount = () =>{
    let loginFlag = window.localStorage.getItem("loginFlag")
    if (loginFlag !== "true") {
      loginFlag = "false"
    }
    this.setState({
      loginFlag
    })
  }

  handleGoLogin = () => {
    window.location.href = "./loginRegister?pageFlag=login"
  }
  handleGoRegister = () => {
    window.location.href = "./loginRegister?pageFlag=register"
  }
  handleGoUserCenter = () => {
    window.location.href = "./userCenter"
  }
  handleLogout = () => {
    window.localStorage.setItem("loginFlag", "false")
    this.setState({
      loginFlag: "false",
    })
  }
  render() {
    const { loginFlag } =this.state
    return (
      <div className="header">
        <div className="headerContain"> 
          {loginFlag === "true" ? (
            <div className="login">
              <div className="userHeader"/>
              <div className="userName" onClick={this.handleGoUserCenter}>xxx@qq.com</div>/
              <div className="userLogout" onClick={this.handleLogout}> Sign out</div>
            </div>
          ) : (
            <div className="login">
              <div className="userName" onClick={this.handleGoLogin}>login</div> /
              <div className="userLogout" onClick={this.handleGoRegister}> Register</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
