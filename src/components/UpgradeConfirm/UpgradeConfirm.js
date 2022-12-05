import React from 'react'

import './upgrade-confirm.css'
import MainBtn from '../../components/MainBtn/MainBtn'
import arrowBack from '../../assets/pic/arrow-left-btn.png'

const UpgradeConfirm = ({player, product, resetState, buyUpgrade, setActiveStage}) => {
  return (
    <div className='upgrade-confirm'>
        <div className='shop-frame-header'>STORE</div>
        <div className='go-back-btn' onClick={resetState}><img alt='' src={arrowBack}/></div>
        <div className='upgrade-frame'>
          <div className='upgrade-product'>
            <div>Your choose to give</div>
            <div className='bold-txt'>{`“${product.header}”`}</div>
          </div>
          <div className='upgrade-poduct-img' onClick={()=>setActiveStage('store')}><img alt='' src={require(`../../assets/pic/${product.productImg}.png`)}/></div>
          <div className='upgrade-plarer'>To <span className='bold-txt'>{`player number #${player.player.name.split('#')[1]}`}</span></div>
          <div className='upgrade-player-img' onClick={()=>setActiveStage('choosePlayer')}><img alt='' src={player.image}/></div>
          <div className='buy-btn'><MainBtn txt='Buy' func={buyUpgrade}/></div>
        </div>
    </div>
  )
}

export default UpgradeConfirm