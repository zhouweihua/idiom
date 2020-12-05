import './index.less'
import React from 'react'
import qs from 'qs'
import Header from "../compnent/header";
import Footer from "../compnent/footer";
import Nav from "../compnent/nav";
import HeaderSearch from "../compnent/headerSearch";

export default class IdiomEdit extends React.Component {
  state = {
    reflashFlag: false,
    symbols: '',
    explanation: '',
    interpretation: '',
    pageFlag: 'idiom',
    placeholder: 'Enter Your Idiom',
    idiomStyle: "idiomLinkItem act",
    buzzwordStyle: "idiomLinkItem",
    searchValue: '',
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
  }

  componentDidMount =() =>{
    
  }

  handleChangeSymbols = e => {
    this.setState({
      symbols: e.target.value,
    })
  }

  handleSubmit = () => {
    console.log("symbols -->" + this.state.symbols);
    console.log("explanation -->" + this.state.explanation);
    console.log("interpretation -->" + this.state.interpretation);
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
              <input className="editCont" value={this.state.symbols} onChange={this.handleChangeSymbols}/>
            </div>
            {pageFlag ==="buzzword" ? null : (
              <div className="editItem">
                <div className="editMainTitle">
                  Chinese explanation
                </div>
                <input className="editCont" />
              </div>
            )}
            <div className="editItem">
              <div className="editMainTitle">
                English interpretation
              </div>
              <input className="editCont" />
            </div>
          </div>
        </div>

        <div className="idiomSubmitCon">
          <div className="idiomSubmit">
            <div className="submitButton" onClick={this.handleSubmit}>
              SUBMIT
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
