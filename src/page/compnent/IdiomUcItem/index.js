import './index.less'
import React from 'react'

export default class IdiomUcItem extends React.Component {
  state = {
    reflashFlag: false,
  }

  componentDidMount =() =>{
    
  }

  handleClickEdit = () =>{
    this.props.handleClickEdit && this.props.handleClickEdit()
  }
  render() {
    const {answer} = this.props
    return (
      <div className="idiomUcItem">
        <div className="editSubTitle">
          {answer.name}
        </div>
        <div className="idiomSymbols">
          <div className="textLeft">Chinese characters and Pinyin：</div>
          <div className="textRight">
            {answer.pinyin + " " + answer.name}
          </div>
        </div>
        <div className="idiomExplanation">
          <div className="textLeft">Chinese explanation：</div>
          <div className="textRight">{answer.chExplanation}</div>
        </div>
        <div className="idiomInterpret">
          <div className="textLeft">English interpretation：</div>
          <div className="textRight">{answer.enInterpretation}</div>
        </div>
      </div> 
    )
  }
}
