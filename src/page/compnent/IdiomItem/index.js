import './index.less'
import React from 'react'

export default class IdiomItem extends React.Component {
  state = {
    reflashFlag: false,
  }

  componentDidMount =() =>{
    
  }

  handleClickEdit = () =>{
    this.props.handleClickEdit && this.props.handleClickEdit()
  }
  render() {
    const { search } = this.props
    return (
      <div className="idiomDeatailItem">
        <div className="idiomSymbols">
          <div className="textLeft">Chinese phonetic symbols：</div>
          <div className="textRight">
           {search ? search.pinyin + " " + search.idiom : ''}
          </div>
        </div>
        <div className="idiomExplanation">
          <div className="textLeft">Chinese explanation：</div>
          <div className="textRight">{search ? search.chExplanation: ''}</div>
        </div>
        <div className="idiomInterpret">
          <div className="textLeft">English interpretation：</div>
          <div className="textRight">{search ? search.enInterpretation: ''}</div>
        </div>
        <div className="idiomEdit" onClick={this.handleClickEdit}>Edit</div>
      </div> 
    )
  }
}
