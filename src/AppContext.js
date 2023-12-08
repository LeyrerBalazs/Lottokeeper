import React, {createContext, useState, useContext, Children} from "react";

const appContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [name, setName] = useState('Ismeretlen');
    const [tempName, setTempName] = useState(name);
    const [isNameChange, setIsNameChange] = useState(false);
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
        setAkcseOperator
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
