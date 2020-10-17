import './index.less'
import React from 'react'

export default class Idiom extends React.Component {
  state = {
    reflashFlag: false,
    ABCList: ['A', 'B', 'C', 'D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',]
  }

  componentDidMount() {
  }

  handleABCClick = item => {
    console.log(item)
  }

  render() {
    return (
      <div className="idiomHome">
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
            <div className="searchPic" />
            <div className="searchTxt">
              Search Your Awesome Idiom
            </div>
            <div className="searchInputCon">
              <input className="searchInput" placeholder="Enter Your Idiom" />
              <div className="searchButton">
                Serch
              </div>
            </div>
          </div>
        
        </div>
        <div className="idiomABCCon">
          <div className="idiomABC">
            <div className="ABCTitle">
              Search By Initials
            </div>
            <div className="ABCSbuTitle">
              Query according to the first letter of Chinese idiom phonetic transcription
            </div>
            <div className="ABCList">
              {
                this.state.ABCList.map((item, index) => {
                  return (
                    <div className="ABCItem" onClick={() => this.handleABCClick(item)} >
                      <div className="ABCItemCon act">
                        {item}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
