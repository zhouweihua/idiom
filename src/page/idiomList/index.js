import './index.less'
import React from 'react'
import { Pagination } from 'antd';
import qs from 'qs'
import Header from "../compnent/header";
import Footer from "../compnent/footer";
import Nav from "../compnent/nav";
import HeaderSearch from "../compnent/headerSearch";
import { message, Modal } from 'antd';


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
    idiomStyle: "idiomLinkItem act hoverMo",
    buzzwordStyle: "idiomLinkItem hoverMo",
    searchValue: '',
    searchMode: 'full',
    searchRes: [],
    searchTotal: 0,
    current:1,

  }
  componentWillMount =() =>{
    let queryObject = window.location.search
    let query = qs.parse(queryObject.slice(1))
    let searchValue = query && query.searchValue ? query.searchValue : ''
    let searchMode = query && query.searchMode ? query.searchMode : 'full'
    if (searchValue) {
      this.setState({
        searchValue,searchMode
      })
    }
    let pageFlag = query && query.pageFlag ? query.pageFlag : 'idiom'
    if (pageFlag ==="buzzword") {
      this.setState({
        pageFlag: 'buzzword',
        idiomStyle: "idiomLinkItem",
        buzzwordStyle: "idiomLinkItem act",
        placeholder: 'Enter Your Buzzwords',
      })
    }
    // console.log(searchMode)
    setTimeout(()=>{
      this.getResoure(pageFlag, searchValue,1)
    },10)

  }

  componentDidMount =() =>{
    
  }

  handleGoIdiom = () => {
    // console.log("idiom")
    // this.setState({
    //   pageFlag: 'idiom',
    //   idiomStyle: "idiomLinkItem act hoverMo",
    //   buzzwordStyle: "idiomLinkItem hoverMo",
    //   placeholder: 'Enter Your Idiom',
    //   searchRes: [],
    //   searchFlag: 0, // 1搜索结束 
    // })

    // this.getResoure('idiom', this.state.searchValue,1);

    window.location.href = "./?pageFlag=idiom"
  }
  
  handleGoBuzzword = () => {
    // console.log("buzzword")
    this.setState({
      pageFlag: 'buzzword',
      idiomStyle: "idiomLinkItem",
      buzzwordStyle: "idiomLinkItem act",
      placeholder: 'Enter Your Buzzwords',
      searchRes: [],
    })

    this.getResoure('buzzword', this.state.searchValue,1);
  }

  handleGoQA = () => {
    let qaUrl = "./qa?pageFlag=" + this.state.pageFlag
    window.location.href = qaUrl
  }

  getResoure = (pageFlag, searchValue, page) => {
    let searchUrl = baseUrl;
    let searchMode = this.state.searchMode
    if (pageFlag === "buzzword") {
      searchUrl = searchUrl + '/api/buzzword/search?limit=10&mode='+searchMode+'&key='+searchValue + '&page=' +page
    } else {
      searchUrl = searchUrl + '/api/idiom/search?limit=10&mode='+searchMode+'&key=' + searchValue + '&page=' +page
    }
    this.setState({
      searchFlag: 0
    })
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
      this.setState({
        searchFlag: 1
      })
      if (response && response.data && response.data.code ==='000') {
        this.setState({
          searchRes: response.data.data,
          searchTotal:response.data.total,
          current: response.data.page
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

  handleClickEdit = itemId => {
    const { pageFlag } = this.state
    let qaUrl = "/idiomEdit?pageFlag="+ pageFlag +"&itemId=" + itemId
    let userInfo = window.localStorage.getItem("userInfo")
    // debugger
    if (userInfo && userInfo !=='null') {
      window.location.href = qaUrl
    } else {
      window.location.href = "./loginRegister?pageFlag=login&redirUrl="+encodeURIComponent(qaUrl)
    }
  }
  
  handleSearch = (searchValue) => {
    const { pageFlag } = this.state
    this.setState({
      searchValue,
      searchMode: 'full'
    })
    setTimeout(()=>{
      this.getResoure(pageFlag, searchValue,1)
    },10)
  }

  getShowSection = () => {
    const { pageFlag, searchRes, searchFlag } = this.state
    if (searchRes && searchRes.length > 0 && searchFlag !== 0) {
      if (pageFlag === "buzzword") {
        return (
          <div className="idiomDeatailsCon">
            <div className="idiomDeatails">
              {searchRes.map((search, buzzIndex) => {
                  return <BuzzItem search={search} index={buzzIndex} key={"buzz" + buzzIndex} handleClickEdit={() => this.handleClickEdit(search.id)}/>
                })}
            </div>
          </div>
        )
      }
      return (
        <div className="idiomDeatailsCon">
          <div className="idiomDeatails">
            {searchRes.map((search,idiomInex) => {
                return <IdiomItem search={search} index={idiomInex} key={"idiom" + idiomInex} handleClickEdit={() => this.handleClickEdit(search.id)}/>
              })}
          </div>
        </div>
      )
      
    } else if (searchFlag !== 0) {
      return <Sorry pageFlag={pageFlag} submintResoure={this.submintResoure} />
    } else {
      return  (
      <div className="idiomDeatailsCon">
        <div className="idiomDeatailEmpty"></div>
      </div>)
    }
  }

  submintResoure = symbol => {
    let searchUrl = baseUrl;
    let params ={}
    const {pageFlag} = this.state
    if (pageFlag === "buzzword") {
      searchUrl = searchUrl + '/api/buzzword/'
      params.buzzword = symbol
    } else {
      searchUrl = searchUrl + '/api/idiom/'
      params.idiom = symbol
    }
    // 发起接口
    axios.post(
      searchUrl,
      params,
      {
        headers: {
        'X-Timestamp': Date.parse( new Date() ).toString(),
        'X-Nonce': guid()
      }
    })
    .then((response) => {
      // console.log(response.data)
      if (response && response.data && response.data.code ==='000') {
        let modalDefine = Modal.info({
          title: 'Info',
          content: 'Thank you for your supplement.Administrators and other users will help you complete it.',
          onOk:()=>{modalDefine.destroy()}
        });
      } else {
        message.info(response.data.message)
      }
    })
  }
  onPageChange = current => {
    this.getResoure(this.state.pageFlag, this.state.searchValue, current);
  }

  render() {
    const { idiomStyle, buzzwordStyle, searchRes, searchValue, searchFlag } = this.state
    return (
      <div className="idiomListHome">
        <Header />
        <Nav
          idiomStyle={idiomStyle}
          buzzwordStyle={buzzwordStyle}
          handleGoIdiom={this.handleGoIdiom}
          handleGoBuzzword={this.handleGoBuzzword}
          handleGoQA={this.handleGoQA}
        />
        <HeaderSearch
          searchValue={searchValue}
          handleSearch={this.handleSearch}
        />
        {this.getShowSection()}
        {searchRes && searchRes.length > 0 && searchFlag !== 0 ? (
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
        ) : null}
        <Footer />
      </div>
    )
  }
}
