import './index.less'
import React from 'react'

export default class Nav extends React.Component {
  state = {
    reflashFlag: false,
  }

  componentDidMount =() =>{}
  
  handleGoIcon = () => {
    window.location.href = "./"
  }

  handleGoIdiom = () => {
    // window.location.href = "/idiomList?pageFlag=idiom&searchValue="
    this.props.handleGoIdiom && this.props.handleGoIdiom()
  }

  handleGoBuzzword = () => {
    window.location.href = "/idiomList?pageFlag=buzzword&searchValue="
    // this.props.handleGoBuzzword && this.props.handleGoBuzzword()
  }

  handleGoQA = () => {
    this.props.handleGoQA && this.props.handleGoQA()
  }

  render() {
    const {idiomStyle, buzzwordStyle, qaStyle} = this.props
    return (
      <div className="idiomNavCon">
        <div className="idiomNav">
          <div className="idiomIcon"  onClick={this.handleGoIcon}/> 
          <div className="idiomLink">
            <div className={idiomStyle || "idiomLinkItem"} onClick={this.handleGoIdiom}>Idiom</div>
            <div className={buzzwordStyle || "idiomLinkItem"} onClick={this.handleGoBuzzword}>Buzzwords</div>
            <div className={qaStyle || "idiomLinkItem"} onClick={this.handleGoQA}>Q and A list</div>
          </div>
        </div>
      </div>
    )
  }
}
