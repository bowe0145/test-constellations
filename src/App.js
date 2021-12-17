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
      <div className="border-2 border-amber-600 text-center rounded-md m-2 p-2 max-w-sm">Fire</div>
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

  const formatter = new Intl.NumberFormat()

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

  return (
    <div className="grid m-2 p-2 max-w-md justify-center">
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate Stars
      </button>
      <div>
        <span>I want </span>
        <select
          onChange={e => setDesiredStar(e.target.value)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
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
          <p>It took {attempts.toString()} attempts lol</p>
          <p>That's {cost} gold</p>
        </div>
      ) : null}
    </div>
  )
}

export default App
