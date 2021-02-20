import './index.less'
import React from 'react'
import qs from 'qs'
import Header from "../compnent/header";
import Footer from "../compnent/footer";
import Nav from "../compnent/nav";
import HeaderSearch from "../compnent/headerSearch";
import IdiomItem from "../compnent/IdiomItem";
import BuzzItem from "../compnent/BuzzItem";

import { message } from 'antd';

import axios from 'axios'
import { guid, baseUrl } from '../../util/commonUtil'

export default class IdiomDetail extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'idiom',
    placeholder: 'Enter Your Idiom',
    idiomStyle: "idiomLinkItem act hoverMo",
    buzzwordStyle: "idiomLinkItem hoverMo",
    searchValue: '',
    searchId: 0,
    searchRes:{}
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


    let searchId = query && query.searchId ? query.searchId : ''
    if (searchId) {
      this.setState({
        searchId
      })
    }
    setTimeout(()=>{
      this.getResoure(pageFlag,searchId)
    },10)
  }

  getResoure = (pageFlag, searchId) => {
    let searchUrl = baseUrl;
    if (pageFlag === "buzzword") {
      searchUrl = searchUrl + '/api/buzzword/' + searchId
    } else {
      searchUrl = searchUrl + '/api/idiom/' + searchId
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
      if (response && response.data && response.data.code ==='112') {
        window.location.href = "./loginRegister?pageFlag=login&redirUrl="+encodeURIComponent(window.location.href)
        return
      }
      if (response && response.data && response.data.code ==='000') {
        // console.log(response.data)
        let searchRes = response.data.data
        if (!searchRes) {
          message.info("未查询到该数据")
          return
        }
        this.setState({
          searchRes
        })
      } else {
        message.info(response.data.message)
      }
    })
  }
  handleClickEdit=()=>{
    const { pageFlag, searchId } = this.state
    let qaUrl = "/idiomEdit?pageFlag="+ pageFlag +"&itemId=" + searchId
    let userInfo = window.localStorage.getItem("userInfo")
    // debugger
    if (userInfo && userInfo !=='null') {
      window.location.href = qaUrl
    } else {
      window.location.href = "./loginRegister?pageFlag=login&redirUrl="+encodeURIComponent(qaUrl)
      return
    }
  }
  
  getShowSection = () => {
    const { pageFlag, searchRes } = this.state
    // console.log(searchRes)
    if (pageFlag === "buzzword") {
      return (
        <div className="idiomDeatailsCon">
          <div className="idiomDeatails">
            <BuzzItem search={searchRes} index={0} handleClickEdit={this.handleClickEdit}/>
          </div>
        </div>
      )
    }
    return (
      <div className="idiomDeatailsCon">
        <div className="idiomDeatails">
          <IdiomItem search={searchRes} index={0} handleClickEdit={this.handleClickEdit}/>
        </div>
      </div>
    )
  }

  handleGoIdiom = () => {
    window.location.href = "./idiom?pageFlag=idiom"
  }
  handleGoBuzzword = () => {
    window.location.href = "./idiom?pageFlag=buzzword"
  }

  handleGoQA = () => {
    let qaUrl = "./qa?pageFlag=" + this.state.pageFlag
    window.location.href = qaUrl
  }
  
  handleSearch = (searchValue) => {
    const { pageFlag } = this.state
    if (searchValue) {
      window.location.href = "/idiomList?searchMode=full&pageFlag="+ pageFlag +"&searchValue=" + searchValue
    } else {
      // message.info("请输入需要查询的内容")
      window.location.href = "/idiomList?searchMode=full&pageFlag="+ pageFlag +"&searchValue="
    }
  }

  render() {
    const { idiomStyle, buzzwordStyle, searchValue } = this.state
    return (
      <div className="IdiomDetailHome">
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
        <Footer />
      </div>
    )
  }
}
