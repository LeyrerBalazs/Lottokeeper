import React from 'react'
import games from "./../Datas/games.json"
import { useAppContext } from '../AppContext'
import './../Styles/Tickets.css'

const Tickets = () => {
    const appContextData = useAppContext()
    return (
        <div className='ticket-container'>
            {games.map((game) => {
                return <div className='text'>{game.id}. Játék: Játékos megtett számai: {game.numbers[0]}, {game.numbers[1]}, {game.numbers[2]}, {game.numbers[3]}, {game.numbers[4]} {game.isRuled ? <>Sorsolt számok: {game.ruledNumbers[0]}, {game.ruledNumbers[1]}, {game.ruledNumbers[2]}, {game.ruledNumbers[3]}, {game.ruledNumbers[4]}</> : appContextData.whoami === "Üzemeltető" ? <button className='button'>Sorsol</button> : <>Még sorsolásra vár</>}</div>
            })}
        </div>
    )
}

export default Tickets