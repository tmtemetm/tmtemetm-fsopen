import { useState } from 'react'

const AnecdoteDisplay = ({ anecdotes, points, index }) => (
  <div>
    <div>
      {anecdotes[index]}
    </div>
    <div>
      has {points[index]} votes
    </div>
  </div>
)

const AnecdoteOfTheDay = ({ anecdotes, selected, points, handleVote, handleNext }) => (
  <div>
    <h1>Anecdote of the day</h1>
    <AnecdoteDisplay
      anecdotes={anecdotes}
      points={points}
      index={selected}
    />
    <div>
      <button onClick={handleVote}>
        vote
      </button>
      <button onClick={handleNext}>
        next anecdote
      </button>
    </div>
  </div>
)

const TopAnecdote = ({ anecdotes, points }) => {
  const topIndex = points.reduce((currentMax, nextValue, nextIndex, array) =>
    nextValue > array[currentMax]
      ? nextIndex
      : currentMax,
    0)

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <AnecdoteDisplay
        anecdotes={anecdotes}
        points={points}
        index={topIndex}
      />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const sampleRandomAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length))

  const voteSelectedAnecdote = () =>
    setPoints(points.map((point, index) =>
      index === selected ? point + 1 : point))

  return (
    <div>
      <AnecdoteOfTheDay
        anecdotes={anecdotes}
        selected={selected}
        points={points}
        handleVote={voteSelectedAnecdote}
        handleNext={sampleRandomAnecdote}
      />
      <TopAnecdote
        anecdotes={anecdotes}
        points={points}
      />
    </div>
  )
}

export default App
