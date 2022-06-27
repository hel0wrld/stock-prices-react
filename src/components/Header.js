import PropTypes from 'prop-types'

const Headers = ({title}) => {
  return (
    <header>
        <h1>
        Stock Prices
        </h1>
    </header>
  )
}

Headers.defaultProps = {
  title:'Stock Prices',
}

Headers.propTypes = {
  title:PropTypes.string,
}

// CSS in JS inline
// const headingStyle = {
//   color: 'blue'
// }

export default Headers