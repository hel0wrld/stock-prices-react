import React, { useState } from 'react'
import { DateTime } from 'luxon'

const Help = () => {

  const [begin, setBegin] = useState('2013-12-31')
  const [isChecked, setIsChecked] = useState(false)
  const [initStyleBegin, setInitStyleBegin] = useState()

  const blurLoseBegin = () => {
    if (!DateTime.fromFormat(begin, 'yyyy-MM-dd').isValid)
    {
      setInitStyleBegin({
        border:'3px solid red',
        color: 'red'
    })
    setBegin('YYYY-MM-DD')
    }
    else {
      setInitStyleBegin()
    }
  }

  const reveal = () => {
    var reveals = document.querySelector('.graphs')
    var windowHeight = window.innerHeight
    var elementTop = reveals.getBoundingClientRect().top
    var elementVisible = windowHeight/2
    if (elementTop < windowHeight - elementVisible) {
      reveals.classList.add("active");
    } else {
      reveals.classList.remove("active");
    }
  }

  const onClickHelpTick = (e) => {
    setIsChecked(!isChecked)
    // e.target.value = isChecked
    console.log(e.target.value)
  }

  window.addEventListener('scroll', reveal)

  return (
    <>
        <div className='innerhelp'>
            <div className='headhelp'>How to use this website?</div>
            <div className='row'>
              <input onClick={(e) => onClickHelpTick(e)} id='help-AAPL' type='checkbox' className='help-radio-label' name='help-ticker-label' defaultChecked={isChecked}/>
              <label htmlFor='help-AAPL' className='help-tick-label'>
                  <div className='tick-row'> 
                    AAPL
                  </div>
              </label>
              <div className='helptext'>
                Selects a specific stock from its tick name.
                <br></br>
                Click on this button to select a stock of your choice.
                <br></br>
                To select any other stock, click on its corresponding tick button. The previously selected stock will automatically deselect.
              </div>
            </div>
            <div className='row'>
              <input className='help-input-date' contentEditable='true' type='text'
                value={begin}
                onChange={(e) => setBegin(e.target.value)}
                onClick={(e) => e.target.select()}
                onBlur={() => blurLoseBegin()}
                style={initStyleBegin}
                >
              </input>
              <div className='helptext'>
                Selects a beginning or ending date for the stock price data range.
                <br></br>
                {/* <br></br> */}
                Click on the text box to enter date in YYYY-MM-DD format only. Wrong entries are indicated automatically.
              </div>
            </div>
            <div className='row'>
              <div className='material-icons customSize'>auto_graph</div>
              <div className='helptexticon'>
                Generates an interactive line graph showing the stocks data.
                <br></br>
                You can refine your query using the Tick and Date selectors explained above.
              </div>
            </div>
            <div className='row'>
              <div className='material-icons customSize'>info</div>
              <div className='helptexticon'>
                Shows info about the packages used to develop the website.
                <br></br>
                It also contains the developer information.
              </div>
            </div>
            <div className='row-last'>
              You can use the arrow below to scroll up
            </div>
        </div>
    </>
  )
}

export default Help