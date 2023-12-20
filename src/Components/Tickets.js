import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import './../Styles/Tickets.css';
import akcseImg from './../Assets/akcse.png';
import { useEffect } from 'react';

const Tickets = () => {
    const appContextData = useAppContext();
    const [sort, setSort] = useState(1)

    const ruleNumber = (id) => {
        let nums = [];
        for (let i=0; i <  5; i++) {
            let randomnumber = Math.floor(Math.random() * (39 - 1));
            while (randomnumber in nums) {
                randomnumber = Math.floor(Math.random() * (39 - 1));
            }
            nums.push(randomnumber);
        }
        let games = [];
        for (let i=0; i < appContextData.games.length; i++) {
            if (id === i+1) {
                let updated = {
                    "id": id,
                    "numbers": appContextData.games[i].numbers,
                    "isRuled": true,
                    "ruledNumbers": nums,
                    "cost": 500,
                    "win": 0,
                    "wincount": appContextData.games[i].wincount
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
                            "numbers": appContextData.games[i].numbers,
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
                            "numbers": appContextData.games[i].numbers,
                            "isRuled": true,
                            "ruledNumbers": nums,
                            "cost": 500,
                            "win": 0,
                            "wincount" : 1
                        };
                        break;
                    case 2:
                        appContextData.setAkcsePlayer(appContextData.akcsePlayer + 750);
                        appContextData.setAkcseOperator(appContextData.akcseOperator - 750);
                        updated = {
                            "id": id,
                            "numbers": appContextData.games[i].numbers,
                            "isRuled": true,
                            "ruledNumbers": nums,
                            "cost": 500,
                            "win": 750,
                            "wincount" : 2
                        };
                        break;
                    case 3:
                        appContextData.setAkcsePlayer(appContextData.akcsePlayer + 1500);
                        appContextData.setAkcseOperator(appContextData.akcseOperator - 1500);
                        updated = {
                            "id": id,
                            "numbers": appContextData.games[i].numbers,
                            "isRuled": true,
                            "ruledNumbers": nums,
                            "cost": 500,
                            "win": 1500,
                            "wincount" : 3
                        };
                        break;
                    case 4:
                        appContextData.setAkcsePlayer(appContextData.akcsePlayer + 2500);
                        appContextData.setAkcseOperator(appContextData.akcseOperator - 2500);
                        updated = {
                            "id": id,
                            "numbers": appContextData.games[i].numbers,
                            "isRuled": true,
                            "ruledNumbers": nums,
                            "cost": 500,
                            "win": 2500,
                            "wincount" : 4
                        };
                        break;
                    case 5:
                        appContextData.setAkcsePlayer(appContextData.akcsePlayer + 5500);
                        appContextData.setAkcseOperator(appContextData.akcseOperator - 5500);
                        updated = {
                            "id": id,
                            "numbers": appContextData.games[i].numbers,
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
                
                games.push(updated);
            }
            else {
                games.push(appContextData.games[i]);
            }
        }
        appContextData.setGames(games);
        appContextData.setNotRuled(appContextData.notRuled.filter(item => id !== item));
    };

    return (
        <div className='ticket-container'>
            <table>
                <tr>
                    <td>ID<button className='button2' style={{
                        height: "50px",
                        marginLeft: "20px",
                        position: "relative",
                        bottom: "7px"
                    }} onClick={() => {
                        sort === 0 ? setSort(1) : setSort(0)
                    }}>Rendez</button></td>
                    <td>Megtett számok</td>
                    <td colSpan={4}>Sorsolás / ( Sorsolt számok | Tét | Nyeremény | Találat ) </td>
                </tr>
                {appContextData.games !== undefined ? (
                    sort !== 0 ?
                        appContextData.games.toReversed().map((game) => {
                            return <>{game.isRuled === true ? (
                                <tr>
                                    <td>{game.id}</td>
                                    <td>{game.numbers[0]}, {game.numbers[1]}, {game.numbers[2]}, {game.numbers[3]}, {game.numbers[4]}</td>
                                    <td>{game.ruledNumbers[0]}, {game.ruledNumbers[1]}, {game.ruledNumbers[2]}, {game.ruledNumbers[3]}, {game.ruledNumbers[4]}</td>
                                    <td><span style={appContextData.whoami === "Üzemeltető" ? { color: "#00ff00" } : { color: "#ff0000"}}>{appContextData.whoami === "Üzemeltető" ? <>+</> : <>-</>}{game.cost}</span><img src={akcseImg} alt='akcseImg'  className='akcse-img' title="Akcse" /></td>
                                    <td><span style={appContextData.whoami === "Játékos" ? { color: "#00ff00" } : { color: "#ff0000"}}>{appContextData.whoami === "Játékos" ? <>+</> : <>-</>}{game.win}</span><img src={akcseImg} alt='akcseImg'  className='akcse-img' title="Akcse" /></td>
                                    <td>{game.wincount}</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td>{game.id}</td>
                                    <td>{game.numbers[0]}, {game.numbers[1]}, {game.numbers[2]}, {game.numbers[3]}, {game.numbers[4]}</td>
                                    <td colSpan={4}>{appContextData.whoami === "Üzemeltető" ? <button className='button' onClick={() => {
                                        ruleNumber(game.id);
                                    }}>Sorsol</button> : <> Még sorsolásra vár</>}</td>
                                </tr>
                            )}</>
                        })
                    :
                    appContextData.games.map((game) => {
                        return <>{game.isRuled === true ? (
                            <tr>
                                <td>{game.id}</td>
                                <td>{game.numbers[0]}, {game.numbers[1]}, {game.numbers[2]}, {game.numbers[3]}, {game.numbers[4]}</td>
                                <td>{game.ruledNumbers[0]}, {game.ruledNumbers[1]}, {game.ruledNumbers[2]}, {game.ruledNumbers[3]}, {game.ruledNumbers[4]}</td>
                                <td><span style={appContextData.whoami === "Üzemeltető" ? { color: "#00ff00" } : { color: "#ff0000"}}>{appContextData.whoami === "Üzemeltető" ? <>+</> : <>-</>}{game.cost}</span><img src={akcseImg} alt='akcseImg'  className='akcse-img' title="Akcse" /></td>
                                <td><span style={appContextData.whoami === "Játékos" ? { color: "#00ff00" } : { color: "#ff0000"}}>{appContextData.whoami === "Játékos" ? <>+</> : <>-</>}{game.win}</span><img src={akcseImg} alt='akcseImg'  className='akcse-img' title="Akcse" /></td>
                                <td>{game.wincount}</td>
                            </tr>
                        ) : (
                            <tr>
                                <td>{game.id}</td>
                                <td>{game.numbers[0]}, {game.numbers[1]}, {game.numbers[2]}, {game.numbers[3]}, {game.numbers[4]}</td>
                                <td colSpan={4}>{appContextData.whoami === "Üzemeltető" ? <button className='button' onClick={() => {
                                    ruleNumber(game.id);
                                }}>Sorsol</button> : <> Még sorsolásra vár</>}</td>
                            </tr>
                        )}</>
                    })
                ) : (
                    null
                )}
            </table>
        </div>
    );
};

export default Tickets;