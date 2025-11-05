import { useEffect, useState } from "react"
import Card from "./components/Card"
import { fetchCards, type Enemy } from "./services/FetchCard"


const App = () => {
  const [cards, setCards] = useState<Enemy[]>([])
  const [hp, setHp] = useState(5)
  const [damage, setDamage] = useState(5)
  const [currentCard, setCurrentCard] = useState<Enemy>()
  const [talon, setTalon] = useState<Enemy[]>([])

  useEffect(() =>{
    if (hp <= 0){
      alert("Game Over")
    }
  }, [hp])

  useEffect(() => {
    fetchCards().then(x => setCards(x))
  }, [])

  const drawCard = () => {
    
    if (cards.length === 0) return
    const randomIndex = Math.floor(Math.random() * cards.length)
    const card = cards[randomIndex]
    cards.splice(randomIndex, 1)
    setCurrentCard(card)

    if(currentCard !== undefined){
      setCards([...cards, currentCard])
    }

  }

  const putIntoTalon = (card: Enemy) => {
    if (talon.length >= 2) return
    setTalon([...talon, card])
    setCurrentCard(undefined)
  }

  const removeFromTalon = (index: number) => {
    setCurrentCard(talon[index])
    const newTalon = talon.filter((_, i) => i !== index)
    setTalon(newTalon)
    
  }
  const roll = (): number =>{
    return Math.floor(Math.random() * 6) + 1
  }

  const fight = () => {
    if (currentCard.level > roll() + damage){
      alert("You lost the fight")
      for (const penalty of currentCard?.penalty){
        if (penalty === "❤"){
          setHp(hp - 1)

        }
        if (penalty === "⚔"){
          if(0 >=damage) return
          setDamage(damage - 1)
        }
      }
    }
    else{
      alert("You won the fight")
      if(currentCard?.enemyName === "dragon"){
        alert("You defeated the dragon! You win the game!")
        setHp(0)
        return
      }
      for (const reward of currentCard?.reward){
        if (reward === "❤"){
          if(hp >= 5) return
          setHp(hp + 1)
        }
        if (reward === "⚔"){
          if(damage >= 5) return
          setDamage(damage + 1)
        }
    }
  }
  setCards([...cards, currentCard!])
  }

  return (
    <div className="container">
      <section className="talon-container">
        {talon.map((card, index) => (
          <div onClick={() => removeFromTalon(index)}><Card {...card}></Card></div>
        ))}
      </section>
      <section className="center-container">
        <div>
          {currentCard ? <Card  {...currentCard}>Test</Card> : <div></div>}
          
        </div>
        <button onClick={() => fight()}>Fight</button>
        <button onClick={() => putIntoTalon(currentCard)}>Flee</button>
      </section>
      <section className="right-container">
        <header>
        <div>
          <div >max 5</div>
          <div>{"❤".repeat(hp)}</div>
          
        </div>
        <div>
          <div>max 5</div>
          <div>{"⚔".repeat(damage)}</div>
        </div>
        </header>

        <div className="deck" onClick={() => {drawCard()}}>

        </div>
      </section>
    </div>
  )
}

export default App