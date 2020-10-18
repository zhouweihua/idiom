import './index.less'
import React from 'react'

export default class IdiomSorry extends React.Component {
  state = {
    reflashFlag: false,
    idiom: '',
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
    return (
      <div className="idiomSorryHome">
        <div className="idiomSorryCon">
          <div className="idiomSorry">
            <div className="sorryMainDes">Sorry, We Didn't Find The Idiom</div>
            <div className="sorrySubDes">You can upload your idiom below, and we will complete the translation for you</div>
            
            <div className="sorryItem">
              <div className="sorryMainTitle">
                Chinese idiom
              </div>
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
