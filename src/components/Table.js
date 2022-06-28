import React from 'react'
import Column from './Column'

const Table = ({ price }) => {
    return (
        <div className='price-table'>
            <table>
            <tbody>
                <tr>
                    <td key='0'>
                        <Column isDate='1' index='0' heading='Date' price={{price}}/>
                    </td>    
                    <td key='1'>
                        <Column isDate='0' index='0' heading='Open' price={{price}}/>
                    </td>
                    <td key='2'>
                        <Column isDate='0' index='1' heading='High' price={{price}}/>
                    </td>
                    <td key='3'>
                        <Column isDate='0' index='2' heading='Low' price={{price}}/>
                    </td>
                    <td key='4'>
                        <Column isDate='0' index='3' heading='Close' price={{price}}/>
                    </td>
                    <td key='5'>
                        <Column isDate='0' index='4' heading='Volume' price={{price}}/>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
    )
}

export default Table