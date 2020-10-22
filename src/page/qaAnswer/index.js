import './index.less'
import React from 'react'
import qs from 'qs'
import { Pagination } from 'antd';
import Header from "../compnent/header";
import HeaderSearch from "../compnent/headerSearch";
import Nav from "../compnent/nav";
import IdiomQaItem from "../compnent/IdiomQaItem";
import BuzzQaItem from "../compnent/BuzzQaItem";

export default class QaAnswer extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'idiom',
  }

  componentWillMount =() =>{
    let queryObject = window.location.search
    let query = qs.parse(queryObject.slice(1))
    let pageFlag = query && query.pageFlag ? query.pageFlag : 'idiom'
    if (pageFlag ==="buzzwords") {
      this.setState({
        pageFlag: 'buzzwords',
      })
    }
  }

  componentDidMount =() =>{
    
  }

  handleGoIdiom = () => {
    window.location.href = "./?pageFlag=idiom"
  }
  
  handleGoBuzzwords = () => {
    window.location.href = "./?pageFlag=buzzwords"
  }
  
  handleSearch = (searchValue) => {
    const { pageFlag } = this.state
    window.location.href = "/idiomList?pageFlag="+ pageFlag +"&searchValue=" + searchValue
  }

  getResoure = (pageFlag, searchValue) => {
    // TODO axios
  }

  getShowSectionTitle = () => {
    const { pageFlag } = this.state
    return (
      <div className="idiomQaAnswerTitleCon">
        <div className="idiomQaAnswerTitle">
          <div className="editName">
            观察夺目
          </div>
          <div className="editQaCon">

          <div className="editSubTitle">
            观察夺目
          </div>
          <div className="editSubUser">
            User：allisfree4u@gmail.com
          </div>
            <div className="editItem">
              <div className="editMainTitle">
                Chinese phonetic symbols
              </div>
              <input className="editCont" value={this.state.symbols} onChange={this.handleChangeSymbols}/>
            </div>
            {pageFlag ==="buzzwords" ? null : (
              <div className="editItem">
                <div className="editMainTitle">
                  Chinese explanation
                </div>
                <input className="editCont" />
              </div>
            )}
            <div className="editItem">
              <div className="editMainTitle">
                English interpretation
              </div>
              <input className="editCont" />
            </div>
            <div className="editItemSubmitCon">
              <div className="editItemSubmit" onClick={this.handleClickSubmit}>
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getShowSectionBody = () => {
    const { pageFlag } = this.state
    if (pageFlag === "buzzwords") {
      return (
        <div className="idiomQaAnswerCon">
          <div className="idiomQaAnswer">
            <BuzzQaItem />
          </div>
        </div>
      )
      }
      return (
        <div className="idiomQaAnswerCon">
          <div className="idiomQaAnswer">
            <IdiomQaItem />
          </div>
        </div>
      )
      
  }

  render() {
    return (
      <div className="idiomListHome">
        <Header />
        <Nav
          qaStyle={"idiomLinkItem act"}
          handleGoIdiom={this.handleGoIdiom}
          handleGoBuzzwords={this.handleGoBuzzwords}
        />
        <HeaderSearch
          handleSearch={this.handleSearch}
        />
        <div className="idiomQaNameCon">
          <div className="idiomQaName">
            <div className="qaMainSec">Questions And Answers</div>
            <div className="qaSubSec">You can ask questions or answer them. This is our interaction area</div>
          </div>
        </div>
        {this.getShowSectionTitle()}
        {this.getShowSectionBody()}
      </div>
    )
  }
}
