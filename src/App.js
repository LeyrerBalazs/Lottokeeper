import React from 'react';
import TopBar from './Components/TopBar';
import Lottery from './Components/Lottery';
import Tickets from './Components/Tickets';

const App = () => {
  return (
    <div>
      <TopBar />
      <Lottery />
      <Tickets />
    </div>
  );
};

export default App;
