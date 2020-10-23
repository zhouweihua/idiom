import './index.less'
import React from 'react'
import Header from "../compnent/header";
import Nav from "../compnent/nav";
export default class UserCenter extends React.Component {
  state = {
    reflashFlag: false,
  }

  componentDidMount =() =>{
    
  }

  handleGoIdiom = () => {
    window.location.href = "./?pageFlag=idiom"
  }
  
  handleGoBuzzwords = () => {
    window.location.href = "./?pageFlag=buzzwords"
  }
  handleGoQA = () => {
    window.location.href = "./qa?pageFlag=" + this.state.pageFlag
  }

  getResoure = (pageFlag, searchValue) => {
    // TODO axios
  }


  render() {
    return (
      <div className="userCenter">
        <Header />
        <Nav
          handleGoIdiom={this.handleGoIdiom}
          handleGoBuzzwords={this.handleGoBuzzwords}
          handleGoQA={this.handleGoQA}
        />
        <input disabled />
      </div>
    )
  }
}
