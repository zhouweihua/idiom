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
  </div>,
   document.getElementById('root'),
)