import './index.less'
import React from 'react'
import qs from 'qs'
import Header from "../compnent/header";
import Footer from "../compnent/footer";
import HeaderSearch from "../compnent/headerSearch";
import Nav from "../compnent/nav";
import IdiomQaItem from "../compnent/IdiomQaItem";
import BuzzQaItem from "../compnent/BuzzQaItem";
import { message, Modal } from 'antd';

import axios from 'axios'
import { guid, baseUrl } from '../../util/commonUtil'

export default class QaAnswer extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'idiom',
    userInfo:null,
    qaId:'',
    symbols: '',
    pinyin: '',
    chinese: '',
    interpretation: '',
  }

  componentWillMount =() =>{
    let queryObject = window.location.search
    let query = qs.parse(queryObject.slice(1))
    let pageFlag = query && query.pageFlag ? query.pageFlag : 'idiom'
    if (pageFlag ==="buzzword") {
      this.setState({
        pageFlag: 'buzzword',
      })
    }
  
    let qaId = query && query.qaId ? query.qaId : null
    if (qaId) {
      this.setState({qaId})
      // this.getResoure(pageFlag, qaId)
      this.getResoureList(pageFlag, qaId)
    } else {
      message.error('查询id有误')
    }
    
    let userInfo = window.localStorage.getItem("userInfo")
    if (userInfo && userInfo !=='null') {
      this.setState({
        userInfo: JSON.parse(userInfo)
      })
    } else {
      window.location.href = "./loginRegister?pageFlag=login&redirUrl="+encodeURIComponent(window.location.href)
    }
  }

  componentDidMount =() =>{
    
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
      // message.info("请输入需要查询的内容")
      window.location.href = "/idiomList?searchMode=full&pageFlag="+ pageFlag +"&searchValue="
    }
  }
  getResoureList = (pageFlag, qaId) => {
    let searchUrl = baseUrl;
    if (pageFlag === "buzzword") {
      searchUrl = searchUrl + '/api/buzzword/candidate/' + qaId
    } else {
      searchUrl = searchUrl + '/api/idiom/candidate/' + qaId
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
        if (pageFlag === "buzzword") {
          this.setState({
            symbols: searchRes.buzzword,
            pinyin:searchRes.pinyin,
            interpretation: searchRes.enInterpretation
          })
        } else {
          this.setState({
            symbols: searchRes.idiom,
            pinyin:searchRes.pinyin,
            chinese: searchRes.chExplanation,
            interpretation: searchRes.enInterpretation
          })
          
        }
      } else {
        message.info(response.data.message)
      }
    })
  }
  
  getResoure = (pageFlag, qaId) => {
    let searchUrl = baseUrl;
    if (pageFlag === "buzzword") {
      searchUrl = searchUrl + '/api/buzzword/' + qaId
    } else {
      searchUrl = searchUrl + '/api/idiom/' + qaId
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
        if (pageFlag === "buzzword") {
          this.setState({
            symbols: searchRes.buzzword,
            pinyin:searchRes.pinyin,
            interpretation: searchRes.enInterpretation
          })
        } else {
          this.setState({
            symbols: searchRes.idiom,
            pinyin:searchRes.pinyin,
            chinese: searchRes.chExplanation,
            interpretation: searchRes.enInterpretation
          })
          
        }
      } else {
        message.info(response.data.message)
      }
    })
  }
  
  handleChangepinyin= e => {
    this.setState({
      pinyin: e.target.value,
    })
  }

  handleChangeChina= e => {
    this.setState({
      chinese: e.target.value,
    })
  }
  handleChangeEnglish= e => {
    this.setState({
      interpretation: e.target.value,
    })
  }

  getShowSectionTitle = () => {
    const { pageFlag, userInfo, symbols, pinyin } = this.state
    return (
      <div className="idiomQaAnswerTitleCon">
        <div className="idiomQaAnswerTitle">
          <div className="editName">
            {symbols}
          </div>
          <div className="editQaCon">
            <div className="editSubTitle">
              {symbols}
            </div>
            <div className="editSubUser">
              {userInfo && userInfo.email ? "User：" + userInfo.email: ''}
            </div>
            <div className="editItem">
              <div className="editMainTitle">
                Chinese phonetic symbols
              </div>
              <input className="editCont" value={pinyin} onChange={this.handleChangepinyin}/>
            </div>

            {pageFlag ==="buzzword" ? null : (
              <div className="editItem">
                <div className="editMainTitle">
                  Chinese explanation
                </div>
                <textarea rows={2} className="editText" value={this.state.chinese} onChange={this.handleChangeChina}/>
              </div>
            )}

            <div className="editItem">
              <div className="editMainTitle">
                English interpretation
              </div>
              <textarea rows={2} className="editText" value={this.state.interpretation} onChange={this.handleChangeEnglish}/>
            </div>
            <div className="editItemSubmitCon">
              <div className="editItemSubmit hoverMo" onClick={this.handleClickSubmit}>
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  handleClickSubmit = () => {
    this.submintResoure()
  }

  submintResoure = () => {
    let searchUrl = baseUrl;
    let params ={}
    const {pageFlag, qaId, pinyin, chinese, interpretation} = this.state
    if (pageFlag === "buzzword") {
      searchUrl = searchUrl + '/api/buzzword/' + qaId
      params.id = qaId
      params.pinyin = pinyin
      params.enInterpretation = interpretation
    } else {
      searchUrl = searchUrl + '/api/idiom/' + qaId
      params.id = qaId
      params.pinyin = pinyin
      params.chExplanation = chinese
      params.enInterpretation = interpretation
    }
    // 发起接口
    axios.put(
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
      if (response && response.data && response.data.code ==='112') {
        window.location.href = "./loginRegister?pageFlag=login&redirUrl="+encodeURIComponent(window.location.href)
        return
      }
      if (response && response.data && response.data.code ==='000') {
        let modalAnswer = Modal.info({
          title: 'Info',
          content: 'Thank you for your answer. If it is approved, we will upload  to the website',
          onOk:()=>{modalAnswer.destroy()}
        });
      } else {
        message.info(response.data.message)
      }
    })
  }

  getShowSectionBody = () => {
    const { pageFlag, searchRes } = this.state
    if (pageFlag === "buzzword") {
      return (
        <div className="idiomQaAnswerCon">
          <div className="idiomQaAnswer">
            {searchRes && searchRes.length > 0 && searchRes.map((search, buzzIndex) => {
              return <BuzzQaItem  search={search} key={"buzz" + buzzIndex} /> 
            })}
          </div>
        </div>
      )
    }
    return (
      <div className="idiomQaAnswerCon">
        <div className="idiomQaAnswer">
        {searchRes && searchRes.length > 0 && searchRes.map((search,idiomInex) => {
            return <IdiomQaItem search={search} key={"idio" + idiomInex} /> 
          })}
        </div>
      </div>
    )
  }

  render() {
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
        <div className="idiomQaNameCon">
          <div className="idiomQaName">
            <div className="qaMainSec">Questions And Answers</div>
            <div className="qaSubSec">You can ask questions or answer them. This is our interaction area</div>
          </div>
        </div>
        {this.getShowSectionTitle()}
        {this.getShowSectionBody()}
        <Footer />
      </div>
    )
  }
}
