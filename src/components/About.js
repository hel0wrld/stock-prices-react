import React from 'react'

const Graphs = () => {

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

  window.addEventListener('scroll', reveal)

  return (
    <>
        <div className='innerabout'>
            <div className='headabout'>About</div>
            <div className='infoabout'>
              Created using ReactJS on the frontend and Flask on the backend
              <br></br>
              <br></br>
              Transitions written using vanilla CSS and JS
              <br></br>
              <br></br>
              Stock prices served by Flask endpoint as JSON, fetched from Yahoo Finance using yfinance library
              <br></br>
              <br></br>
              Fonts and Material Icons provided by open-source Google Fonts 
              <br></br>
              <br></br>
              Graphs created using d3.js
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <div style={{fontWeight: 'bold'}}>
                Created by Anmol Kumar. Reach me at 
                <a className='info-me' href='https://github.com/hel0wrld' target='blank'> Github </a>
              </div>
            </div>
        </div>
    </>
  )
}

export default Graphs