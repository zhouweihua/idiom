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


  getShowSectionHead = () => {
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
        <div className="idiomQaAnswerCon">
          <div className="idiomQaAnswer">
            
          </div>
        </div>
        {this.getShowSectionHead()}
      </div>
    )
  }
}
