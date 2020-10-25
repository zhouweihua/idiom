import './index.less'
import React from 'react'
import qs from 'qs'
import Header from "../compnent/header";
import Nav from "../compnent/nav";
export default class LoginRegister extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'login',
  }

  componentWillMount =() =>{
    let queryObject = window.location.search
    let query = qs.parse(queryObject.slice(1))
    let pageFlag = query && query.pageFlag ? query.pageFlag : 'login'
    this.setState({
      pageFlag
    })
  }
  componentDidMount =() =>{
    
  }

  handleGoIdiom = () => {
    window.location.href = "./?pageFlag=idiom"
  }
  
  handleGoBuzzwords = () => {
    window.location.href = "./?pageFlag=buzzwords"
  }
  handleGoQA = () => {
    window.location.href = "./qa?pageFlag=" + this.state.pageFlag
  }


  getLrText = () => {
    const { pageFlag } = this.state
    switch (pageFlag) {
      case "login":
        return "LOGIN";
      case "register":
        return "REGISTER";
      case "forgot":
        return "FORGOT";
      default:
        return null;
    }
  }

  render() {

    return (
      <div className="loginRegister">
        <Header />
        <Nav
          handleGoIdiom={this.handleGoIdiom}
          handleGoBuzzwords={this.handleGoBuzzwords}
          handleGoQA={this.handleGoQA}
        />
        
        <div className="loginRegisterTitleCon">
          <div className="loginRegisterTitle">
            <div className="lrTitleText">{this.getLrText()}</div>
          </div>
        </div>

        <div className="lrInformationCon">
          <div className="lrInformation">
            <div className="lrInformationSec">
              <div className="lrInformationItem">
                <div className="lrInformationText">
                  Username
                </div>
                <input className="lrInformationInput"/>
              </div>
              <div className="lrInformationItem">
                <div className="lrInformationText">
                  Identifying code
                </div>
                <input className="lrInformationInput"/>
              </div>
              <div className="lrInformationItem">
                <div className="lrInformationText">
                  Password
                </div>
                <input className="lrInformationInput"/>
              </div>
              <div className="lrInformationItem">
                <div className="lrInformationText">
                  Confirm Password
                </div>
                <input className="lrInformationInput"/>
              </div>
              <div className="lrInformationButtonItem">
                <div className="lrInformationButton">Submit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
