import './index.less'
import React from 'react'
import { message } from 'antd'

export default class Idiom extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'idiom',
    placeholder: 'Enter Your Idiom',
    idiomStyle: "idiomLinkItem act",
    buzzwordsStyle: "idiomLinkItem",
    searchValue: '',
    ABCList: ['A', 'B', 'C', 'D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',]
  }

  componentDidMount() {
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

  resetAct = () => {
  }
  handleGoQA = () => {
    
  }
  handleChangeSearchValue = e => {
    this.setState({
      searchValue: e.target.value,
    })
  }

  handleSearch = () => {
    const { searchValue, pageFlag } = this.state
    if (searchValue) {
      window.location.href = "/idiomList?type="+ pageFlag +"&searchValue=" + searchValue
    } else {
      message.info("请输入需要查询的内容")
    }
  }

  handleABCClick = item => {
    console.log(item)
  }


  render() {
    const { idiomStyle, buzzwordsStyle, placeholder, searchValue, ABCList } = this.state
    return (
      <div className="idiomHome">
        <div className="idiomTitleCon">
          <div className="idiomTilte">
            <div className="idiomIcon" /> 
            <div className="idiomLink">
              <div className={idiomStyle} onClick={this.handleGoIdiom}>Idiom</div>
              <div className={buzzwordsStyle} onClick={this.handleGoBuzzwords}>Buzzwords</div>
              <div className="idiomLinkItem" onClick={this.handleGoQA}>Q and A list</div>
            </div>
          </div>
        </div>
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
