import './index.less'
import React from 'react'
import qs from 'qs'
import { Pagination } from 'antd';
import Header from "../compnent/header";
import HeaderSearch from "../compnent/headerSearch";
import Nav from "../compnent/nav";

import axios from 'axios'
import { guid, baseUrl } from '../../util/commonUtil'

export default class Qa extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'idiom',
    idiomStyle: "qaListTitleIdiom act",
    buzzwordsStyle: "qaListTitleBuzz",
    searchRes: [],
    searchTotal: 0
    
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
    this.getResoure(pageFlag, 1)
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

  getResoure = (pageFlag, page) => {
    let searchUrl = baseUrl;
    if (pageFlag === "buzzwords") {
      searchUrl = searchUrl + '/api/buzzword/questions?limit=10&page=' + page
    } else {
      searchUrl = searchUrl + '/api/idiom/questions?limit=10&page=' + page
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
      console.log(response.data)
      if (response && response.data) {
        this.setState({
          searchRes: response.data.data,
          searchTotal:response.data.total
        })
      }
    })
  }
  handleSwitchTab = (pageFlag) => {
    if (pageFlag ==="buzzwords") {
      this.setState({
        pageFlag: 'buzzwords',
        idiomStyle: "qaListTitleIdiom",
        buzzwordsStyle: "qaListTitleBuzz act",
      })
    } else {
      this.setState({
        pageFlag: 'idiom',
        idiomStyle: "qaListTitleIdiom act",
        buzzwordsStyle: "qaListTitleBuzz",
      })
    }
    this.getResoure(pageFlag, 1)
  }

  onPageChange = current => {
    this.getResoure(this.state.pageFlag, current);
  }

  render() {
    const { idiomStyle, buzzwordsStyle, pageFlag, searchRes } = this.state
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
                <div className={idiomStyle} onClick={()=> this.handleSwitchTab("idiom")}>Idiom</div>
                <div className={buzzwordsStyle} onClick={()=> this.handleSwitchTab("buzzwords")}>Buzzwords</div>
              </div>
              {searchRes ? searchRes.map((search, searchIndex) => {
                  return (<div className="qaSecItem" key={pageFlag + searchIndex}>
                            <div className="qaListTitleIdiom">{search.idiom || search.buzzword}</div>
                            <div className="qaListTitleBuzz" onClick={() => this.hanldeGoAnswer(search.id)}>I want to answer</div>
                          </div>
                          )
                }): null}
            </div>
          </div>
        </div>

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
      </div>
    )
  }
}
