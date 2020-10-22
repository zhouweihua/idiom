import './index.less'
import React from 'react'
import qs from 'qs'
import { Pagination } from 'antd';
import Header from "../compnent/header";
import HeaderSearch from "../compnent/headerSearch";
import Nav from "../compnent/nav";

export default class Qa extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'idiom',
    idiomStyle: "qaListTitleIdiom act",
    buzzwordsStyle: "qaListTitleBuzz",
  }

  componentWillMount =() =>{
    let queryObject = window.location.search
    let query = qs.parse(queryObject.slice(1))
    let pageFlag = query && query.pageFlag ? query.pageFlag : 'idiom'
    if (pageFlag ==="buzzwords") {
      this.setState({
        pageFlag: 'buzzwords',
        idiomStyle: "qaListTitleIdiom",
        buzzwordsStyle: "qaListTitleBuzz act",
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

  hanldeGoAnswer= (qaId) => {
    const { pageFlag } = this.state
    window.location.href = "/qaAnswer?pageFlag="+ pageFlag +"&qaId=" + qaId
  }

  render() {
    const { idiomStyle, buzzwordsStyle } = this.state
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
        <div className="idiomQaCon">
          <div className="idiomQa">
            <div className="qaMainSec">Questions And Answers</div>
            <div className="qaSubSec">You can ask questions or answer them. This is our interaction area</div>
            <div className="qaListSec">
              <div className="qaListTitle">
                <div className={idiomStyle}>Idiom</div>
                <div className={buzzwordsStyle}>Buzzwords</div>
              </div>
              <div className="qaSecItem">
                <div className="qaListTitleIdiom">光彩夺目</div>
                <div className="qaListTitleBuzz" onClick={() => this.hanldeGoAnswer(1)}>I want to answer</div>
              </div>
              <div className="qaSecItem">
                <div className="qaListTitleIdiom">不入虎穴焉得虎子</div>
                <div className="qaListTitleBuzz" onClick={() => this.hanldeGoAnswer(2)}>I want to answer</div>
              </div>
            </div>
          </div>
        </div>

        <div className="idiomPaginationCon">
          <div className="idiomPagination">
            <Pagination defaultCurrent={1} total={50} showQuickJumper/>
          </div>
        </div>
      </div>
    )
  }
}
