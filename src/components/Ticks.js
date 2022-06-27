import React from 'react'

const Tick = ({ tick, checked, onClick }) => {
    checked = (checked === 'true')
  return (
    <>
        <input onClick={onClick} id={tick} type='radio' className='radio-label' name='ticker-label' defaultChecked={checked}/>
        <label htmlFor={tick} className='tick-label'>
            <div className='tick'> 
                {tick}
            </div>
        </label>
    </>
  )
}

export default Tick