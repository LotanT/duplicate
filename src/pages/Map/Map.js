import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import './map.css'


const Map = ({isAudio}) => {
  
  const [isLoading, setIsLoading] = useState(true);
  const audio = new Audio(require('../../assets/music/Dramatic - Map.mp3'))
  audio.loop = true

  useEffect(()=>{
    if(isAudio) audio.play()
    else{
      audio.pause()
      audio.currentTime = 0;
    }
    return ()=>{
      audio.pause()
      audio.currentTime = 0;
    }
  },[isAudio])
  
  if(isLoading) return <div className="map-background-small"> <img alt="" src={require("../../assets/pic/game-map.png")} style={{opacity: '0'}} onLoad={() => setIsLoading(false)}/><div className="loader-container" style={{height: '50%'}}><div className="loader"></div></div></div>
  return (
    <div className='map'>
       
    </div>
  )
}

export default Map