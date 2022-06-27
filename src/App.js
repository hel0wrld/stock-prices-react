import Header from './components/Header'
import Info from './components/Info'
import React from 'react'
import Temp from './components/Temp'

function App() {
  return (
    <div className="container">
      <div className='head' title='Never Gonna Give You Up :)'>
        <Header />
        <Info/>
      </div>
      <div className='visuals'>
        <Temp custom=''/>
      </div>
    </div>
  );
}

export default App;
