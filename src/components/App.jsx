// libraries
import React from 'react';
// static
import Instructions from './Instructions/index';
import Compressor from './Compressor/index';
// styles
import './App.css';

const App = () => {
    return (
        <div className="App">
            <Instructions />
            <Compressor />
        </div>
    );
};

export default App;
