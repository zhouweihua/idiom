import './index.less'
import React from 'react'

export default class Header extends React.Component {
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
      <div className="header">
        <div className="headerContain">
          <div className="login">login/Register</div>
        </div>
      </div>
    )
  }
}
