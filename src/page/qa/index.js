import './index.less'
import React from 'react'
import Header from "../compnent/header";
import HeaderSearch from "../compnent/headerSearch";
import Nav from "../compnent/nav";

export default class idiomList extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'idiom',
    searchValue: '',
  }
  componentWillMount =() =>{
  }

  componentDidMount =() =>{
    
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

  getResoure = (pageFlag, searchValue) => {
    // TODO axios
  }


  render() {
    const { searchValue } = this.state
    return (
      <div className="idiomListHome">
        <Header />
        <Nav
          qaStyle={"idiomLinkItem act"}
          handleGoIdiom={this.handleGoIdiom}
          handleGoBuzzwords={this.handleGoBuzzwords}
        />
        <HeaderSearch
          searchValue={searchValue}
          handleSearch={this.handleSearch}
        />
        <div className="idiomQaCon">
          <div className="idiomQa">
            <div></div>
          </div>
        </div>
      </div>
    )
  }
}
