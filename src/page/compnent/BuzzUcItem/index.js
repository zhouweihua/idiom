import './index.less'
import React from 'react'

export default class BuzzUcItem extends React.Component {
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
      <div className="buzzUcItemItem">
        <div className="editSubTitle">
          {answer.name}
        </div>
        <div className="buzzTitle">
        {answer.pinyin + " " + answer.name}
        </div>
        <div className="buzzExplanation">{answer.enInterpretation}</div>
      </div>
    )
  }
}
