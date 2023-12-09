import React, { useEffect, useState } from 'react'
import './../Styles/Lottery.css'

const Lottery = () => {
    const [buttons, setButtons] = useState([])
    const [selected, setSelected] = useState([])

    const selectedNew = (num) => {
        let disallow = false
        for (let i = 0; i < selected.length; i++) {
            if (num == selected[i]) {
                disallow = true
            }
        }
        if (disallow) {
            console.log("Hiba már kiválasztottad ezt a számot!")
        }
        else {
            if (selected.length >= 5) {
                console.log("Kiválasztottál már 5 számot!")
            }
            else {
                setSelected([...selected, num])
            }
        }
    }

    const displayButtons = () => {
        let selectedNums = selected
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
                    newButtons.push(<button key={i} className='button' style={{backgroundColor: "#ff0000"}} onClick={() => {selectedNew(i)}}>{i}</button>)
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
    }, [selected])
    
    return (
        <div className='lottery-container'>
            {buttons}
        </div>
  )
}

export default Lottery