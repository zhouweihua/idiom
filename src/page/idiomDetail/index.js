import './index.less'
import React from 'react'
import qs from 'qs'
import Header from "../compnent/header";
import Nav from "../compnent/nav";
import HeaderSearch from "../compnent/headerSearch";

export default class IdiomDetail extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'idiom',
    placeholder: 'Enter Your Idiom',
    idiomStyle: "idiomLinkItem act",
    buzzwordsStyle: "idiomLinkItem",
    searchValue: ''
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


  handleABCClick = item => {
    console.log(item)
  }

  render() {
    const { pageFlag, idiomStyle, buzzwordsStyle, searchValue } = this.state
    return (
      <div className="IdiomDetailHome">
        <Header />
        <Nav
          idiomStyle={idiomStyle}
          buzzwordsStyle={buzzwordsStyle}
          handleGoIdiom={this.handleGoIdiom}
          handleGoBuzzwords={this.handleGoBuzzwords}
        />
        <HeaderSearch searchValue={searchValue}/>

        <div className="idiomDeatailsCon">
          <div className="idiomDeatails">
            <div className="idiomDeatailItem">
              <div className="idiomSymbols">
                <div className="textLeft">Chinese phonetic symbols：</div>
                <div className="textRight">
                  zhǐ   xǔ   zhōu   guān   fàng   huǒ，bù   xǔ   bǎi   xìng   diǎn   dēng 只   许  州  官   放  火，不   许  百  姓  点  灯
                </div>
              </div>
              <div className="idiomExplanation">
                <div className="textLeft">Chinese explanation：</div>
                <div className="textRight">比泰山还要安稳，形容非常平安稳固，不可动摇，比泰山还要安稳，形容非常
                平安稳固，不可动摇</div>
              </div>
              <div className="idiomInterpret">
                <div className="textLeft">English interpretation：</div>
                <div className="textRight">Even more stable than Mount Tai, it describes a very safe and stable, unshakable</div>
              </div>
              <div className="idiomEdit">Edit</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
