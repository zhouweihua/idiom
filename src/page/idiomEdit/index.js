import './index.less'
import React from 'react'

export default class IdiomEdit extends React.Component {
  state = {
    reflashFlag: false,
    symbols: '',
    explanation: '',
    interpretation: '',
  }

  componentDidMount =() =>{
    
  }

  handleChangeSymbols = e => {
    this.setState({
      symbols: e.target.value,
    })
  }

  handleSubmit = () => {
    console.log("symbols -->" + this.state.symbols);
    console.log("explanation -->" + this.state.explanation);
    console.log("interpretation -->" + this.state.interpretation);
  }

  render() {
    return (
      <div className="idiomEditHome">
        <div className="idiomTitleCon">
          <div className="idiomTilte">
            <div className="idiomIcon" /> 
            <div className="idiomLink">
              <div className="idiomLinkItem act">Idiom</div>
              <div className="idiomLinkItem">buzzwords</div>
              <div className="idiomLinkItem">Q and A list</div>
            </div>
          </div>
        </div>

        <div className="idiomSearchCon">
          <div className="idiomSearch">
            <div className="searchInputCon">
              <input className="searchInput" placeholder="Enter Your Idiom" />
              <div className="searchButton">
                Serch
              </div>
            </div>
          </div>
        </div>

        <div className="idiomEditCon">
          <div className="idiomEdit">
            <div className="editMainDes">More Appropriate English Interpretation</div>
            <div className="editSubDes">If you have a more appropriate English interpretation, you can correct it and it will be uploaded to the website after being approved</div>
            
            <div className="editItem">
              <div className="editMainTitle">
                Chinese phonetic symbols
              </div>
              <input className="editCont" value={this.state.symbols} onChange={this.handleChangeSymbols}/>
            </div>
            <div className="editItem">
              <div className="editMainTitle">
                Chinese explanation
              </div>
              <input className="editCont" />
            </div>
            <div className="editItem">
              <div className="editMainTitle">
                English interpretation
              </div>
              <input className="editCont" />
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
