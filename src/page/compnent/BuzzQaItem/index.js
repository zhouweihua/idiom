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
    const { search } = this.props
    return (
      <div className="buzzQaItemItem">
        <div className="editSubTitle">
          {search && search.buzzword ? search.buzzword : ''}
        </div>
        {/* <div className="editSubUser">
          User：allisfree4u@gmail.com
        </div> */}
        <div className="buzzTitle">
        {search && search.pinyin ? search.pinyin : ''}
        </div>
        <div className="buzzExplanation">
          {search && search.enInterpretation ? search.enInterpretation : ''}
        </div>
      </div>
    )
  }
}
