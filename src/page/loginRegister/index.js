import './index.less'
import React from 'react'
import qs from 'qs'
import { Checkbox, message, Modal } from 'antd';
import Header from "../compnent/header";
import Footer from "../compnent/footer";
import Nav from "../compnent/nav";

import axios from 'axios'
import { guid, baseUrl } from '../../util/commonUtil'

export default class LoginRegister extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'login',
    loginCheckboxFlag: false,
    registCheckboxFlag: false,
    userValue: '', // 用户名 == email
    verifyCode: '', // 验证码
    verifyFlag: true,
    verifyText:'Send',
    pwValue: '', // 密码
    cpwValue: '',// 重复密码
    redirUrl: './?pageFlag=idiom' // 默认首页
  }
  countDown = 60

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
  
  handleGoBuzzword = () => {
    window.location.href = "./?pageFlag=buzzword"
  }

  handleGoQA = () => {
    let qaUrl = "./qa?pageFlag=" + this.state.pageFlag
    window.location.href = qaUrl
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

  handleloginCheckboxFlag = e => {
    this.setState({
      loginCheckboxFlag: !this.state.loginCheckboxFlag,
    });
  }
  handleregistCheckboxFlag = e => {
    this.setState({
      registCheckboxFlag: !this.state.registCheckboxFlag,
    });
  }
  handleGoFogot = () => {
    window.location.href = "./loginRegister?pageFlag=forgot"
  }
  handleChangeUserValue= e => {
    this.setState({
      userValue: e.target.value,
    })
  }
  handleChangeverifyCode= e => {
    this.setState({
      verifyCode: e.target.value,
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
  
  handleSendVer = () => {
    let self = this
    const {verifyText, verifyFlag, userValue} = this.state
    if (userValue === null || userValue === "") {
      message.info('邮箱不能为空')
      return
    }
    if (verifyFlag) {

      let modalVerifyCode = Modal.info({
        title: 'Info',
        content: 'The verification code has been sent to your email, please check and input to complete the registration',
        onOk:()=>{
          modalVerifyCode.destroy()
        
        // 倒计时
        this.intervalId = setInterval(() => {
          if (self.countDown <= 0) {
            clearInterval(self.intervalId)
            self.setState({
              verifyFlag: true,
              verifyText: 'Send'
            })
            self.countDown = 60
          } else {
            self.setState({
              verifyFlag: false,
              verifyText: self.countDown + 's'
            })
            self.countDown--
          }
        }, 1000)
        
          // 发起验证码接口
          let params = {}
          params.email = userValue
          axios.post(
            baseUrl + '/api/user/sendcode',
            params,
            {
              headers: {
              'X-Timestamp': Date.parse( new Date() ).toString(),
              'X-Nonce': guid()
            }
          })
          .then((response) => {
            // console.log(response.data)
            if (response && response.data && response.data.code ==='112') {
              window.location.href = "./loginRegister?pageFlag=login&redirUrl="+encodeURIComponent(window.location.href)
              return
            }
            if (response && response.data && response.data.code ==='000') {
              let modalAnswer = Modal.info({
                title: 'Info',
                content: '发送验证码成功',
                onOk:()=>{modalAnswer.destroy()}
              });
            } else {
              message.info(response.data.message)
            }
          })
          this.setState({verifyFlag: true})

        }
      });
  
    } else {
      message.info("正在倒计时")
    }

  }

  handleGoConfirm = () => {
    const { pageFlag, userValue, verifyCode,verifyFlag, verifyText, pwValue, cpwValue, loginCheckboxFlag, registCheckboxFlag } = this.state
    let params = {}
    switch (pageFlag) {
      case "login":
        // console.log(userValue + ' ' + pwValue)
        if (loginCheckboxFlag) {
          params.email = userValue
          params.password = pwValue
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
            if (response && response.data && response.data.code ==='112') {
              window.location.href = "./loginRegister?pageFlag=login&redirUrl="+encodeURIComponent(window.location.href)
              return
            }
            if (response && response.data && response.data.code ==='000') {
              window.localStorage.setItem("userInfo", JSON.stringify(response.data.data))
              window.location.href = this.state.redirUrl
            } else {
              message.info(response.data.message)
            }
          })
        } else {
          message.info("请同意相关条款")
        }
        return;
      case "register":
        if (registCheckboxFlag) {
          params.email = userValue
          params.userName = userValue
          params.password = pwValue
          params.code = verifyCode
          axios.post(
            baseUrl + '/api/user/signup',
            params,
            {
              headers: {
              'X-Timestamp': Date.parse( new Date() ).toString(),
              'X-Nonce': guid()
            }
          })
          .then((response) => {
            // console.log(response.data)
            if (response && response.data && response.data.code ==='112') {
              window.location.href = "./loginRegister?pageFlag=login&redirUrl="+encodeURIComponent(window.location.href)
              return
            }
            if (response && response.data && response.data.code ==='000') {
              message.info('注册成功')
              window.location.href = "./loginRegister?pageFlag=login&redirUrl="+encodeURIComponent(this.state.redirUrl)
              return
            } else {
              message.info(response.data.message)
            }
          })
        } else {
          message.info("请同意相关注册条款")
        }
        return;
      case "forgot":
        if (cpwValue !== pwValue) {
          message.info("两次输入密码不一致")
        }
        params.email = userValue
        params.newPassword = pwValue
        params.code = verifyCode
        axios.post(
          baseUrl + '/api/user/resetpwd',
          params,
          {
            headers: {
            'X-Timestamp': Date.parse( new Date() ).toString(),
            'X-Nonce': guid()
          }
        })
        .then((response) => {
          // console.log(response.data)
          if (response && response.data && response.data.code ==='112') {
            window.location.href = "./loginRegister?pageFlag=login&redirUrl="+encodeURIComponent(window.location.href)
            return
          }
          if (response && response.data && response.data.code ==='000') {
            message.info('重置成功')
            window.location.href = "./loginRegister?pageFlag=login&redirUrl="+encodeURIComponent(this.state.redirUrl)
            return
          } else {
            message.info(response.data.message)
          }
        })
        return;
      default:
        return;
    }
  }

  handleGoRegister = () => {
    window.location.href = "./loginRegister?pageFlag=register"
  }
  
  render() {

    const { pageFlag, userValue, verifyCode, verifyText, pwValue, cpwValue } = this.state
    return (
      <div className="loginRegister">
        <Header />
        <Nav
          handleGoIdiom={this.handleGoIdiom}
          handleGoBuzzword={this.handleGoBuzzword}
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
                  email
                </div>
                <input
                  className="lrInformationInput"
                  value={userValue}
                  placeholder={'example@gmall.com'}
                  onChange={this.handleChangeUserValue}/>
              </div>

              {pageFlag === "register" || pageFlag === "forgot" ?
                <div className="lrInformationItem">
                  <div className="lrInformationText">
                    Verification code
                  </div>
                  <div className="lrInformationVerCont">
                    <input
                      className="lrInformationVerInput" 
                      value={verifyCode}
                      placeholder={'code'}
                      onChange={this.handleChangeverifyCode}/>
                    <div className="lrInformationButton hoverMo" onClick={this.handleSendVer}>{verifyText}</div>
                  </div>
                </div> : null}

              <div className="lrInformationItem">
                <div className="lrInformationText">
                  Password
                </div>
                <input
                  className="lrInformationInput"
                  type="password"
                  placeholder={'password'}
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

              {pageFlag === "login" ? <div className="lrTerm">
                <Checkbox checked={this.state.loginCheckboxFlag} onChange={this.handleloginCheckboxFlag}>
                  I agree with the terms of use the login agreements
                </Checkbox>
                <div className="lrTermForgot hoverMo" onClick={this.handleGoFogot}>Forget  password?</div>
              </div> : null}

              {pageFlag === "register" ? <div className="lrTerm">
                <Checkbox checked={this.state.registCheckboxFlag} onChange={this.handleregistCheckboxFlag}>
                  I agree with the terms of use the register agreements
                </Checkbox>
              </div> : null}

              {pageFlag === "login" ? <div className="lrInformationButtonItem">
                <div className="lrInformationButton hoverMo" onClick={this.handleGoConfirm}>LOGIN</div>
                <div className="lrInformationRegistButton hoverMo" onClick={this.handleGoRegister}>Register</div>
              </div> : null}

              {pageFlag === "register" ? <div className="lrInformationButtonItem">
                <div className="lrInformationButton hoverMo" onClick={this.handleGoConfirm}>Register</div>
              </div> : null}


              {pageFlag === "forgot" ? <div className="lrInformationButtonItem">
                <div className="lrInformationButton hoverMo" onClick={this.handleGoConfirm}>Reset</div>
              </div> : null}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
