import './index.less'
import React from 'react'

export default class Nav extends React.Component {
  state = {
    reflashFlag: false,
  }

  componentDidMount =() =>{}

  handleGoIdiom = () => {
    this.props.handleGoIdiom && this.props.handleGoIdiom()
  }

  handleGoBuzzwords = () => {
    this.props.handleGoBuzzwords && this.props.handleGoBuzzwords()
  }

  handleGoQA = () => {
    this.props.handleGoQA && this.props.handleGoQA()
  }

  render() {
    const {idiomStyle, buzzwordsStyle, qaStyle} = this.props
    return (
      <div className="idiomNavCon">
        <div className="idiomNav">
          <div className="idiomIcon" /> 
          <div className="idiomLink">
            <div className={idiomStyle || "idiomLinkItem"} onClick={this.handleGoIdiom}>Idiom</div>
            <div className={buzzwordsStyle || "idiomLinkItem"} onClick={this.handleGoBuzzwords}>Buzzwords</div>
            <div className={qaStyle || "idiomLinkItem"} onClick={this.handleGoQA}>Q and A list</div>
          </div>
        </div>
      </div>
    )
  }
}
