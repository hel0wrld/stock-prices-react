import Header from './components/Header'
import Info from './components/Info'
import React, { useEffect, useState } from 'react'
import Temp from './components/Temp'
import Graphs from './components/Graphs'
import Help from './components/Help'
import About from './components/About'
import Lastdiv from './components/Lastdiv'

function App() {

  const [price, setPrice] = useState()
  const [graphIsShown, setGraphIsShown] = useState(false)
  const [helpIsShown, setHelpIsShown] = useState(true)
  const [aboutIsShown, setAboutIsShown] = useState(false)

  const getPrice = (data) => {
    setPrice(data)
  }

  return (
    <div className="container">
      <div className='head'>
        <Header />
      </div>
      <div className='visuals'>
        <Temp 
            getPrice={getPrice}
            graphIsShown={graphIsShown} setGraphIsShown={setGraphIsShown}
            helpIsShown={helpIsShown} setHelpIsShown={setHelpIsShown}
            aboutIsShown={aboutIsShown} setAboutIsShown={setAboutIsShown}
        />
      </div>
      <div className='graphs'>
        {graphIsShown && (
              <Graphs price={price}/>
        )}
        {helpIsShown && (
              <Help/>
        )}
        {aboutIsShown && (
              <About/>
        )}
      </div>
      <Lastdiv/>
    </div>
  );
}

export default App;
