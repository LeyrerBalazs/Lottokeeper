import React from 'react'
import TopBar from './Components/TopBar'
import SubBar from './Components/SubBar'
import { AppContextProvider } from './AppContext'

const App = () => {
  return (
    <AppContextProvider>
      <TopBar />
      <SubBar />
    </AppContextProvider>
  )
}

export default App