import React from 'react'

const Info = () => {
  return (
    <div className='information'>
      <p>
        Made using React.js and Flask.py, with luxon, pandas and yfinance behind the hood. 
        <br></br>
        [ Site under construction :/]
        <br></br>
        <br></br>
        <a className='info-me' href='https://github.com/hel0wrld'>-- Created by Anmol Kumar --</a> 
      </p>
    </div>
  )
}

export default Info

// The following table shows the daily prices for a period of
//       100 days for a selected stock, obtained from
//       yfinance library in Python, starting from 
//       December 31, 2013,  when written in YYYY-MM-DD.