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
    return (
      <div className="buzzQaItemItem">
        <div className="buzzTitle">
          niú bī  牛逼
        </div>
        <div className="buzzExplanation">
          Niubi is an attitude, a complete lack of concern over what other people think of you. It is knowing exactly what you’re capable of, making the decision to act, and to hell with the consequences. niubi has an inverse side– an excess of niubi leads to self-importance, arrogance, imperiousness.
        </div>
      </div>
    )
  }
}
