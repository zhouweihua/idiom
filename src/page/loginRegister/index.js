import './index.less'
import React from 'react'
import qs from 'qs'
import { Checkbox } from 'antd';
import Header from "../compnent/header";
import Nav from "../compnent/nav";

import axios from 'axios'
import { guid, baseUrl } from '../../util/commonUtil'

export default class LoginRegister extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'login',
    checkboxFlag: false,
    userValue: '',
    IDValue: '',
    pwValue: '',
    cpwValue: '',
    redirUrl: './?pageFlag=idiom' // 默认首页
  }

  componentWillMount =() =>{
    let queryObject = window.location.search
    let query = qs.parse(queryObject.slice(1))
    let pageFlag = query && query.pageFlag ? query.pageFlag : 'login'
    let redirUrl = query && query.redirUrl ? decodeURIComponent(query.redirUrl) : 'login'
    this.setState({
      pageFlag,
      redirUrl
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
  handleChangeUserValue= e => {
    this.setState({
      userValue: e.target.value,
    })
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
    const { pageFlag,userValue, IDValue, pwValue, cpwValue } = this.state
    let params ={
      "email": userValue,
      "password": pwValue
    }
    switch (pageFlag) {
      case "login":
        // console.log(userValue + ' ' + pwValue)
        axios.post(
          baseUrl + '/api/user/login',
          params,
          {
            headers: {
            'X-Timestamp': Date.parse( new Date() ).toString(),
            'X-Nonce': guid()
          }
        })
        .then((response) => {
          console.log(response.data)
          if (response && response.data) {
            this.setState({
            })
          }
        })
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

    const { pageFlag, userValue, IDValue, pwValue, cpwValue } = this.state
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
                <input
                  className="lrInformationInput"
                  value={userValue}
                  placeholder={'example@gimal.com'}
                  onChange={this.handleChangeUserValue}/>
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
