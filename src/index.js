import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calendar from './components/Calendar';

const App = () => {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
