import React from 'react'
import { HILGifs } from '../Types/HILTypes'
import './style/Style.css'
const GifCard: React.FC<{gif: HILGifs}> = React.memo(({gif}) => {
    return  <div
              className='cardImage'
                title={gif.title}
                style={{backgroundImage: `url(${gif.images.fixed_height_downsampled.url})`}}
              />   
  })

export default GifCard