import React, { useState } from 'react'

const Icons = (props) => {

  const {graphIsShown, setGraphIsShown, helpIsShown, setHelpIsShown, aboutIsShown, setAboutIsShown} = props

  const toggleGraphVisibility = () => {
    setGraphIsShown(true)
    setHelpIsShown(false)
    setAboutIsShown(false)
    console.log(graphIsShown)
    window.scrollTo({ 
      top: document.body.scrollHeight, 
      behavior: 'smooth' 
    })
  }

  const toggleHelpVisibility = () => {
    setHelpIsShown(true)
    setAboutIsShown(false)
    setGraphIsShown(false)
    console.log(helpIsShown)
    window.scrollTo({ 
      top: document.body.scrollHeight, 
      behavior: 'smooth' 
    })
  }

  const toggleAboutVisibility = () => {
    setAboutIsShown(true)
    setGraphIsShown(false)
    setHelpIsShown(false)
    console.log(aboutIsShown)
    window.scrollTo({ 
      top: document.body.scrollHeight, 
      behavior: 'smooth' 
    })
  }

  return (
    <div className='icons'>
        <div className='action-icons'>
            <div onClick={() => toggleHelpVisibility()} title='Help' className="material-icons customSize">help</div>
            <div onClick={() => toggleGraphVisibility()} title='Graph' className="material-icons customSize">auto_graph</div>
        </div>
        <div className='help-icon'>  
            <div onClick={() => toggleAboutVisibility()} title='About' className="material-icons customSize">info</div>
        </div>
    </div>
  )
}

export default Icons