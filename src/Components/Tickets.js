import React from 'react'
import { useAppContext } from '../AppContext'
import './../Styles/Tickets.css'

const Tickets = () => {
    const appContextData = useAppContext()

    const ruleNumber = (id) => {
        let nums = []
        for (let i=0; i <  5; i++) {
            let randomnumber = Math.floor(Math.random() * (39 - 1));
            while (randomnumber in nums) {
                randomnumber = Math.floor(Math.random() * (39 - 1));
            }
            nums.push(randomnumber)
        }
        console.log(id)
        console.log(nums)
        let games = []
        for (let i=0; i < appContextData.games.length; i++) {
            if (id === i+1) {
                let updated = {
                    "id": id,
                    "numbers": appContextData.games[i].numbers,
                    "isRuled": true,
                    "ruledNumbers": nums
                }
                games.push(updated)
                let winedcount = 0
                for (let j=0; j < games[i].numbers.length; j++) {
                    for (let k=0; k < nums.length; k++) {
                        if (nums[k] === games[i].numbers[j]) {
                            winedcount++;
                        }
                    }
                }
                switch (winedcount) {
                    case 2:
                        appContextData.setAkcsePlayer(appContextData.akcsePlayer + 500 * 0.3)
                        appContextData.setAkcseOperator(appContextData.akcseOperator - 500 * 0.3)
                        break;
                    case 3:
                        appContextData.setAkcsePlayer(appContextData.akcsePlayer + 500 * 0.7)
                        appContextData.setAkcseOperator(appContextData.akcseOperator - 500 * 0.7)
                        break;
                    case 4:
                        appContextData.setAkcsePlayer(appContextData.akcsePlayer + 500 * 2)
                        appContextData.setAkcseOperator(appContextData.akcseOperator - 500 * 2)
                        break;
                    case 5:
                        appContextData.setAkcsePlayer(appContextData.akcsePlayer + 500 * 5)
                        appContextData.setAkcseOperator(appContextData.akcseOperator - 500 * 5)
                        break;
                }
            }
            else {
                games.push(appContextData.games[i])
            }
        }
        appContextData.setGames(games)
    }

    return (
        <div className='ticket-container'>
            {appContextData.games !== undefined ? appContextData.games.map((game) => {
                return <div className='text'>{game.id}. Játék: Játékos megtett számai: {game.numbers[0]}, {game.numbers[1]}, {game.numbers[2]}, {game.numbers[3]}, {game.numbers[4]} {game.isRuled ? <>Sorsolt számok: {game.ruledNumbers[0]}, {game.ruledNumbers[1]}, {game.ruledNumbers[2]}, {game.ruledNumbers[3]}, {game.ruledNumbers[4]}</> : appContextData.whoami === "Üzemeltető" ? <button className='button' onClick={() => {
                    ruleNumber(game.id);
                }}>Sorsol</button> : <>Még sorsolásra vár</>}</div>
            }) : null}
        </div>
    )
}

export default Tickets