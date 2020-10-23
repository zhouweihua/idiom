import './index.less'
import React from 'react'
import Header from "../compnent/header";
import Nav from "../compnent/nav";
import IdiomUcItem from "../compnent/IdiomUcItem";
import BuzzUcItem from "../compnent/BuzzUcItem";
export default class UserCenter extends React.Component {
  state = {
    reflashFlag: false,
    tabFlag: 'answer',
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

  getResoure = (pageFlag, searchValue) => {
    // TODO axios
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
        ucQuestion
        </div>
      </div>
    )
  }
  getInformationSectionBody = () => {
    return (
      <div className="ucInformationCon">
        <div className="ucInformation">
        Information
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
