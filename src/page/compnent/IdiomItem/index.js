import './index.less'
import React from 'react'

export default class IdiomItem extends React.Component {
  state = {
    reflashFlag: false,
    idiom: '',
  }

  componentDidMount =() =>{
    
  }

  render() {
    return (
      <div className="idiomDeatailsCon">
        <div className="idiomDeatails">
          <div className="idiomDeatailItem">
            <div className="idiomSymbols">
              <div className="textLeft">Chinese phonetic symbols：</div>
              <div className="textRight">
                zhǐ   xǔ   zhōu   guān   fàng   huǒ，bù   xǔ   bǎi   xìng   diǎn   dēng 只   许  州  官   放  火，不   许  百  姓  点  灯
              </div>
            </div>
            <div className="idiomExplanation">
              <div className="textLeft">Chinese explanation：</div>
              <div className="textRight">比泰山还要安稳，形容非常平安稳固，不可动摇，比泰山还要安稳，形容非常
              平安稳固，不可动摇</div>
            </div>
            <div className="idiomInterpret">
              <div className="textLeft">English interpretation：</div>
              <div className="textRight">Even more stable than Mount Tai, it describes a very safe and stable, unshakable</div>
            </div>
            <div className="idiomEdit">Edit</div>
          </div>
        </div>
      </div>
    )
  }
}
