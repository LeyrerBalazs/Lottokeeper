import React, { useEffect, useState } from 'react'
import './../Styles/Lottery.css'
import { useAppContext } from '../AppContext'

const Lottery = () => {
    const [buttons, setButtons] = useState([])
    const appContextData = useAppContext()

    const betPlayer = () => {
        if (appContextData.selected.length !== 5) {
            alert("Válasz, ki 5 számot!\nEddig kiválaszott szám:" + appContextData.selected.length + " (Még " + (5 - appContextData.selected.length) + " kell)");
        }
        else {
            if (appContextData.akcsePlayer >= 500) {
                console.log(appContextData.games)
                appContextData.setAkcsePlayer(appContextData.akcsePlayer - 500);
                appContextData.setAkcseOperator(appContextData.akcseOperator + 500);
                appContextData.setGames([...appContextData.games, {
                        "id": appContextData.games.length + 1,
                        "numbers": appContextData.selected,
                        "isRuled": false,
                        "ruledNumbers": []
                }])
                console.log(appContextData.games)
            }
            else {
                alert("Nincs elég akcséd hogy játsz!")
            }
            appContextData.setSelected([])
        }
    }

    const deleteSelected = (num) => {
        appContextData.setSelected(appContextData.selected.filter(item => num !== item))
    }

    const selectedNew = (num) => {
        let disallow = false
        for (let i = 0; i < appContextData.selected.length; i++) {
            if (num === appContextData.selected[i]) {
                disallow = true
            }
        }
        if (disallow) {
            alert("Hiba már kiválasztottad ezt a számot!")
        }
        else {
            if (appContextData.selected.length >= 5) {
                alert("Kiválasztottál már 5 számot!")
            }
            else {
                appContextData.setSelected([...appContextData.selected, num])
            }
        }
    }

    useEffect(() => {
        if (appContextData.first !== true) {
            localStorage.setItem('akcsePlayer', appContextData.akcsePlayer);
            localStorage.setItem('akcseOperator', appContextData.akcseOperator);
            localStorage.setItem('games', appContextData.games);
        }
        else {
            appContextData.setFirst(false);
            appContextData.setAkcsePlayer(parseInt(localStorage.getItem('akcsePlayer')))
            appContextData.setAkcseOperator(parseInt(localStorage.getItem('akcseOperator')))
            appContextData.setAkcseOperator(parseInt(localStorage.getItem('akcseOperator')))
        }
    }, [appContextData.akcsePlayer, appContextData.akcseOperator, appContextData.games]);

    const displayButtons = () => {
        let selectedNums = appContextData.selected
        let newButtons = []
        for (let i=1; i < 40; i++) {
            if (selectedNums.length === 0) {
                newButtons.push(<button key={i} className='button' onClick={() => {selectedNew(i)}}>{i}</button>)
            }
            else if (selectedNums.length > 0) {
                let isSelected = false
                for (let j = 0; j < selectedNums.length; j++) {
                    if (selectedNums[j] === i) {
                        isSelected = true
                    }
                }
                if (isSelected) {
                    newButtons.push(<button key={i} className='button2' onClick={() => {deleteSelected(i)}}>{i}</button>)
                }
                else {
                    newButtons.push(<button key={i} className='button' onClick={() => {selectedNew(i)}}>{i}</button>)
                }
            }
        }
        setButtons(newButtons)
    }

    useEffect(() => {
        displayButtons()
    }, [appContextData.selected])
    
    return (
        <>
            <div className='lottery-container'>
                {buttons}
                
            </div>
            <div  className='lottery-container'>
                <button className='button3' onClick={() => {betPlayer()}}>Megtesz</button>
            </div>
        </>
    )
}

export default Lottery