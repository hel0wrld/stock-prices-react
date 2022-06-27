import React from 'react'

const Column = ({ isDate, index, heading, price }) => {
    // index: Defines what column we are talking about
    // heading: gives the heading name
    // price: passes the JSON object
    // isDate: indicates if its the Date column or not

    isDate  = (isDate === '1')? 0:1
    heading = (heading === 'Date' || heading === 'Volume')? heading:heading + '($)'
        
  return (
    <>
        <table className='column-head'>
            <thead>
                <tr  className='head-val'><td>{heading}</td></tr>
            </thead>
            <tbody className='column-values'>
                {Object.entries(price)[0].slice(0,)
                .map(item => 
                    Object.entries(item)[index]
                    .filter(item => typeof item !== typeof '2')
                    .map(item => 
                        Object.entries(item).slice(0,100).map(item => 
                            <tr className='price-val'><td key={item[0]}>{item[isDate]}</td></tr>
                        )
                    )
                )}
            </tbody>
        </table>
    </>
  )
}

export default Column