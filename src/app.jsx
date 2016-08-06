import 'babel-polyfill';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import './style.sass';

class App extends React.Component {
  render () {
    return <div> Hello React!</div>;
  }
}

ReactDOM.render(<App/>, document.getElementById('main'));