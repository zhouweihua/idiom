import './index.less'
import React from 'react'
import qs from 'qs'
import { Checkbox } from 'antd';
import Header from "../compnent/header";
import Nav from "../compnent/nav";
export default class LoginRegister extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'login',
    checkboxFlag: false,
    IDValue: '',
    pwValue: '',
    cpwValue: '',
  }

  componentWillMount =() =>{
    let queryObject = window.location.search
    let query = qs.parse(queryObject.slice(1))
    let pageFlag = query && query.pageFlag ? query.pageFlag : 'login'
    this.setState({
      pageFlag
    })
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

  handleCheckboxChange = e => {
    // console.log('Checkbox checked', e.target.value);
    this.setState({
      checkboxFlag: e.target.value,
    });
  }
  handleChangeIDValue= e => {
    this.setState({
      IDValue: e.target.value,
    })
  }
  handleChangePwValue= e => {
    this.setState({
      pwValue: e.target.value,
    })
  }
  handleChangeCpwValue= e => {
    this.setState({
      cpwValue: e.target.value,
    })
  }
  handleGoConfirm = () => {
    const { pageFlag,IDValue, pwValue, cpwValue } = this.state
    switch (pageFlag) {
      case "login":
        console.log(IDValue + ' ' + pwValue)
        return;
      case "register":
        return;
      case "forgot":
        return;
      default:
        return;
    }
  }

  render() {

    const { pageFlag, IDValue, pwValue, cpwValue } = this.state
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
              {pageFlag === "register" || pageFlag === "forgot" ? <div className="lrInformationItem">
                <div className="lrInformationText">
                  Identifying code
                </div>
                <input
                  className="lrInformationInput" 
                  value={IDValue}
                  onChange={this.handleChangeIDValue}/>
              </div> : null}
              <div className="lrInformationItem">
                <div className="lrInformationText">
                  Password
                </div>
                <input
                  className="lrInformationInput"
                  type="password"
                  value={pwValue}
                  onChange={this.handleChangePwValue}
                />
              </div>
              {pageFlag === "forgot" ? <div className="lrInformationItem">
                <div className="lrInformationText">
                  Confirm Password
                </div>
                <input
                  className="lrInformationInput"
                  type="password"
                  value={cpwValue}
                  onChange={this.handleChangeCpwValue}
                />
              </div> : null}
              {pageFlag === "forgot" ? <div className="lrTerm">
                <Checkbox value={this.state.checkboxFlag} onChange={this.handleCheckboxChange}>
                  I agree with the terms of use
                </Checkbox>
                <div className="lrTermForgot">Forget  password?</div>
              </div> : null}
              <div className="lrInformationButtonItem">
                <div className="lrInformationButton" onClick={this.handleGoConfirm}>Submit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
