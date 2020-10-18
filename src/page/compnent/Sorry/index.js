import './index.less'
import React from 'react'

export default class Sorry extends React.Component {
  state = {
    reflashFlag: false,
  }

  componentDidMount =() =>{
    
  }

  handleChangeIdiom = e => {
    this.setState({
      idiom: e.target.value,
    })
  }

  handleSubmit = () => {
    console.log("idiom -->" + this.state.idiom);
  }

  render() {
    const { pageFlag } = this.props
    let mainDes = "Sorry, We Didn't Find The Idiom"
    let subDes = "You can upload your idiom below, and we will complete the translation for you"
    let mainTitle = "Chinese idiom"
    if (pageFlag ==="buzzwords") {
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
              <input className="sorryCont" value={this.state.idiom} onChange={this.handleChangeIdiom}/>
            </div>
          </div>
        </div>

        <div className="idiomSubmitCon">
          <div className="idiomSubmit">
            <div className="submitButton" onClick={this.handleSubmit}>
              SUBMIT
            </div>
          </div>
        </div>
      </div>
    )
  }
}
