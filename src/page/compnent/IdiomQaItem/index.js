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
    const { search } = this.props
    return (
      <div className="idiomQaItem">
        <div className="editSubTitle">
        {search && search.idiom ? search.idiom : ''}
        </div>
        {/* <div className="editSubUser">
          User：allisfree4u@gmail.com
        </div> */}
        <div className="idiomSymbols">
          <div className="textLeft">Chinese phonetic symbols：</div>
          <div className="textRight">
            {search && search.pinyin ? search.pinyin : ''}
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
