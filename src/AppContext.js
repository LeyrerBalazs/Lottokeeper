import React, {createContext, useState, useContext} from "react";

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

    const resetState = () => {
        setName('Ismeretlen');
        setWhoami('Játékos');
        setTempName(name);
        setAkcsePlayer(10000);
        setAkcseOperator(0);
        setIsNameChange(false);
        setGames([]);
    };

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
        setSelected
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