import React, { useEffect, useState } from 'react';
import { useAppContext } from '../AppContext';
import './../Styles/Lottery.css';
import akcseImg from './../Assets/akcse.png';

const Lottery = () => {
    const [buttons, setButtons] = useState([]);
    const appContextData = useAppContext();
    const [many, setMany] = useState(0);

    const betPlayer = () => {
        if (appContextData.selected.length !== 5) {
            alert("Válasz, ki 5 számot!\nEddig kiválaszott szám:" + appContextData.selected.length + " (Még " + (5 - appContextData.selected.length) + " kell)");
        }
        else {
            if (appContextData.akcsePlayer >= 500) {
                appContextData.setAkcsePlayer(appContextData.akcsePlayer - 500);
                appContextData.setAkcseOperator(appContextData.akcseOperator + 500);
                appContextData.setGames([...appContextData.games, {
                        "id": appContextData.games.length + 1,
                        "numbers": appContextData.selected,
                        "isRuled": false,
                        "ruledNumbers": [],
                        "cost": 500,
                        "win": 0,
                        "wincount" : 0
                }]);
            }
            else {
                alert("Nincs elég akcséd hogy játsz!");
            }
            appContextData.setSelected([]);
            appContextData.setNotRuled([...appContextData.notRuled, (appContextData.games.length + 1)]);
        }
    };

    const deleteSelected = (num) => {
        appContextData.setSelected(appContextData.selected.filter(item => num !== item));
    };

    const selectedNew = (num) => {
        let disallow = false;
        for (let i = 0; i < appContextData.selected.length; i++) {
            if (num === appContextData.selected[i]) {
                disallow = true;
            }
        }
        if (disallow) {
            alert("Hiba már kiválasztottad ezt a számot!");
        }
        else {
            if (appContextData.selected.length >= 5) {
                alert("Kiválasztottál már 5 számot!");
            }
            else {
                appContextData.setSelected([...appContextData.selected, num]);
            }
        }
    };

    
    const displayButtons = () => {
        let selectedNums = appContextData.selected;
        let newButtons = [];
        for (let i=1; i < 40; i++) {
            if (selectedNums.length === 0) {
                newButtons.push(<button key={i} className='button' onClick={() => {selectedNew(i)}}>{i}</button>);
            }
            else if (selectedNums.length > 0) {
                let isSelected = false;
                for (let j = 0; j < selectedNums.length; j++) {
                    if (selectedNums[j] === i) {
                        isSelected = true;
                    }
                }
                if (isSelected) {
                    newButtons.push(<button key={i} className='button2' onClick={() => {deleteSelected(i)}}>{i}</button>);
                }
                else {
                    newButtons.push(<button key={i} className='button' onClick={() => {selectedNew(i)}}>{i}</button>);
                }
            }
        }
        setButtons(newButtons);
    };


    const HandleManyRules = async () => {
        for (let i=0; i < many; i++) {
            await new Promise(resolve => setTimeout(resolve, 500))
            await appContextData.ruleNumber(appContextData.notRuled[i])
            setMany(many - 1)
        }
    }

    useEffect(() => {
        displayButtons();
    }, [appContextData.selected]);
    
    return (
        <>
            {appContextData.whoami === "Játékos" ? (
                <>
                    <div className='lottery-container'>
                        {buttons}
                    </div>
                    <div  className='lottery-container'>
                        <button className='button3' onClick={() => {betPlayer()}}>Megtesz</button>
                    </div>
                </>
            ) : (
                <div className='lottery-container'>
                    <input type="number" min="0" max={appContextData.notRuled.length} value={many} onChange={(event) => {
                        setMany(event.target.value)
                    }} className='input' />
                    <button className='button4' onClick={() => {
                        HandleManyRules()
                    }}>{many} sorsolása</button>
                </div>
            )}
            <div className='lottery-container'>
                <span style={{ fontSize: " 50px",  backgroundColor: "#ffffff"}}>Összesen: </span>
                <span style={appContextData.whoami === "Üzemeltető" ? ( appContextData.plusminus > 0 ? {backgroundColor: "#ffffff", color: "#00ff00", fontSize: "50px"} : {backgroundColor: "#ffffff", color:"#ff0000", fontSize: "50px"} ) : ( appContextData.plusminus < 0 ? {backgroundColor: "#ffffff", color: "#00ff00", fontSize: "50px"} : {backgroundColor: "#ffffff", color:"#ff0000", fontSize: "50px"} )}> {appContextData.plusminus < 0 ? appContextData.plusminus * -1 : appContextData.plusminus }</span>
                <img style={{ backgroundColor: "#ffffff"}} src={akcseImg} alt='akcseImg'  className='akcse-img' title="Akcse" />
            </div>
        </>
    );
};

export default Lottery;