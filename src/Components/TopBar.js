import React, { useEffect } from 'react';
import './../Styles/TopBar.css';
import akcseImg from './../Assets/akcse.png';
import { useAppContext } from '../AppContext';

const TopBar = () => {
  const appContextData = useAppContext()

  useEffect (() => {
    if (appContextData.first === true) {
      appContextData.setName(localStorage.getItem('name'))
    }
    else {
      localStorage.setItem('name', appContextData.name)
    }
  }, [appContextData.name]) 
  return (
    <div className="topbar-container">
      {appContextData.isNameChange ? 
        (<div className="flex-container">
          <input type="text" className="input" autoFocus onChange={(event) => {
            appContextData.setTempName(event.target.value);
          }}></input> :
          <button className="button" onClick={() => {
            appContextData.setIsNameChange(false);
            appContextData.setName(appContextData.tempName);
            localStorage.setItem('name', appContextData.name);
          }}>Név mentése</button>
          <button className="button" onClick={() => {
            appContextData.setIsNameChange(false);
          }}>Vissza mentése</button>
        </div> 
        ) : (
          <div className="flex-container">
            <div className="bar-text">{appContextData?.name}</div>
            <button className="button" onClick={() => {
              appContextData.setIsNameChange(true);
            }}>Név változtatása</button> 
          </div>
        )
      }
      <div className="flex-container">
        <p className="bar-text">Játékos egyenlege: {appContextData.akcsePlayer}</p>
        <img src={akcseImg} alt='akcseImg' className='akcse-img' title="akcse" />
      </div>
      <div className="flex-container">
        <p className="bar-text">Üzemeltető egyenlege: {appContextData.akcseOperator}</p>
        <img src={akcseImg} alt='akcseImg'  className='akcse-img' title="Akcse" />
      </div>
      <button className="button" onClick={() => {
        appContextData.resetState();
      }}>Visszaállítás/Start</button>
      <button className="button" onClick={() => {
        appContextData.whoami === "Játékos" ? (
          appContextData.setWhoami("Üzemeltető")
        ) : (
          appContextData.setWhoami("Játékos")
        );
      }}>Oldal váltás</button>
      <p className='bar-text'>{appContextData.whoami}</p>
      <button className='button' onClick={() => {
        appContextData.setName(localStorage.getItem('name'));
        appContextData.setAkcsePlayer(parseInt(localStorage.getItem('akcsePlayer')));
        appContextData.setAkcseOperator(parseInt(localStorage.getItem('akcseOperator')));
      }}>Előző játékmenet</button>
    </div>
  )
}

export default TopBar
