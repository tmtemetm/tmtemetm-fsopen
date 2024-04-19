import { useState } from 'react'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ text, count }) => (
  <div>
    {text} {count}
  </div>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text="good" handleClick={() => setGood(good + 1)} />
        <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" handleClick={() => setBad(bad + 1)} />
      </div>
      <h1>statistics</h1>
      <div>
        <Display text="good" count={good} />
        <Display text="neutral" count={neutral} />
        <Display text="bad" count={bad} />
      </div>
    </div>
  )
}

export default App
