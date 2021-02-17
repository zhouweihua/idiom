import './index.less'
import React from 'react'

export default class Sorry extends React.Component {
  state = {
    reflashFlag: false,
    symbol: ''
  }

  componentDidMount =() =>{
    
  }

  handleChangeSymbol = e => {
    this.setState({
      symbol: e.target.value,
    })
  }

  handleSubmit = () => {
    // console.log("symbol -->" + this.state.symbol);
    this.props.submintResoure && this.props.submintResoure(this.state.symbol)
  }

  render() {
    const { pageFlag } = this.props
    let mainDes = "Sorry, We Didn't Find The Idiom"
    let subDes = "You can upload your idiom below, and we will complete the translation for you"
    let mainTitle = "Chinese idiom"
    if (pageFlag ==="buzzword") {
      mainDes = "Sorry, We Didn't Find The Buzzword"
      subDes = "You can upload your buzzword below, and we will complete the translation for you"
      mainTitle = "Buzzword"
    }
    return (
      <div className="idiomSorryHome">
        <div className="idiomSorryCon">
          <div className="idiomSorry">
            <div className="sorryMainDes">{mainDes}</div>
            <div className="sorrySubDes">{subDes}</div>
            
            <div className="sorryItem">
              <div className="sorryMainTitle">{mainTitle}</div>
              <input className="sorryCont" value={this.state.symbol} onChange={this.handleChangeSymbol}/>
            </div>
          </div>
        </div>

        <div className="idiomSubmitCon">
          <div className="idiomSubmit">
            <div className="submitButton hoverMo" onClick={this.handleSubmit}>
              SUBMIT
            </div>
          </div>
        </div>
      </div>
    )
  }
}
