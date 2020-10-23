import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Idiom from './page/idiom'
import IdiomList from './page/idiomList'
import IdiomDetail from './page/idiomDetail'
import IdiomEdit from './page/idiomEdit'
import Qa from './page/qa'
import QaAnswer from './page/qaAnswer'
import UserCenter from './page/userCenter'
import LoginRegister from './page/loginRegister'

export default class CoreRouter extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact component={Idiom} path="/" />
        <Route exact component={IdiomList} path="/idiomList" />
        <Route exact component={IdiomDetail} path="/idiomDetail" />
        <Route exact component={IdiomEdit} path="/idiomEdit" />

        <Route exact component={Qa} path="/qa" />
        <Route exact component={QaAnswer} path="/qaAnswer" />
        
        <Route exact component={UserCenter} path="/userCenter" />
        
        <Route exact component={LoginRegister} path="/loginRegister" />
        {/* 跳的主页面 */}
        <Redirect to="/" />
      </Switch>
    )
  }
}
