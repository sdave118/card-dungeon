import type { Enemy } from "../services/FetchCard"

const Card = (prop:Enemy) => {
  return (
    <div>
       <div className="enemy-card">
      <div className="enemy-icon">{prop.enemyIcon}</div>

      <div className="enemy-level">
        {`level ${prop.level}`}
      </div>

      <div className="enemy-row">
        <span className="label">Reward:</span> {prop.reward}
      </div>

      <div className="enemy-row">
        <span className="label">Penalty</span> {prop.penalty}
      </div>
    </div>
    </div>
  )
}

export default Card