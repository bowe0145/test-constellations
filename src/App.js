import { useState, useEffect } from 'react'
import './App.css'

const Star = ({ type }) => {
  if (type === 'dark') {
    return (
      <div className="border-2 border-slate-600 text-center rounded-md m-2 p-2 max-w-sm">Dark</div>
    )
  } else if (type === 'fire') {
    return (
      <div className="border-2 border-red-500 text-center rounded-md m-2 p-2 max-w-sm">Fire</div>
    )
  } else if (type === 'wind') {
    return (
      <div className="border-2 border-green-500 text-center rounded-md m-2 p-2 max-w-sm">Wind</div>
    )
  } else if (type === 'water') {
    return (
      <div className="border-2 border-blue-500 text-center rounded-md m-2 p-2 max-w-sm">Water</div>
    )
  } else if (type === 'earth') {
    return (
      <div className="border-2 border-amber-600 text-center rounded-md m-2 p-2 max-w-sm">Earth</div>
    )
  }
  return (
    <div className="w-10 border-2 border-red-400 text-center rounded-md m-2 p-2 max-w-sm">*</div>
  )
}

function App() {
  const [stars, setStars] = useState([])
  const [desiredStar, setDesiredStar] = useState('random')
  const [attempts, setAttempts] = useState(0)
  const [cost, setCost] = useState(null)
  const [highestAttempts, setHighestAttempts] = useState(null)
  const [lowestAttempts, setLowestAttempts] = useState(Number.MAX_SAFE_INTEGER)
  const [averageAttempts, setAverageAttempts] = useState(null)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [attemptList, setAttemptList] = useState([])

  const formatter = new Intl.NumberFormat()

  useEffect(() => {
    if (attempts !== null && attempts !== undefined) {
      setAttemptList([...attemptList, attempts])
      setTotalAttempts(totalAttempts + attempts)
      if (highestAttempts === null || attempts > highestAttempts) {
        setHighestAttempts(attempts)
      }
      if (attempts !== null && attempts !== 0 && attempts < lowestAttempts) {
        setLowestAttempts(attempts)
      }
      // Set average
      setAverageAttempts(totalAttempts / attemptList.length)
    }
  }, [attempts])

  // Generate 5 random type stars
  useEffect(() => {
    const generateStars = () => {
      const types = ['dark', 'fire', 'wind', 'water', 'earth']
      const randomTypes = []
      for (let i = 0; i < 5; i++) {
        const randomType = types[Math.floor(Math.random() * types.length)]
        randomTypes.push(randomType)
      }
      return randomTypes
    }
    setStars(generateStars())
  }, [])

  const handleClick = () => {
    // Generate 5 random type stars until the desired star is found in all 5 array slots
    const generateStars = () => {
      const types = ['dark', 'fire', 'wind', 'water', 'earth']
      const randomTypes = []
      for (let i = 0; i < 5; i++) {
        const randomType = types[Math.floor(Math.random() * types.length)]
        randomTypes.push(randomType)
      }
      return randomTypes
    }

    // Loop until all 5 stars are the desired type
    const findDesiredStar = () => {
      if (desiredStar === 'random') {
        setStars(generateStars())
        setAttempts(0)
        setCost(null)
      } else {
        let tempStars = []
        let found = false
        let count = 0
        // Generate stars and check if every star is the desired type
        while (found === false) {
          // Generate new stars
          tempStars = generateStars()
          count++
          // Check if there is ONLY the desired star in all 5 slots of the array
          if (tempStars.every(star => star === desiredStar)) {
            found = true
          }
        }
        // Set the stars to the new array
        setStars(tempStars)
        // Set the attempts to the new number
        setAttempts(count)
        setCost(formatter.format(count * 200_000))
      }
    }

    findDesiredStar()
  }

  const handleChangeDesiredStar = e => {
    setDesiredStar(e.target.value)
    setHighestAttempts(null)
    setLowestAttempts(Number.MAX_SAFE_INTEGER)
    setAverageAttempts(null)
    setTotalAttempts(0)
    setAttemptList([])
  }

  return (
    <div className="grid p-2 max-w-md justify-center m-auto">
      <button
        onClick={handleClick}
        className="font-bold py-2 px-4 rounded border-blue-400 bg-blue-600 border-2"
      >
        Generate Stars
      </button>
      <div>
        <span>I want </span>
        <select
          onChange={handleChangeDesiredStar}
          className="border-2 border-blue-400 text-slate-800 font-bold py-2 px-4 rounded m-2"
        >
          <option value="random">Random</option>
          <option value="dark">Dark</option>
          <option value="fire">Fire</option>
          <option value="wind">Wind</option>
          <option value="water">Water</option>
          <option value="earth">Earth</option>
        </select>
      </div>
      <div className="flex-auto flex-wrap flex-row">
        {stars !== null && stars !== undefined && stars.length > 0
          ? stars.map((star, index) => <Star key={index} type={star} />)
          : null}
      </div>
      {cost !== null ? (
        <div>
          <p className="text-center">It took {attempts.toString()} attempts lol</p>
          <p className="text-center">That's {cost} gold</p>
          {highestAttempts !== null ? (
            <div className="m-2">
              <h3 className="text-center">Attempts</h3>
              <div className="grid grid-cols-2 gap-2">
                <span>Highest:</span> <span className="text-right">{highestAttempts}</span>
                <span>Lowest:</span> <span className="text-right">{lowestAttempts}</span>
                <span>Average</span>
                <span className="text-right">{formatter.format(averageAttempts) || 0}</span>
                <span>Average Cost</span>
                <span className="text-right">{formatter.format(averageAttempts * 200_000)}</span>
                <span>Total (Added)</span>
                <span className="text-right">{formatter.format(totalAttempts)}</span>
                <span>Total Clicks</span>
                <span className="text-right">{attemptList.length || 0}</span>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default App
