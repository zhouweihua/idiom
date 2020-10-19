import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Idiom from './page/idiom'
import IdiomList from './page/idiomList'
import IdiomDetail from './page/idiomDetail'
import IdiomEdit from './page/idiomEdit'
import Qa from './page/qa'
import Self from './page/self'

export default class CoreRouter extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact component={Idiom} path="/" />
        <Route exact component={IdiomList} path="/idiomList" />
        <Route exact component={IdiomDetail} path="/idiomDetail" />
        <Route exact component={IdiomEdit} path="/idiomEdit" />
        <Route exact component={Qa} path="/qa" />
        <Route exact component={Self} path="/self" />

        {/* 跳的主页面 */}
        <Redirect to="/" />
      </Switch>
    )
  }
}
