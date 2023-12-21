import React, {createContext, useState, useContext, useEffect} from "react";

const appContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [name, setName] = useState('Ismeretlen');
    const [whoami, setWhoami] = useState('Játékos');
    const [tempName, setTempName] = useState(name);
    const [akcsePlayer, setAkcsePlayer] = useState(10000);
    const [akcseOperator, setAkcseOperator] = useState(0);
    const [first, setFirst] = useState(true);
    const [isNameChange, setIsNameChange] = useState(false);
    const [games, setGames] = useState([]);
    const [selected, setSelected] = useState([]);
    const [notRuled, setNotRuled] = useState([]);
    const [plusminus, setPlusminus] = useState(0);

    const resetState = () => {
        setName('Ismeretlen');
        setWhoami('Játékos');
        setTempName(name);
        setAkcsePlayer(10000);
        setAkcseOperator(0);
        setIsNameChange(false);
        setGames([]);
        setNotRuled([]);
        setPlusminus(0)
    };

    const ruleNumber = async (id) => {
        console.log(id)
        let nums = [];
        for (let i=0; i <  5; i++) {
            let randomnumber = Math.floor(Math.random() * (39 - 1));
            do {
                randomnumber = Math.floor(Math.random() * (39 - 1));
            } while (nums.includes(randomnumber));
            nums.push(randomnumber);
        }
        let gamesTemp = [];
        for (let i=0; i < games.length; i++) {
            if (id === i+1) {
                let updated = {
                    "id": id,
                    "numbers": games[i].numbers,
                    "isRuled": true,
                    "ruledNumbers": nums,
                    "cost": 500,
                    "win": 0,
                    "wincount": games[i].wincount
                };
                let winedcount = 0;
                for (let j=0; j < updated.numbers.length; j++) {
                    for (let k=0; k < nums.length; k++) {
                        if (nums[k] === updated.numbers[j]) {
                            winedcount++;
                        }
                    }
                }
                switch (winedcount) {
                    case 0:
                        updated = {
                            "id": id,
                            "numbers": games[i].numbers,
                            "isRuled": true,
                            "ruledNumbers": nums,
                            "cost": 500,
                            "win": 0,
                            "wincount" : 0
                        };
                        break;
                    case 1:
                        updated = {
                            "id": id,
                            "numbers": games[i].numbers,
                            "isRuled": true,
                            "ruledNumbers": nums,
                            "cost": 500,
                            "win": 0,
                            "wincount" : 1
                        };
                        break;
                    case 2:
                        setAkcsePlayer(akcsePlayer + 750);
                        setAkcseOperator(akcseOperator - 750);
                        updated = {
                            "id": id,
                            "numbers": games[i].numbers,
                            "isRuled": true,
                            "ruledNumbers": nums,
                            "cost": 500,
                            "win": 750,
                            "wincount" : 2
                        };
                        break;
                    case 3:
                        setAkcsePlayer(akcsePlayer + 1500);
                        setAkcseOperator(akcseOperator - 1500);
                        updated = {
                            "id": id,
                            "numbers": games[i].numbers,
                            "isRuled": true,
                            "ruledNumbers": nums,
                            "cost": 500,
                            "win": 1500,
                            "wincount" : 3
                        };
                        break;
                    case 4:
                        setAkcsePlayer(akcsePlayer + 2500);
                        setAkcseOperator(akcseOperator - 2500);
                        updated = {
                            "id": id,
                            "numbers": games[i].numbers,
                            "isRuled": true,
                            "ruledNumbers": nums,
                            "cost": 500,
                            "win": 2500,
                            "wincount" : 4
                        };
                        break;
                    case 5:
                        setAkcsePlayer(akcsePlayer + 5500);
                        setAkcseOperator(akcseOperator - 5500);
                        updated = {
                            "id": id,
                            "numbers": games[i].numbers,
                            "isRuled": true,
                            "ruledNumbers": nums,
                            "cost": 500,
                            "win": 5500,
                            "wincount" : 5
                        };
                        break;
                    default:
                        break;
                }
                gamesTemp.push(updated);
            }
            else {
                gamesTemp.push(games[i]);
            }
        }
        await setNotRuled(notRuled.filter(item => id !== item));
        await setGames(gamesTemp);
    };

    useEffect(() => {
        if (first !== true) {
            localStorage.setItem('akcsePlayer', akcsePlayer);
            localStorage.setItem('akcseOperator', akcseOperator);
            localStorage.setItem('games', JSON.stringify(games));
            localStorage.setItem('notRuled', JSON.stringify(notRuled));
            localStorage.setItem('name', name);
        }
        else {
            setFirst(false);
            const akcsePlayerData = localStorage.getItem('akcsePlayer');
            setAkcsePlayer(parseInt(akcsePlayerData ? akcsePlayerData : 10000));
            const akcseOperatorData = localStorage.getItem('akcseOperator');
            setAkcseOperator(parseInt(akcseOperatorData ? akcseOperatorData : 0));
            const gamesData = localStorage.getItem('games');
            setGames(gamesData ? JSON.parse(gamesData) : []);
            const notRuledData = localStorage.getItem('notRuled');
            setNotRuled(notRuledData ? JSON.parse(notRuledData) : []);
            const nameData = localStorage.getItem('name');
            setName(nameData ? nameData : "Ismeretlen");
        }
        setPlusminus(0 + akcseOperator);
    }, [akcsePlayer, akcseOperator, games, notRuled, name]);


    const contextData = {
        name,
        setName,
        tempName,
        setTempName,
        isNameChange,
        setIsNameChange,
        whoami,
        setWhoami,
        akcsePlayer,
        setAkcsePlayer,
        akcseOperator,
        setAkcseOperator,
        resetState,
        first,
        setFirst,
        games,
        setGames,
        selected,
        setSelected,
        plusminus,
        setPlusminus,
        notRuled,
        setNotRuled,
        ruleNumber
    };

    return (
        <appContext.Provider value={contextData}>
            { children }
        </appContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(appContext);
};