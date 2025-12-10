'use client'

import './CoralCard.css'

function CoralCard({ coral }) {
  return (
    <div className="coral-card">
      <div className="card-header">
        <h2>{coral.name}</h2>
        <span className="rarity">{coral.rarity}</span>
      </div>
      
      <div className="card-image">
        <img src={coral.image} alt={coral.name} />
      </div>
      
      <div className="card-stats">
        <div className="stat">
          <span className="stat-label">Light:</span>
          <span className="stat-value">{coral.light}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Flow:</span>
          <span className="stat-value">{coral.flow}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Difficulty:</span>
          <span className="stat-value">{coral.difficulty}</span>
        </div>
      </div>
      
      <div className="card-description">
        <p>{coral.description}</p>
      </div>
    </div>
  )
}

export default CoralCard

