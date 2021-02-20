import './index.less'
import React from 'react'

export default class BuzzQaItem extends React.Component {
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
      <div className="buzzQaItemItem">
        <div className="editSubTitle">
          {qaText}
        </div>
        <div className="editSubUser">
          {search && search.email ? 'user: ' + search.email : ''}
        </div>
        <div className="buzzTitle">
        {search && search.pinyin ? search.pinyin + " " + qaText : ''}
        </div>
        <div className="buzzExplanation">
          {search && search.enInterpretation ? search.enInterpretation : ''}
        </div>
      </div>
    )
  }
}
