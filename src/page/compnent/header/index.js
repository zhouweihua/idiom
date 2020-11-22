import './index.less'
import React from 'react'

export default class Header extends React.Component {
  state = {
    reflashFlag: false,
    loginInfo: "true",
    userHead: '',
  }
  componentWillMount = () =>{
    let loginInfo = window.localStorage.getItem("loginInfo")
    this.setState({
      loginInfo
    })
  }
  componentDidMount = () =>{
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
    window.localStorage.setItem("loginInfo", null)
    this.setState({
      loginInfo: null,
    })
  }
  render() {
    const { loginInfo } =this.state
    return (
      <div className="header">
        <div className="headerContain"> 
          {loginInfo ? (
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
