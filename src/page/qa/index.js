import './index.less'
import React from 'react'
import { Pagination } from 'antd';
import Header from "../compnent/header";
import HeaderSearch from "../compnent/headerSearch";
import Nav from "../compnent/nav";

export default class Qa extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'idiom',
    searchValue: '',
  }
  componentWillMount =() =>{
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


  render() {
    const { searchValue } = this.state
    return (
      <div className="idiomListHome">
        <Header />
        <Nav
          qaStyle={"idiomLinkItem act"}
          handleGoIdiom={this.handleGoIdiom}
          handleGoBuzzwords={this.handleGoBuzzwords}
        />
        <HeaderSearch
          searchValue={searchValue}
          handleSearch={this.handleSearch}
        />
        <div className="idiomQaCon">
          <div className="idiomQa">
            <div className="qaMainSec">Questions And Answers</div>
            <div className="qaSubSec">You can ask questions or answer them. This is our interaction area</div>
            <div className="qaListSec">
              <div className="qaListTitle">
                <div className="qaListTitleIdiom act">Idiom</div>
                <div className="qaListTitleBuzz">Buzzwords</div>
              </div>
              <div className="qaSecItem">
                <div className="qaListTitleIdiom">光彩夺目</div>
                <div className="qaListTitleBuzz">I want to answer</div>
              </div>
              <div className="qaSecItem">
                <div className="qaListTitleIdiom">不入虎穴焉得虎子</div>
                <div className="qaListTitleBuzz">I want to answer</div>
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
