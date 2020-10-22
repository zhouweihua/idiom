import './index.less'
import React from 'react'
import { Pagination } from 'antd';
import qs from 'qs'
import Header from "../compnent/header";
import Nav from "../compnent/nav";
import HeaderSearch from "../compnent/headerSearch";

import Sorry from '../compnent/Sorry'
import IdiomItem from "../compnent/IdiomItem";
import BuzzItem from "../compnent/BuzzItem";

export default class idiomList extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'idiom',
    placeholder: 'Enter Your Idiom',
    idiomStyle: "idiomLinkItem act",
    buzzwordsStyle: "idiomLinkItem",
    searchValue: '',
    searchFlag: 1, // 0 搜索中 1 搜索成功 2 搜索失败
    searchRes: [],
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
    this.getResoure(pageFlag, searchValue)
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

  getResoure = (pageFlag, searchValue) => {
    // TODO axios
  }

  handleClickEdit = itemId => {
    const { pageFlag } = this.state
    window.location.href = "/idiomEdit?pageFlag="+ pageFlag +"&itemId=" + itemId
  }
  handleSearch = (searchValue) => {
    const { pageFlag } = this.state
    this.getResoure(pageFlag, searchValue);
  }

  getShowSection = () => {
    const { pageFlag, searchFlag, searchRes } = this.state
    if (searchFlag === 2) {
      return <Sorry pageFlag={pageFlag}/>
    } else if (searchFlag === 1) {
      if (pageFlag === "buzzwords") {
      return (
        <div className="idiomDeatailsCon">
          <div className="idiomDeatails">
            <BuzzItem handleClickEdit={() => this.handleClickEdit('111')}/>
          </div>
        </div>
      )
      }
      return (
        <div className="idiomDeatailsCon">
          <div className="idiomDeatails">
            <IdiomItem handleClickEdit={() => this.handleClickEdit('222')}/>
          </div>
        </div>
      )
      
    } else {
      return  (
        <div className="idiomSearchingCon">
          <div className="idiomSearching">
            Searching
          </div>
        </div>
      )
    }
  }

  render() {
    const { idiomStyle, buzzwordsStyle, searchFlag, searchValue } = this.state
    return (
      <div className="idiomListHome">
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
        {searchFlag === 1 ? (
          <div className="idiomPaginationCon">
            <div className="idiomPagination">
              <Pagination defaultCurrent={1} total={50} showQuickJumper/>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
