import './index.less'
import React from 'react'
import { Pagination } from 'antd';
import qs from 'qs'
import Header from "../compnent/header";
import Nav from "../compnent/nav";
import HeaderSearch from "../compnent/headerSearch";

import axios from 'axios'
import { guid, baseUrl } from '../../util/commonUtil'

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
    searchTotal: 0

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
    this.getResoure(pageFlag, searchValue,1)
  }

  componentDidMount =() =>{
    
  }

  handleGoIdiom = () => {
    // console.log("idiom")
    this.setState({
      pageFlag: 'idiom',
      idiomStyle: "idiomLinkItem act",
      buzzwordsStyle: "idiomLinkItem",
      placeholder: 'Enter Your Idiom',
      searchRes: [],
    })

    this.getResoure('idiom', this.state.searchValue,1);
  }
  
  handleGoBuzzwords = () => {
    // console.log("buzzwords")
    this.setState({
      pageFlag: 'buzzwords',
      idiomStyle: "idiomLinkItem",
      buzzwordsStyle: "idiomLinkItem act",
      placeholder: 'Enter Your Buzzwords',
      searchRes: [],
    })

    this.getResoure('buzzwords', this.state.searchValue,1);
  }

  handleGoQA = () => {
    let qaUrl = "./qa?pageFlag=" + this.state.pageFlag
    let userInfo = window.localStorage.getItem("userInfo")
    if (userInfo && userInfo !=='null') {
      window.location.href = qaUrl
    } else {
      window.location.href = "./loginRegister?pageFlag=login&redirUrl="+encodeURIComponent(qaUrl)
    }
  }

  getResoure = (pageFlag, searchValue, page) => {
    let searchUrl = baseUrl;
    if (pageFlag === "buzzwords") {
      searchUrl = searchUrl + '/api/buzzword/search?limit=10&mode=full&key='+searchValue + '&page=' +page
    } else {
      searchUrl = searchUrl + '/api/idiom/search?limit=10&mode=full&key=' + searchValue + '&page=' +page
    }
    // 发起接口
    axios.get(
      searchUrl,
      {
        headers: {
        'X-Timestamp': Date.parse( new Date() ).toString(),
        'X-Nonce': guid()
      }
    })
    .then((response) => {
      
      if (response && response.data) {
        this.setState({
          searchRes: response.data.data,
          searchTotal:response.data.total
        })
      }
    })
  }

  handleClickEdit = itemId => {
    const { pageFlag } = this.state
    window.location.href = "/idiomEdit?pageFlag="+ pageFlag +"&itemId=" + itemId
  }
  
  handleSearch = (searchValue) => {
    const { pageFlag } = this.state
    this.setState({
      searchValue
    })
    this.getResoure(pageFlag, searchValue, 1);
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
              {searchRes ? 
                searchRes.map((search, buzzIndex) => {
                  return <BuzzItem search={search}  key={"buzz" + buzzIndex} handleClickEdit={() => this.handleClickEdit(search.id)}/>
                }): null}
            </div>
          </div>
        )
      }
      return (
        <div className="idiomDeatailsCon">
          <div className="idiomDeatails">
            {searchRes ? 
              searchRes.map((search,idiomInex) => {
                return <IdiomItem search={search} key={"idiom" + idiomInex} handleClickEdit={() => this.handleClickEdit(search.id)}/>
              }): null}
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

  onPageChange = current => {
    this.getResoure(this.state.pageFlag, this.state.searchValue, current);
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
              <Pagination
                defaultCurrent={1}
                total={this.state.searchTotal}
                showQuickJumper
                onChange={current => this.onPageChange(current)}
              />
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
