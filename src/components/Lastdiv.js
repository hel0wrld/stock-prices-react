import React from 'react'

const Lastdiv = () => {

  const scrollUp = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
  }

  return (
    <div className='lastdiv'>
        <div onClick={() => scrollUp()} title='Scroll Up' className='material-icons customSize'>
        keyboard_double_arrow_up
        </div>
    </div>
  )
}

export default Lastdiv