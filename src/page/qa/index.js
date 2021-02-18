import './index.less'
import React from 'react'
import qs from 'qs'
import { Pagination, message } from 'antd';
import Header from "../compnent/header";
import Footer from "../compnent/footer";
import HeaderSearch from "../compnent/headerSearch";
import Nav from "../compnent/nav";

import axios from 'axios'
import { guid, baseUrl } from '../../util/commonUtil'

export default class Qa extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'idiom',
    idiomStyle: "qaListTitleIdiom act",
    buzzwordStyle: "qaListTitleBuzz",
    searchRes: [],
    searchTotal: 0,
    current:1
  }

  componentWillMount =() =>{
    let queryObject = window.location.search
    let query = qs.parse(queryObject.slice(1))
    let pageFlag = query && query.pageFlag ? query.pageFlag : 'idiom'
    if (pageFlag ==="buzzword") {
      this.setState({
        pageFlag: 'buzzword',
        idiomStyle: "qaListTitleIdiom",
        buzzwordStyle: "qaListTitleBuzz act",
      })
    }
    this.getResoure(pageFlag, 1)
  }

  handleGoIdiom = () => {
    window.location.href = "./?pageFlag=idiom"
  }
  
  handleGoBuzzword = () => {
    window.location.href = "./?pageFlag=buzzword"
  }
  
  handleSearch = (searchValue) => {
    const { pageFlag } = this.state
    if (searchValue) {
      window.location.href = "/idiomList?searchMode=full&pageFlag="+ pageFlag +"&searchValue=" + searchValue
    } else {
      window.location.href = "/idiomList?searchMode=full&pageFlag="+ pageFlag +"&searchValue="
    }
  }

  hanldeGoAnswer= (qaId) => {
    const { pageFlag } = this.state
    window.location.href = "/qaAnswer?pageFlag="+ pageFlag +"&qaId=" + qaId
  }

  getResoure = (pageFlag, page) => {
    let searchUrl = baseUrl;
    if (pageFlag === "buzzword") {
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
      // console.log(response.data)
      if (response && response.data && response.data.code ==='000') {
        this.setState({
          searchRes: response.data.data,
          searchTotal:response.data.total,
          current: response.data.page,
        })
        if (page !== 1) {
          window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
          })
        }
      } else {
        message.info(response.data.message)
      }
    })
  }
  handleSwitchTab = (pageFlag) => {
    if (pageFlag ==="buzzword") {
      this.setState({
        pageFlag: 'buzzword',
        idiomStyle: "qaListTitleIdiom",
        buzzwordStyle: "qaListTitleBuzz act",
      })
    } else {
      this.setState({
        pageFlag: 'idiom',
        idiomStyle: "qaListTitleIdiom act",
        buzzwordStyle: "qaListTitleBuzz",
      })
    }
    this.getResoure(pageFlag, 1)
  }

  onPageChange = current => {
    this.getResoure(this.state.pageFlag, current);
  }

  render() {
    const { idiomStyle, buzzwordStyle, pageFlag, searchRes } = this.state
    return (
      <div className="idiomListHome">
        <Header />
        <Nav
          qaStyle={"idiomLinkItem act hoverMo"}
          handleGoIdiom={this.handleGoIdiom}
          handleGoBuzzword={this.handleGoBuzzword}
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
                <div className={buzzwordStyle} onClick={()=> this.handleSwitchTab("buzzword")}>Buzzword</div>
              </div>
              {searchRes ? searchRes.map((search, searchIndex) => {
                  return (<div className="qaSecItem" key={pageFlag + searchIndex}>
                            <div className="qaListTitleIdiom">{search.idiom || search.buzzword}</div>
                            <div className="qaListTitleBuzz hoverMo" onClick={() => this.hanldeGoAnswer(search.id)}>I want to answer</div>
                          </div>
                          )
                }): null}
            </div>
          </div>
        </div>

        <div className="idiomPaginationCon">
          <div className="idiomPagination">
              <Pagination
                total={this.state.searchTotal}
                current={this.state.current}
                showQuickJumper
                onChange={current => this.onPageChange(current)}
              />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
