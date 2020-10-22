import './index.less'
import React from 'react'
import qs from 'qs'
import Header from "../compnent/header";
import Nav from "../compnent/nav";
import HeaderSearch from "../compnent/headerSearch";
import IdiomItem from "../compnent/IdiomItem";
import BuzzItem from "../compnent/BuzzItem";

export default class IdiomDetail extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'idiom',
    placeholder: 'Enter Your Idiom',
    idiomStyle: "idiomLinkItem act",
    buzzwordsStyle: "idiomLinkItem",
    searchValue: ''
  }
  componentWillMount =() =>{
    let queryObject = window.location.search
    let query = qs.parse(queryObject.slice(1))
    let searchValue = query && query.searchValue ? query.searchValue : ''
    if (searchValue) {
      this.setState({
        searchValue
      })
    }
    let pageFlag = query && query.pageFlag ? query.pageFlag : 'idiom'
    if (pageFlag ==="buzzwords") {
      this.setState({
        pageFlag: 'buzzwords',
        idiomStyle: "idiomLinkItem",
        buzzwordsStyle: "idiomLinkItem act",
        placeholder: 'Enter Your Buzzwords',
      })
    }
  }

  getShowSection = () => {
    const { pageFlag } = this.state
    if (pageFlag === "buzzwords") {
      return (
        <div className="idiomDeatailsCon">
          <div className="idiomDeatails">
            <BuzzItem />
          </div>
        </div>
      )
      }
      return (
        <div className="idiomDeatailsCon">
          <div className="idiomDeatails">
            <IdiomItem />
          </div>
        </div>
      )
      
  }

  handleGoIdiom = () => {
    window.location.href = "./idiom?pageFlag=idiom"
  }
  handleGoBuzzwords = () => {
    window.location.href = "./idiom?pageFlag=buzzwords"
  }
  handleGoQA = () => {
    window.location.href = "./qa?pageFlag=" + this.state.pageFlag
  }
  
  handleSearch = (searchValue) => {
    const { pageFlag } = this.state
    window.location.href = "/idiomList?pageFlag="+ pageFlag +"&searchValue=" + searchValue
  }

  render() {
    const { idiomStyle, buzzwordsStyle, searchValue } = this.state
    return (
      <div className="IdiomDetailHome">
        <Header />
        <Nav
          idiomStyle={idiomStyle}
          buzzwordsStyle={buzzwordsStyle}
          handleGoIdiom={this.handleGoIdiom}
          handleGoBuzzwords={this.handleGoBuzzwords}
          handleGoQA={this.handleGoQA}
        />
        <HeaderSearch
          searchValue={searchValue}
          handleSearch={this.handleSearch}
        />
        {this.getShowSection()}
      </div>
    )
  }
}
