import { useState, useEffect } from 'react'
import Table from './Table'
import Tick from './Ticks'
import { DateTime } from 'luxon'
import Icons from './Icons'

const Temp = () => {

    const [begin, setBegin] = useState('2013-12-31')
    const [end, setEnd] = useState('2014-01-22')
    const [warning, setWarning] = useState('')
    const [selectedTick, setSelectedTick] = useState('AAPL')
    const [price, setPrice] = useState([])
    const [loading, setLoading] = useState(true)
    const [initStyleBegin, setInitStyleBegin] = useState()
    const [initStyleEnd, setInitStyleEnd] = useState()

    const clearValueBegin = (e) => {
      e.target.select()
    }
    
    const clearValueEnd = (e) => {
      e.target.select()
    }

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
      dateChecker()
    }
    
    const blurLoseEnd = () => {
      if (!DateTime.fromFormat(end, 'yyyy-MM-dd').isValid)
      {
        setInitStyleEnd({
          border:'3px solid red',
          color: 'red'
        })
        setEnd('YYYY-MM-DD')
      }
      else {
        setInitStyleEnd()
      }
        dateChecker()
      }

    const homePrice = async () => {
        const res = await fetch('https://stock-flask-backend.herokuapp.com//home')
        const data = await res.json()
        return data
      }

    const customPrice = async (tick) => {
        const url = 'https://stock-flask-backend.herokuapp.com//custom-tick?tick='+tick
        const res = await fetch(url)
        const data = await res.json()
        return data
      }

    const customDatePrice = async (tick, beginDate, endDate) => {
        const url = 'https://stock-flask-backend.herokuapp.com//date?tick='+tick+'&begin='+beginDate+'&end='+endDate
        const res = await fetch(url)
        const data = await res.json()
        return data
    }

    const dateChecker = () => {

      if (
        begin !== 'Invalid Date' && 
        end !== 'Invalid Date' && 
        DateTime.fromFormat(begin, 'yyyy-MM-dd') < DateTime.fromFormat(end, 'yyyy-MM-dd') &&
        DateTime.fromFormat(begin, 'yyyy-MM-dd') < DateTime.now()
        )
      {
        console.log('good to go')
        setWarning('')
        onClick(selectedTick, begin, end)
      }
      else if (DateTime.fromSQL(begin) > DateTime.fromSQL(end))
        setWarning('Given interval is invalid')
      else if (DateTime.fromSQL(end) > DateTime.now())
        setWarning('Given end date is invalid')
    }

    useEffect(() => {
        const getJson = async () => {
              const valJson = await homePrice()
              setPrice(valJson)
              setLoading(false)
            }
        getJson()
    }, [])

    const onClick = (tick, begin, end) => {
      const getNewJson = async () => {
        const res = await customDatePrice(tick, begin, end)
        setPrice(res)
      }
      setSelectedTick(tick)
      getNewJson()
    }

    if (loading)
      return (
        <div className='loading-message'>...</div>
      )
  else 
      return (
        <>
          <Icons/>
          <div className='radio'>
            <Tick tick='AAPL' checked='true' onClick={() => onClick('AAPL', begin, end)}/>
            <Tick tick='MSFT' checked='false' onClick={() => onClick('MSFT', begin, end)}/>
            <Tick tick='TSLA' checked='false' onClick={() => onClick('TSLA', begin, end)}/>
            <Tick tick='GOOG' checked='false' onClick={() => onClick('GOOG', begin, end)}/>
            <Tick tick='AMZN' checked='false' onClick={() => onClick('AMZN', begin, end)}/>
            <div className='date-field'>
              <input className='input-date' contentEditable='true' type='text'
                value={begin} 
                onChange={(e) => setBegin(e.target.value)}
                onBlur={() => blurLoseBegin()}
                onClick={(e) => clearValueBegin(e)}
                style={initStyleBegin}
                >
              </input>
              <input className='input-date' contentEditable='true' type='text'
                value={end} 
                onChange={(e) => setEnd(e.target.value)}
                onBlur={() => blurLoseEnd()}
                onClick={(e) => clearValueEnd(e)}
                style={initStyleEnd}
              >
              </input>
            </div>
            <div className='date-warning'>
              {warning}
            </div>
            <div className='note'>
              Use the above tick selector and date fields to choose a stock of your choice.
              The table on the right will show the prices accordingly.
            </div>
          </div>
          <Table price={price}/>
        </>
      )
}

export default Temp