import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import './../Styles/Tickets.css';
import akcseImg from './../Assets/akcse.png';

const Tickets = () => {
    const appContextData = useAppContext();
    const [sort, setSort] = useState(1)

    const handleButton = (id) => {
        appContextData.ruleNumber(id)
    }

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
                {(appContextData?.games !== undefined || appContextData?.games?.length !== 0 ) ? (
                    sort !== 0 ?
                        appContextData?.games?.toReversed().map((game) => {
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
                                        handleButton(game.id);
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
                                    appContextData.ruleNumber(game.id);
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