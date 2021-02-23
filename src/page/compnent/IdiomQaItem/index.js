import './index.less'
import React from 'react'

export default class IdiomQaItem extends React.Component {
  state = {
    reflashFlag: false,
  }

  componentDidMount =() =>{
    
  }

  handleClickEdit = () =>{
    this.props.handleClickEdit && this.props.handleClickEdit()
  }
  render() {
    const { search, qaText } = this.props
    return (
      <div className="idiomQaItem">
        <div className="editSubTitle">
        {qaText}
        </div>
        <div className="editSubUser">
        {search && search.email ? 'user: ' + search.email : ''}
        </div>
        <div className="idiomSymbols">
          <div className="textLeft">Pinyin of Chinese characters：</div>
          <div className="textRight">
            {search && search.pinyin ? search.pinyin + ' ' + qaText : ''}
          </div>
        </div>
        <div className="idiomExplanation">
          <div className="textLeft">Chinese explanation：</div>
          <div className="textRight">{search && search.chExplanation ? search.chExplanation: ''}</div>
        </div>
        <div className="idiomInterpret">
          <div className="textLeft">English interpretation：</div>
          <div className="textRight">{search && search.enInterpretation ? search.enInterpretation: ''}</div>
        </div>
      </div> 
    )
  }
}
