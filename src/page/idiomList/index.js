import './index.less'
import React from 'react'
import { Pagination } from 'antd';

import Sorry from '../compnent/Sorry'
import IdiomItem from "../compnent/IdiomItem";
export default class idiomList extends React.Component {
  state = {
    reflashFlag: false,
    pageFlag: 'idiom',
    placeholder: 'Enter Your Idiom',
    idiomStyle: "idiomLinkItem act",
    buzzwordsStyle: "idiomLinkItem",
    searchValue: '',
    searchFlag: 2, // 0 搜索中 1 搜索成功 2 搜索失败
    searchRes: [],
  }
  componentWillUnmount =() =>{

  }

  componentDidMount =() =>{
    
  }

  handleABCClick = item => {
    console.log(item)
  }

  getShowSection = () => {
    const { pageFlag, searchFlag, searchRes } = this.state
    if (searchFlag === 2) {
      return <Sorry />
    } else if (searchFlag === 1) {
      return <IdiomItem />
    } else {
      return  (<div className="idiomSearchingCon">
                <div className="idiomSearching">
                  Searching
                </div>
              </div>)
    }
  }

  render() {
    const { pageFlag, searchFlag, searchRes } = this.state
    return (
      <div className="idiomListHome">
        <div className="idiomTitleCon">
          <div className="idiomTilte">
            <div className="idiomIcon" /> 
            <div className="idiomLink">
              <div className="idiomLinkItem act">Idiom</div>
              <div className="idiomLinkItem">Buzzwords</div>
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
        {this.getShowSection()}
        {searchFlag === 1 ? (
          <div className="idiomPaginationCon">
            <div className="idiomPagination">
              <Pagination defaultCurrent={1} total={50} showQuickJumper/>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
