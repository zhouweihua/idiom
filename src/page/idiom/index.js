import './index.less'
import React from 'react'
import qs from 'qs'
import { message } from 'antd'
import Header from "../compnent/header";
import Nav from "../compnent/nav";
export default class Idiom extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'idiom',
    placeholder: 'Enter Your Idiom',
    idiomStyle: "idiomLinkItem act",
    buzzwordsStyle: "idiomLinkItem",
    searchValue: '',
    ABCList: ['A', 'B', 'C', 'D','E','F','G','H','J','K','L','M','N','O','P','Q','R','S','T','W','X','Y','Z',]
  }

  componentWillMount =() =>{
    let queryObject = window.location.search
    let query = qs.parse(queryObject.slice(1))
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
  componentDidMount =() =>{
  }

  handleGoIdiom = () => {
    console.log("idiom")
    this.setState({
      pageFlag: 'idiom',
      idiomStyle: "idiomLinkItem act",
      buzzwordsStyle: "idiomLinkItem",
      placeholder: 'Enter Your Idiom',
    })
  }
  handleGoBuzzwords = () => {
    console.log("buzzwords")
    this.setState({
      pageFlag: 'buzzwords',
      idiomStyle: "idiomLinkItem",
      buzzwordsStyle: "idiomLinkItem act",
      placeholder: 'Enter Your Buzzwords',
    })
  }

  handleGoQA = () => {
    window.location.href = "./qa?pageFlag=" + this.state.pageFlag
  }

  handleChangeSearchValue = e => {
    this.setState({
      searchValue: e.target.value,
    })
  }

  handleSearch = () => {
    const { searchValue, pageFlag } = this.state
    if (searchValue) {
      window.location.href = "/idiomList?pageFlag="+ pageFlag +"&searchValue=" + searchValue
    } else {
      message.info("请输入需要查询的内容")
    }
  }

  handleABCClick = item => {
    const { pageFlag } = this.state
    window.location.href = "/idiomList?pageFlag="+ pageFlag +"&searchValue=" + item
  }

  render() {
    const { idiomStyle, buzzwordsStyle, placeholder, searchValue, ABCList } = this.state
    return (
      <div className="idiomHome">
        <Header />
        <Nav
          idiomStyle={idiomStyle}
          buzzwordsStyle={buzzwordsStyle}
          handleGoIdiom={this.handleGoIdiom}
          handleGoBuzzwords={this.handleGoBuzzwords}
          handleGoQA={this.handleGoQA}
        />
        <div className="idiomSearchCon">
          <div className="idiomSearch">
            <div className="searchPic" />
            <div className="searchTxt">
              Search Your Awesome Idiom
            </div>
            <div className="searchInputCon">
              <input
                className="searchInput"
                placeholder={placeholder}
                value={searchValue}
                onChange={this.handleChangeSearchValue}
              />
              <div className="searchButton" onClick={this.handleSearch}>
                Serch
              </div>
            </div>
          </div>
        </div>
        <div className="idiomABCCon">
          <div className="idiomABC">
            <div className="ABCTitle">
              Search By Initials
            </div>
            <div className="ABCSbuTitle">
              Query according to the first letter of Chinese idiom phonetic transcription
            </div>
            <div className="ABCList">
              {
                ABCList.map((item, index) => {
                  return (
                    <div className="ABCItem" onClick={() => this.handleABCClick(item)} key={"abc" + index}>
                      <div className="ABCItemCon act">
                        {item}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
