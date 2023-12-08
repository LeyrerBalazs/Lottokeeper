import React, { useState } from 'react';
import './../Styles/TopBar.css';
import akcseImg from './../Assets/akcse.png';

const TopBar = () => {
  const [name, setName] = useState('Ismeretlen');
  const [tempName, setTempName] = useState(name)
  const [isNameChange, setIsNameChange] = useState(false)
  const [whoami, setWhoami] = useState('Játékos');
  const [akcsePlayer, setAkcsePlayer] = useState(10000);
  const [akcseOperator, setAkcseOperator] = useState(0);

  const resetState = () => {
    setName('Ismeretlen');
    setTempName(name)
    setIsNameChange(false)
    setWhoami('Játékos');
    setAkcsePlayer(10000);
    setAkcseOperator(0);
  }

  return (
    <div className="topbar-container">
      {isNameChange ? 
        (<div className="flex-container">
          <input type="text" className="input" autoFocus onChange={(event) => {
            setTempName(event.target.value);
          }}></input> :
          <button className="button" onClick={() => {
            setIsNameChange(false);
            setName(tempName);
          }}>Név mentése</button>
          <button className="button" onClick={() => {
            setIsNameChange(false);
          }}>Vissza mentése</button>
        </div> 
        ) : (
          <div className="flex-container">
            <div className="bar-text">{name}</div>
            <button className="button" onClick={() => {
              setIsNameChange(true);
            }}>Név változtatása</button> 
          </div>
        )
      }
      <div className="flex-container">
        <p className="bar-text">Játékos egyenlege: {akcsePlayer}</p>
        <img src={akcseImg} alt='akcseImg' className='akcse-img' title="akcse" />
      </div>
      <div className="flex-container">
        <p className="bar-text">Üzemeltető egyenlege: {akcseOperator}</p>
        <img src={akcseImg} alt='akcseImg'  className='akcse-img' title="Akcse" />
      </div>
      <button className="button" onClick={() => {
        resetState();
      }}>Visszaállítás</button>
      <button className="button" onClick={() => {
        whoami === "Játékos" ? (
          setWhoami("Üzemeltető")
        ) : (
          setWhoami("Játékos")
        );
      }}>Oldal váltás</button>
      <p className='bar-text'>{whoami}</p>
    </div>
  )
}

export default TopBar