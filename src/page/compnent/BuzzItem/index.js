import './index.less'
import React from 'react'

export default class BuzzItem extends React.Component {
  state = {
    reflashFlag: false,
  }
  
  componentDidMount =() =>{
    // console.log(this.props.search)
  }
  handleClickEdit = itemId =>{
    this.props.handleClickEdit && this.props.handleClickEdit(itemId)
  }
  render() {
    const { search, index } = this.props
    let style = "buzzDeatailItem"
    if (index === 0) {
      style = style + " first"
    }
    return (
      <div className={style}>
        <div className="buzzTitle">
          {search && search.pinyin? search.pinyin + ' ' + search.buzzword : ''}
        </div>
        <div className="buzzExplanation">
          {search && search.enInterpretation ? search.enInterpretation : ''}
        </div>
        <div className="buzzEdit hoverMo" onClick={() => this.handleClickEdit(search.id)}>Edit</div>
      </div>
    )
  }
}
