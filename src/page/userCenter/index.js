import './index.less'
import React from 'react'
import Header from "../compnent/header";
import Nav from "../compnent/nav";
import IdiomUcItem from "../compnent/IdiomUcItem";
import BuzzUcItem from "../compnent/BuzzUcItem";

import axios from 'axios'
import { guid, baseUrl } from '../../util/commonUtil'

export default class UserCenter extends React.Component {
  state = {
    reflashFlag: false,
    tabFlag: 'answer',
    userInfo: null
  }

  componentWillMount = () =>{
    let userInfo = window.localStorage.getItem("userInfo")
    if (userInfo) {
      this.setState({
        userInfo: JSON.parse(userInfo)
      })
    } else {
      window.location.href = "./loginRegister?pageFlag=login"
    }
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

  getUserInfo = () => {
    axios.get(
      baseUrl + '/api/user/info',
      {
        headers: {
        'X-Timestamp': Date.parse( new Date() ).toString(),
        'X-Nonce': guid()
      }
    })
    .then((response) => {
      console.log(response.data)
    })
  }

  getShowSectionBody = () => {
    const { tabFlag } = this.state
    switch (tabFlag) {
      case "answer":
        return this.getAnswerSectionBody();
      case "question":
        return this.getQuestionSectionBody();
      case "information":
        return this.getInformationSectionBody();
      default:
        return null;
    }
  }

  getAnswerSectionBody = (pageFlag) => {
    if (pageFlag === "buzzwords") {
      return (
        <div className="ucAnswerCon">
          <div className="ucAnswer">
            <BuzzUcItem />
          </div>
        </div>
      )
      }
      return (
        <div className="ucAnswerCon">
          <div className="ucAnswer">
            <IdiomUcItem />
          </div>
        </div>
      )
      
  }


  getQuestionSectionBody = () => {
    return (
      <div className="ucQuestionCon">
        <div className="ucQuestion">
        <div className="ucQuestionListSec">
          <div className="ucQuestionSecItem">
            <div className="ucQuestionSecText">不入虎穴焉得虎子</div>
            <div className="ucQuestionSecLink" onClick={() => this.hanldeGoAnswer(1)}>View explanation</div>
          </div>
        </div>
        </div>
      </div>
    )
  }
  getInformationSectionBody = () => {
    const {userInfo} = this.state
    return (
      <div className="ucInformationCon">
        <div className="ucInformation">
          <div className="ucInformationSec">
            <div className="ucInformationEdit" onClick={this.handleClickEdit}>Edit</div>
            <div className="ucInformationItem">
              <div className="ucInformationText">
                <span className="red">*</span> Name:
              </div>
              <input className="ucInformationInput" value={userInfo && userInfo.userName?userInfo.userName : null}/>
            </div>
            <div className="ucInformationItem">
              <div className="ucInformationText">
                Mobile phone:
              </div>
              <input className="ucInformationInput" value={userInfo && userInfo.tel?userInfo.tel : null}/>
            </div>
            <div className="ucInformationItem">
              <div className="ucInformationText">
                <span className="red">*</span> E-mail:
              </div>
              <input className="ucInformationInput" value={userInfo && userInfo.email?userInfo.email : null}/>
            </div>
            <div className="ucInformationItem">
              <div className="ucInformationText">
                face/ins:
              </div>
              <input className="ucInformationInput"/>
            </div>
            <div className="ucInformationItem">
              <div className="ucInformationText">
                Profile:
              </div>
              <textarea rows="4" className="ucInformationTexArea"/>
            </div>
            <div className="ucInformationButtonItem">
              <div className="ucInformationButton">Cancel</div>
              <div className="ucInformationButton act">Submit</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  handleChangeTab = tabFlag => {
    this.setState({
      tabFlag
    })
  }
  render() {
    const { tabFlag } = this.state
    let questionStyle = "ucDiff"
    let answerStyle = "ucDiffMarg"
    let informationStyle = "ucDiffMarg"

    switch (tabFlag) {
      case "answer":
        answerStyle += " act";
        break 
      case "question":
        questionStyle += " act";
        break 
      case "information":
        informationStyle += " act";
        break 
      default:break
    }
    return (
      <div className="userCenter">
        <Header />
        <Nav
          handleGoIdiom={this.handleGoIdiom}
          handleGoBuzzwords={this.handleGoBuzzwords}
          handleGoQA={this.handleGoQA}
        />
        <div className="userCenterTitleCon">
          <div className="userCenterTitle">
            <div className="ucTitleText">User Center</div>
            <div className="ucTitleHead" />
          </div>
        </div>

        <div className="userCenterDiffCon">
          <div className="userCenterDiff">
            <div className={questionStyle} onClick={() => this.handleChangeTab("question")}>My question</div>
            <div className={answerStyle} onClick={() => this.handleChangeTab("answer")}>My answer</div>
            <div className={informationStyle} onClick={() => this.handleChangeTab("information")}>My information</div>
          </div>
        </div>
        {this.getShowSectionBody()}
      </div>
    )
  }
}
