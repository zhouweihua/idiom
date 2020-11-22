import './index.less'
import React from 'react'

export default class BuzzItem extends React.Component {
  state = {
    reflashFlag: false,
  }
  
  componentDidMount =() =>{
    console.log(this.props.search)
  }
  handleClickEdit = itemId =>{
    this.props.handleClickEdit && this.props.handleClickEdit(itemId)
  }
  render() {
    const { search } = this.props
    return (
      <div className="buzzDeatailItem">
        <div className="buzzTitle">
          {search? search.pinyin + ' ' + search.buzzword : ''}
        </div>
        <div className="buzzExplanation">
          {search ? search.enInterpretation : ''}
        </div>
        <div className="buzzEdit" onClick={() => this.handleClickEdit(search.id)}>Edit</div>
      </div>
    )
  }
}
