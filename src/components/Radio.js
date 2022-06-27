import React from 'react'
import Tick from './Ticks'
import Temp from './Temp'

const Radio = () => {
  const setClick = (tick) => {
    Temp(tick)
  }
  return (
    <div className='radio'>
      <Tick tick='AAPL' checked='true' onClick={() => setClick('AAPL')}/>
      <Tick tick='MSFT' checked='false' onClick={() => setClick('MSFT')}/>
      <Tick tick='TSLA' checked='false' onClick={() => setClick('TSLA')}/>
      <Tick tick='GOOG' checked='false' onClick={() => setClick('GOOG')}/>
      <Tick tick='AMZN' checked='false' onClick={() => setClick('AMZN')}/>
      <div className='note'>
        Use the above selector to choose a stock of your choice.
        The table on the right will show the prices accordingly
      </div>
    </div>
  )
}

export default Radio