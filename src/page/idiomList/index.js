import './index.less'
import React from 'react'
import { Pagination } from 'antd';
import qs from 'qs'
import Header from "../compnent/header";
import Nav from "../compnent/nav";
import HeaderSearch from "../compnent/headerSearch";

import Sorry from '../compnent/Sorry'
import IdiomItem from "../compnent/IdiomItem";

export default class idiomList extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'idiom',
    placeholder: 'Enter Your Idiom',
    idiomStyle: "idiomLinkItem act",
    buzzwordsStyle: "idiomLinkItem",
    searchValue: '',
    searchFlag: 2, // 0 搜索中 1 搜索成功 2 搜索失败
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
  }

  componentDidMount =() =>{
    
  }

  handleABCClick = item => {
    console.log(item)
  }

  getShowSection = () => {
    const { pageFlag, searchFlag, searchRes } = this.state
    if (searchFlag === 2) {
      return <Sorry />
    } else if (searchFlag === 1) {
      return <IdiomItem />
    } else {
      return  (<div className="idiomSearchingCon">
                <div className="idiomSearching">
                  Searching
                </div>
              </div>)
    }
  }

  render() {
    const { pageFlag, idiomStyle, buzzwordsStyle, searchFlag, searchValue, searchRes } = this.state
    return (
      <div className="idiomListHome">
        <Header />
        <Nav
          idiomStyle={idiomStyle}
          buzzwordsStyle={buzzwordsStyle}
          handleGoIdiom={this.handleGoIdiom}
          handleGoBuzzwords={this.handleGoBuzzwords}
        />
        <HeaderSearch searchValue={searchValue}/>
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
