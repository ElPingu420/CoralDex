'use client'

import { useState } from 'react'
import './CoralGame.css'

function CoralGame(props) {
  console.log('ALL PROPS:', props)
  const corals = props.corals
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [currentCoral, setCurrentCoral] = useState(null)
  const [usedCorals, setUsedCorals] = useState([])
  const [gameOver, setGameOver] = useState(false)

  const pickRandomCoral = () => {
    // Filter out corals that have already been used
    const availableCorals = corals.filter(
      coral => !usedCorals.includes(coral.name)
    )

    // If no corals left, game is over
    if (availableCorals.length === 0) {
      setGameOver(true)
      return
    }

    // Pick a random coral from available ones
    const randomIndex = Math.floor(Math.random() * availableCorals.length)
    const selectedCoral = availableCorals[randomIndex]

    setCurrentCoral(selectedCoral)
    setUsedCorals([...usedCorals, selectedCoral.name])
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const restartGame = () => {
    setScore(0)
    setUsedCorals([])
    setGameOver(false)
    setCurrentCoral(null)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const generateAnswers = () => {
    if (!currentCoral) return []

    // Get 3 wrong answers (other corals)
    const wrongAnswers = corals
      .filter(coral => coral.name !== currentCoral.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    // Combine correct + wrong answers and shuffle
    const allAnswers = [currentCoral, ...wrongAnswers]
      .sort(() => Math.random() - 0.5)

    return allAnswers
  }

  const handleAnswerClick = (selectedCoral) => {
    setSelectedAnswer(selectedCoral)
    setShowResult(true)

    if (selectedCoral.name === currentCoral.name) {
      setScore(score + 1)
      console.log('Correct!')
    } else {
      console.log('Wrong! It was:', currentCoral.name)
    }
  }
  return (
    <div className="coral-game">
      <div className="game-header">
        <h2>🎮 Guess the Coral!</h2>
        <div className="score">
          Score: {score} / {usedCorals.length}
        </div>
      </div>

      {gameOver ? (
        <div className="game-over">
          <h2>🎉 Game Over!</h2>
          <p className="final-score">Final Score: {score} / {corals.length}</p>
          <p className="percentage">
            {Math.round((score / corals.length) * 100)}% Correct!
          </p>
          {score === corals.length ? (
            <p className="perfect">🏆 Perfect Score! You're a coral expert! 🏆</p>
          ) : score >= corals.length * 0.6 ? (
            <p>Great job! You know your corals! 🪸</p>
          ) : (
            <p>Keep learning! Try again to improve your score! 💪</p>
          )}
          <button className="start-button" onClick={restartGame}>
            Play Again
          </button>
        </div>
      ) : !currentCoral ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            Test your knowledge! Identify all {corals.length} corals.
          </p>
          <button className="start-button" onClick={pickRandomCoral}>
            Start Game
          </button>
        </div>
      ) : (
        <>
          <div className="question-image">
            <img src={currentCoral.image} alt="Mystery coral" />
          </div>

          <div className="question-text">
            <h3>What coral is this?</h3>
          </div>

          <div className="answers">
            {generateAnswers().map((coral, index) => {
              const isCorrect = coral.name === currentCoral.name
              const isSelected = selectedAnswer?.name === coral.name

              let buttonClass = 'answer-button'
              if (showResult && isCorrect) {
                buttonClass += ' correct'
              } else if (showResult && isSelected && !isCorrect) {
                buttonClass += ' wrong'
              }

              return (
                <button
                  key={index}
                  className={buttonClass}
                  onClick={() => handleAnswerClick(coral)}
                  disabled={showResult}
                >
                  {coral.name}
                </button>
              )
            })}
          </div>

          {showResult && (
            <div className="result">
              {selectedAnswer.name === currentCoral.name ? (
                <div className="result-correct">
                  <h3>✅ Correct!</h3>
                  <p>You identified the {currentCoral.name}!</p>
                </div>
              ) : (
                <div className="result-wrong">
                  <h3>❌ Wrong!</h3>
                  <p>That was the {currentCoral.name}.</p>
                </div>
              )}
              <button className="next-button" onClick={pickRandomCoral}>
                Next Question →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
export default CoralGame