import './index.less'
import React from 'react'
import qs from 'qs'
import { message } from 'antd'
import Header from "../compnent/header";
import Footer from "../compnent/footer";

import Nav from "../compnent/nav";
export default class Idiom extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'idiom',
    placeholder: 'Enter Your Idiom',
    idiomStyle: "idiomLinkItem act hoverMo",
    buzzwordStyle: "idiomLinkItem hoverMo",
    searchValue: '',
    ABCList: ['A', 'B', 'C', 'D','E','F','G','H','J','K','L','M','N','O','P','Q','R','S','T','W','X','Y','Z',]
  }

  componentWillMount =() =>{
    let queryObject = window.location.search
    let query = qs.parse(queryObject.slice(1))
    let pageFlag = query && query.pageFlag ? query.pageFlag : 'idiom'
    if (pageFlag ==="buzzword") {
      this.setState({
        pageFlag: 'buzzword',
        idiomStyle: "idiomLinkItem hoverMo",
        buzzwordStyle: "idiomLinkItem act hoverMo",
        placeholder: 'Enter Your Buzzwords',
      })
    }
  }
  componentDidMount =() =>{
    //回车事件
    document.onkeydown = (event) => {
      var e = event || window.event;
      if (e && e.keyCode === 13) { //回车键的键值为13
        this.handleSearch()
      }
    };
  }

  handleGoIdiom = () => {
    // console.log("idiom")
    this.setState({
      pageFlag: 'idiom',
      idiomStyle: "idiomLinkItem act hoverMo",
      buzzwordStyle: "idiomLinkItem hoverMo",
      placeholder: 'Enter Your Idiom',
    })
  }
  handleGoBuzzword = () => {
    // console.log("buzzword")
    this.setState({
      pageFlag: 'buzzword',
      idiomStyle: "idiomLinkItem hoverMo",
      buzzwordStyle: "idiomLinkItem act hoverMo",
      placeholder: 'Enter Your Buzzwords',
    })
  }

  handleGoQA = () => {
    let qaUrl = "./qa?pageFlag=" + this.state.pageFlag
    window.location.href = qaUrl
  }

  handleChangeSearchValue = e => {
    this.setState({
      searchValue: e.target.value,
    })
  }

  handleSearch = () => {
    const { searchValue, pageFlag } = this.state
    if (searchValue) {
      window.location.href = "/idiomList?searchMode=full&pageFlag="+ pageFlag +"&searchValue=" + searchValue
    } else {
      message.info("Please enter what you are looking for")
    }
  }

  handleABCClick = item => {
    const { pageFlag } = this.state
    window.location.href = "/idiomList?searchMode=first&pageFlag="+ pageFlag +"&searchValue=" + item
  }

  render() {
    const { idiomStyle, buzzwordStyle, placeholder, searchValue, ABCList } = this.state
    return (
      <div className="idiomHome">
        <Header />
        <Nav
          idiomStyle={idiomStyle}
          buzzwordStyle={buzzwordStyle}
          handleGoIdiom={this.handleGoIdiom}
          handleGoBuzzword={this.handleGoBuzzword}
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
              <div className="searchButton hoverMo" onClick={this.handleSearch}>
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
                    <div className="ABCItem hoverMo" onClick={() => this.handleABCClick(item)} key={"abc" + index}>
                      <div className="ABCItemCon">
                        {item}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
