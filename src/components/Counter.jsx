import PropTypes from 'prop-types'

const Counter = ({ count, setCount }) => {

    Counter.propTypes = {
        count: PropTypes.number.isRequired,
        setCount: PropTypes.func.isRequired
    }

    return (
        <div>
            <h1>Counter{count}</h1>
            <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
        </div>
    )
}

export default Counter