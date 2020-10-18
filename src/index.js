import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router-dom'
import CoreRouter from './CoreRouter'
import history from './history'
import './index.less'

ReactDOM.render(
  <div>
    <Router history={history}>
      <Route path="/" component={CoreRouter} />
    </Router>
    <div className="footer">
      <div className="footerContain">
        <div className="footerItem">
          <div className="footerTitle">About Us
          </div>
          <div className="footerSection">
            Our aim is to build a platform for us to learn Chinese idioms together. If we do the same thing together, we will surely succeed. 
          </div>
        </div>
        <div className="footerItem">
          <div className="footerTitle">Get In Touch
          </div>
          <div className="footerSection">
            <p>E-mail：yuqingjie2008@126.com</p>
            <p>Wechat：yu_328931489</p>
            <p>ur address goes here,street.</p>
          </div>
        </div>
        <div className="footerItem">
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
  </div>,
   document.getElementById('root'),
)