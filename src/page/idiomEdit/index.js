import './index.less'
import React from 'react'
import qs from 'qs'
import Header from "../compnent/header";
import Footer from "../compnent/footer";
import Nav from "../compnent/nav";
import HeaderSearch from "../compnent/headerSearch";
import { message, Modal } from 'antd';


import axios from 'axios'
import { guid, baseUrl } from '../../util/commonUtil'

export default class IdiomEdit extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'idiom',
    placeholder: 'Enter Your Idiom',
    idiomStyle: "idiomLinkItem act hoverMo",
    buzzwordStyle: "idiomLinkItem hoverMo",
    searchValue: '',
    itemId:null,
    symbols: '',
    pinyin: '',
    chinese: '',
    interpretation: '',
    searchRes: {}
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
    if (pageFlag ==="buzzword") {
      this.setState({
        pageFlag: 'buzzword',
        idiomStyle: "idiomLinkItem",
        buzzwordStyle: "idiomLinkItem act",
        placeholder: 'Enter Your Buzzwords',
      })
    }
    let itemId = query && query.itemId ? query.itemId : null
    if (itemId) {
      this.getResoure(pageFlag, itemId)
      this.setState({
        itemId: parseInt(itemId)
      })
    } else {
      message.error('查询id有误')
    }
    
  }
  
  getResoure = (pageFlag, itemId) => {
    let searchUrl = baseUrl;
    if (pageFlag === "buzzword") {
      searchUrl = searchUrl + '/api/buzzword/' + itemId
    } else {
      searchUrl = searchUrl + '/api/idiom/' + itemId
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
        if (pageFlag === "buzzword") {
          this.setState({
            symbols: searchRes.buzzword,
            pinyin:searchRes.pinyin,
            interpretation: searchRes.enInterpretation,
            searchRes
          })
        } else {
          this.setState({
            symbols: searchRes.idiom,
            pinyin:searchRes.pinyin,
            chinese: searchRes.chExplanation,
            interpretation: searchRes.enInterpretation,
            searchRes
          })
        }
      } else {
        message.info(response.data.message)
      }
    })
  }

  submintResoure = () => {
    let searchUrl = baseUrl;
    let params ={}
    const {pageFlag, itemId, pinyin, chinese, interpretation,searchRes } = this.state
    
    if (pageFlag === "buzzword") {
      searchUrl = searchUrl + '/api/buzzword/' + itemId
      params.id = itemId
      params.pinyin = pinyin
      params.enInterpretation = interpretation
      if (pinyin === searchRes.pinyin && interpretation === searchRes.enInterpretation) {
        message.info("Please revise before submitting")
        return
      }
    } else {
      searchUrl = searchUrl + '/api/idiom/' + itemId
      params.id = itemId
      params.pinyin = pinyin
      params.chExplanation = chinese
      params.enInterpretation = interpretation
      if (pinyin === searchRes.pinyin && chinese === searchRes.chExplanation && interpretation === searchRes.enInterpretation) {
        message.info("Please revise before submitting")
        return
      }
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
  componentDidMount =() =>{
    
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

  handleSubmit = () => {
    // console.log("explanation -->" + this.state.explanation);
    // console.log("interpretation -->" + this.state.interpretation);
    this.submintResoure()
  }

  render() {
    const { pageFlag, idiomStyle, buzzwordStyle, searchValue } = this.state
    return (
      <div className="idiomEditHome">
        <Header />
        <Nav
          idiomStyle={idiomStyle}
          buzzwordStyle={buzzwordStyle}
          handleGoIdiom={this.handleGoIdiom}
          handleGoBuzzword={this.handleGoBuzzword}
          handleGoQA={this.handleGoQA}
        />
        <HeaderSearch searchValue={searchValue}/>
        <div className="idiomEditCon">
          <div className="idiomEdit">
            <div className="editMainDes">More Appropriate English Interpretation</div>
            <div className="editSubDes">If you have a more appropriate English interpretation, you can correct it and it will be uploaded to the website after being approved</div>
            
            <div className="editItem">
              <div className="editMainTitle">
                Chinese phonetic symbols
              </div>
              <input className="editCont" value={this.state.pinyin + " " + this.state.symbols} disabled/>
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
          </div>
        </div>

        <div className="idiomSubmitCon">
          <div className="idiomSubmit">
            <div className="submitButton hoverMo" onClick={this.handleSubmit}>
              SUBMIT
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
