import './index.less'
import React from 'react'

export default class Footer extends React.Component {
  state = {
    reflashFlag: false,
  }
  componentWillMount = () =>{
  }
  componentDidMount = () =>{
  }
  render() {
    return (
    <div className="footer">
      <div className="footerContain">
        <div className="footerItem footerItemFirst">
          <div className="footerTitle">About Us
          </div>
          <div className="footerSection">
            Our aim is to build a platform for us to learn Chinese idioms together. If we do the same thing together, we will surely succeed. 
          </div>
        </div>
        <div className="footerItem footerItemSecond">
          <div className="footerTitle">Get In Touch
          </div>
          <div className="footerSection">
            <p>E-mail：yuqingjie2008@126.com</p>
            <p>ur address goes here,street.</p>
          </div>
        </div>
        <div className="footerItem footerItemSecond">
          <div className="footerTitle">Important
          </div>
          <div className="footerSection">
            <p>Idiom</p>
            <p>Buzzwords</p>
            <p>Q and A List</p>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
