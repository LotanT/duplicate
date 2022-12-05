import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { CHAINS } from '../../connectors/chains'

import './product.css'
import productPriceFrame from '../../assets/pic/product-price-frame.png'
import maticSymbol from '../../assets/pic/matic-icon.png'
import btn from '../../assets/pic/mint-btn.png'

const Product = ({productImg, price = null, header, func, btnTxt, height}) => {
  const { chainId } = useWeb3React()

  return (
    <div className='product' style={{height}}>
        <div className='product-header'>{header}</div>
        <div className='product-img'><img alt='' src={require(`../../assets/pic/${productImg}.png`)}/></div>
        {price && <div className='product-price-container'>
            <img alt='' src={productPriceFrame}/>
            <div className='product-price'>
              {CHAINS[chainId] && <img alt='' src={require(`../../assets/pic/${CHAINS[chainId].symbol}.png`)}/>}
              <div>{price}</div>
            </div>
        </div>}
        <div className='product-buy-btn' onClick={func}>
            <img alt='' src={btn}/>
            <div>{btnTxt}</div>
        </div>
        <div></div>
    </div>
  )
}

export default Product