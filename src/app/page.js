'use client'
import { useEffect, useState } from 'react'
import CoralCard from '@/components/CoralCard'
import CoralGame from '@/components/CoralGame'
import './page.css'

function App() {
  const [corals, setCorals] = useState([])
  const [currentView, setCurrentView] = useState('collection')
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch('/api/corals')
      .then(res => res.json())
      .then(data => {
        setCorals(data)
        setLoading(false)
      })
  }, [])
  
  return (
    <div className="app">
      <h1>🪸 CoralDex 🪸</h1>
      <p className="subtitle">Collect and learn about amazing coral species!</p>

      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginTop: '2rem' }}>
          Loading corals... 🪸
        </p>
      ) : (
        <>
          <div className="nav-buttons">
            <button
              className={currentView === 'collection' ? 'active' : ''}
              onClick={() => setCurrentView('collection')}
            >
              📚 Collection
            </button>
            <button
              className={currentView === 'game' ? 'active' : ''}
              onClick={() => setCurrentView('game')}
            >
              🎮 Play Game
            </button>
          </div>

          {currentView === 'game' ? (
            <CoralGame corals={corals} />
          ) : (
            <div className="card-grid">
              {corals.map((coral, index) => (
                <CoralCard key={index} coral={coral} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default App
