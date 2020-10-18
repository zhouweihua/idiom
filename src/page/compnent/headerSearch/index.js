import './index.less'
import React from 'react'
import { message } from 'antd'

export default class HeaderSearch extends React.Component {
  state = {
    reflashFlag: false,
    searchValue: '',
  }

  componentWillMount =() =>{
    if (this.props.searchValue && this.props.searchValue !== this.state.searchValue) {
      this.setState({
        searchValue: this.props.searchValue
      })
    }
  }
  componentDidMount =() =>{
    
  }

  handleChangeSearchValue = e => {
    this.setState({
      searchValue: e.target.value,
    })
  }

  handleSearch = () => {
    const { searchValue } = this.state
    if (searchValue) {
      this.props.handleSearch && this.props.handleSearch(searchValue)
    } else {
      message.info("请输入需要查询的内容")
    }
  }

  render() {
    const {placeholder} = this.props
    const {searchValue} = this.state
    return (
      <div className="idiomSearchCon">
        <div className="idiomSearch">
          <div className="searchInputCon">
            <input
              className="searchInput"
              placeholder={placeholder}
              value={searchValue}
              onChange={this.handleChangeSearchValue}
            />
            <div className="searchButton" onClick={this.handleSearch}>
              Serch
            </div>
          </div>
        </div>
      </div>
    )
  }
}
