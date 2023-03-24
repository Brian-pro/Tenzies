import React, { useEffect, useState } from "react"
import Confetti from "react-confetti"
import {nanoid} from "nanoid"
import Die from "./components/Die"
import Stats from "./components/Stats"

export default function App() {
  const allNewDice = () => {
    const arr = []
    
    for (let i = 0; i < 10; i++) {
      arr.push({
        id: nanoid(),
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false
      })
    }

    return arr
  }

  const [diceArray, setDiceArray] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollTracker, setRollTracker] = useState(0)
  const [timer, setTimer] = useState(0)
  const [timerID, setTimerID] = useState(null)
  const [bestStats, setBestStats] = useState(JSON.parse(localStorage.getItem("Best stats")) || {
    bestRolls: 0,
    bestTime: 0
  })

  useEffect(() => {
    let isGameWon = true;
    for (let i = 0; i < diceArray.length; i++) {
      if (diceArray[i].isHeld === false || diceArray[i].value !== diceArray[0].value) {
        isGameWon = false;
      }
    }
    
    if (isGameWon) {
      setTenzies(true)
    }
  }
  , [diceArray])

  useEffect(() => {
    if (rollTracker === 1) {
      setTimerID(setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000))
    }
    
    if (tenzies) {
      if (bestStats.bestTime > timer) {
        localStorage.setItem("Best stats", JSON.stringify({
          bestRolls: rollTracker,
          bestTime: timer
        }))
        setBestStats(JSON.parse(localStorage.getItem("Best stats")))
      }

      clearInterval(timerID)
    }
  }, [rollTracker, tenzies])

  const hold = (id) => {
    setDiceArray(prevDiceArray => {
      const newDiceArray = prevDiceArray.map(die => {
        if(id === die.id) {
          return {
            ...die,
            isHeld: !die.isHeld
          }
        }
        else {
          return die
        }
      })
      
      return newDiceArray
    })
  }

  const reroll = () => {
    if (tenzies) {
      setTenzies(false)
      setDiceArray(allNewDice())
      setRollTracker(0)
      setTimer(0)
      setTimerID(null)
    }
    else {
      setRollTracker(prevCount => prevCount + 1)
      setDiceArray(prevDiceArray => {
        const newDiceArray = prevDiceArray.map(die => {
          if(die.isHeld === false) {
            return {
              id: nanoid(),
              value: Math.floor(Math.random() * 6) + 1,
              isHeld: false
            }
          }
          else {
            return die
          }
        })
        
        return newDiceArray
      })
    }
  }

  const displayDice = diceArray.map(die => {
    return (
      <Die 
        key= {die.id}
        id= {die.id}
        value= {die.value}
        isHeld= {die.isHeld}
        handleClick= {hold}
      />
    )
  })
  
  return (
    <main className="tenzies-container">
      {tenzies && <Confetti />}
      <div className="tenzies-board">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="die-grid">
          {displayDice}
        </div>
        <button className="roll-dice" onClick={reroll}>
          {tenzies ? "NEW GAME" : "ROLL"}
        </button>
        <Stats 
          count={rollTracker}
          timer={timer}
          stats={bestStats}
        />
      </div>
    </main>
  )
}