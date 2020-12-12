import './index.less'
import React from 'react'
import qs from 'qs'
import Header from "../compnent/header";
import Footer from "../compnent/footer";
import Nav from "../compnent/nav";
import IdiomUcItem from "../compnent/IdiomUcItem";
import BuzzUcItem from "../compnent/BuzzUcItem";
import { Pagination } from 'antd';

import axios from 'axios'
import { guid, baseUrl } from '../../util/commonUtil'

export default class UserCenter extends React.Component {
  state = {
    reflashFlag: false,
    tabFlag: 'answer',
    userInfo: null,
    pageFlag: 'idiom',
    answerList: [],
    questionList: [],
    searchTotal: 1,
    email: '',
    tel: '',
    face: '',
    profile: '',
    editShow: true
  }

  componentWillMount = () =>{
    let queryObject = window.location.search
    let query = qs.parse(queryObject.slice(1))
    let pageFlag = query && query.pageFlag ? query.pageFlag : 'idiom'
    if (pageFlag ==="buzzword") {
      this.setState({
        pageFlag: 'buzzword',
      })
    }
    let userInfo = window.localStorage.getItem("userInfo")
    if (userInfo && userInfo !=='null') {
      userInfo = JSON.parse(userInfo)
      this.setState({
        userInfo,
        email:userInfo.email,
        tel:userInfo.tel,
        face:userInfo.face,
        profile:userInfo.profile,
      })
      this.getUserAnswer(1)
    } else {
      window.location.href = "./loginRegister?pageFlag=login&redirUrl="+encodeURIComponent(window.location.href)
    }
  }

  handleGoIdiom = () => {
    window.location.href = "./?pageFlag=idiom"
  }
  
  handleGoBuzzword = () => {
    window.location.href = "./?pageFlag=buzzword"
  }

  handleGoQA = () => {
    let qaUrl = "./qa?pageFlag=" + this.state.pageFlag
    let userInfo = window.localStorage.getItem("userInfo")
    if (userInfo && userInfo !=='null') {
      window.location.href = qaUrl
    } else {
      window.location.href = "./loginRegister?pageFlag=login&redirUrl="+encodeURIComponent(qaUrl)
    }
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
      // console.log(response.data)
    })
  }

  getUserQuestion = page => {
    axios.get(
      baseUrl + '/api/user/questions?limit=10&page=' +page,
      {
        headers: {
        'X-Timestamp': Date.parse( new Date() ).toString(),
        'X-Nonce': guid()
      }
    })
    .then((response) => {
      // console.log(response.data)
      if (response && response.data) {
        this.setState({
          questionList: response.data.data,
          searchTotal:response.data.total
        })
      }
    })
  }

  getUserAnswer = page => {
    axios.get(
      baseUrl + '/api/user/answers?limit=10&page=' +page,
      {
        headers: {
        'X-Timestamp': Date.parse( new Date() ).toString(),
        'X-Nonce': guid()
      }
    })
    .then((response) => {
      // console.log(response.data)
      if (response && response.data) {
        this.setState({
          answerList: response.data.data,
          searchTotal:response.data.total
        })
      }
    })
  }

  onPageChange = current => {
    const { tabFlag } = this.state
    switch (tabFlag) {
      case "answer":
        this.getUserAnswer(current);
        return;
      case "question":
        this.getUserQuestion(current);
        return;
      default:
        return null;
    }
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

  getAnswerSectionBody = () => {
    const {answerList} = this.state
    return (
      <div className="ucAnswerCon">
        <div className="ucAnswer">
          {answerList && answerList.map((answer,anIndex) => {
            if(answer.type === "idiom") {
              return <IdiomUcItem answer={answer} key={"idiom" + anIndex}/>
            } else if(answer.type === "buzzword") {
              return <BuzzUcItem answer={answer}  key={"buzz" + anIndex}/>
            } else {
              return null
            }
          })}
        </div>
      </div>
    )
  }

  handleInfoEdit =() =>{
    this.setState({
      editShow: false
    })
  }

  handleInfoCancel =() =>{
    this.setState({
      editShow: true
    })
  }

  handleInfoSubmit =() =>{
    
  }

  getQuestionSectionBody = () => {
    const { questionList } = this.state
    return (
      <div className="ucQuestionCon">
        <div className="ucQuestion">
        <div className="ucQuestionListSec">
          {questionList ? questionList.map((question, questionIndex) => {
                  return (<div className="ucQuestionSecItem" key={"question" + questionIndex}>
                            <div className="ucQuestionSecText">{question.name}</div>
                            <div className="ucQuestionSecLink">View explanation</div>
                          </div>)
                  }): null}
        </div>
        </div>
      </div>
    )
  }
  getInformationSectionBody = () => {
    const {email, tel, face, profile, editShow } = this.state
    return (
      <div className="ucInformationCon">
        <div className="ucInformation">
          <div className="ucInformationSec">
            <div className="ucInformationEdit" onClick={this.handleInfoEdit}>Edit</div>
            <div className="ucInformationItem">
              <div className="ucInformationText">
                <span className="red">*</span> E-mail:
              </div>
              <input
                disabled={editShow}
                className="ucInformationInput"
                value={email ? email : ''}
                onChange={this.handleemail}
                />
            </div>
            <div className="ucInformationItem">
              <div className="ucInformationText">
                Mobile phone:
              </div>
              <input
                disabled={editShow}
                className="ucInformationInput"
                value={tel ? tel : ''}
                onChange={this.handletel}
              />
            </div>
            <div className="ucInformationItem">
              <div className="ucInformationText">
                face/ins:
              </div>
              <input
                disabled={editShow}
                className="ucInformationInput"
                value={face ? face : ''}
                onChange={this.handleface}
                />
            </div>
            <div className="ucInformationItem">
              <div className="ucInformationText">
                Profile:
              </div>
              <textarea 
                rows="4"
                disabled={editShow}
                className="ucInformationTexArea"
                value={profile ? profile : ''}
                onChange={this.handleprofile}
              />
            </div>
            {editShow ? null : <div className="ucInformationButtonItem">
              <div className="ucInformationButton" onClick={this.handleInfoCancel}>Cancel</div>
              <div className="ucInformationButton act" onClick={this.handleInfoSubmit}>Submit</div>
            </div>}
          </div>
        </div>
      </div>
    )
  }
  handleemail = e => {
    this.setState({
      email: e.target.value,
    })
  }
  handletel = e => {
    this.setState({
      tel: e.target.value,
    })
  }
  handleface = e => {
    this.setState({
      face: e.target.value,
    })
  }
  handleprofile = e => {
    this.setState({
      profile: e.target.value,
    })
  }

  handleChangeTab = tabFlag => {
    this.setState({
      tabFlag,
      searchTotal: 1
    })
    switch (tabFlag) {
      case "answer":
        this.getUserAnswer(1);
        return;
      case "question":
        this.getUserQuestion(1);
        return;
      default:
        return null;
    }
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
          handleGoBuzzword={this.handleGoBuzzword}
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

        {tabFlag !== "information" ? (
          <div className="userCenterPaginationCon">
            <div className="userCenterPagination">
                <Pagination
                  defaultCurrent={1}
                  total={this.state.searchTotal}
                  showQuickJumper
                  onChange={current => this.onPageChange(current)}
                />
            </div>
          </div>): null}
        <Footer />
      </div>
    )
  }
}
