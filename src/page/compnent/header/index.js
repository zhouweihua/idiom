import './index.less'
import React from 'react'

export default class Header extends React.Component {
  state = {
    reflashFlag: false,
    userInfo: null,
    userHead: '',
  }
  componentWillMount = () =>{
    let userInfo = window.localStorage.getItem("userInfo")
    if (userInfo && userInfo !=='null') {
      this.setState({
        userInfo:JSON.parse(userInfo)
      })
    }
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
    window.localStorage.setItem("userInfo", null)
    this.setState({
      userInfo: null,
    })
    window.location.href = "./"
  }
  render() {
    const { userInfo } =this.state
    return (
      <div className="header">
        <div className="headerContain"> 
          {userInfo ? (
            <div className="login">
              <div className="userHeader hoverMo" onClick={this.handleGoUserCenter}/>
              <div className="email hoverMo" onClick={this.handleGoUserCenter}>{userInfo.email}</div>/
              <div className="userLogout hoverMo" onClick={this.handleLogout}> Sign out</div>
            </div>
          ) : (
            <div className="login">
              <div className="email hoverMo" onClick={this.handleGoLogin}>login</div> /
              <div className="userLogout hoverMo" onClick={this.handleGoRegister}> Register</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
